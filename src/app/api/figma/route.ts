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


