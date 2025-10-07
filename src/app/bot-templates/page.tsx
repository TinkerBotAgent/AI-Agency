'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BotTemplates() {
  const [activeCategory, setActiveCategory] = useState('security');

  const botTemplates = {
    security: [
      {
        name: 'SilentSentry',
        role: 'Security Specialist',
        description: 'Advanced threat detection and automated response for AI ecosystems',
        coreSkills: ['Threat Detection', 'Network Analysis', 'Automated Response', 'System Recovery'],
        performanceMetrics: { detectionRate: '99.9%', responseTime: '<2s', falsePositives: 'Zero' },
        integrationTime: '24-48 hours',
        monthlyRate: '$2,500',
        setupFee: '$5,000'
      },
      {
        name: 'Network Monitor',
        role: 'Network Security Agent',
        description: 'Continuous network traffic analysis and anomaly detection',
        coreSkills: ['Traffic Analysis', 'Anomaly Detection', 'Real-time Monitoring', 'Alert Management'],
        performanceMetrics: { uptime: '99.99%', latency: '<100ms', accuracy: '98%' },
        integrationTime: '12-24 hours',
        monthlyRate: '$1,200',
        setupFee: '$2,500'
      },
      {
        name: 'Response Coordinator',
        role: 'Incident Response Agent',
        description: 'Orchestrates automated response protocols during security incidents',
        coreSkills: ['Incident Response', 'Protocol Management', 'Escalation Handling', 'Recovery Planning'],
        performanceMetrics: { responseTime: '<30s', successRate: '95%', escalationTime: '<5min' },
        integrationTime: '18-36 hours',
        monthlyRate: '$1,800',
        setupFee: '$3,500'
      },
      {
        name: 'Recovery Specialist',
        role: 'System Recovery Agent',
        description: 'Manages backup systems and automated recovery procedures',
        coreSkills: ['Backup Management', 'Recovery Procedures', 'Data Integrity', 'Restore Points'],
        performanceMetrics: { recoveryTime: '<1hr', dataLoss: '0%', successRate: '99.8%' },
        integrationTime: '24-48 hours',
        monthlyRate: '$1,500',
        setupFee: '$3,000'
      }
    ],
    marketing: [
      {
        name: 'LeadGenBot',
        role: 'Lead Generation Specialist',
        description: 'Identifies and qualifies potential leads from various sources',
        coreSkills: ['Lead Scoring', 'Data Mining', 'Qualification', 'CRM Integration'],
        performanceMetrics: { leadQuality: '85%', conversionRate: '12%', costPerLead: '-60%' },
        integrationTime: '2-3 weeks',
        monthlyRate: '$1,800',
        setupFee: '$3,500'
      },
      {
        name: 'CRMBot',
        role: 'Customer Relationship Manager',
        description: 'Manages customer interactions and sales pipeline',
        coreSkills: ['Pipeline Management', 'Customer Segmentation', 'Automated Follow-ups', 'Sales Analytics'],
        performanceMetrics: { pipelineVelocity: '+40%', customerRetention: '92%', salesEfficiency: '+55%' },
        integrationTime: '3-4 weeks',
        monthlyRate: '$2,200',
        setupFee: '$4,000'
      },
      {
        name: 'CommsBot',
        role: 'Communication Specialist',
        description: 'Automates personalized customer communications',
        coreSkills: ['Email Automation', 'Personalization', 'A/B Testing', 'Multi-channel Messaging'],
        performanceMetrics: { openRate: '35%', clickRate: '8%', engagement: '+45%' },
        integrationTime: '2-3 weeks',
        monthlyRate: '$1,500',
        setupFee: '$2,800'
      },
      {
        name: 'ContentGenBot',
        role: 'Content Creation Specialist',
        description: 'Generates marketing content and campaign materials',
        coreSkills: ['Content Creation', 'SEO Optimization', 'Brand Consistency', 'Multi-format Output'],
        performanceMetrics: { contentVolume: '+300%', SEOScore: '95', brandConsistency: '98%' },
        integrationTime: '2-3 weeks',
        monthlyRate: '$1,600',
        setupFee: '$3,000'
      },
      {
        name: 'SocialBot',
        role: 'Social Media Manager',
        description: 'Manages social media presence and engagement',
        coreSkills: ['Social Scheduling', 'Engagement Monitoring', 'Trend Analysis', 'Community Management'],
        performanceMetrics: { engagementRate: '+65%', reach: '+80%', responseTime: '<2min' },
        integrationTime: '1-2 weeks',
        monthlyRate: '$1,200',
        setupFee: '$2,200'
      },
      {
        name: 'SentimentBot',
        role: 'Sentiment Analysis Specialist',
        description: 'Analyzes customer sentiment and brand perception',
        coreSkills: ['Sentiment Analysis', 'Brand Monitoring', 'Crisis Detection', 'Reputation Management'],
        performanceMetrics: { accuracy: '94%', detectionSpeed: '<5min', falsePositives: '<2%' },
        integrationTime: '2-3 weeks',
        monthlyRate: '$1,400',
        setupFee: '$2,600'
      }
    ],
    hr: [
      {
        name: 'RecruiterBot',
        role: 'Talent Acquisition Specialist',
        description: 'Scouts for talent, screens candidates, and manages recruitment pipeline',
        coreSkills: ['Candidate Sourcing', 'Resume Analysis', 'Interview Scheduling', 'Candidate Scoring'],
        performanceMetrics: { timeToHire: '-60%', candidateQuality: '+40%', costPerHire: '-45%' },
        integrationTime: '2-3 weeks',
        monthlyRate: '$1,800',
        setupFee: '$3,500'
      },
      {
        name: 'OnboardingBot',
        role: 'Employee Onboarding Coordinator',
        description: 'Automates new employee setup and documentation',
        coreSkills: ['Document Generation', 'E-signature Collection', 'Training Scheduling', 'System Access'],
        performanceMetrics: { onboardingTime: '-70%', completionRate: '98%', satisfaction: '94%' },
        integrationTime: '1-2 weeks',
        monthlyRate: '$1,200',
        setupFee: '$2,200'
      },
      {
        name: 'TrainerBot',
        role: 'Learning & Development Specialist',
        description: 'Provides on-demand training resources and tracks development',
        coreSkills: ['Training Delivery', 'Progress Tracking', 'Compliance Monitoring', 'Skill Assessment'],
        performanceMetrics: { completionRate: '92%', skillImprovement: '+55%', complianceRate: '99%' },
        integrationTime: '2-3 weeks',
        monthlyRate: '$1,500',
        setupFee: '$2,800'
      },
      {
        name: 'BenefitsBot',
        role: 'Benefits Administration Specialist',
        description: 'Manages employee benefits enrollment and administration',
        coreSkills: ['Benefits Enrollment', 'Claims Processing', 'Employee Support', 'Compliance Tracking'],
        performanceMetrics: { enrollmentRate: '96%', inquiryResolution: '95%', complianceRate: '100%' },
        integrationTime: '3-4 weeks',
        monthlyRate: '$1,300',
        setupFee: '$2,500'
      },
      {
        name: 'RetentionBot',
        role: 'Employee Engagement Specialist',
        description: 'Monitors employee satisfaction and prevents turnover',
        coreSkills: ['Sentiment Analysis', 'Performance Tracking', 'Retention Strategies', 'Employee Feedback'],
        performanceMetrics: { turnoverReduction: '40%', satisfactionScore: '88%', engagementRate: '+35%' },
        integrationTime: '2-3 weeks',
        monthlyRate: '$1,600',
        setupFee: '$3,000'
      }
    ],
    finance: [
      {
        name: 'FinTechBot',
        role: 'Financial Technology Specialist',
        description: 'Manages general ledger, accounts payable/receivable, and financial reporting',
        coreSkills: ['Financial Reporting', 'Account Reconciliation', 'Invoice Processing', 'Cash Flow Management'],
        performanceMetrics: { accuracy: '99.8%', processingSpeed: '+80%', errorReduction: '95%' },
        integrationTime: '3-4 weeks',
        monthlyRate: '$2,500',
        setupFee: '$4,500'
      },
      {
        name: 'BudgetBot',
        role: 'Budget Management Specialist',
        description: 'Assists in creating and managing budgets, tracking expenditures',
        coreSkills: ['Budget Creation', 'Expenditure Tracking', 'Variance Analysis', 'Forecasting'],
        performanceMetrics: { budgetAccuracy: '97%', varianceReduction: '60%', forecastingAccuracy: '94%' },
        integrationTime: '2-3 weeks',
        monthlyRate: '$1,800',
        setupFee: '$3,200'
      },
      {
        name: 'AuditBot',
        role: 'Internal Audit Specialist',
        description: 'Conducts internal financial audits and ensures compliance',
        coreSkills: ['Audit Planning', 'Compliance Monitoring', 'Risk Assessment', 'Report Generation'],
        performanceMetrics: { auditEfficiency: '+70%', complianceRate: '99.5%', riskDetection: '92%' },
        integrationTime: '3-4 weeks',
        monthlyRate: '$2,200',
        setupFee: '$4,000'
      },
      {
        name: 'TaxBot',
        role: 'Tax Management Specialist',
        description: 'Manages tax calculations, filings, and compliance',
        coreSkills: ['Tax Calculation', 'Filing Management', 'Compliance Monitoring', 'Tax Planning'],
        performanceMetrics: { accuracy: '99.9%', filingSpeed: '+85%', complianceRate: '100%' },
        integrationTime: '4-5 weeks',
        monthlyRate: '$2,000',
        setupFee: '$3,800'
      },
      {
        name: 'EmployeeExpenseBot',
        role: 'Expense Management Specialist',
        description: 'Automates expense reporting and reimbursement processes',
        coreSkills: ['Expense Processing', 'Policy Enforcement', 'Approval Workflows', 'Reimbursement Management'],
        performanceMetrics: { processingTime: '-75%', accuracy: '98%', employeeSatisfaction: '91%' },
        integrationTime: '2-3 weeks',
        monthlyRate: '$1,400',
        setupFee: '$2,600'
      }
    ]
  };

  const categories = [
    { id: 'security', name: 'Security & Compliance', count: botTemplates.security.length },
    { id: 'marketing', name: 'Marketing & Sales', count: botTemplates.marketing.length },
    { id: 'hr', name: 'Human Resources', count: botTemplates.hr.length },
    { id: 'finance', name: 'Financial & Accounting', count: botTemplates.finance.length }
  ];

  const totalBots = Object.values(botTemplates).reduce((sum, category) => sum + category.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bot Template Library
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Pre-built AI agents ready for deployment in your organization
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div>
                <span className="font-semibold text-gray-900">{totalBots}</span> Specialized Agents
              </div>
              <div>
                <span className="font-semibold text-gray-900">{categories.length}</span> Categories
              </div>
              <div>
                <span className="font-semibold text-gray-900">24/7</span> Availability
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bot Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {botTemplates[activeCategory as keyof typeof botTemplates].map((bot, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{bot.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{bot.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{bot.monthlyRate}</div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{bot.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Core Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    {bot.coreSkills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Performance Metrics:</h4>
                  <div className="space-y-1">
                    {Object.entries(bot.performanceMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium text-green-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500">Integration Time</div>
                    <div className="text-sm font-medium text-gray-900">{bot.integrationTime}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Setup Fee</div>
                    <div className="text-sm font-medium text-gray-900">{bot.setupFee}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Deploy Bot
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">{totalBots}+</div>
              <div className="text-gray-400 font-medium">Total Specialized Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-gray-400 font-medium">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Monitoring & Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">26+</div>
              <div className="text-gray-400 font-medium">Total Specialized Agents</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}