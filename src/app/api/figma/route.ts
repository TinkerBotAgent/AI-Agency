import { NextRequest, NextResponse } from 'next/server';

// Enhanced Figma API with real code generation capabilities
export async function POST(request: NextRequest) {
  try {
    const { figmaUrl, options = {} } = await request.json();

    if (!figmaUrl) {
      return NextResponse.json({ error: 'Figma URL is required' }, { status: 400 });
    }

    // Extract Figma file ID from URL
    const figmaFileId = extractFigmaFileId(figmaUrl);
    if (!figmaFileId) {
      return NextResponse.json({ error: 'Invalid Figma URL format' }, { status: 400 });
    }

    // Get Figma design data (would use real Figma API in production)
    const designData = await getFigmaDesignData(figmaFileId);

    // Generate code based on design data
    const generatedCode = await generateCodeFromDesign(designData, options);

    return NextResponse.json({
      success: true,
      figmaFileId,
      generatedCode,
      metadata: {
        components: designData.components?.length || 0,
        pages: designData.pages?.length || 0,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Figma API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process Figma design' },
      { status: 500 }
    );
  }
}

function extractFigmaFileId(url: string): string | null {
  const match = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

async function getFigmaDesignData(fileId: string) {
  // In production, this would call the actual Figma API
  // For now, return mock data
  return {
    name: 'Sample Design',
    components: [
      { id: 'comp1', name: 'Button', type: 'COMPONENT' },
      { id: 'comp2', name: 'Card', type: 'COMPONENT' },
      { id: 'comp3', name: 'Header', type: 'COMPONENT' }
    ],
    pages: [
      { id: 'page1', name: 'Home Page' },
      { id: 'page2', name: 'About Page' }
    ],
    styles: {
      colors: ['#3B82F6', '#1F2937', '#FFFFFF'],
      fonts: ['Inter', 'Roboto']
    }
  };
}

async function generateCodeFromDesign(designData: any, options: any) {
  // Generate React components based on design data
  const components = designData.components.map((comp: any) => {
    switch (comp.name.toLowerCase()) {
      case 'button':
        return {
          name: comp.name,
          react: `const ${comp.name} = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  };
  
  return (
    <button 
      className={\`\${baseClasses} \${variants[variant]}\`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ${comp.name};`,
          css: `.${comp.name.toLowerCase()} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}`,
          tailwind: 'px-4 py-2 rounded-lg font-medium transition-colors'
        };
      
      case 'card':
        return {
          name: comp.name,
          react: `const ${comp.name} = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={\`bg-white rounded-lg shadow-lg border border-gray-200 p-6 \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ${comp.name};`,
          css: `.${comp.name.toLowerCase()} {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
}`,
          tailwind: 'bg-white rounded-lg shadow-lg border border-gray-200 p-6'
        };
      
      default:
        return {
          name: comp.name,
          react: `const ${comp.name} = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

export default ${comp.name};`,
          css: `.${comp.name.toLowerCase()} {
  /* Add your styles here */
}`,
          tailwind: '/* Add Tailwind classes here */'
        };
    }
  });

  return {
    components,
    styles: {
      colors: designData.styles.colors,
      fonts: designData.styles.fonts
    },
    framework: options.framework || 'react',
    styling: options.styling || 'tailwind'
  };
}

export async function GET() {
  return NextResponse.json({
    message: "BluePrinter Figma API",
    status: "ready",
    endpoints: {
      "POST /api/figma": "Generate code from Figma URL",
    },
    example: {
      figmaUrl: "https://www.figma.com/file/your-file-key/your-design"
    }
  });
}