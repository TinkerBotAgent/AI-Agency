'use client';

import { useState } from 'react';

export default function BluePrinterPublic() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-gray-900">
                  BluePrinter
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm">Public Access</span>
              <a 
                href="/blueprinter/private"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Private Access
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BluePrinter Development Tool
          </h1>
          <p className="text-xl text-gray-600">
            Visual workflow builder for AI automation and bot ecosystem development
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Flow Builder</h3>
              <p className="text-gray-600">
                Drag-and-drop interface for creating complex bot workflows and automation pipelines.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bot Ecosystem Library</h3>
              <p className="text-gray-600">
                Comprehensive library of specialized bots and their detailed specifications.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rapid Development</h3>
              <p className="text-gray-600">
                Build and deploy AI automation systems faster than traditional development methods.
              </p>
            </div>
          </div>
        </div>

        {/* Access Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Private Development Tool</h3>
            <p className="text-blue-800 mb-6">
              BluePrinter is a private development tool for building AI automation systems. 
              Access the full functionality with private authentication.
            </p>
            <a 
              href="/blueprinter/private"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Access Private BluePrinter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}