'use client';

import { useState } from 'react';

export default function Home() 
  const [activePackage, setActivePackage] = useState('executive');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  TinkerBot Agency
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#agents" className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors">AI Agents</a>
                <a href="#ecosystem" className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors">Ecosystems</a>
                <a href="#proof" className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors">Case Studies</a>
                <a href="#packages" className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors">Get Started</a>
                <a href="#contact" className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-green-500/25">
                  Hire Agents
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300FF88%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Adaptive Agentic AI - Beyond Traditional Automation
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Hire Your AI Workforce
              </span>
              <br />
              <span className="text-white">From Our Elite</span>
              <br />
              <span className="text-white">Agent Pool</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              TinkerBot Agency pioneers <span className="text-green-400 font-semibold">Adaptive Agentic AI</span> - intelligent agents that learn, 
              adapt, and collaborate like a real workforce. Beyond simple automation, our agents evolve with your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-green-500/25 transform hover:scale-105 hover:-translate-y-1">
                Browse Agents
              </button>
              <button className="border-2 border-purple-500 hover:border-purple-400 text-purple-400 hover:text-purple-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 bg-purple-500/10 hover:bg-purple-500/20 transform hover:scale-105 hover:-translate-y-1">
                View Case Studies
              </button>
            </div>

            {/* Agency Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-gray-400 font-medium group-hover:text-green-300 transition-colors duration-300">Specialized Agents</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">200+</div>
                <div className="text-gray-400 font-medium group-hover:text-purple-300 transition-colors duration-300">Successful Placements</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
                <div className="text-gray-400 font-medium group-hover:text-cyan-300 transition-colors duration-300">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Theme Elements */}
      <div className="py-12 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-y-2 border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 font-bold text-lg">SECURE ZONE</span>
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            <div className="h-8 w-px bg-yellow-500/50"></div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-yellow-400 font-medium">AI PROTECTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem Section */}
      <div id="ecosystem" className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Adaptive Agentic AI Ecosystems
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Complete teams of intelligent agents that learn, adapt, and collaborate like a real workforce
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-green-500/10 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Security Team</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Complete security ecosystem with SilentSentry, monitoring agents, and automated response systems.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-400">• SilentSentry (Lead)</div>
                <div className="text-sm text-gray-400">• Network Monitor</div>
                <div className="text-sm text-gray-400">• Response Coordinator</div>
                <div className="text-sm text-gray-400">• Recovery Specialist</div>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black py-3 rounded-xl font-bold transition-all duration-200">
                Hire Team - Starting at $1,500/mo*
              </button>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Development Team</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Full-stack development team with TinkerBot, code reviewers, and deployment specialists.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-400">• TinkerBot (Lead)</div>
                <div className="text-sm text-gray-400">• Code Reviewer</div>
                <div className="text-sm text-gray-400">• Deployment Manager</div>
                <div className="text-sm text-gray-400">• QA Specialist</div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold transition-all duration-200">
                Hire Team - Starting at $1,500/mo*
              </button>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Analytics Team</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Comprehensive analytics team with data processors, insight generators, and reporting specialists.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-400">• Analytics Pro (Lead)</div>
                <div className="text-sm text-gray-400">• Data Processor</div>
                <div className="text-sm text-gray-400">• Insight Generator</div>
                <div className="text-sm text-gray-400">• Report Specialist</div>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-xl font-bold transition-all duration-200">
                Hire Team - Starting at $1,500/mo*
              </button>
            </div>
            
            {/* === NEW SVG FOR SALES & MARKETING === */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-green-500/10 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.257 0 7.168 2.912 7.168 7.168 0 1.773-.635 3.425-1.685 4.767l-1.28.96c-.665.5-1.523.642-2.3.376l-.778-.26A11.05 11.05 0 015.436 13.683z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Sales & Marketing Team</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Cutting edge marketing team and sales support to help scale up your company&apos;s revenue.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-400">• LeadGenBot (Lead)</div>
                <div className="text-sm text-gray-400">• Marketing Scout</div>
                <div className="text-sm text-gray-400">• CommsBot</div>
                <div className="text-sm text-gray-400">• CRM Bot</div>
                <div className="text-sm text-gray-400">• TrendTrackerBot</div>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black py-3 rounded-xl font-bold transition-all duration-200">
                Hire Team - Starting at $1,500/mo*
              </button>
            </div>

            {/* === NEW SVG FOR HR TEAM === */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">HR Team</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Find and retain the best talent to help your company grow.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-400">• HR Coordinator (Lead)</div>
                <div className="text-sm text-gray-400">• Recruiter</div>
                <div className="text-sm text-gray-400">• Onboarding</div>
                <div className="text-sm text-gray-400">• Trainer</div>
                <div className="text-sm text-gray-400">• Benefits</div>
                <div className="text-sm text-gray-400">• Talent Retention</div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold transition-all duration-200">
                Hire Team - Starting at $1,500/mo*
              </button>
            </div>
            
            {/* === NEW SVG FOR CONTENT TEAM === */}
             <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Content Management Team</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Engage online audiences with top quality content for blogs, social media and press releases.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-400">• EditorialBot (Lead)</div>
                <div className="text-sm text-gray-400">•ContentBot</div>
                <div className="text-sm text-gray-400">• SEOBot</div>
                <div className="text-sm text-gray-400">• SocialBot</div>
                <div className="text-sm text-gray-400">• PRBot</div>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-xl font-bold transition-all duration-200">
                Hire Team - Starting at $1,500/mo*
              </button>
            </div>

            {/* === NEW SVG FOR ADMIN TEAM === */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-green-500/10 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Administrative Team</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Administrative automation and personal assistants for your entire workforce.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-400">• ClericalPro (Lead)</div>
                <div className="text-sm text-gray-400">• SecretarialBot</div>
                <div className="text-sm text-gray-400">• TranslationAssist</div>
                <div className="text-sm text-gray-400">• SummaryBot</div>
                <div className="text-sm text-gray-400">• IntelReporter</div>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black py-3 rounded-xl font-bold transition-all duration-200">
                Hire Team - Starting at $1,500/mo*
              </button>
            </div>

            {/* === NEW SVG FOR SUPPLY CHAIN === */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Supply Chain Staff</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Inventory management, logistics, quality control and systems mainenance specialists to regulate product-based companies.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-400">• Production Coordinator (Lead)</div>
                <div className="text-sm text-gray-400">• IntelligentInventory</div>
                <div className="text-sm text-gray-400">• ProcurementBot</div>
                <div className="text-sm text-gray-400">• LogisticsPro</div>
                <div className="text-sm text-gray-400">• QualityAssuranceBot</div>
                <div className="text-sm text-gray-400">• SysMaintenanceBot</div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold transition-all duration-200">
                Hire Team - Starting at $1,500/mo*
              </button>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Finance & Accounting Team</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Administrative automation and personal assistants for your entire workforce.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-400">• FinTechBot (Lead)</div>
                <div className="text-sm text-gray-400">• PayrollBot</div>
                <div className="text-sm text-gray-400">• BudgetAnalyst</div>
                <div className="text-sm text-gray-400">• SysAuditBot</div>
                <div className="text-sm text-gray-400">• TaxSpecialistBot</div>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-xl font-bold transition-all duration-200">
                Hire Team - Starting at $1,500/mo*
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Proof Section */}
      <div id="proof" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Confidence In Our Ecosystems Is Proven: 
              We Rely On Our Adaptive Agentic AI Tools 
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              TinkerBot Agency uses the exact same systems we provide for our clients!
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-12 border border-gray-700">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Increased Productivity and Accuracy Help Us Run More Efficiently
                </h3>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Our entire company operates through our <span className="text-green-400 font-semibold">Adaptive Agentic AI</span> ecosystem. 
                  Customer support, project management, security monitoring, analytics, and internal communications 
                  are all handled by intelligent agents that learn and adapt to our needs. Our live team members report
                  high levels of job satisfaction since they have on demand smart support, retain the more engaging parts
                  of their workloads and experience a significant reduction in errors and customer service issues.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 font-medium">24/7 Automated Operations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 font-medium">AI-Powered Customer Support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 font-medium">Automated Project Management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 font-medium">Real-Time Performance Analytics</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-600">
                <h4 className="text-xl font-bold text-white mb-6">Live Agency Operations</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">SilentSentry Security</span>
                    <span className="flex items-center text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">TinkerBot Development</span>
                    <span className="flex items-center text-purple-400">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Analytics Pro</span>
                    <span className="flex items-center text-cyan-400">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Customer Support</span>
                    <span className="flex items-center text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm font-medium">
                    All systems operational • Zero downtime • 100% Adaptive Agentic AI-powered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-green-500/10 to-purple-500/10 border-t border-green-500/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Deploy Adaptive Agentic AI?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
            Join forward-thinking companies who trust TinkerBot Agency for intelligent, adaptive AI solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-green-500/25 transform hover:scale-105 hover:-translate-y-1">
              Browse All Agents
            </button>
            <button className="border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div id="packages" className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Package Buttons */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 rounded-2xl p-2 border border-gray-700">
              <button
                onClick={() => setActivePackage('Basic')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activePackage === 'Basic' ? 'bg-green-500 text-black' : 'text-gray-300 hover:text-green-400'
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setActivePackage('Accelerator')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activePackage === 'Accelerator' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-purple-400'
                }`}
              >
                Accelerator
              </button>
              <button
                onClick={() => setActivePackage('executive')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activePackage === 'executive' ? 'bg-cyan-500 text-black' : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                Executive
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 transition-all duration-500 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10">
            {activePackage === 'Basic' && (
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                      {/* === NEW SVG FOR BASIC === */}
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Basic Package</h3>
                      <p className="text-green-400 font-medium">Our Budget-Friendly Automation Starter Service</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Package Includes:</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Choose one ecosystem from our list and receive all of the basic level bots
                        within that module. We provide ongoing tech support, on demand full systems
                        training for your employees, system optimization features and free integration
                        of any new basic level bots that we release.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        And when you decide you wish to scale your business faster with an upgraded
                        automation package, you only pay the difference between your current package
                        and the new plan you&apos;ve chosen! 
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Best Plan For:</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">New To Automation</span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Limited Investment Capital</span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Slow Business Expansion Goals</span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Startup Companies</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Benefit Analysis</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-400">Pro&apos;s</div>
                          <div className="text-gray-400 text-sm">An introduction to accessing enterprise level automation tools with a small investment cost</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-400">Con&apos;s</div>
                          <div className="text-gray-400 text-sm">Slower ROI and Business Scaling | Bots learn slower since they&apos;re only interconnected within the same workspace </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-600 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                  <h4 className="text-xl font-semibold text-white mb-4">Choose This Package</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Availability</span>
                      <span className="text-green-400 font-medium">Immediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Integration Time</span>
                      <span className="text-green-400 font-medium">24-48 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Setup Fee</span>
                      <span className="text-green-400 font-medium">$3500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Rate</span>
                      <span className="text-green-400 font-medium">$1500</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                      Click To Schedule Onboarding
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePackage === 'Accelerator' && (
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                      {/* === NEW SVG FOR ACCELERATOR === */}
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Accelerator Package</h3>
                      <p className="text-purple-400 font-medium">Kickstarts Growth Through Expanded Ecosystems and Interconnectivity</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Package Includes:</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Choose four ecosystems from our list and receive all of the advanced level bots
                        within that module, PLUS a bonus of one Executive Level Bot of your choice. 
                        We provide ongoing tech support, on demand full systems training for your employees, 
                        system optimization features and free integration of any new basic level bots that we release.
                      </p>
                       <p className="text-gray-300 leading-relaxed">
                        And when you decide you wish to scale your business faster with an Executive
                        automation package, you only pay the difference between your current package
                        and the new plan you&apos;ve chosen! 
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Best Plan For:</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Established Companies</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Accelerated Growth</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Basic to Intermediate Automation</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Basic Early Adoption Benefits</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Benefit Analysis</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-purple-400">Pro&apos;s</div>
                          <div className="text-gray-400 text-sm">Faster Development, Improved Rate of ROI, Market Expansion, Increased Bot Learning Curve</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-purple-400">Con&apos;s</div>
                          <div className="text-gray-400 text-sm">Does Not Claim Full Benefits of Early AI Adoption, Does Not Support Balanced Growth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-600">
                  <h4 className="text-xl font-semibold text-white mb-4">Choose This Package:</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Availability</span>
                      <span className="text-purple-400 font-medium">Immediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Integration Time</span>
                      <span className="text-purple-400 font-medium">12-24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Setup Fee</span>
                      <span className="text-purple-400 font-medium">$7000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Rate</span>
                      <span className="text-purple-400 font-medium">$3000</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold transition-all duration-200">
                      Click To Schedule Onboarding
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePackage === 'executive' && (
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                      {/* === NEW SVG FOR EXECUTIVE === */}
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M19 3v4M3 10h18M5 13h14M5 17h14M12 7a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Executive Package</h3>
                      <p className="text-cyan-400 font-medium">Dominate Your Competitors With Early Adoption Of Top Tier Tools</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Package Includes:</h4>
                      <p className="text-gray-300 leading-relaxed">
                        All of our Adaptive Agentic AI ecosystems are included and receive all of the Executive
                        level bots within that module, all trained and fitted for your company&apos;s needs. 
                        We provide ongoing tech support, on demand full systems training for your employees, 
                        system optimization features and free integration of any new Executive level bots that we release.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Additionally, you will be given the opportunity to try out any Beta ecosystems in the future
                        without any obligation to purchase new ecosystems. If you do enjoy using new tools before we
                        make them widely available or having your evaluations help shape future offerings, then the
                        Executive Suite of Ecosystems is definitely for you!
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Best Plan For:</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Future Focused Companies</span>
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Top Level ROI</span>
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Rapid Market Expansion</span>
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Companies Positioned to be Top Competitors</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Benefit Analysis</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-cyan-400">Pro&apos;s</div>
                          <div className="text-gray-400 text-sm">Early AI Adoption Benefits, Full Integration for SEO/AEO, Comprehensive Best Practice Strategies</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-cyan-400">Con&apos;s</div>
                          <div className="text-gray-400 text-sm">Highest Initial Investment, Company-Wide Training Is Imperative</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-600">
                  <h4 className="text-xl font-semibold text-white mb-4">Choose This Package:</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Availability</span>
                      <span className="text-cyan-400 font-medium">Immediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Integration Time</span>
                      <span className="text-cyan-400 font-medium">48-72 hours</span>
                    </div>
                   <div className="flex justify-between">
                      <span className="text-gray-300">Setup Fee</span>
                      <span className="text-cyan-400 font-medium">$15,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Rate</span>
                      <span className="text-cyan-400 font-medium">$6,500</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-xl font-bold transition-all duration-200">
                      Click To Schedule Onboarding
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-6">
              TinkerBot Agency
            </div>
            <p className="text-gray-400 mb-8 text-lg">
              Pioneering Adaptive Agentic AI - intelligent agents that learn, adapt, and collaborate.
            </p>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Support</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
