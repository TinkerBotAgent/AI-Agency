'use client';

import { useState } from 'react';

export default function Home() {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{
    react: string;
    html: string;
    css: string;
    tailwind: string;
  } | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedCode({
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
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            BluePrinter
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your Figma designs into production-ready code instantly. 
            No more hand-coding from designs.
          </p>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Try It Live</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Figma File URL
                </label>
                <input
                  type="url"
                  value={figmaUrl}
                  onChange={(e) => setFigmaUrl(e.target.value)}
                  placeholder="https://www.figma.com/file/..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={!figmaUrl || isGenerating}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? 'Generating Code...' : 'Generate Code'}
              </button>

              {!figmaUrl && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Demo:</strong> Enter any Figma URL to see the magic happen!
                  </p>
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Generated Code</h3>
              
              {generatedCode ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">React Component</h4>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{generatedCode.react}</code>
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Tailwind CSS</h4>
                    <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{generatedCode.tailwind}</code>
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span>Generating your code...</span>
                    </div>
                  ) : (
                    'Enter a Figma URL and click Generate Code to see the magic!'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Figma Integration</h3>
            <p className="text-gray-600">
              Connect directly to your Figma files. Import designs, components, and assets seamlessly.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Smart Code Generation</h3>
            <p className="text-gray-600">
              AI-powered conversion to React, HTML, CSS, and Tailwind. Clean, semantic code every time.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">Export & Deploy</h3>
            <p className="text-gray-600">
              Download production-ready code or deploy directly to your favorite platform.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Save Hours of Development?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who&apos;ve already transformed their workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
