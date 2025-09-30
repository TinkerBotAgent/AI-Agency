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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  BluePrinter
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Docs</a>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Design to Code
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              From Figma to
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Production Code
              </span>
              <br />
              in Seconds
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Transform your Figma designs into clean, production-ready React components with our advanced AI engine. 
              No more manual coding, no more design handoffs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 bg-white hover:bg-gray-50">
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">10x</div>
                <div className="text-gray-600 font-medium">Faster Development</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">50k+</div>
                <div className="text-gray-600 font-medium">Components Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">99%</div>
                <div className="text-gray-600 font-medium">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See the Magic in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Upload your Figma design and watch it transform into clean, production-ready code
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Section */}
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Figma File URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={figmaUrl}
                      onChange={(e) => setFigmaUrl(e.target.value)}
                      placeholder="https://www.figma.com/file/..."
                      className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-lg"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleGenerate}
                  disabled={!figmaUrl || isGenerating}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Generating Code...</span>
                    </div>
                  ) : (
                    'Generate Code'
                  )}
                </button>

                {!figmaUrl && (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
                    <p className="text-indigo-700 text-sm font-medium">
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Pro Tip:
                      </span> Enter any Figma URL to see the AI magic happen!
                    </p>
                  </div>
                )}
              </div>

              {/* Output Section */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">Generated Code</h3>
                
                {generatedCode ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-700 text-lg">React Component</h4>
                        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors">
                          Copy Code
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-200 shadow-lg">
                        <pre className="text-green-400 text-sm overflow-x-auto leading-relaxed">
                          <code>{generatedCode.react}</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-700 text-lg">Tailwind CSS</h4>
                        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors">
                          Copy Code
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-200 shadow-lg">
                        <pre className="text-blue-400 text-sm overflow-x-auto leading-relaxed">
                          <code>{generatedCode.tailwind}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
                        <span className="text-gray-600 font-medium text-lg">Generating your code...</span>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-lg font-medium">Enter a Figma URL and click Generate Code to see the magic!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Developers Choose BluePrinter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Built for modern development workflows with enterprise-grade reliability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Generate production-ready React components in seconds, not hours. 
                Our AI engine understands design patterns and creates semantic code.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">AI-Powered</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Advanced machine learning models trained on millions of design-to-code patterns. 
                Gets smarter with every generation.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Developer First</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Built by developers, for developers. Clean code, TypeScript support, 
                and seamless integration with your favorite tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Ship Faster?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto font-light">
            Join thousands of developers who&apos;ve already transformed their workflow. 
            Start building the future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
              BluePrinter
            </div>
            <p className="text-gray-400 mb-8 text-lg">
              Transforming design into code, one component at a time.
            </p>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
