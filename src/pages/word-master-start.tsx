import React from 'react';
import { BookOpen, LogIn } from 'lucide-react';

export default function StartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-slate-900/50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-xl">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <span>WM</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
            <LogIn className="w-4 h-4" />
            <span className="font-medium">Login</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Logo */}
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black tracking-tight">
              <span className="inline-block bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-2xl" style={{
                filter: 'drop-shadow(0 0 30px rgba(148, 163, 184, 0.3))'
              }}>
                WORD
              </span>
              <br />
              <span className="inline-block bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-2xl" style={{
                filter: 'drop-shadow(0 0 30px rgba(148, 163, 184, 0.3))'
              }}>
                MASTER
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 font-medium">
            自分だけの単語帳、自分だけのテスト
          </p>

          {/* Features */}
          <div className="flex flex-col md:flex-row gap-6 pt-12 justify-center">
            <button className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 hover:scale-105 transition-all duration-300 group cursor-pointer w-full md:w-64">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-shadow">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-slate-200 font-bold text-lg mb-2">単語帳作成</h3>
              <p className="text-slate-400 text-sm">自分だけのオリジナル単語帳を簡単に作成</p>
            </button>
            
            <button className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 hover:scale-105 transition-all duration-300 group cursor-pointer w-full md:w-64">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-slate-200 font-bold text-lg mb-2">テスト機能</h3>
              <p className="text-slate-400 text-sm">効率的な学習をサポートするテスト</p>
            </button>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </div>
  );
}