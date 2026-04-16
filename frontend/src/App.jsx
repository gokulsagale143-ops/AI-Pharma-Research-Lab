import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-pharma-dark text-pharma-light font-sans selection:bg-pharma-teal selection:text-pharma-dark">
      <nav className="border-b border-pharma-teal/20 bg-pharma-blue/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pharma-teal to-pharma-blue flex items-center justify-center">
                <span className="text-pharma-dark font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">AI Pharma Research Lab</span>
            </div>
            <div className="text-sm font-medium text-pharma-light/70 hover:text-pharma-teal cursor-pointer transition-colors">
              R&D Department Portal
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pharma-teal rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pharma-blue rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <Dashboard />
      </main>
    </div>
  );
}

export default App;