'use client';

import { useState } from 'react';
import FlowBuilder from './flow-builder';

export default function PrivatePage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // This securely reads the password from your .env.local file
  const correctPassword = process.env.NEXT_PUBLIC_BLUEPRINTER_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading on submit
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
      setPassword(''); // Clear the input after a wrong attempt
    }
  };

  // If the user is NOT authenticated, show the login form.
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded-lg shadow-2xl w-full max-w-sm">
          <h1 className="text-white text-2xl font-bold mb-6 text-center">Enter Access Code</h1>
          <div className="mb-4">
            <label htmlFor="password-input" className="block text-gray-400 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="*********"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-lg transition-colors"
          >
            Access BluePrinter
          </button>
        </form>
      </div>
    );
  }

  // If the user IS authenticated, show the main FlowBuilder component.
  return <FlowBuilder />;
}
