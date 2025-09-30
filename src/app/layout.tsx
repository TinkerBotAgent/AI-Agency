export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            BluePrinter
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your Figma designs into working code instantly
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Connect Figma</h3>
            <p className="text-gray-600">
              Import your Figma designs and components seamlessly
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Generate Code</h3>
            <p className="text-gray-600">
              Automatically convert designs to React, HTML, or CSS
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">Export & Deploy</h3>
            <p className="text-gray-600">
              Download clean, production-ready code instantly
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6">
              Connect your Figma account and start generating code from your designs
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Connect Figma
            </button>
          </div>
        </div>

        {/* Add-on Packs Preview */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8">Coming Soon - Add-on Packs</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-dashed border-gray-300">
              <h4 className="text-lg font-semibold mb-2">TinkerBot Pack</h4>
              <p className="text-gray-600">AI-powered code suggestions and optimization</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-dashed border-gray-300">
              <h4 className="text-lg font-semibold mb-2">Analytics Pack</h4>
              <p className="text-gray-600">Track usage and performance metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
