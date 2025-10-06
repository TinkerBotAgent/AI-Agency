<<<<<<< HEAD
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
    
    // Generate code based on design
    const generatedCode = await generateCodeFromDesign(designData, options);

    return NextResponse.json({
      success: true,
      code: generatedCode,
      metadata: {
        fileName: designData.name || "Generated Component",
        nodeCount: designData.nodeCount || 1,
        generatedAt: new Date().toISOString(),
        figmaFileId,
        framework: options.framework || 'react'
      }
    });

  } catch (error) {
    console.error('Code generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate code' }, 
      { status: 500 }
    );
  }
}

function extractFigmaFileId(url: string): string | null {
  const match = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

async function getFigmaDesignData(fileId: string) {
  // In production, this would call the real Figma API
  // For now, return enhanced mock data based on file ID
  
  const mockDesigns = {
    'default': {
      name: 'Modern Dashboard',
      nodeCount: 15,
      components: [
        { type: 'button', text: 'Get Started', style: 'primary' },
        { type: 'card', title: 'Analytics', content: 'Dashboard metrics' },
        { type: 'navigation', items: ['Home', 'Projects', 'Settings'] }
      ]
    },
    'ecommerce': {
      name: 'E-commerce Product Card',
      nodeCount: 8,
      components: [
        { type: 'image', alt: 'Product image' },
        { type: 'heading', text: 'Product Title' },
        { type: 'price', value: '$99.99' },
        { type: 'button', text: 'Add to Cart', style: 'primary' }
      ]
    }
  };

  // Return mock data based on fileId (in production, use real Figma API)
  console.log('Processing Figma file:', fileId);
  return mockDesigns['default'];
}

async function generateCodeFromDesign(designData: { name: string }, options: { framework?: string }) {
  
  // Enhanced code generation based on design components
  const codeTemplates = {
    react: generateReactCode(designData),
    vue: generateVueCode(designData),
    html: generateHTMLCode(designData),
    tailwind: generateTailwindCode(designData)
  };

  // Return specific framework if requested, otherwise return all templates
  if (options.framework && codeTemplates[options.framework as keyof typeof codeTemplates]) {
    return { [options.framework]: codeTemplates[options.framework as keyof typeof codeTemplates] };
  }

  return codeTemplates;
}

function generateReactCode(designData: { name: string }) {
  return `import React from 'react';

const ${designData.name.replace(/\s+/g, '')} = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        ${designData.name}
      </h2>
      
      {/* Generated from Figma design */}
      <div className="space-y-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
          Get Started
        </button>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Analytics Dashboard</h3>
          <p className="text-gray-600 text-sm mt-1">Real-time metrics and insights</p>
        </div>
        
        <nav className="flex space-x-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Projects</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Settings</a>
        </nav>
      </div>
    </div>
  );
};

export default ${designData.name.replace(/\s+/g, '')};`;
}

function generateVueCode(designData: { name: string }) {
  return `<template>
  <div class="p-6 bg-white rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      ${designData.name}
    </h2>
    
    <div class="space-y-4">
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
        Get Started
      </button>
      
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold text-gray-700">Analytics Dashboard</h3>
        <p class="text-gray-600 text-sm mt-1">Real-time metrics and insights</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '${designData.name.replace(/\s+/g, '')}',
  data() {
    return {
      // Component data
    }
  }
}
</script>`;
}

function generateHTMLCode(designData: { name: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${designData.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
            ${designData.name}
        </h2>
        
        <div class="space-y-4">
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium w-full">
                Get Started
            </button>
            
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold text-gray-700">Analytics Dashboard</h3>
                <p class="text-gray-600 text-sm mt-1">Real-time metrics and insights</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

function generateTailwindCode(designData: { name: string }) {
  return `<div class="p-6 bg-white rounded-xl shadow-lg">
  <h2 class="text-2xl font-bold text-gray-800 mb-4">
    ${designData.name}
  </h2>
  
  <div class="space-y-4">
    <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
      Get Started
    </button>
    
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="font-semibold text-gray-700">Analytics Dashboard</h3>
      <p class="text-gray-600 text-sm mt-1">Real-time metrics and insights</p>
    </div>
    
    <nav class="flex space-x-4">
      <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Home</a>
      <a href="#" class="text-gray-600 hover:text-gray-800">Projects</a>
      <a href="#" class="text-gray-600 hover:text-gray-800">Settings</a>
    </nav>
  </div>
</div>`;
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


=======
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { figmaUrl } = await request.json();

    if (!figmaUrl) {
      return NextResponse.json({ error: 'Figma URL is required' }, { status: 400 });
    }

    // Simulate code generation for demo
    const generatedCode = {
      react: `const Button = () => {
  return (
    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
      Click me
    </button>
  );
};

export default Button;`,
      html: `<button style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 8px;">
  Click me
</button>`,
      css: `.button {
  background-color: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}`,
      tailwind: `<button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
  Click me
</button>`
    };

    return NextResponse.json({
      success: true,
      code: generatedCode,
      metadata: {
        fileName: "Demo Component",
        nodeCount: 1,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Code generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate code' }, 
      { status: 500 }
    );
  }
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


>>>>>>> 824e81a1751fdc9495f8be06788ef1ff57e434fd
