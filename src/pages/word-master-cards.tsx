import React from 'react';
import { BookOpen, FileText, Folder, Target } from 'lucide-react';

export default function WordMasterCards() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl font-bold text-slate-100">Word Master</h1>
          </div>
          <p className="text-slate-400 text-lg">단어장과 테스트로 효율적인 학습을 시작하세요</p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* VOCA Card */}
          <div className="group bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            {/* Icon Container */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 shadow-lg shadow-cyan-500/30">
                <Folder className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-5xl font-black text-slate-100 mb-4 tracking-tight">
              VOCA
            </h2>

            {/* Description */}
            <div className="space-y-2 text-slate-300">
              <p className="text-lg leading-relaxed">
                폴더를 작성하여,
              </p>
              <p className="text-lg leading-relaxed">
                좋아하는 위치에 단어장을 작성할 수 있어요.
              </p>
              <p className="text-lg leading-relaxed">
                체계적인 단어장 사이트를
              </p>
              <p className="text-lg leading-relaxed font-semibold text-cyan-400">
                만들어봅시다!
              </p>
            </div>

            {/* Bottom Accent */}
            <div className="mt-8 flex items-center gap-2 text-cyan-400 font-medium">
              <span>단어장 만들기</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* TEST Card */}
          <div className="group bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            {/* Icon Container */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-6 shadow-lg shadow-blue-500/30">
                <Target className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-5xl font-black text-slate-100 mb-4 tracking-tight">
              TEST
            </h2>

            {/* Description */}
            <div className="space-y-2 text-slate-300">
              <p className="text-lg leading-relaxed">
                테스트하고 싶은 단어장을 선택해서,
              </p>
              <p className="text-lg leading-relaxed">
                테스트를 받아보세요.
              </p>
              <p className="text-lg leading-relaxed">
                오답 풀었던 단어장은, 정답률이 나와
              </p>
              <p className="text-lg leading-relaxed font-semibold text-blue-400">
                복습하기 쉬워집니다!
              </p>
            </div>

            {/* Bottom Accent */}
            <div className="mt-8 flex items-center gap-2 text-blue-400 font-medium">
              <span>테스트 시작하기</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl border border-slate-700/30 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-slate-200 font-semibold mb-2">자유로운 구성</h3>
            <p className="text-slate-400 text-sm">폴더와 단어장을 원하는 대로 구성하세요</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl border border-slate-700/30 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-slate-200 font-semibold mb-2">스마트 테스트</h3>
            <p className="text-slate-400 text-sm">정답률 기반 맞춤형 복습 시스템</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl border border-slate-700/30 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-slate-200 font-semibold mb-2">학습 기록</h3>
            <p className="text-slate-400 text-sm">나의 학습 진도를 한눈에 확인하세요</p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}