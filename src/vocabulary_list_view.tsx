import React, { useState } from 'react';

const VocabularyListView = () => {
  const [sortBy, setSortBy] = useState('word'); // 'word' or 'meaning'
  const [showFilters, setShowFilters] = useState({
    hideAnswers: false
  });

  const vocabularyData = [
    {
      id: 1,
      word: '七十',
      meaning: '70',
      pronunciation: 'ななじゅう・しちじゅう',
      description: '',
      example: ''
    },
    {
      id: 2,
      word: '三百',
      meaning: '300',
      pronunciation: 'さんびゃく',
      description: '',
      example: ''
    },
    {
      id: 3,
      word: '六百',
      meaning: '600',
      pronunciation: 'ろっぴゃく',
      description: '',
      example: ''
    },
    {
      id: 4,
      word: '八百',
      meaning: '800',
      pronunciation: 'はっぴゃく',
      description: '',
      example: ''
    }
  ];

  const toggleFilter = (filter) => {
    setShowFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            숫자 읽기
          </h1>
          <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold shadow-lg hover:shadow-cyan-500/25 transition-all">
            編集
          </button>
        </div>

        {/* 정렬 및 필터 옵션 */}
        <div className="mb-6 flex items-center justify-between">
          {/* 정렬 라디오 버튼 */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSortBy('word')}
              className="flex items-center gap-3 group"
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                sortBy === 'word'
                  ? 'border-cyan-400 bg-cyan-500/20'
                  : 'border-slate-600 group-hover:border-slate-500'
              }`}>
                {sortBy === 'word' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                sortBy === 'word' ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'
              }`}>
                単語
              </span>
            </button>

            <button
              onClick={() => setSortBy('meaning')}
              className="flex items-center gap-3 group"
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                sortBy === 'meaning'
                  ? 'border-cyan-400 bg-cyan-500/20'
                  : 'border-slate-600 group-hover:border-slate-500'
              }`}>
                {sortBy === 'meaning' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                sortBy === 'meaning' ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'
              }`}>
                意味
              </span>
            </button>
          </div>

          {/* 답 숨기기 칩 버튼 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(prev => ({ ...prev, hideAnswers: !prev.hideAnswers }))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showFilters.hideAnswers
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              答えを隠す
            </button>
          </div>
        </div>

        {/* 단어 카드 리스트 */}
        <div className="space-y-4">
          {vocabularyData.map((item, index) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-slate-800/80 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl hover:border-cyan-500/30 transition-all"
            >
              <div className="grid grid-cols-12 gap-6 p-6">
                {/* 번호 */}
                <div className="col-span-1 flex items-start justify-center pt-2">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* 왼쪽: 메인 필드 */}
                <div className="col-span-5">
                  <label className="block text-slate-400 text-sm mb-2">
                    {sortBy === 'word' ? '単語' : '意味'}
                  </label>
                  <div className="text-slate-200 text-lg font-medium">
                    {sortBy === 'word' ? item.word : item.meaning}
                  </div>
                </div>

                {/* 구분선 */}
                <div className="col-span-6 relative flex items-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700/50"></div>
                  </div>
                </div>

                {/* 오른쪽: 나머지 필드들 */}
                <div className="col-span-6 space-y-4">
                  {!showFilters.hideAnswers ? (
                    <>
                      <div>
                        <label className="block text-slate-400 text-sm mb-2">
                          {sortBy === 'word' ? '意味' : '単語'}
                        </label>
                        <div className="text-slate-200">
                          {sortBy === 'word' ? item.meaning : item.word}
                        </div>
                      </div>

                      {item.pronunciation && (
                        <div>
                          <label className="block text-slate-400 text-sm mb-2">
                            発音
                          </label>
                          <div className="text-slate-200">
                            {item.pronunciation}
                          </div>
                        </div>
                      )}

                      {item.description && (
                        <div>
                          <label className="block text-slate-400 text-sm mb-2">
                            説明
                          </label>
                          <div className="text-slate-200">
                            {item.description}
                          </div>
                        </div>
                      )}

                      {item.example && (
                        <div>
                          <label className="block text-slate-400 text-sm mb-2">
                            例文
                          </label>
                          <div className="text-slate-200">
                            {item.example}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <button
                        onClick={() => setShowFilters(prev => ({ ...prev, hideAnswers: false }))}
                        className="group relative px-6 py-3 rounded-xl bg-slate-700/30 border border-slate-600/50 hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 flex items-center justify-center transition-all">
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                          <span className="text-slate-400 group-hover:text-cyan-400 text-sm font-medium transition-colors">
                            答えを表示
                          </span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VocabularyListView;