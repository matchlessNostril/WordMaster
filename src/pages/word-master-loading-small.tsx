import React from 'react';
import { BookOpen } from 'lucide-react';

// Small inline loader component
function SmallLoader() {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Spinning ring */}
      <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-cyan-500 animate-spin"></div>
    </div>
  );
}

// Medium loader with icon
function MediumLoader() {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer ring */}
      <div className="absolute w-12 h-12 rounded-full border-2 border-slate-700 border-t-cyan-500 animate-spin"></div>
      {/* Inner icon */}
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
        <BookOpen className="w-3 h-3 text-white" />
      </div>
    </div>
  );
}

// Dots loader
function DotsLoader() {
  return (
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
}

// Pulse loader
function PulseLoader() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse shadow-lg shadow-cyan-500/50"></div>
  );
}

// Demo showcase
export default function LoadingComponents() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-slate-200 text-center mb-12">Loading Components</h1>
        
        {/* Small Loader */}
        <div className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
          <h2 className="text-slate-300 font-semibold mb-4">Small Spinner</h2>
          <div className="flex items-center gap-4">
            <SmallLoader />
            <span className="text-slate-400 text-sm">Inline loading...</span>
          </div>
        </div>

        {/* Medium Loader */}
        <div className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
          <h2 className="text-slate-300 font-semibold mb-4">Medium Loader with Icon</h2>
          <div className="flex items-center gap-4">
            <MediumLoader />
            <span className="text-slate-400 text-sm">Loading content...</span>
          </div>
        </div>

        {/* Dots Loader */}
        <div className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
          <h2 className="text-slate-300 font-semibold mb-4">Dots Loader</h2>
          <div className="flex items-center gap-4">
            <DotsLoader />
            <span className="text-slate-400 text-sm">Processing...</span>
          </div>
        </div>

        {/* Pulse Loader */}
        <div className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
          <h2 className="text-slate-300 font-semibold mb-4">Pulse Loader</h2>
          <div className="flex items-center gap-4">
            <PulseLoader />
            <span className="text-slate-400 text-sm">Syncing...</span>
          </div>
        </div>

        {/* Button Examples */}
        <div className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
          <h2 className="text-slate-300 font-semibold mb-4">In Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg cursor-not-allowed opacity-75">
              <SmallLoader />
              <span>Loading...</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg cursor-not-allowed opacity-75">
              <DotsLoader />
              <span>処理中...</span>
            </button>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg cursor-not-allowed opacity-75">
              <MediumLoader />
              <span className="ml-2">保存中...</span>
            </button>
          </div>
        </div>

        {/* Card Loading State */}
        <div className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
          <h2 className="text-slate-300 font-semibold mb-4">Card Loading State</h2>
          <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700 flex flex-col items-center justify-center space-y-3 min-h-[200px]">
            <MediumLoader />
            <p className="text-slate-400 text-sm">データを読み込んでいます...</p>
          </div>
        </div>
      </div>
    </div>
  );
}