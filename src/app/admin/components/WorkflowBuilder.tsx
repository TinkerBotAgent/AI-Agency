'use client';

import { useState, useRef, useCallback } from 'react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'output';
  title: string;
  description: string;
  x: number;
  y: number;
  inputs: number;
  outputs: number;
  icon: string;
  color: string;
}

// interface Connection {
//   id: string;
//   from: string;
//   to: string;
//   fromOutput: number;
//   toInput: number;
// }

const nodeTypes = [
  // BluePrinter Nodes
  {
    type: 'trigger',
    title: 'Figma Design Updated',
    description: 'Triggers when a Figma design is updated',
    icon: '🎨',
    color: 'from-blue-500 to-cyan-500',
    inputs: 0,
    outputs: 1,
    category: 'blueprinter'
  },
  {
    type: 'trigger',
    title: 'New Client Request',
    description: 'Triggers when a new client submits a request',
    icon: '👤',
    color: 'from-green-500 to-emerald-500',
    inputs: 0,
    outputs: 1,
    category: 'blueprinter'
  },
  {
    type: 'action',
    title: 'Generate Code',
    description: 'Generate code from Figma design',
    icon: '⚡',
    color: 'from-purple-500 to-pink-500',
    inputs: 1,
    outputs: 1,
    category: 'blueprinter'
  },
  
  // HR Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Job Application Received',
    description: 'Triggers when new job application is submitted',
    icon: '📧',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'hr'
  },
  {
    type: 'trigger',
    title: 'Employee Onboarding Start',
    description: 'Triggers when new employee needs onboarding',
    icon: '👋',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'hr'
  },
  {
    type: 'action',
    title: 'RecruiterBot Scan',
    description: 'Scan LinkedIn/Indeed/Craigslist for candidates',
    icon: '🔍',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'hr'
  },
  {
    type: 'action',
    title: 'Resume Analysis',
    description: 'AI-powered resume screening and scoring',
    icon: '📄',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'hr'
  },
  {
    type: 'condition',
    title: 'Candidate Qualification Check',
    description: 'Check if candidate meets threshold scores',
    icon: '✅',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'hr'
  },
  {
    type: 'action',
    title: 'Interview Scheduling',
    description: 'Automated interview scheduling with calendar integration',
    icon: '📅',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'hr'
  },
  {
    type: 'action',
    title: 'OnboardingBot Process',
    description: 'Generate personnel files and tax documents',
    icon: '📋',
    color: 'from-emerald-500 to-green-600',
    inputs: 1,
    outputs: 1,
    category: 'hr'
  },
  {
    type: 'action',
    title: 'BenefitsBot Enrollment',
    description: 'Automate benefits enrollment and payroll setup',
    icon: '💰',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'hr'
  },
  {
    type: 'action',
    title: 'TrainerBot Session',
    description: 'Schedule and track training compliance',
    icon: '🎓',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'hr'
  },
  {
    type: 'action',
    title: 'RetentionBot Monitor',
    description: 'Track performance and employee engagement',
    icon: '❤️',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 2,
    category: 'hr'
  },

  // Sales Team Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Lead Generation Trigger',
    description: 'Triggers automated lead generation campaigns',
    icon: '🎯',
    color: 'from-orange-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'trigger',
    title: 'Inbound Call Received',
    description: 'Triggers when inbound call comes to GoDaddy number',
    icon: '📞',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'Google Maps Scraper',
    description: 'Scrape Google Maps for leads by zip code',
    icon: '🗺️',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'Yelp Lead Scraper',
    description: 'Extract business leads from Yelp listings',
    icon: '⭐',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'LinkedIn Prospector',
    description: 'Find and qualify LinkedIn prospects',
    icon: '💼',
    color: 'from-blue-600 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'Social Media Scanner',
    description: 'Scan social platforms for potential leads',
    icon: '📱',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'YouTube Channel Finder',
    description: 'Identify YouTube creators as potential clients',
    icon: '📺',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'condition',
    title: 'Lead Qualification Filter',
    description: 'Filter leads based on qualification criteria',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 2,
    category: 'sales'
  },
  {
    type: 'condition',
    title: 'Do Not Call Check',
    description: 'Check against do-not-call lists for compliance',
    icon: '🚫',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'Cold Email Campaign',
    description: 'Send personalized cold emails to prospects',
    icon: '📧',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'Twilio Cold Call',
    description: 'AI-powered cold calls with ElevenLabs voice',
    icon: '☎️',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'AI Compliance Check',
    description: 'Ensure AI identification and regulatory compliance',
    icon: '⚖️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'Lead Scoring & CRM',
    description: 'Score leads and update CRM with interaction data',
    icon: '📊',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'sales'
  },
  {
    type: 'action',
    title: 'Follow-up Scheduler',
    description: 'Schedule automated follow-up sequences',
    icon: '⏰',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'sales'
  },

  // Content Generator Team Nodes
  {
    type: 'trigger',
    title: 'Content Campaign Launch',
    description: 'Triggers automated content generation campaigns',
    icon: '🚀',
    color: 'from-purple-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'trigger',
    title: 'Industry News Alert',
    description: 'Triggers when new industry news is detected',
    icon: '📰',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Stock Image Generator',
    description: 'AI-powered stock image creation and optimization',
    icon: '🖼️',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Podcast Script Writer',
    description: 'Generate engaging podcast scripts and show notes',
    icon: '🎙️',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Sales Script Generator',
    description: 'Create high-converting sales and ad scripts',
    icon: '📝',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Web Copy Creator',
    description: 'Generate SEO-optimized web copy and landing pages',
    icon: '💻',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'YouTube Shorts Producer',
    description: 'Create viral YouTube shorts with scripts and visuals',
    icon: '📹',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'AI Influencer Content',
    description: 'Generate content for AI influencer accounts',
    icon: '🌟',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Blog Post Writer',
    description: 'Create SEO-optimized blog posts and articles',
    icon: '📚',
    color: 'from-emerald-500 to-green-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Email Marketing Copy',
    description: 'Generate high-converting email campaigns',
    icon: '📧',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Webinar Script Creator',
    description: 'Develop engaging webinar presentations and scripts',
    icon: '🎯',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Social Media Manager',
    description: 'Create platform-specific social media content',
    icon: '📱',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Industry News Scraper',
    description: 'Scrape and analyze industry headlines and trends',
    icon: '🔍',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'action',
    title: 'eBook Generator',
    description: 'Create lead magnet eBooks from curated content',
    icon: '📖',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },
  {
    type: 'condition',
    title: 'SEO/AEO Optimizer',
    description: 'Optimize content for search and answer engines',
    icon: '🎯',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 2,
    category: 'content'
  },
  {
    type: 'condition',
    title: 'Quality Assurance Check',
    description: 'Ensure content meets quality and brand standards',
    icon: '✅',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'content'
  },
  {
    type: 'action',
    title: 'Content Distribution',
    description: 'Automatically distribute content across platforms',
    icon: '📡',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'content'
  },

  // PR Bot Ecosystem Nodes
  {
    type: 'trigger',
    title: 'PR Campaign Request',
    description: 'Human-initiated press release campaign trigger',
    icon: '📢',
    color: 'from-red-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'trigger',
    title: 'Weekly PR Schedule',
    description: 'Automated weekly press release generation trigger',
    icon: '📅',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'trigger',
    title: 'Breaking News Alert',
    description: 'Triggers when industry breaking news is detected',
    icon: '🚨',
    color: 'from-orange-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'action',
    title: 'Research Data Aggregator',
    description: 'Collect and analyze data from scraper bots',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'action',
    title: 'Press Release Writer',
    description: 'Generate professional press releases with AP style',
    icon: '📰',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'action',
    title: 'Newsworthy Angle Finder',
    description: 'Identify compelling angles and hooks for stories',
    icon: '🎯',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'condition',
    title: 'Editorial Standards Check',
    description: 'Verify press release meets journalism standards',
    icon: '✅',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'pr'
  },
  {
    type: 'action',
    title: 'Media List Builder',
    description: 'Curate targeted media contacts and outlets',
    icon: '📋',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'action',
    title: 'News Feed Distributor',
    description: 'Distribute to news sources and RSS feeds',
    icon: '📡',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'action',
    title: 'Blog Network Publisher',
    description: 'Publish to network of blogs and publications',
    icon: '📝',
    color: 'from-emerald-500 to-green-600',
    inputs: 1,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'action',
    title: 'Timed Release Scheduler',
    description: 'Schedule strategic release timing for maximum impact',
    icon: '⏰',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'action',
    title: 'Media Monitoring',
    description: 'Track press release pickup and media coverage',
    icon: '📊',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'action',
    title: 'Follow-up Campaign',
    description: 'Automated follow-up with journalists and editors',
    icon: '📞',
    color: 'from-blue-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'pr'
  },
  {
    type: 'condition',
    title: 'Newsworthiness Filter',
    description: 'Assess if content meets newsworthiness criteria',
    icon: '🎖️',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'pr'
  },

  // Lead Generation & CRM Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Market Trend Alert',
    description: 'Triggers when new market trends are detected',
    icon: '📈',
    color: 'from-blue-500 to-cyan-600',
    inputs: 0,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'trigger',
    title: 'Social Engagement Spike',
    description: 'Triggers when social media engagement increases',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'MarketScoutBot',
    description: 'Analyzes market trends and target audience insights',
    icon: '🔍',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 2,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'LeadGenBot',
    description: 'Identifies and qualifies leads from multiple sources',
    icon: '🎯',
    color: 'from-green-500 to-emerald-600',
    inputs: 2,
    outputs: 2,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'SocialBot Monitor',
    description: 'Monitors social media for lead opportunities',
    icon: '📱',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'condition',
    title: 'Lead Qualification Engine',
    description: 'Applies predefined criteria to qualify leads',
    icon: '⚖️',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 3,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'CRMBot Integration',
    description: 'Manages customer relationships and lead tracking',
    icon: '📊',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Competitor Intelligence',
    description: 'Monitors competitor activities and strategies',
    icon: '🕵️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Industry News Scanner',
    description: 'Scans industry news for lead opportunities',
    icon: '📰',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Demographic Analyzer',
    description: 'Analyzes demographic data for targeting',
    icon: '👥',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Sales Team Notifier',
    description: 'Alerts sales team of high-quality leads',
    icon: '🚨',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Marketing Campaign Optimizer',
    description: 'Optimizes campaigns based on lead performance',
    icon: '🎪',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'condition',
    title: 'Performance Analytics',
    description: 'Analyzes bot performance and suggests improvements',
    icon: '📈',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Bot-to-Bot Coordinator',
    description: 'Manages data flow between ecosystem bots',
    icon: '🤖',
    color: 'from-indigo-500 to-blue-600',
    inputs: 3,
    outputs: 3,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'CRMBot Core',
    description: 'Advanced customer relationship management system',
    icon: '🏢',
    color: 'from-blue-500 to-indigo-600',
    inputs: 2,
    outputs: 3,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Customer Profile Builder',
    description: 'Creates and updates detailed customer profiles',
    icon: '👤',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Sales Pipeline Tracker',
    description: 'Tracks and manages sales stages and opportunities',
    icon: '📈',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 2,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Communication Logger',
    description: 'Logs all customer interactions and communication history',
    icon: '📝',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Sales Report Generator',
    description: 'Generates comprehensive sales reports and forecasts',
    icon: '📊',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'CommsBot Engine',
    description: 'Multi-channel personalized communication automation',
    icon: '💬',
    color: 'from-pink-500 to-rose-600',
    inputs: 2,
    outputs: 2,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Email Campaign Manager',
    description: 'Schedules and sends personalized email campaigns',
    icon: '📧',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'SMS Automation',
    description: 'Automated SMS messaging with personalization',
    icon: '📱',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'In-App Notification System',
    description: 'Manages in-app notifications and alerts',
    icon: '🔔',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'condition',
    title: 'Customer Segmentation Engine',
    description: 'Segments customers based on behavior and data',
    icon: '🎯',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 3,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Message Personalization',
    description: 'Personalizes messages based on customer history',
    icon: '✨',
    color: 'from-pink-500 to-purple-600',
    inputs: 2,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'condition',
    title: 'Response Router',
    description: 'Routes complex queries to appropriate agents',
    icon: '🔀',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 2,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'SentimentBot Feedback',
    description: 'Analyzes customer sentiment and provides feedback',
    icon: '😊',
    color: 'from-emerald-500 to-green-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'FinTechBot Integration',
    description: 'Shares sales data with financial systems',
    icon: '💰',
    color: 'from-yellow-500 to-amber-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },
  {
    type: 'action',
    title: 'Performance Metrics Dashboard',
    description: 'Tracks open rates, CTR, and engagement metrics',
    icon: '📈',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'leadgen'
  },

  // Social Intelligence & Sentiment Analysis Nodes
  {
    type: 'trigger',
    title: 'Social Media Mention Alert',
    description: 'Triggers when brand mentions are detected across platforms',
    icon: '🔔',
    color: 'from-blue-500 to-cyan-600',
    inputs: 0,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'trigger',
    title: 'Trending Topic Detection',
    description: 'Triggers when trending topics relevant to brand are found',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'trigger',
    title: 'Engagement Spike Alert',
    description: 'Triggers when social engagement suddenly increases',
    icon: '📈',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'SocialBot Core',
    description: 'Central social media management and automation system',
    icon: '📱',
    color: 'from-purple-500 to-pink-600',
    inputs: 2,
    outputs: 3,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Multi-Platform Publisher',
    description: 'Schedules and publishes content across all social platforms',
    icon: '📡',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Engagement Monitor',
    description: 'Tracks likes, shares, comments, and mentions in real-time',
    icon: '👀',
    color: 'from-cyan-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Trend Analyzer',
    description: 'Identifies trending topics and viral content opportunities',
    icon: '🎯',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Social Lead Identifier',
    description: 'Identifies potential leads from social media engagement',
    icon: '🔍',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'SentimentBot Core',
    description: 'Advanced sentiment analysis across all data sources',
    icon: '🧠',
    color: 'from-purple-500 to-indigo-600',
    inputs: 3,
    outputs: 2,
    category: 'social'
  },
  {
    type: 'action',
    title: 'NLP Sentiment Processor',
    description: 'Natural language processing for sentiment categorization',
    icon: '🤖',
    color: 'from-blue-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'condition',
    title: 'Sentiment Classification',
    description: 'Categorizes sentiment as positive, negative, or neutral',
    icon: '😊',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 3,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Theme Extractor',
    description: 'Identifies key themes and topics from sentiment data',
    icon: '🔖',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Social Mention Aggregator',
    description: 'Collects and processes social media mentions',
    icon: '📊',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Review Sentiment Analyzer',
    description: 'Analyzes product reviews and customer feedback',
    icon: '⭐',
    color: 'from-yellow-500 to-amber-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Support Ticket Analyzer',
    description: 'Analyzes sentiment from customer support interactions',
    icon: '🎫',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Brand Reputation Monitor',
    description: 'Monitors overall brand reputation and sentiment trends',
    icon: '🛡️',
    color: 'from-emerald-500 to-green-600',
    inputs: 1,
    outputs: 2,
    category: 'social'
  },
  {
    type: 'condition',
    title: 'Crisis Detection Alert',
    description: 'Detects potential PR crises from sentiment patterns',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Automated Response System',
    description: 'Generates appropriate responses to social interactions',
    icon: '💬',
    color: 'from-blue-500 to-cyan-600',
    inputs: 2,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Influencer Identification',
    description: 'Identifies key influencers and brand advocates',
    icon: '⭐',
    color: 'from-pink-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Competitive Intelligence',
    description: 'Monitors competitor social presence and sentiment',
    icon: '🕵️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Social Analytics Dashboard',
    description: 'Comprehensive social media performance analytics',
    icon: '📈',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Reputation Management Bot',
    description: 'Monitors and manages brand reputation across all review platforms',
    icon: '🛡️',
    color: 'from-emerald-500 to-green-600',
    inputs: 1,
    outputs: 3,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Multi-Platform Review Monitor',
    description: 'Monitors Yelp, Angie\'s List, BBB, Google Maps, Amazon reviews',
    icon: '👁️',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 2,
    category: 'social'
  },
  {
    type: 'condition',
    title: 'Review Sentiment Classifier',
    description: 'Classifies reviews as positive testimonials or negative grievances',
    icon: '⚖️',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Testimonial Harvester',
    description: 'Collects positive reviews for testimonials and ad copy',
    icon: '⭐',
    color: 'from-gold-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Grievance Alert System',
    description: 'Immediately alerts team of negative reviews and complaints',
    icon: '🚨',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Customer Recovery Outreach',
    description: 'Initiates first contact with dissatisfied customers',
    icon: '🤝',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Yelp Monitor & Response',
    description: 'Specialized Yelp review monitoring and response system',
    icon: '🍽️',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Google Maps Review Tracker',
    description: 'Monitors and manages Google Maps business reviews',
    icon: '🗺️',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'BBB Complaint Monitor',
    description: 'Monitors Better Business Bureau complaints and ratings',
    icon: '🏛️',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Amazon Review Analyzer',
    description: 'Monitors Amazon product reviews and seller feedback',
    icon: '📦',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Angie\'s List Tracker',
    description: 'Monitors Angie\'s List reviews and service ratings',
    icon: '🔧',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Review Response Generator',
    description: 'Generates appropriate responses to reviews and complaints',
    icon: '💬',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'action',
    title: 'Reputation Score Calculator',
    description: 'Calculates overall reputation score across all platforms',
    icon: '📊',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'social'
  },
  {
    type: 'condition',
    title: 'Recovery Success Tracker',
    description: 'Tracks success rate of customer recovery efforts',
    icon: '📈',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'social'
  },

  // Product Development & Innovation Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Market Gap Discovery',
    description: 'Triggers when new market opportunities are identified',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-600',
    inputs: 0,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'trigger',
    title: 'Customer Pain Point Alert',
    description: 'Triggers when unmet customer needs are detected',
    icon: '💡',
    color: 'from-orange-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'trigger',
    title: 'Competitive Feature Release',
    description: 'Triggers when competitors launch new features',
    icon: '🏁',
    color: 'from-purple-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'IdeaGenBot Core',
    description: 'AI-powered product idea generation and innovation engine',
    icon: '💡',
    color: 'from-yellow-500 to-orange-600',
    inputs: 3,
    outputs: 2,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Market Trend Analyzer',
    description: 'Analyzes market trends for product opportunities',
    icon: '📈',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Customer Feedback Synthesizer',
    description: 'Synthesizes customer feedback into actionable insights',
    icon: '🎯',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Innovation Concept Generator',
    description: 'Generates novel product concepts and solutions',
    icon: '🚀',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'DesignBot Core',
    description: 'AI-powered product design and UI/UX creation system',
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 2,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Mockup Generator',
    description: 'Creates visual mockups and wireframes automatically',
    icon: '📐',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'UI/UX Element Creator',
    description: 'Generates UI components and UX interaction flows',
    icon: '🖼️',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Design System Manager',
    description: 'Maintains consistent design systems and style guides',
    icon: '🎭',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'PrototypeBot Core',
    description: 'Creates functional prototypes for testing and validation',
    icon: '🔧',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Interactive Prototype Builder',
    description: 'Assembles interactive prototypes with user flows',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'User Flow Simulator',
    description: 'Simulates user interactions and experience flows',
    icon: '🔄',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'DevOpsBot Core',
    description: 'Complete development operations and deployment automation',
    icon: '⚙️',
    color: 'from-gray-500 to-slate-600',
    inputs: 2,
    outputs: 3,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Code Deployment Pipeline',
    description: 'Automates code compilation, testing, and deployment',
    icon: '🚀',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Infrastructure Provisioning',
    description: 'Automatically provisions and manages infrastructure',
    icon: '🏗️',
    color: 'from-emerald-500 to-green-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Performance Monitor',
    description: 'Monitors application performance and system health',
    icon: '📊',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 2,
    category: 'product'
  },
  {
    type: 'action',
    title: 'TestBot Core',
    description: 'Comprehensive automated testing and quality assurance',
    icon: '🧪',
    color: 'from-green-500 to-emerald-600',
    inputs: 2,
    outputs: 2,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Automated Test Suite',
    description: 'Runs unit, integration, and regression tests',
    icon: '🔬',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'Bug Detection & Reporting',
    description: 'Identifies defects and generates detailed test reports',
    icon: '🐛',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'User Acceptance Testing',
    description: 'Facilitates UAT and collects user feedback',
    icon: '👥',
    color: 'from-yellow-500 to-amber-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'DocumentationBot Core',
    description: 'Automated documentation generation and maintenance',
    icon: '📚',
    color: 'from-indigo-500 to-purple-600',
    inputs: 2,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'API Documentation Generator',
    description: 'Automatically generates API references and guides',
    icon: '📖',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'action',
    title: 'User Manual Creator',
    description: 'Creates comprehensive user manuals and guides',
    icon: '📋',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },
  {
    type: 'condition',
    title: 'Feasibility Assessment',
    description: 'Evaluates technical and business feasibility of ideas',
    icon: '⚖️',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'product'
  },
  {
    type: 'condition',
    title: 'Quality Gate Checker',
    description: 'Ensures products meet quality standards before release',
    icon: '✅',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 2,
    category: 'product'
  },
  {
    type: 'action',
    title: 'GateKeeperBot Integration',
    description: 'Code review and version control management',
    icon: '🛡️',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'product'
  },

  // Supply Chain & Operations Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Low Stock Alert',
    description: 'Triggers when inventory levels reach reorder points',
    icon: '📦',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'trigger',
    title: 'Demand Surge Detection',
    description: 'Triggers when market demand suddenly increases',
    icon: '📈',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'trigger',
    title: 'Equipment Failure Warning',
    description: 'Triggers when machinery shows signs of potential failure',
    icon: '⚠️',
    color: 'from-yellow-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'InventoryBot Core',
    description: 'Advanced inventory management and demand forecasting system',
    icon: '📊',
    color: 'from-blue-500 to-indigo-600',
    inputs: 2,
    outputs: 2,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Real-Time Stock Monitor',
    description: 'Tracks inventory levels across all locations in real-time',
    icon: '👁️',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Demand Forecasting Engine',
    description: 'Predicts future demand using AI and historical data',
    icon: '🔮',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'condition',
    title: 'Reorder Point Calculator',
    description: 'Determines optimal reorder points and quantities',
    icon: '⚖️',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'ProcurementBot Core',
    description: 'Automated purchasing and supplier management system',
    icon: '🛒',
    color: 'from-green-500 to-emerald-600',
    inputs: 2,
    outputs: 2,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Supplier Selection Engine',
    description: 'Identifies optimal suppliers based on cost, quality, delivery',
    icon: '🏭',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Purchase Order Generator',
    description: 'Automatically generates and sends purchase orders',
    icon: '📋',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Order Tracking System',
    description: 'Tracks purchase orders and supplier confirmations',
    icon: '📍',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'LogisticsBot Core',
    description: 'Advanced shipping, routing, and warehouse management',
    icon: '🚚',
    color: 'from-blue-500 to-cyan-600',
    inputs: 2,
    outputs: 3,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Route Optimization Engine',
    description: 'Calculates most efficient delivery routes and schedules',
    icon: '🗺️',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Shipment Tracker',
    description: 'Real-time tracking of all shipments and deliveries',
    icon: '📦',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Warehouse Management',
    description: 'Optimizes warehouse operations and stock placement',
    icon: '🏬',
    color: 'from-yellow-500 to-amber-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'QualityAssuranceBot Core',
    description: 'Comprehensive quality monitoring and defect detection',
    icon: '🔍',
    color: 'from-red-500 to-pink-600',
    inputs: 2,
    outputs: 2,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Quality Control Monitor',
    description: 'Monitors product quality throughout manufacturing',
    icon: '✅',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Defect Detection System',
    description: 'Identifies anomalies and quality issues automatically',
    icon: '🚨',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 2,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Corrective Action Engine',
    description: 'Suggests and implements quality improvement measures',
    icon: '🔧',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'MaintenanceBot Core',
    description: 'Predictive maintenance and equipment management system',
    icon: '⚙️',
    color: 'from-gray-500 to-slate-600',
    inputs: 2,
    outputs: 2,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Predictive Analytics Engine',
    description: 'Predicts equipment failures before they occur',
    icon: '🔮',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Maintenance Scheduler',
    description: 'Schedules preventive maintenance tasks automatically',
    icon: '📅',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Equipment Performance Monitor',
    description: 'Monitors machinery performance metrics in real-time',
    icon: '📊',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'FleetBot Core',
    description: 'Complete vehicle fleet management and optimization',
    icon: '🚛',
    color: 'from-indigo-500 to-blue-600',
    inputs: 2,
    outputs: 2,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Vehicle Tracking System',
    description: 'Real-time GPS tracking of all fleet vehicles',
    icon: '📍',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Fuel Optimization Engine',
    description: 'Optimizes routes and driving patterns for fuel efficiency',
    icon: '⛽',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Fleet Maintenance Scheduler',
    description: 'Schedules vehicle maintenance based on usage and diagnostics',
    icon: '🔧',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'VendorBot Integration',
    description: 'Manages supplier relationships and vendor information',
    icon: '🤝',
    color: 'from-emerald-500 to-green-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'IoTBot Sensor Network',
    description: 'Collects data from IoT sensors across operations',
    icon: '📡',
    color: 'from-cyan-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'operations'
  },
  {
    type: 'condition',
    title: 'Cost-Benefit Analyzer',
    description: 'Analyzes cost-effectiveness of operational decisions',
    icon: '💰',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 2,
    category: 'operations'
  },
  {
    type: 'action',
    title: 'Compliance Monitor',
    description: 'Ensures operations comply with regulations and standards',
    icon: '⚖️',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'operations'
  },

  // Financial & Accounting Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Transaction Alert',
    description: 'Triggers when new financial transactions are detected',
    icon: '💰',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'trigger',
    title: 'Budget Threshold Alert',
    description: 'Triggers when spending approaches or exceeds budget limits',
    icon: '⚠️',
    color: 'from-yellow-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'trigger',
    title: 'Tax Deadline Reminder',
    description: 'Triggers when tax filing deadlines approach',
    icon: '📅',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'FinTechBot Core',
    description: 'Complete financial management and accounting automation',
    icon: '🏦',
    color: 'from-blue-500 to-indigo-600',
    inputs: 4,
    outputs: 3,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'General Ledger Manager',
    description: 'Manages all financial transactions and account balances',
    icon: '📊',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'Accounts Payable/Receivable',
    description: 'Automates invoice processing and payment management',
    icon: '💳',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'Financial Report Generator',
    description: 'Generates income statements, balance sheets, cash flow reports',
    icon: '📈',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'BudgetBot Core',
    description: 'Advanced budgeting and expenditure tracking system',
    icon: '💼',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 2,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'Budget Creation Engine',
    description: 'Creates departmental and project budgets automatically',
    icon: '📋',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'Spending Monitor',
    description: 'Real-time monitoring of expenditures against budgets',
    icon: '👁️',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'finance'
  },
  {
    type: 'condition',
    title: 'Budget Variance Analyzer',
    description: 'Analyzes spending variances and flags anomalies',
    icon: '⚖️',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'AuditBot Core',
    description: 'Automated internal auditing and compliance monitoring',
    icon: '🔍',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 2,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'Fraud Detection Engine',
    description: 'Identifies suspicious transactions and potential fraud',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'Compliance Checker',
    description: 'Ensures financial compliance with regulations',
    icon: '✅',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'TaxBot Core',
    description: 'Comprehensive tax calculation and filing automation',
    icon: '🧾',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 2,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'Tax Calculator',
    description: 'Calculates income, sales, payroll, and other taxes',
    icon: '🧮',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'Tax Filing System',
    description: 'Prepares and files tax returns electronically',
    icon: '📤',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'EmployeeExpenseBot Core',
    description: 'Automated expense reporting and reimbursement system',
    icon: '💸',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'Receipt Processing Engine',
    description: 'Processes and categorizes expense receipts automatically',
    icon: '📄',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },
  {
    type: 'condition',
    title: 'Expense Policy Enforcer',
    description: 'Enforces company expense policies and approval workflows',
    icon: '🛡️',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 2,
    category: 'finance'
  },
  {
    type: 'action',
    title: 'AdminAssistant Integration',
    description: 'Provides financial reports to top-level administration',
    icon: '👔',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'finance'
  },

  // Customer Support & Engagement Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Customer Inquiry',
    description: 'Triggers when customers submit support requests',
    icon: '❓',
    color: 'from-blue-500 to-cyan-600',
    inputs: 0,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'trigger',
    title: 'Escalation Alert',
    description: 'Triggers when support issues require human intervention',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'trigger',
    title: 'Feedback Request',
    description: 'Triggers automated customer feedback collection',
    icon: '📝',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'SupportBot Core',
    description: 'Multi-channel customer support automation system',
    icon: '🎧',
    color: 'from-purple-500 to-pink-600',
    inputs: 2,
    outputs: 4,
    category: 'support'
  },
  {
    type: 'action',
    title: 'Natural Language Processor',
    description: 'Understands and interprets customer queries intelligently',
    icon: '🧠',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'Multi-Channel Interface',
    description: 'Handles chat, email, phone IVR, and social media support',
    icon: '📱',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'Personalized Assistant',
    description: 'Provides personalized support based on customer history',
    icon: '👤',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'KnowledgeBot Core',
    description: 'Comprehensive knowledge base management system',
    icon: '📚',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'Content Indexer',
    description: 'Organizes and indexes support articles and FAQs',
    icon: '🗂️',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'Smart Search Engine',
    description: 'Provides instant access to relevant support information',
    icon: '🔍',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'TicketingBot Core',
    description: 'Advanced support ticket management and routing system',
    icon: '🎫',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'support'
  },
  {
    type: 'action',
    title: 'Intelligent Ticket Router',
    description: 'Routes tickets to appropriate agents based on skills',
    icon: '🔀',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'SLA Monitor',
    description: 'Monitors response times and service level agreements',
    icon: '⏱️',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'FeedbackBot Core',
    description: 'Automated customer feedback collection and analysis',
    icon: '📊',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 2,
    category: 'support'
  },
  {
    type: 'action',
    title: 'Survey Designer',
    description: 'Creates and distributes customer satisfaction surveys',
    icon: '📋',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'action',
    title: 'Feedback Analyzer',
    description: 'Analyzes customer feedback for insights and trends',
    icon: '📈',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'support'
  },
  {
    type: 'condition',
    title: 'Escalation Decision Engine',
    description: 'Determines when issues need human agent intervention',
    icon: '⚖️',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 2,
    category: 'support'
  },

  // Security & Compliance Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Security Breach Alert',
    description: 'Triggers when potential security threats are detected',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'trigger',
    title: 'Unauthorized Access Attempt',
    description: 'Triggers when suspicious login attempts are detected',
    icon: '🔒',
    color: 'from-yellow-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'trigger',
    title: 'Day-Zero Threat Detection',
    description: 'Triggers when unknown threats and anomalies are identified',
    icon: '⚡',
    color: 'from-purple-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'trigger',
    title: 'Compliance Audit Schedule',
    description: 'Triggers scheduled compliance audits and reviews',
    icon: '📅',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'GateKeeperBot Core',
    description: 'Advanced access control and identity management system',
    icon: '🛡️',
    color: 'from-blue-500 to-indigo-600',
    inputs: 3,
    outputs: 3,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Identity Verification Engine',
    description: 'Multi-factor authentication and identity verification',
    icon: '🔐',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Access Control Manager',
    description: 'Role-based access control and permission management',
    icon: '🗝️',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Security Policy Enforcer',
    description: 'Enforces organizational security policies and standards',
    icon: '⚖️',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Anomaly Detection Engine',
    description: 'AI-powered detection of unusual behavior and threats',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Threat Intelligence Hub',
    description: 'Collects and analyzes global threat intelligence data',
    icon: '🌐',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Zero-Day Protection',
    description: 'Advanced protection against unknown and emerging threats',
    icon: '🛡️',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Security Incident Response',
    description: 'Automated incident response and threat containment',
    icon: '🚑',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'ComplianceBot Core',
    description: 'Comprehensive regulatory compliance management system',
    icon: '📋',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Regulatory Framework Monitor',
    description: 'Monitors changes in regulatory requirements and standards',
    icon: '📊',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Compliance Assessment Engine',
    description: 'Automated compliance assessments and gap analysis',
    icon: '✅',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Data Privacy Controller',
    description: 'Ensures GDPR, CCPA, and other data privacy compliance',
    icon: '🔒',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Security Audit Logger',
    description: 'Comprehensive logging of all security events and access',
    icon: '📝',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Vulnerability Scanner',
    description: 'Continuous scanning for system vulnerabilities and weaknesses',
    icon: '🔎',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Penetration Testing Bot',
    description: 'Automated penetration testing and security assessments',
    icon: '⚔️',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Encryption Manager',
    description: 'Manages encryption keys and data protection protocols',
    icon: '🔐',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'condition',
    title: 'Risk Assessment Engine',
    description: 'Evaluates and prioritizes security risks and threats',
    icon: '⚠️',
    color: 'from-yellow-500 to-red-600',
    inputs: 1,
    outputs: 3,
    category: 'security'
  },
  {
    type: 'condition',
    title: 'Threat Level Classifier',
    description: 'Classifies threats by severity and required response',
    icon: '🎯',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 3,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Security Training Bot',
    description: 'Automated security awareness training and phishing tests',
    icon: '🎓',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Backup & Recovery Manager',
    description: 'Automated backup and disaster recovery management',
    icon: '💾',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Network Security Monitor',
    description: 'Real-time network traffic analysis and intrusion detection',
    icon: '🌐',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Endpoint Protection Manager',
    description: 'Comprehensive endpoint security and device management',
    icon: '💻',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'SOAR Orchestration Engine',
    description: 'Security Orchestration, Automation, and Response governing system',
    icon: '🎭',
    color: 'from-purple-500 to-indigo-600',
    inputs: 4,
    outputs: 5,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Threat Response Coordinator',
    description: 'Coordinates automated responses across all security systems',
    icon: '🎯',
    color: 'from-red-500 to-pink-600',
    inputs: 2,
    outputs: 3,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Security Playbook Engine',
    description: 'Executes predefined security response playbooks automatically',
    icon: '📖',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Forced Encapsulation System',
    description: 'Isolates threats and compromised systems automatically',
    icon: '🔒',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'condition',
    title: 'Secondary Threat Assessment',
    description: 'Advanced threat analysis after initial containment',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 3,
    category: 'security'
  },
  {
    type: 'action',
    title: 'System Defenders High Alert',
    description: 'Activates maximum security posture and defense systems',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Fallback Defense Protocol',
    description: 'Secondary defense system for wave-based attack scenarios',
    icon: '🛡️',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Wave Attack Detector',
    description: 'Identifies coordinated multi-wave attack patterns',
    icon: '🌊',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Adaptive Defense Matrix',
    description: 'Dynamically adjusts defenses based on attack patterns',
    icon: '🔄',
    color: 'from-green-500 to-teal-600',
    inputs: 2,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Security Orchestration Hub',
    description: 'Central command for all security automation and response',
    icon: '🎛️',
    color: 'from-gray-500 to-slate-600',
    inputs: 3,
    outputs: 4,
    category: 'security'
  },
  {
    type: 'condition',
    title: 'Attack Vector Analyzer',
    description: 'Analyzes multiple attack vectors and coordination patterns',
    icon: '🎯',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 4,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Automated Countermeasures',
    description: 'Deploys targeted countermeasures against specific threats',
    icon: '⚔️',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Threat Intelligence Fusion',
    description: 'Fuses multiple threat intelligence sources for comprehensive analysis',
    icon: '🧠',
    color: 'from-purple-500 to-indigo-600',
    inputs: 3,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Security Metrics Aggregator',
    description: 'Aggregates security metrics across all defense systems',
    icon: '📊',
    color: 'from-cyan-500 to-blue-600',
    inputs: 2,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'condition',
    title: 'Defense Escalation Engine',
    description: 'Determines appropriate escalation levels for threats',
    icon: '📈',
    color: 'from-yellow-500 to-red-600',
    inputs: 1,
    outputs: 3,
    category: 'security'
  },
  {
    type: 'action',
    title: 'SecurityIncidentBot Core',
    description: 'Complete security incident management and response system',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 2,
    outputs: 3,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Incident Triage Engine',
    description: 'Automatically triages and prioritizes security incidents',
    icon: '🎯',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Response Protocol Activator',
    description: 'Activates appropriate incident response protocols',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'System Isolation Controller',
    description: 'Isolates affected systems to prevent threat spread',
    icon: '🔒',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Remediation Coordinator',
    description: 'Coordinates remediation efforts across all systems',
    icon: '🔧',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'SilentSentryBot Integration',
    description: 'Advanced threat detection and monitoring system integration',
    icon: '👁️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Enhanced ComplianceBot Core',
    description: 'Advanced regulatory compliance and legal adherence system',
    icon: '⚖️',
    color: 'from-blue-500 to-cyan-600',
    inputs: 3,
    outputs: 3,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Regulatory Change Monitor',
    description: 'Monitors changes in legal and industry regulations',
    icon: '📊',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Impact Assessment Engine',
    description: 'Assesses regulatory impact on business operations',
    icon: '🎯',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Policy Update Manager',
    description: 'Updates internal policies based on regulatory changes',
    icon: '📋',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Compliance Report Generator',
    description: 'Generates comprehensive compliance and audit reports',
    icon: '📈',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'DataPrivacyBot Core',
    description: 'Comprehensive data privacy and protection management',
    icon: '🔐',
    color: 'from-teal-500 to-cyan-600',
    inputs: 2,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Data Access Request Handler',
    description: 'Processes customer data access and deletion requests',
    icon: '📋',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Right to be Forgotten Engine',
    description: 'Handles data deletion requests and ensures compliance',
    icon: '🗑️',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Data Anonymization Engine',
    description: 'Automatically anonymizes and protects sensitive data',
    icon: '🎭',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Sensitive Data Identifier',
    description: 'Identifies and classifies sensitive data across systems',
    icon: '🔍',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Data Retention Policy Manager',
    description: 'Manages data retention policies and automated deletion',
    icon: '📅',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'action',
    title: 'External Regulatory Database',
    description: 'Integrates with external regulatory and compliance databases',
    icon: '🌐',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },
  {
    type: 'condition',
    title: 'Breach Notification Engine',
    description: 'Determines breach notification requirements and timelines',
    icon: '📢',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'security'
  },
  {
    type: 'action',
    title: 'Incident Response Team Coordinator',
    description: 'Coordinates human incident response teams and protocols',
    icon: '👥',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'security'
  },

  // Customer Intelligence & Profiling Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Customer Behavior Change',
    description: 'Triggers when significant customer behavior patterns change',
    icon: '📊',
    color: 'from-blue-500 to-cyan-600',
    inputs: 0,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'trigger',
    title: 'New Data Source Available',
    description: 'Triggers when new customer data sources become available',
    icon: '📈',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'trigger',
    title: 'Profile Update Request',
    description: 'Triggers scheduled customer profile updates and analysis',
    icon: '🔄',
    color: 'from-purple-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Customer Profiler Bot Core',
    description: 'Advanced customer intelligence and profiling system',
    icon: '🎯',
    color: 'from-indigo-500 to-purple-600',
    inputs: 5,
    outputs: 4,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Multi-Source Data Aggregator',
    description: 'Aggregates customer data from all business touchpoints',
    icon: '🔗',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Ideal Customer Identifier',
    description: 'Identifies key features and characteristics of ideal customers',
    icon: '⭐',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Customer Appeal Analyzer',
    description: 'Analyzes what appeals most to different customer segments',
    icon: '💡',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Pain Point Detector',
    description: 'Identifies customer pain points and frustration areas',
    icon: '🎯',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Content Angle Strategist',
    description: 'Provides content team with targeted messaging angles',
    icon: '📝',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 2,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Behavioral Pattern Analyzer',
    description: 'Analyzes customer behavior patterns and trends',
    icon: '🔍',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Demographic Intelligence Engine',
    description: 'Processes demographic data for customer segmentation',
    icon: '👥',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Psychographic Profiler',
    description: 'Analyzes customer psychology, values, and motivations',
    icon: '🧠',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Purchase Journey Mapper',
    description: 'Maps complete customer purchase journeys and touchpoints',
    icon: '🗺️',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Engagement Preference Analyzer',
    description: 'Identifies preferred communication channels and timing',
    icon: '📱',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Competitive Analysis Engine',
    description: 'Analyzes customer preferences vs competitor offerings',
    icon: '⚔️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Customer Lifetime Value Predictor',
    description: 'Predicts customer lifetime value and potential',
    icon: '💰',
    color: 'from-yellow-500 to-amber-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'condition',
    title: 'Customer Segment Classifier',
    description: 'Classifies customers into distinct behavioral segments',
    icon: '🎭',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 4,
    category: 'profiler'
  },
  {
    type: 'condition',
    title: 'Lead Quality Scorer',
    description: 'Scores lead quality based on ideal customer profiles',
    icon: '⭐',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 3,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Persona Generator',
    description: 'Creates detailed customer personas from aggregated data',
    icon: '👤',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Content Strategy Optimizer',
    description: 'Optimizes content strategy based on customer insights',
    icon: '🎯',
    color: 'from-orange-500 to-yellow-600',
    inputs: 2,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Messaging Resonance Tester',
    description: 'Tests which messages resonate most with target segments',
    icon: '📢',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Customer Feedback Synthesizer',
    description: 'Synthesizes feedback from all customer touchpoints',
    icon: '🔄',
    color: 'from-teal-500 to-green-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Trend Prediction Engine',
    description: 'Predicts future customer behavior and market trends',
    icon: '🔮',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Attribution Model Builder',
    description: 'Builds attribution models for customer conversion paths',
    icon: '🔗',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },
  {
    type: 'action',
    title: 'Real-Time Profile Updater',
    description: 'Updates customer profiles in real-time as new data arrives',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'profiler'
  },

  // Admin Hub & Executive Command Center Nodes
  {
    type: 'trigger',
    title: 'Executive Login',
    description: 'Triggers comprehensive briefing upon executive login',
    icon: '👔',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'trigger',
    title: 'Urgent Alert',
    description: 'Triggers immediate notification for critical issues',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'trigger',
    title: 'Report Request',
    description: 'Triggers on-demand report generation requests',
    icon: '📊',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'AdminAssistant Core (Top Admin)',
    description: 'Ultimate executive assistant with full company oversight',
    icon: '👑',
    color: 'from-purple-500 to-pink-600',
    inputs: 8,
    outputs: 6,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Personal Assistant Engine',
    description: 'Advanced personal assistant with email, scheduling, and communication',
    icon: '🤖',
    color: 'from-cyan-500 to-blue-600',
    inputs: 3,
    outputs: 4,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Email Intelligence System',
    description: 'Reads, summarizes, and prioritizes all email communications',
    icon: '📧',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 2,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Login Briefing Generator',
    description: 'Generates comprehensive briefings for executive login',
    icon: '📋',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Transcription & Translation Hub',
    description: 'Text-to-speech, speech-to-text, and multi-language translation',
    icon: '🗣️',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Document Summarizer',
    description: 'Summarizes documents, reports, web copy, videos, and books',
    icon: '📄',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Workflow Upload & Router',
    description: 'Organizes and routes uploads to appropriate workflows',
    icon: '📤',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 2,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Dictation Assistant',
    description: 'Advanced dictation and voice command processing',
    icon: '🎤',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Company Valuation Snapshot',
    description: 'Real-time company valuation and financial health reports',
    icon: '💎',
    color: 'from-yellow-500 to-amber-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Executive Dashboard Generator',
    description: 'Creates comprehensive executive dashboards on demand',
    icon: '📊',
    color: 'from-indigo-500 to-blue-600',
    inputs: 4,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Market Analysis Reporter',
    description: 'Generates comprehensive market analysis reports on demand',
    icon: '📈',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Systems Health Diagnostics',
    description: 'Complete system health monitoring and diagnostic reports',
    icon: '⚕️',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Company-Wide Issue Monitor',
    description: 'Monitors and reports issues across all departments',
    icon: '🔍',
    color: 'from-orange-500 to-red-600',
    inputs: 5,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'PR Monitor & Reputation Tracker',
    description: 'Monitors PR activities and reputation metrics',
    icon: '📺',
    color: 'from-purple-500 to-pink-600',
    inputs: 2,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Changelog Reporter',
    description: 'Tracks and reports all system changes and updates',
    icon: '📝',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Reputation Thermostat',
    description: 'Real-time reputation temperature and trend monitoring',
    icon: '🌡️',
    color: 'from-yellow-500 to-orange-600',
    inputs: 2,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Utilities & Events Reporter',
    description: 'Scheduling, webinar events, opt-ins, attendance, and conversions',
    icon: '📅',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Intelligence Aggregator',
    description: 'Aggregates news, competitor intel, market gaps, and BI reports',
    icon: '🧠',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Social Engagement Monitor',
    description: 'Monitors social media engagement and reputation logs',
    icon: '📱',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Department Head Assistant',
    description: 'Filtered reports and assistance for department heads',
    icon: '👨‍💼',
    color: 'from-blue-500 to-indigo-600',
    inputs: 3,
    outputs: 2,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Project Management Assistant',
    description: 'Project tracking and workflow logs for PM leads',
    icon: '📋',
    color: 'from-teal-500 to-cyan-600',
    inputs: 2,
    outputs: 2,
    category: 'admin'
  },
  {
    type: 'condition',
    title: 'Priority Filter Engine',
    description: 'Filters and prioritizes information by role and urgency',
    icon: '⚖️',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 3,
    category: 'admin'
  },
  {
    type: 'condition',
    title: 'Access Level Controller',
    description: 'Controls information access based on user role and clearance',
    icon: '🔐',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 3,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Executive Command Center',
    description: 'Central command hub for all executive operations',
    icon: '🎛️',
    color: 'from-gray-500 to-slate-600',
    inputs: 6,
    outputs: 4,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Real-Time Alert System',
    description: 'Immediate alerts for critical business events',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'admin'
  },
  {
    type: 'action',
    title: 'Multi-Bot Coordinator',
    description: 'Coordinates data and reports from all ecosystem bots',
    icon: '🤖',
    color: 'from-purple-500 to-indigo-600',
    inputs: 8,
    outputs: 1,
    category: 'admin'
  },

  // IT Support & System Management Ecosystem Nodes
  {
    type: 'trigger',
    title: 'System Failure Alert',
    description: 'Triggers when critical system failures are detected',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'trigger',
    title: 'Performance Degradation',
    description: 'Triggers when system performance drops below thresholds',
    icon: '📉',
    color: 'from-yellow-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'trigger',
    title: 'Scheduled System Scan',
    description: 'Triggers routine system health scans and diagnostics',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-600',
    inputs: 0,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'trigger',
    title: 'Emergency Support Request',
    description: 'Triggers immediate IT support for critical business issues',
    icon: '🆘',
    color: 'from-red-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'IT Support Bot Core',
    description: 'Advanced IT support system with diagnostic and repair capabilities',
    icon: '🔧',
    color: 'from-indigo-500 to-purple-600',
    inputs: 4,
    outputs: 5,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'System Scanner & Diagnostics',
    description: 'Comprehensive system scanning and problem identification',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 2,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Remote Repair Engine',
    description: 'Automated remote system repair and service restoration',
    icon: '🛠️',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 2,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Critical Service Restorer',
    description: 'Emergency service restoration for business-critical systems',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Infrastructure Health Monitor',
    description: 'Continuous monitoring of all system infrastructure',
    icon: '💓',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Predictive Failure Detection',
    description: 'AI-powered prediction of system failures before they occur',
    icon: '🔮',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Automated Patch Management',
    description: 'Automated system updates and security patch deployment',
    icon: '🔄',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Performance Optimizer',
    description: 'Automatically optimizes system performance and resource usage',
    icon: '⚡',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Network Diagnostics Engine',
    description: 'Advanced network troubleshooting and connectivity repair',
    icon: '🌐',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Database Health Manager',
    description: 'Database optimization, backup, and corruption repair',
    icon: '🗄️',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Security Vulnerability Scanner',
    description: 'Identifies and patches security vulnerabilities automatically',
    icon: '🛡️',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'condition',
    title: 'Problem Severity Classifier',
    description: 'Classifies IT issues by severity and required response time',
    icon: '⚖️',
    color: 'from-yellow-500 to-red-600',
    inputs: 1,
    outputs: 3,
    category: 'itsupport'
  },
  {
    type: 'condition',
    title: 'Repair Feasibility Analyzer',
    description: 'Determines if issues can be fixed remotely or need human intervention',
    icon: '🎯',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Backup & Recovery Manager',
    description: 'Automated backup creation and disaster recovery execution',
    icon: '💾',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'System Rollback Engine',
    description: 'Automatically rolls back problematic changes to restore stability',
    icon: '⏪',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Resource Usage Monitor',
    description: 'Monitors CPU, memory, disk, and network resource usage',
    icon: '📊',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Application Health Checker',
    description: 'Monitors application status and automatically restarts failed services',
    icon: '📱',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'IT Incident Reporter',
    description: 'Generates detailed incident reports and resolution documentation',
    icon: '📋',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Remote Access Controller',
    description: 'Secure remote access for system diagnosis and repair',
    icon: '🔐',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'System Configuration Manager',
    description: 'Manages and optimizes system configurations automatically',
    icon: '⚙️',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },
  {
    type: 'action',
    title: 'Emergency Escalation System',
    description: 'Escalates critical issues to human experts when needed',
    icon: '🚨',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'itsupport'
  },

  // Video Intelligence & Specialized Scraping Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Viral Content Detection',
    description: 'Triggers when viral or trending video content is detected',
    icon: '🔥',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'trigger',
    title: 'Success Pattern Alert',
    description: 'Triggers when overnight success patterns are identified',
    icon: '🚀',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'trigger',
    title: 'New Channel Discovery',
    description: 'Triggers when new high-growth channels are discovered',
    icon: '📺',
    color: 'from-purple-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Video Intelligence Bot Core',
    description: 'Advanced video content analysis with CV and AI transcription',
    icon: '🎬',
    color: 'from-indigo-500 to-purple-600',
    inputs: 3,
    outputs: 4,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Computer Vision Analyzer',
    description: 'AI-powered visual analysis of video content and scenes',
    icon: '👁️',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 2,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Video Transcription Engine',
    description: 'Verbatim transcription of video audio to text',
    icon: '🎤',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Content Logic Parser',
    description: 'Intelligently separates content from non-content elements',
    icon: '🧠',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Main Points Extractor',
    description: 'Creates bullet-pointed summaries of key video insights',
    icon: '📝',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'YouTube Success Scraper',
    description: 'Specialized scraper for YouTube viral content and creators',
    icon: '📹',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'TikTok Viral Analyzer',
    description: 'Analyzes TikTok trends and overnight success stories',
    icon: '🎵',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 2,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Instagram Reels Intelligence',
    description: 'Extracts insights from Instagram Reels and Stories',
    icon: '📸',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 2,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'LinkedIn Video Scraper',
    description: 'Analyzes LinkedIn video content and professional insights',
    icon: '💼',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 2,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Twitter/X Video Analyzer',
    description: 'Processes Twitter/X video content and viral threads',
    icon: '🐦',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 2,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Success Pattern Detector',
    description: 'Identifies patterns in overnight success stories and rapid growth',
    icon: '🎯',
    color: 'from-yellow-500 to-orange-600',
    inputs: 2,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Company Growth Tracker',
    description: 'Tracks companies that have built huge success rapidly',
    icon: '📈',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'URL & Contact Harvester',
    description: 'Extracts URLs and contact information from successful entities',
    icon: '🔗',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Environmental Data Aggregator',
    description: 'Aggregates contextual data around video content and creators',
    icon: '🌐',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Engagement Metrics Analyzer',
    description: 'Analyzes likes, shares, comments, and engagement patterns',
    icon: '📊',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Trend Velocity Calculator',
    description: 'Calculates how fast content or creators are growing',
    icon: '⚡',
    color: 'from-yellow-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'condition',
    title: 'Content Quality Filter',
    description: 'Filters high-quality content from noise and spam',
    icon: '✨',
    color: 'from-gold-500 to-yellow-600',
    inputs: 1,
    outputs: 2,
    category: 'videointel'
  },
  {
    type: 'condition',
    title: 'Success Probability Scorer',
    description: 'Scores the likelihood of sustained success vs. one-hit wonder',
    icon: '🎲',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 3,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Competitive Intelligence Report',
    description: 'Generates comprehensive competitive intelligence reports',
    icon: '📋',
    color: 'from-gray-500 to-slate-600',
    inputs: 2,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Strategy Insights Generator',
    description: 'Generates actionable business strategy insights from video data',
    icon: '💡',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Content Format Analyzer',
    description: 'Analyzes what content formats are driving success',
    icon: '🎭',
    color: 'from-pink-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Audience Demographics Extractor',
    description: 'Extracts audience demographics and psychographics from video data',
    icon: '👥',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },
  {
    type: 'action',
    title: 'Monetization Strategy Detector',
    description: 'Identifies how successful creators and companies monetize',
    icon: '💰',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'videointel'
  },

  // Advanced Customer Relations & Competitive Intelligence Nodes
  {
    type: 'trigger',
    title: 'Customer Anniversary Alert',
    description: 'Triggers on customer birthdays, anniversaries, and milestone dates',
    icon: '🎂',
    color: 'from-pink-500 to-rose-600',
    inputs: 0,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'trigger',
    title: 'Warm Market Opportunity',
    description: 'Triggers when warm market contacts are ready for re-engagement',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'trigger',
    title: 'Competitor Vulnerability Detected',
    description: 'Triggers when competitor weaknesses or gaps are identified',
    icon: '🎯',
    color: 'from-red-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Customer Relations Bot Core',
    description: 'Advanced warm market nurturing and soft-sell relationship management',
    icon: '💝',
    color: 'from-purple-500 to-pink-600',
    inputs: 3,
    outputs: 4,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Warm Market Database',
    description: 'Comprehensive database of all past customers and warm contacts',
    icon: '🗃️',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Milestone Tracker',
    description: 'Tracks birthdays, anniversaries, and business relationship milestones',
    icon: '📅',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 2,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Soft-Sell Message Crafter',
    description: 'Creates personalized, non-pushy re-engagement messages',
    icon: '✍️',
    color: 'from-cyan-500 to-blue-600',
    inputs: 2,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Relationship History Analyzer',
    description: 'Analyzes past interactions to optimize re-engagement approach',
    icon: '📊',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Personal Touch Generator',
    description: 'Adds personalized touches based on customer preferences and history',
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Gift & Gesture Recommender',
    description: 'Recommends appropriate gifts, discounts, or gestures for occasions',
    icon: '🎁',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'condition',
    title: 'Re-engagement Readiness Scorer',
    description: 'Scores how ready warm contacts are for re-engagement',
    icon: '🎯',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 3,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Multi-Channel Outreach Coordinator',
    description: 'Coordinates outreach across email, phone, social media, and mail',
    icon: '📡',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 2,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Competitive Analysis Bot Core',
    description: 'Advanced competitor intelligence and vulnerability detection system',
    icon: '🕵️',
    color: 'from-gray-500 to-slate-600',
    inputs: 2,
    outputs: 3,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Inventory Gap Detector',
    description: 'Identifies holes and shortages in competitor inventory',
    icon: '📦',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Stock Level Monitor',
    description: 'Monitors competitor stock levels and availability patterns',
    icon: '📊',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Pricing Anomaly Detector',
    description: 'Identifies unusual pricing patterns and competitive opportunities',
    icon: '💰',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Service Gap Analyzer',
    description: 'Identifies gaps in competitor service offerings and approaches',
    icon: '🔍',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Market Position Tracker',
    description: 'Tracks competitor market positioning and strategic changes',
    icon: '🎯',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Customer Satisfaction Monitor',
    description: 'Monitors competitor customer satisfaction and complaint patterns',
    icon: '😊',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'condition',
    title: 'Opportunity Prioritizer',
    description: 'Prioritizes competitive opportunities by potential impact',
    icon: '⭐',
    color: 'from-gold-500 to-yellow-600',
    inputs: 1,
    outputs: 3,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Competitive Response Strategist',
    description: 'Develops strategic responses to competitor weaknesses',
    icon: '♟️',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Market Share Opportunity Mapper',
    description: 'Maps opportunities to capture market share from competitors',
    icon: '🗺️',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Relationship Warmth Meter',
    description: 'Measures the warmth and strength of customer relationships',
    icon: '🌡️',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Follow-up Sequence Designer',
    description: 'Designs perfect follow-up sequences for different relationship stages',
    icon: '🔄',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Loyalty Program Optimizer',
    description: 'Optimizes loyalty programs based on customer behavior patterns',
    icon: '🏆',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },
  {
    type: 'action',
    title: 'Win-Back Campaign Manager',
    description: 'Manages campaigns to win back lost customers from competitors',
    icon: '🎪',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'relations'
  },

  // Event Coordination & Corporate Branding Ecosystem Nodes
  {
    type: 'trigger',
    title: 'Event Planning Request',
    description: 'Triggers when new event planning request is submitted',
    icon: '📅',
    color: 'from-purple-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'trigger',
    title: 'Branding Asset Request',
    description: 'Triggers when new corporate branding materials are needed',
    icon: '🎨',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'trigger',
    title: 'Event Reminder Schedule',
    description: 'Triggers automated reminder calls and SMS campaigns',
    icon: '⏰',
    color: 'from-orange-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Event Coordinator Bot Core',
    description: 'Master event planning and coordination system',
    icon: '🎪',
    color: 'from-purple-500 to-pink-600',
    inputs: 3,
    outputs: 4,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Venue Scout & Selector',
    description: 'Finds and evaluates suitable venues for events',
    icon: '🏢',
    color: 'from-cyan-500 to-blue-600',
    inputs: 2,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Event Scope Planner',
    description: 'Plans comprehensive event scope and requirements',
    icon: '📋',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 2,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Budget Coordinator',
    description: 'Coordinates with FinTech bots for scaled budget planning',
    icon: '💰',
    color: 'from-yellow-500 to-orange-600',
    inputs: 2,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Invitation Designer',
    description: 'Creates professional invitations and event announcements',
    icon: '💌',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Flyer & Ad Creator',
    description: 'Generates eye-catching flyers and promotional materials',
    icon: '📰',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Print Layout Generator',
    description: 'Creates professional print layouts for brochures and materials',
    icon: '🖨️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Call Staff Router',
    description: 'Routes and coordinates reminder calls and SMS campaigns',
    icon: '📞',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 2,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Keynote Speech Generator',
    description: 'Generates compelling keynote speeches and presentations',
    icon: '🎤',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Event Timeline Manager',
    description: 'Creates and manages detailed event timelines and schedules',
    icon: '⏱️',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Vendor Coordination Hub',
    description: 'Coordinates with caterers, AV, decorators, and other vendors',
    icon: '🤝',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'events'
  },
  {
    type: 'action',
    title: 'RSVP Tracker & Manager',
    description: 'Tracks RSVPs and manages attendee lists',
    icon: '✅',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'condition',
    title: 'Event Type Classifier',
    description: 'Classifies events and routes to appropriate planning workflows',
    icon: '🎯',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 4,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Corporate Logo Designer',
    description: 'Creates professional logos and brand identity elements',
    icon: '🎨',
    color: 'from-blue-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Business Card Generator',
    description: 'Designs and generates professional business cards',
    icon: '💳',
    color: 'from-gray-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Letterhead Designer',
    description: 'Creates professional company letterhead and stationery',
    icon: '📄',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Memo Template Creator',
    description: 'Generates professional memo templates and formats',
    icon: '📝',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Brand Style Guide Generator',
    description: 'Creates comprehensive brand style guides and standards',
    icon: '📚',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Corporate Identity Package',
    description: 'Assembles complete corporate identity packages',
    icon: '📦',
    color: 'from-cyan-500 to-blue-600',
    inputs: 3,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Event Photography Coordinator',
    description: 'Coordinates event photography and videography services',
    icon: '📸',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Post-Event Follow-up Manager',
    description: 'Manages post-event thank you messages and follow-ups',
    icon: '🙏',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Event ROI Analyzer',
    description: 'Analyzes event success metrics and return on investment',
    icon: '📊',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'condition',
    title: 'Online vs Offline Event Router',
    description: 'Routes events to online or offline planning workflows',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 2,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Virtual Event Platform Manager',
    description: 'Manages virtual event platforms and online experiences',
    icon: '💻',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Hybrid Event Coordinator',
    description: 'Coordinates hybrid events with both online and offline components',
    icon: '🔄',
    color: 'from-purple-500 to-pink-600',
    inputs: 2,
    outputs: 1,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Event Marketing Campaign Manager',
    description: 'Manages comprehensive marketing campaigns for events',
    icon: '📢',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 2,
    category: 'events'
  },
  {
    type: 'action',
    title: 'Sponsorship Coordinator',
    description: 'Identifies and coordinates event sponsorship opportunities',
    icon: '🤝',
    color: 'from-gold-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'events'
  },

  // FunnelBots - Advanced Conversion & Campaign Optimization Ecosystem
  {
    type: 'trigger',
    title: 'New Campaign Launch Signal',
    description: 'Triggers when new marketing campaign is ready for launch',
    icon: '🚀',
    color: 'from-purple-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'trigger',
    title: 'A/B Test Results Ready',
    description: 'Triggers when A/B test results reach statistical significance',
    icon: '📊',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'trigger',
    title: 'Conversion Drop Alert',
    description: 'Triggers when funnel conversion rates drop below thresholds',
    icon: '⚠️',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'FunnelBot Intelligence Core',
    description: 'Master funnel design and optimization system using scraper intelligence',
    icon: '🧠',
    color: 'from-purple-500 to-indigo-600',
    inputs: 4,
    outputs: 3,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Scraper Intelligence Aggregator',
    description: 'Aggregates intelligence from all scraper bots for funnel insights',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    inputs: 3,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Funnel Architecture Designer',
    description: 'Designs optimal funnel structures based on intelligence data',
    icon: '🏗️',
    color: 'from-green-500 to-emerald-600',
    inputs: 2,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Landing Page Optimizer',
    description: 'Optimizes landing pages for maximum conversion rates',
    icon: '📄',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'A/B Testing Engine',
    description: 'Manages comprehensive A/B testing across all funnel elements',
    icon: '⚖️',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 2,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Campaign Launch Coordinator',
    description: 'Coordinates multi-channel campaign launches with perfect timing',
    icon: '🎯',
    color: 'from-red-500 to-pink-600',
    inputs: 2,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Marketing Metrics Monitor',
    description: 'Real-time monitoring of all marketing metrics and KPIs',
    icon: '📈',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Page Ranking Intelligence',
    description: 'Monitors and optimizes page rankings across search engines',
    icon: '🔝',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Conversion Rate Optimizer',
    description: 'Continuously optimizes conversion rates at every funnel stage',
    icon: '💹',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Traffic Source Analyzer',
    description: 'Analyzes and optimizes traffic sources for maximum ROI',
    icon: '🚦',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Lead Quality Scorer',
    description: 'Scores and segments leads based on conversion probability',
    icon: '🎯',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 2,
    category: 'funnelbots'
  },
  {
    type: 'condition',
    title: 'Funnel Stage Classifier',
    description: 'Classifies leads by funnel stage and routes accordingly',
    icon: '🔄',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 5,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Email Sequence Optimizer',
    description: 'Optimizes email sequences for maximum engagement and conversion',
    icon: '📧',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Retargeting Campaign Manager',
    description: 'Manages sophisticated retargeting campaigns across platforms',
    icon: '🎪',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Customer Journey Mapper',
    description: 'Maps and optimizes complete customer journey paths',
    icon: '🗺️',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Competitive Funnel Analyzer',
    description: 'Analyzes competitor funnels and identifies improvement opportunities',
    icon: '🕵️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Attribution Model Builder',
    description: 'Builds sophisticated attribution models for accurate ROI tracking',
    icon: '🧮',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'condition',
    title: 'Campaign Performance Evaluator',
    description: 'Evaluates campaign performance and routes to optimization workflows',
    icon: '⚡',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 3,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Funnel Leak Detector',
    description: 'Identifies and fixes leaks in conversion funnels',
    icon: '🔧',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Personalization Engine',
    description: 'Personalizes funnel experiences based on user behavior and data',
    icon: '👤',
    color: 'from-purple-500 to-indigo-600',
    inputs: 2,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Cross-Channel Coordinator',
    description: 'Coordinates messaging and campaigns across all marketing channels',
    icon: '🌐',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 2,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Revenue Attribution Tracker',
    description: 'Tracks revenue attribution across all funnel touchpoints',
    icon: '💰',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Predictive Analytics Engine',
    description: 'Predicts funnel performance and optimization opportunities',
    icon: '🔮',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Dynamic Content Optimizer',
    description: 'Optimizes content dynamically based on user behavior and preferences',
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Conversion Velocity Accelerator',
    description: 'Accelerates conversion velocity through optimized touchpoint timing',
    icon: '⚡',
    color: 'from-yellow-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Multi-Variant Testing Manager',
    description: 'Manages complex multi-variant testing across funnel elements',
    icon: '🧪',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Funnel ROI Calculator',
    description: 'Calculates comprehensive ROI for all funnel investments',
    icon: '📊',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Audience Segmentation Engine',
    description: 'Creates sophisticated audience segments for targeted funnels',
    icon: '👥',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 2,
    category: 'funnelbots'
  },
  {
    type: 'action',
    title: 'Lifecycle Marketing Coordinator',
    description: 'Coordinates marketing across entire customer lifecycle',
    icon: '🔄',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'funnelbots'
  },

  // PPC Optimization & Budget Intelligence Ecosystem - Pre-Launch Bot
  {
    type: 'trigger',
    title: 'PPC Campaign Launch Ready',
    description: 'Triggers when PPC campaign is ready for keyword analysis and launch',
    icon: '🚀',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'trigger',
    title: 'Budget Threshold Alert',
    description: 'Triggers when PPC spend approaches budget limits',
    icon: '⚠️',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'trigger',
    title: 'Conversion Rate Drop',
    description: 'Triggers when conversion rates drop below acceptable thresholds',
    icon: '📉',
    color: 'from-yellow-500 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'PPC Intelligence Core',
    description: 'Master PPC optimization system with keyword intelligence and budget management',
    icon: '🧠',
    color: 'from-purple-500 to-indigo-600',
    inputs: 4,
    outputs: 3,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Keyword Intelligence Analyzer',
    description: 'Analyzes and identifies optimal keywords for PPC campaigns',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-600',
    inputs: 2,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Budget Guardian',
    description: 'Monitors and manages PPC budgets with precision controls',
    icon: '🛡️',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Conversion Rate Monitor',
    description: 'Monitors conversion rates across all bot family members',
    icon: '📊',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Keyword Bid Optimizer',
    description: 'Optimizes keyword bids for maximum ROI and conversion',
    icon: '💰',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Ad Spend Allocator',
    description: 'Intelligently allocates ad spend across campaigns and keywords',
    icon: '⚖️',
    color: 'from-cyan-500 to-blue-600',
    inputs: 2,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Competitive Keyword Spy',
    description: 'Analyzes competitor keyword strategies and identifies opportunities',
    icon: '🕵️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Quality Score Optimizer',
    description: 'Optimizes ad quality scores for better positioning and lower costs',
    icon: '⭐',
    color: 'from-gold-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Negative Keyword Manager',
    description: 'Manages negative keywords to prevent wasted ad spend',
    icon: '🚫',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Ad Copy Performance Analyzer',
    description: 'Analyzes ad copy performance and suggests optimizations',
    icon: '📝',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'condition',
    title: 'Budget Allocation Router',
    description: 'Routes budget allocation based on performance and priorities',
    icon: '🎯',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 4,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Dayparting Optimizer',
    description: 'Optimizes ad scheduling for maximum conversion efficiency',
    icon: '⏰',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Geographic Performance Tracker',
    description: 'Tracks and optimizes geographic performance of PPC campaigns',
    icon: '🌍',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Device Performance Optimizer',
    description: 'Optimizes campaigns for different devices and platforms',
    icon: '📱',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Seasonal Trend Analyzer',
    description: 'Analyzes seasonal trends and adjusts PPC strategies accordingly',
    icon: '📈',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Landing Page Match Scorer',
    description: 'Scores keyword-to-landing page relevance for better quality scores',
    icon: '🎯',
    color: 'from-cyan-500 to-blue-600',
    inputs: 2,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'condition',
    title: 'Performance Threshold Monitor',
    description: 'Monitors performance thresholds and triggers optimization workflows',
    icon: '📊',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 3,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Cross-Platform Campaign Coordinator',
    description: 'Coordinates PPC campaigns across Google, Bing, Facebook, LinkedIn',
    icon: '🌐',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 2,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Bot Family Conversion Tracker',
    description: 'Tracks conversion rates across all bot family members and ecosystems',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'ROI Maximizer',
    description: 'Maximizes return on investment across all PPC campaigns',
    icon: '💎',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Budget Reallocation Engine',
    description: 'Automatically reallocates budget from low to high-performing campaigns',
    icon: '🔄',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Keyword Expansion Engine',
    description: 'Discovers and tests new keyword opportunities automatically',
    icon: '🔍',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Audience Targeting Optimizer',
    description: 'Optimizes audience targeting for maximum conversion rates',
    icon: '👥',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Cost Per Acquisition Controller',
    description: 'Controls and optimizes cost per acquisition across all campaigns',
    icon: '💸',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Click Fraud Detector',
    description: 'Detects and prevents click fraud to protect ad budgets',
    icon: '🛡️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Campaign Performance Predictor',
    description: 'Predicts campaign performance and suggests proactive optimizations',
    icon: '🔮',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Emergency Budget Brake',
    description: 'Emergency system to halt spending when thresholds are exceeded',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },
  {
    type: 'action',
    title: 'Multi-Bot Ecosystem ROI Reporter',
    description: 'Reports ROI across all bot ecosystems and their PPC contributions',
    icon: '📋',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'ppcbots'
  },

  // Legal Team Bot Ecosystem - Private/Internal Use Only
  {
    type: 'trigger',
    title: 'Legal Issue Detection',
    description: 'Triggers when potential legal issues or threats are detected',
    icon: '⚖️',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'trigger',
    title: 'Regulatory Change Alert',
    description: 'Triggers when new regulations or legal changes affect business',
    icon: '📜',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'trigger',
    title: 'Contract Review Request',
    description: 'Triggers when contracts need legal analysis and review',
    icon: '📋',
    color: 'from-purple-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Intelligence Core',
    description: 'Master legal advisory system with case law and regulatory intelligence',
    icon: '🧠',
    color: 'from-gray-500 to-slate-600',
    inputs: 4,
    outputs: 3,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Case Law Research Engine',
    description: 'Researches relevant case law and legal precedents',
    icon: '📚',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Database Scraper',
    description: 'Scrapes Westlaw, LexisNexis, and other legal databases',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Court Records Analyzer',
    description: 'Analyzes court records and case outcomes for strategic insights',
    icon: '🏛️',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Regulatory Compliance Monitor',
    description: 'Monitors regulatory changes and compliance requirements',
    icon: '📊',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Contract Analysis Engine',
    description: 'Analyzes contracts for risks, loopholes, and optimization opportunities',
    icon: '📄',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Strategy Advisor',
    description: 'Provides strategic legal advice based on case law and precedents',
    icon: '♟️',
    color: 'from-red-500 to-pink-600',
    inputs: 2,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Litigation Risk Assessor',
    description: 'Assesses litigation risks and potential outcomes',
    icon: '⚠️',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Document Generator',
    description: 'Generates legal documents, contracts, and correspondence',
    icon: '📝',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Opposing Counsel Intelligence',
    description: 'Researches opposing counsel track records and strategies',
    icon: '🕵️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Judge Profile Analyzer',
    description: 'Analyzes judge profiles, tendencies, and case history',
    icon: '👨‍⚖️',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'condition',
    title: 'Legal Risk Classifier',
    description: 'Classifies legal risks by severity and routes to appropriate responses',
    icon: '🎯',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 4,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Statute of Limitations Tracker',
    description: 'Tracks statute of limitations for various legal matters',
    icon: '⏰',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Precedent Finder',
    description: 'Finds relevant legal precedents for current cases or issues',
    icon: '🔗',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Regulatory Filing Assistant',
    description: 'Assists with regulatory filings and compliance documentation',
    icon: '📋',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Cost Estimator',
    description: 'Estimates legal costs and litigation expenses',
    icon: '💰',
    color: 'from-gold-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Settlement Negotiation Advisor',
    description: 'Provides advice on settlement negotiations and strategies',
    icon: '🤝',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'condition',
    title: 'Case Strength Evaluator',
    description: 'Evaluates case strength and likelihood of success',
    icon: '💪',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 3,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Research Aggregator',
    description: 'Aggregates legal research from multiple sources and databases',
    icon: '📊',
    color: 'from-indigo-500 to-purple-600',
    inputs: 3,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Intellectual Property Monitor',
    description: 'Monitors intellectual property rights and potential infringements',
    icon: '🛡️',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Corporate Compliance Auditor',
    description: 'Audits corporate compliance across all legal requirements',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Timeline Builder',
    description: 'Builds comprehensive legal timelines for cases and disputes',
    icon: '📅',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Evidence Organizer',
    description: 'Organizes and categorizes evidence for legal proceedings',
    icon: '📁',
    color: 'from-gray-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Brief Generator',
    description: 'Generates comprehensive legal briefs and memoranda',
    icon: '📄',
    color: 'from-blue-500 to-indigo-600',
    inputs: 2,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Whistleblower Protection Advisor',
    description: 'Provides guidance on whistleblower protections and procedures',
    icon: '🔒',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Agency Investigation Tracker',
    description: 'Tracks government agency investigations and enforcement actions',
    icon: '🏛️',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Communication Drafter',
    description: 'Drafts legal communications, demand letters, and responses',
    icon: '✍️',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Conflict of Interest Detector',
    description: 'Detects potential conflicts of interest in legal matters',
    icon: '⚡',
    color: 'from-yellow-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Legal Strategy Simulator',
    description: 'Simulates different legal strategies and their potential outcomes',
    icon: '🎮',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 2,
    category: 'legalbots'
  },
  {
    type: 'action',
    title: 'Emergency Legal Response',
    description: 'Provides immediate legal guidance for urgent situations',
    icon: '🚨',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'legalbots'
  },

  // Client-Facing Legal Assistant Ecosystem - Public/Customer Use
  {
    type: 'trigger',
    title: 'Contract Generation Request',
    description: 'Triggers when client requests contract generation',
    icon: '📄',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'trigger',
    title: 'Contract Review Request',
    description: 'Triggers when client uploads contract for review and explanation',
    icon: '🔍',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'trigger',
    title: 'Legal Document Upload',
    description: 'Triggers when client uploads legal document for explanation',
    icon: '📋',
    color: 'from-purple-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Legal Assistant Core',
    description: 'Client-facing legal assistant for contract generation and document explanation',
    icon: '🤖',
    color: 'from-blue-500 to-cyan-600',
    inputs: 3,
    outputs: 2,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Contract Generator',
    description: 'Generates standard business contracts for common client needs',
    icon: '📝',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Contract Scanner & Analyzer',
    description: 'Scans and analyzes incoming contracts for key terms and risks',
    icon: '🔎',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Plain English Translator',
    description: 'Translates complex legal language into simple, understandable explanations',
    icon: '💬',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Key Terms Highlighter',
    description: 'Highlights and explains key terms, clauses, and obligations in contracts',
    icon: '✨',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Risk Alert System',
    description: 'Identifies and alerts clients to potential risks in legal documents',
    icon: '⚠️',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Contract Template Library',
    description: 'Maintains library of standard contract templates for various industries',
    icon: '📚',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'condition',
    title: 'Document Type Classifier',
    description: 'Classifies legal documents and routes to appropriate analysis workflows',
    icon: '🎯',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 5,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Legal Summary Generator',
    description: 'Generates concise summaries of legal documents in plain language',
    icon: '📊',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Obligation Tracker',
    description: 'Identifies and tracks client obligations and deadlines in contracts',
    icon: '📅',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Payment Terms Analyzer',
    description: 'Analyzes and explains payment terms, schedules, and penalties',
    icon: '💰',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Termination Clause Explainer',
    description: 'Explains termination clauses and exit procedures in contracts',
    icon: '🚪',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Liability Limitation Finder',
    description: 'Identifies and explains liability limitations and protections',
    icon: '🛡️',
    color: 'from-gray-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Intellectual Property Clause Scanner',
    description: 'Scans for and explains intellectual property clauses and rights',
    icon: '🧠',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Confidentiality Agreement Analyzer',
    description: 'Analyzes NDAs and confidentiality agreements for key provisions',
    icon: '🤐',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'condition',
    title: 'Complexity Level Assessor',
    description: 'Assesses document complexity and routes to appropriate explanation level',
    icon: '📈',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 3,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Legal Checklist Generator',
    description: 'Generates action checklists based on contract requirements',
    icon: '✅',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Contract Comparison Tool',
    description: 'Compares multiple contract versions and highlights differences',
    icon: '⚖️',
    color: 'from-cyan-500 to-blue-600',
    inputs: 2,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Legal FAQ Generator',
    description: 'Generates frequently asked questions and answers about legal documents',
    icon: '❓',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Compliance Requirement Extractor',
    description: 'Extracts compliance requirements and regulatory obligations from documents',
    icon: '📋',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Legal Document Validator',
    description: 'Validates legal documents for completeness and standard requirements',
    icon: '✔️',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Amendment Suggestion Engine',
    description: 'Suggests potential amendments or improvements to contracts',
    icon: '💡',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Legal Glossary Builder',
    description: 'Builds personalized legal glossaries for complex documents',
    icon: '📖',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Contract Renewal Reminder',
    description: 'Tracks contract expiration dates and sends renewal reminders',
    icon: '🔔',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Legal Document Archiver',
    description: 'Archives and organizes legal documents for easy retrieval',
    icon: '🗄️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Client Legal Education Hub',
    description: 'Provides educational resources about legal concepts and processes',
    icon: '🎓',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },
  {
    type: 'action',
    title: 'Legal Cost Estimator',
    description: 'Estimates potential legal costs for various contract scenarios',
    icon: '💸',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'clientlegal'
  },

  // Specialized Legal Expertise - Family Law & Criminal Defense (Private)
  {
    type: 'trigger',
    title: 'Family Law Case Alert',
    description: 'Triggers when family law or custody matters require immediate attention',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-pink-500 to-rose-600',
    inputs: 0,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'trigger',
    title: 'Criminal Defense Emergency',
    description: 'Triggers when criminal charges or investigations are detected',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'trigger',
    title: 'Custody Threat Detection',
    description: 'Triggers when child custody threats or actions are identified',
    icon: '🛡️',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Family Law Specialist Core',
    description: 'Advanced family law expertise with custody, divorce, and child protection focus',
    icon: '⚖️',
    color: 'from-pink-500 to-purple-600',
    inputs: 4,
    outputs: 3,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Criminal Defense Specialist Core',
    description: 'Advanced criminal defense expertise with investigation and trial strategy',
    icon: '🛡️',
    color: 'from-red-500 to-pink-600',
    inputs: 4,
    outputs: 3,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Child Custody Strategy Advisor',
    description: 'Provides strategic advice for child custody cases and protection',
    icon: '👶',
    color: 'from-blue-500 to-cyan-600',
    inputs: 2,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Custody Case Law Researcher',
    description: 'Researches custody case law and precedents for strategic advantage',
    icon: '📚',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Family Court Judge Analyzer',
    description: 'Analyzes family court judges for custody case strategy',
    icon: '👨‍⚖️',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Parental Rights Protector',
    description: 'Monitors and protects parental rights and custody arrangements',
    icon: '🛡️',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Child Welfare Monitor',
    description: 'Monitors child welfare proceedings and protective services actions',
    icon: '👁️',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Custody Documentation Builder',
    description: 'Builds comprehensive custody documentation and evidence files',
    icon: '📋',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Criminal Charges Analyzer',
    description: 'Analyzes criminal charges and potential defense strategies',
    icon: '🔍',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Criminal Case Law Database',
    description: 'Comprehensive criminal case law database with defense precedents',
    icon: '⚖️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Defense Strategy Simulator',
    description: 'Simulates criminal defense strategies and potential outcomes',
    icon: '🎯',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 2,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Prosecutor Profile Analyzer',
    description: 'Analyzes prosecutor profiles, tactics, and case histories',
    icon: '🕵️',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Criminal Court Judge Profiler',
    description: 'Profiles criminal court judges for sentencing patterns and preferences',
    icon: '👨‍⚖️',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'condition',
    title: 'Criminal Charge Severity Classifier',
    description: 'Classifies criminal charges by severity and routes to appropriate defense strategies',
    icon: '⚡',
    color: 'from-yellow-500 to-red-600',
    inputs: 1,
    outputs: 4,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Plea Bargain Analyzer',
    description: 'Analyzes plea bargain offers and negotiation strategies',
    icon: '🤝',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Evidence Suppression Advisor',
    description: 'Identifies opportunities for evidence suppression and constitutional violations',
    icon: '🚫',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Constitutional Rights Monitor',
    description: 'Monitors for constitutional rights violations and due process issues',
    icon: '📜',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Sentencing Guidelines Analyzer',
    description: 'Analyzes sentencing guidelines and mitigation opportunities',
    icon: '⚖️',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Criminal Investigation Tracker',
    description: 'Tracks criminal investigations and law enforcement activities',
    icon: '🔍',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Bail & Bond Strategy Advisor',
    description: 'Provides strategy for bail hearings and bond arrangements',
    icon: '🏛️',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Witness Statement Analyzer',
    description: 'Analyzes witness statements for inconsistencies and credibility issues',
    icon: '👁️‍🗨️',
    color: 'from-purple-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Criminal Appeals Advisor',
    description: 'Provides advice on criminal appeals and appellate strategy',
    icon: '📈',
    color: 'from-indigo-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Domestic Relations Mediator',
    description: 'Provides mediation strategies for domestic relations disputes',
    icon: '🤝',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Child Support Calculator',
    description: 'Calculates child support obligations and modification strategies',
    icon: '💰',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Visitation Rights Protector',
    description: 'Protects and enforces visitation rights and parenting time',
    icon: '👨‍👧‍👦',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Parental Alienation Detector',
    description: 'Detects and documents parental alienation tactics and behaviors',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'condition',
    title: 'Custody Risk Assessor',
    description: 'Assesses custody risks and routes to protective strategies',
    icon: '⚠️',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 3,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Guardian Ad Litem Coordinator',
    description: 'Coordinates with Guardian Ad Litem and child advocates',
    icon: '👨‍💼',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Family Court Motion Drafter',
    description: 'Drafts family court motions and emergency petitions',
    icon: '📝',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Criminal Motion Drafter',
    description: 'Drafts criminal defense motions and legal briefs',
    icon: '📄',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Expert Witness Coordinator',
    description: 'Coordinates expert witnesses for family and criminal cases',
    icon: '👨‍🔬',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'speciallegal'
  },
  {
    type: 'action',
    title: 'Legal Emergency Response Team',
    description: 'Immediate response team for urgent family or criminal legal emergencies',
    icon: '🚨',
    color: 'from-red-500 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'speciallegal'
  },

  // CFS Defense & Child Protection Specialist Modules (Ultra-Private)
  {
    type: 'trigger',
    title: 'CFS Investigation Alert',
    description: 'EMERGENCY: Triggers when CFS investigation or contact is detected',
    icon: '🚨',
    color: 'from-red-600 to-red-800',
    inputs: 0,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'trigger',
    title: 'Child Removal Threat',
    description: 'CRITICAL: Triggers when child removal threats or actions are imminent',
    icon: '⚠️',
    color: 'from-red-700 to-orange-600',
    inputs: 0,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'trigger',
    title: 'Court Hearing Scheduled',
    description: 'Triggers when CFS court hearings or dependency proceedings are scheduled',
    icon: '⚖️',
    color: 'from-purple-600 to-red-600',
    inputs: 0,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Defense Command Center',
    description: 'MASTER SYSTEM: Complete CFS defense coordination and strategy command',
    icon: '🛡️',
    color: 'from-red-600 to-pink-600',
    inputs: 5,
    outputs: 4,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Case Law Specialist',
    description: 'Specialized CFS case law research and dependency court precedents',
    icon: '📚',
    color: 'from-indigo-600 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Dependency Court Judge Profiler',
    description: 'Profiles dependency court judges for CFS case strategy and tendencies',
    icon: '👨‍⚖️',
    color: 'from-purple-600 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Worker Intelligence',
    description: 'Profiles CFS workers, supervisors, and case management patterns',
    icon: '🕵️',
    color: 'from-gray-600 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Constitutional Rights Enforcer',
    description: 'Enforces 4th, 5th, 14th Amendment rights against CFS overreach',
    icon: '📜',
    color: 'from-blue-600 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Due Process Violation Detector',
    description: 'Detects and documents due process violations in CFS proceedings',
    icon: '⚡',
    color: 'from-yellow-600 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Emergency Restraining Order Drafter',
    description: 'Drafts emergency restraining orders against CFS actions',
    icon: '🚫',
    color: 'from-red-600 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Policy Violation Tracker',
    description: 'Tracks CFS policy violations and procedural non-compliance',
    icon: '📋',
    color: 'from-orange-600 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Safety Plan Negotiator',
    description: 'Negotiates favorable safety plans and service agreements',
    icon: '🤝',
    color: 'from-green-600 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Evidence Suppression Expert',
    description: 'Identifies illegally obtained evidence and suppression opportunities',
    icon: '🔒',
    color: 'from-red-600 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Parental Rights Restoration Strategist',
    description: 'Develops strategies for parental rights restoration and reunification',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-pink-600 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'condition',
    title: 'CFS Threat Level Assessor',
    description: 'Assesses CFS threat levels and routes to appropriate defense strategies',
    icon: '🎯',
    color: 'from-red-600 to-orange-600',
    inputs: 1,
    outputs: 4,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Dependency Petition Challenger',
    description: 'Challenges dependency petitions and jurisdictional allegations',
    icon: '⚔️',
    color: 'from-red-600 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Investigation Recorder',
    description: 'Records and documents all CFS interactions and investigations',
    icon: '📹',
    color: 'from-blue-600 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Mandated Reporter Abuse Detector',
    description: 'Detects false or malicious mandated reporter claims',
    icon: '🚨',
    color: 'from-orange-600 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Timeline Reconstructor',
    description: 'Reconstructs CFS case timelines to identify procedural violations',
    icon: '📅',
    color: 'from-purple-600 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Expert Witness CFS Coordinator',
    description: 'Coordinates expert witnesses specialized in CFS defense cases',
    icon: '👨‍🔬',
    color: 'from-teal-600 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Appeal Strategist',
    description: 'Develops appellate strategies for CFS dependency court decisions',
    icon: '📈',
    color: 'from-indigo-600 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Federal Civil Rights Enforcer',
    description: 'Enforces federal civil rights violations (42 USC 1983) against CFS',
    icon: '🏛️',
    color: 'from-blue-600 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Whistleblower Coordinator',
    description: 'Coordinates with CFS whistleblowers and insider information',
    icon: '🔓',
    color: 'from-green-600 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Reasonable Efforts Challenger',
    description: 'Challenges CFS failure to make reasonable efforts for reunification',
    icon: '⚖️',
    color: 'from-purple-600 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Budget & Incentive Analyzer',
    description: 'Analyzes CFS budget incentives and federal funding motivations',
    icon: '💰',
    color: 'from-yellow-600 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Kinship Placement Advocate',
    description: 'Advocates for kinship placements and family preservation',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-pink-600 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Media Strategy Coordinator',
    description: 'Coordinates media strategy and public pressure campaigns',
    icon: '📺',
    color: 'from-purple-600 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Legislative Advocacy Coordinator',
    description: 'Coordinates legislative advocacy and CFS reform efforts',
    icon: '🏛️',
    color: 'from-blue-600 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Corruption Investigator',
    description: 'Investigates CFS corruption, fraud, and misconduct patterns',
    icon: '🔍',
    color: 'from-red-600 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Emergency Child Recovery Coordinator',
    description: 'Coordinates emergency child recovery and reunification efforts',
    icon: '🚨',
    color: 'from-red-600 to-orange-600',
    inputs: 1,
    outputs: 2,
    category: 'cfsdefense'
  },
  {
    type: 'condition',
    title: 'CFS Case Strength Evaluator',
    description: 'Evaluates CFS case strength and likelihood of successful defense',
    icon: '💪',
    color: 'from-green-600 to-teal-600',
    inputs: 1,
    outputs: 3,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Termination of Parental Rights Defender',
    description: 'Defends against termination of parental rights proceedings',
    icon: '🛡️',
    color: 'from-red-600 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Settlement Negotiator',
    description: 'Negotiates favorable settlements and case resolutions with CFS',
    icon: '🤝',
    color: 'from-blue-600 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'Interstate Compact Specialist',
    description: 'Handles interstate compact issues and jurisdictional challenges',
    icon: '🗺️',
    color: 'from-teal-600 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'cfsdefense'
  },
  {
    type: 'action',
    title: 'CFS Emergency Response Team',
    description: 'IMMEDIATE RESPONSE: 24/7 emergency response for CFS crises',
    icon: '🚨',
    color: 'from-red-700 to-orange-600',
    inputs: 1,
    outputs: 3,
    category: 'cfsdefense'
  },

  // Reverse Engineering & Asset Analysis Ecosystem
  {
    type: 'trigger',
    title: 'Website Analysis Request',
    description: 'Triggers when user wants to reverse engineer a website',
    icon: '🌐',
    color: 'from-blue-500 to-indigo-600',
    inputs: 0,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'trigger',
    title: 'App Deconstruction Request',
    description: 'Triggers when user wants to analyze mobile app structure',
    icon: '📱',
    color: 'from-green-500 to-emerald-600',
    inputs: 0,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'trigger',
    title: 'Asset Architecture Discovery',
    description: 'Triggers when user wants to understand digital asset architecture',
    icon: '🏗️',
    color: 'from-purple-500 to-pink-600',
    inputs: 0,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Reverse Engineering Core',
    description: 'Master reverse engineering system for websites, apps, and digital assets',
    icon: '🔍',
    color: 'from-gray-500 to-slate-600',
    inputs: 4,
    outputs: 3,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Website Structure Analyzer',
    description: 'Analyzes website architecture, frameworks, and technical stack',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Frontend Framework Detector',
    description: 'Detects React, Vue, Angular, and other frontend frameworks',
    icon: '⚛️',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Backend Technology Scanner',
    description: 'Identifies backend technologies, APIs, and server architecture',
    icon: '🖥️',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'CSS Framework Analyzer',
    description: 'Analyzes CSS frameworks, design systems, and styling approaches',
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'JavaScript Library Detector',
    description: 'Identifies JavaScript libraries, dependencies, and frameworks',
    icon: '📚',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Database Schema Extractor',
    description: 'Extracts database schemas and data structure information',
    icon: '🗄️',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'API Endpoint Mapper',
    description: 'Maps API endpoints, authentication, and data flow',
    icon: '🔗',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Mobile App Deconstructor',
    description: 'Deconstructs mobile app architecture and native components',
    icon: '📱',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'UI Component Extractor',
    description: 'Extracts and analyzes UI components and design patterns',
    icon: '🧩',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Performance Metrics Analyzer',
    description: 'Analyzes performance metrics, optimization techniques, and bottlenecks',
    icon: '⚡',
    color: 'from-yellow-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Security Vulnerability Scanner',
    description: 'Scans for security vulnerabilities and protection mechanisms',
    icon: '🛡️',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'condition',
    title: 'Technology Stack Classifier',
    description: 'Classifies technology stacks and routes to appropriate analysis workflows',
    icon: '🎯',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 5,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Code Generation Engine',
    description: 'Generates code templates based on reverse-engineered patterns',
    icon: '💻',
    color: 'from-cyan-500 to-blue-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Design Pattern Recognizer',
    description: 'Recognizes design patterns, architectural patterns, and best practices',
    icon: '🏛️',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Dependency Tree Mapper',
    description: 'Maps dependency trees and package relationships',
    icon: '🌳',
    color: 'from-green-500 to-teal-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Asset Optimization Analyzer',
    description: 'Analyzes asset optimization, compression, and delivery strategies',
    icon: '📦',
    color: 'from-orange-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Third-Party Integration Detector',
    description: 'Detects third-party integrations, analytics, and external services',
    icon: '🔌',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Build System Analyzer',
    description: 'Analyzes build systems, bundlers, and deployment pipelines',
    icon: '⚙️',
    color: 'from-gray-500 to-slate-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Version Control Inspector',
    description: 'Inspects version control patterns and development workflows',
    icon: '📝',
    color: 'from-blue-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Competitive Intelligence Generator',
    description: 'Generates competitive intelligence reports from reverse engineering',
    icon: '🕵️',
    color: 'from-red-500 to-pink-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Learning Path Creator',
    description: 'Creates personalized learning paths based on reverse-engineered technologies',
    icon: '🎓',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Code Quality Assessor',
    description: 'Assesses code quality, maintainability, and technical debt',
    icon: '⭐',
    color: 'from-yellow-500 to-orange-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Scalability Pattern Detector',
    description: 'Detects scalability patterns and architectural decisions',
    icon: '📈',
    color: 'from-purple-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Accessibility Compliance Checker',
    description: 'Checks accessibility compliance and inclusive design patterns',
    icon: '♿',
    color: 'from-teal-500 to-cyan-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'SEO Strategy Analyzer',
    description: 'Analyzes SEO strategies, meta tags, and search optimization',
    icon: '🔍',
    color: 'from-blue-500 to-indigo-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Monetization Model Detector',
    description: 'Detects monetization models, payment systems, and revenue streams',
    icon: '💰',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'User Experience Flow Mapper',
    description: 'Maps user experience flows and interaction patterns',
    icon: '👤',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Feature Implementation Guide',
    description: 'Creates implementation guides for specific features and functionality',
    icon: '📋',
    color: 'from-indigo-500 to-purple-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Technology Migration Planner',
    description: 'Plans technology migrations and modernization strategies',
    icon: '🚀',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },
  {
    type: 'action',
    title: 'Best Practice Extractor',
    description: 'Extracts best practices and industry standards from successful projects',
    icon: '🏆',
    color: 'from-gold-500 to-yellow-600',
    inputs: 1,
    outputs: 1,
    category: 'reverseeng'
  },

  // Game Development Nodes
  {
    type: 'trigger',
    title: 'Unity Scene Modified',
    description: 'Triggers when Unity scene files are changed',
    icon: '🎮',
    color: 'from-indigo-500 to-purple-600',
    inputs: 0,
    outputs: 1,
    category: 'gamedev'
  },
  {
    type: 'trigger',
    title: 'Asset Import Complete',
    description: 'Triggers when new game assets are imported',
    icon: '🖼️',
    color: 'from-emerald-500 to-teal-600',
    inputs: 0,
    outputs: 1,
    category: 'gamedev'
  },
  {
    type: 'action',
    title: 'Unity Build Pipeline',
    description: 'Build Unity project for target platforms',
    icon: '🔨',
    color: 'from-orange-500 to-red-600',
    inputs: 1,
    outputs: 2,
    category: 'gamedev'
  },
  {
    type: 'action',
    title: 'Creature AI Training',
    description: 'Train creature behavior AI models',
    icon: '🧠',
    color: 'from-pink-500 to-rose-600',
    inputs: 1,
    outputs: 1,
    category: 'gamedev'
  },
  {
    type: 'action',
    title: 'Environment Generator',
    description: 'Generate procedural environments',
    icon: '🌿',
    color: 'from-green-500 to-emerald-600',
    inputs: 1,
    outputs: 1,
    category: 'gamedev'
  },
  {
    type: 'condition',
    title: 'Performance Check',
    description: 'Check game performance metrics',
    icon: '📊',
    color: 'from-yellow-500 to-amber-600',
    inputs: 1,
    outputs: 2,
    category: 'gamedev'
  },
  {
    type: 'action',
    title: 'Steam Upload',
    description: 'Upload build to Steam for testing',
    icon: '🚂',
    color: 'from-slate-500 to-gray-600',
    inputs: 1,
    outputs: 1,
    category: 'gamedev'
  },
  {
    type: 'action',
    title: 'Creature Bond System',
    description: 'Process creature trust and bond mechanics',
    icon: '💚',
    color: 'from-emerald-400 to-green-600',
    inputs: 2,
    outputs: 1,
    category: 'gamedev'
  },
  {
    type: 'action',
    title: 'Environmental Healing',
    description: 'Process environmental restoration mechanics',
    icon: '🌱',
    color: 'from-lime-500 to-green-500',
    inputs: 1,
    outputs: 2,
    category: 'gamedev'
  },
  
  // General Nodes
  {
    type: 'action',
    title: 'Deploy to Staging',
    description: 'Deploy to staging environment',
    icon: '🚀',
    color: 'from-orange-500 to-red-500',
    inputs: 1,
    outputs: 1,
    category: 'general'
  },
  {
    type: 'action',
    title: 'Notify Team',
    description: 'Send notification to team',
    icon: '📧',
    color: 'from-indigo-500 to-purple-500',
    inputs: 1,
    outputs: 0,
    category: 'general'
  },
];

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<typeof nodeTypes[0] | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (nodeType: typeof nodeTypes[0]) => {
    setDraggedNode(nodeType);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: draggedNode.type as WorkflowNode['type'],
      title: draggedNode.title,
      description: draggedNode.description,
      x: x - 100, // Center the node
      y: y - 50,
      inputs: draggedNode.inputs,
      outputs: draggedNode.outputs,
      icon: draggedNode.icon,
      color: draggedNode.color,
    };

    setNodes(prev => [...prev, newNode]);
    setDraggedNode(null);
  }, [draggedNode]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const NodeComponent = ({ node }: { node: WorkflowNode }) => (
    <div
      className={`absolute cursor-move select-none transition-all duration-200 ${
        selectedNode === node.id ? 'scale-105 z-20' : 'z-10'
      }`}
      style={{ left: node.x, top: node.y }}
      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
    >
      <div className={`w-48 bg-gradient-to-r ${node.color} p-0.5 rounded-xl shadow-lg`}>
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">{node.icon}</span>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">{node.title}</h3>
              <p className="text-gray-400 text-xs">{node.description}</p>
            </div>
          </div>
          
          {/* Input/Output connectors */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-1">
              {Array.from({ length: node.inputs }).map((_, i) => (
                <div
                  key={`input-${i}`}
                  className="w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-400 hover:border-white cursor-pointer transition-colors"
                />
              ))}
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: node.outputs }).map((_, i) => (
                <div
                  key={`output-${i}`}
                  className="w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-400 hover:border-white cursor-pointer transition-colors"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex">
      {/* Node Library Sidebar */}
      <div className="w-80 border-r border-white/10 bg-black/20 backdrop-blur-xl p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Workflow Builder</h2>
          <p className="text-gray-400 text-sm">Drag nodes to the canvas to build your automation workflow</p>
        </div>

        <div className="space-y-4">
          {/* HR Ecosystem Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              🏢 HR Ecosystem
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'hr').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Team Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              🎯 Sales Team
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'sales').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Generator Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              🎨 Content Generator
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'content').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PR Bot Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              📢 PR Bot
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'pr').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Generation & CRM Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              🎯 Lead Gen & CRM
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'leadgen').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Intelligence & Sentiment Analysis Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              🧠 Social Intelligence
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'social').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Development & Innovation Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
              🚀 Product Development
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'product').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supply Chain & Operations Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              🏭 Supply Chain & Operations
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'operations').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial & Accounting Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              💰 Financial & Accounting
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'finance').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Support & Engagement Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              🎧 Customer Support
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'support').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Compliance Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              🛡️ Security & Compliance
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'security').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Intelligence & Profiling Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
              🎯 Customer Intelligence
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'profiler').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Hub & Executive Command Center Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              👑 Admin Hub
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'admin').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IT Support & System Management Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              🔧 IT Support
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'itsupport').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Intelligence & Specialized Scraping Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              🎬 Video Intelligence
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'videointel').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Customer Relations & Competitive Intelligence Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              💝 Customer Relations & Intel
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'relations').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Coordination & Corporate Branding Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              🎪 Events & Branding
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'events').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FunnelBots - Advanced Conversion & Campaign Optimization Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              🧠 FunnelBots Intelligence
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'funnelbots').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PPC Optimization & Budget Intelligence Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              🎯 PPC & Budget Intelligence
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'ppcbots').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Team Bot Ecosystem - Private/Internal Use Only */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              ⚖️ Legal Intelligence (Private)
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'legalbots').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg cursor-grab hover:bg-red-900/30 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-300">
              🔒 PRIVATE ACCESS ONLY - Not for client deployment
            </div>
          </div>

          {/* Client-Facing Legal Assistant Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              🤖 Legal Assistant (Client)
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'clientlegal').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg cursor-grab hover:bg-blue-900/30 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 p-2 bg-blue-900/20 border border-blue-500/30 rounded text-xs text-blue-300">
              🌟 CLIENT-FACING - Safe for customer deployment
            </div>
          </div>

          {/* Specialized Legal Expertise Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              ⚖️ Specialized Legal (Private)
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'speciallegal').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg cursor-grab hover:bg-red-900/30 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-300">
              🔒 ULTRA-PRIVATE - Family Law & Criminal Defense Expertise
            </div>
          </div>

          {/* CFS Defense & Child Protection Specialist Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              🛡️ CFS Defense (ULTRA-PRIVATE)
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'cfsdefense').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg cursor-grab hover:bg-red-900/40 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-300 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 p-2 bg-red-900/30 border border-red-500/50 rounded text-xs text-red-200">
              🚨 MAXIMUM SECURITY - CFS Defense & Child Protection Warfare
            </div>
          </div>

          {/* Reverse Engineering & Asset Analysis Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              🔍 Reverse Engineering
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'reverseeng').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Development Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              🎮 Game Development
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'gamedev').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BluePrinter Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              🎨 BluePrinter
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'blueprinter').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Section */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              ⚙️ General
            </h3>
            <div className="space-y-2">
              {nodeTypes.filter(node => node.category === 'general').map((node, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(node)}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{node.title}</div>
                      <div className="text-gray-400 text-xs">{node.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow Controls */}
        <div className="mt-8 space-y-3">
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200">
            Save Workflow
          </button>
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200">
            Test Workflow
          </button>
          <button 
            onClick={() => setNodes([])}
            className="w-full border border-red-500/50 text-red-400 hover:bg-red-500/10 py-2 px-4 rounded-lg font-medium transition-all duration-200"
          >
            Clear Canvas
          </button>
        </div>
      </div>

      {/* Workflow Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div
          ref={canvasRef}
          className="w-full h-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              linear-gradient(45deg, transparent 24%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.02) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.02) 75%, rgba(255, 255, 255, 0.02) 76%, transparent 77%),
              linear-gradient(-45deg, transparent 24%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.02) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.02) 75%, rgba(255, 255, 255, 0.02) 76%, transparent 77%)
            `,
            backgroundSize: '50px 50px, 50px 50px, 30px 30px, 30px 30px'
          }}
        >
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Welcome Message */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-white mb-2">Build Your AI Workflow</h3>
                <p className="text-gray-400 max-w-md">
                  Drag nodes from the sidebar to create automated workflows for your AI bot team. 
                  Connect triggers, actions, and conditions to build powerful automations.
                </p>
              </div>
            </div>
          )}

          {/* Render Nodes */}
          {nodes.map(node => (
            <NodeComponent key={node.id} node={node} />
          ))}

          {/* Selected Node Info */}
          {selectedNode && (
            <div className="absolute top-4 right-4 w-64 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4">
              <h4 className="text-white font-semibold mb-2">Node Properties</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white ml-2">{nodes.find(n => n.id === selectedNode)?.type}</span>
                </div>
                <div>
                  <span className="text-gray-400">Inputs:</span>
                  <span className="text-white ml-2">{nodes.find(n => n.id === selectedNode)?.inputs}</span>
                </div>
                <div>
                  <span className="text-gray-400">Outputs:</span>
                  <span className="text-white ml-2">{nodes.find(n => n.id === selectedNode)?.outputs}</span>
                </div>
              </div>
              <button 
                onClick={() => setNodes(prev => prev.filter(n => n.id !== selectedNode))}
                className="w-full mt-3 bg-red-500/20 border border-red-500/50 text-red-400 py-1 px-3 rounded text-xs hover:bg-red-500/30 transition-colors"
              >
                Delete Node
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
