import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

const VocabularyCardCreator = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      word: "",
      pronunciation: "",
      hasPronunciation: true,
      meaning: "",
      description: "",
      hasDescription: true,
      example: "",
      hasExample: false,
    },
    {
      id: 2,
      word: "",
      pronunciation: "",
      hasPronunciation: false,
      meaning: "",
      description: "",
      hasDescription: true,
      example: "",
      hasExample: true,
    },
  ]);
  const [folderName, setFolderName] = useState("");

  const addCard = () => {
    const newId = Math.max(...cards.map((c) => c.id)) + 1;
    setCards([
      ...cards,
      {
        id: newId,
        word: "",
        pronunciation: "",
        hasPronunciation: false,
        meaning: "",
        description: "",
        hasDescription: true,
        example: "",
        hasExample: false,
      },
    ]);
  };

  const deleteCard = (id) => {
    if (cards.length > 1) {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  const updateCard = (id, field, value) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const toggleField = (id, field) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, [field]: !card[field] } : card
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              新規単語帳を作成
            </h1>
            <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold shadow-lg hover:shadow-cyan-500/25 transition-all">
              作成
            </button>
          </div>

          {/* 단어장명 입력 */}
          <div className="mb-8">
            <label className="block text-slate-200 text-sm font-medium mb-3">
              単語帳名
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="単語帳名を入力してください。"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>
        </div>

        {/* 카드 리스트 */}
        <div className="space-y-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="relative bg-gradient-to-br from-slate-800/80 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl p-6 hover:border-cyan-500/30 transition-all"
            >
              {/* 카드 헤더 */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 font-bold">
                    {index + 1}
                  </div>
                </div>
                <button
                  onClick={() => deleteCard(card.id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"
                  disabled={cards.length === 1}
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* 입력 필드들 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-16">
                {/* 왼쪽 컬럼 */}
                <div className="space-y-5">
                  {/* 単語 */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      単語
                    </label>
                    <input
                      type="text"
                      value={card.word}
                      onChange={(e) =>
                        updateCard(card.id, "word", e.target.value)
                      }
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  {/* 発音 */}
                  {card.hasPronunciation && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        発音
                      </label>
                      <input
                        type="text"
                        value={card.pronunciation}
                        onChange={(e) =>
                          updateCard(card.id, "pronunciation", e.target.value)
                        }
                        placeholder="発音"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                  )}
                </div>

                {/* 오른쪽 컬럼 */}
                <div className="space-y-5">
                  {/* 意味 */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      意味
                    </label>
                    <input
                      type="text"
                      value={card.meaning}
                      onChange={(e) =>
                        updateCard(card.id, "meaning", e.target.value)
                      }
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  {/* 説明 */}
                  {card.hasDescription && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        説明
                      </label>
                      <input
                        type="text"
                        value={card.description}
                        onChange={(e) =>
                          updateCard(card.id, "description", e.target.value)
                        }
                        placeholder="説明"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                  )}

                  {/* 例文 */}
                  {card.hasExample && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        例文
                      </label>
                      <input
                        type="text"
                        value={card.example}
                        onChange={(e) =>
                          updateCard(card.id, "example", e.target.value)
                        }
                        placeholder="例文"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 토글 칩 그룹 */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleField(card.id, "hasPronunciation")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    card.hasPronunciation
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
                  }`}
                >
                  発音
                </button>
                <button
                  onClick={() => toggleField(card.id, "hasDescription")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    card.hasDescription
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
                  }`}
                >
                  説明
                </button>
                <button
                  onClick={() => toggleField(card.id, "hasExample")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    card.hasExample
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
                  }`}
                >
                  例文
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 카드 추가 버튼 */}
        <button
          onClick={addCard}
          className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-slate-700/50 to-slate-700/30 border-2 border-dashed border-slate-600 hover:border-cyan-500 hover:from-cyan-500/10 hover:to-blue-500/10 text-slate-400 hover:text-cyan-400 font-medium transition-all flex items-center justify-center gap-2 group"
        >
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform"
          />
          カードを追加
        </button>
      </div>
    </div>
  );
};

export default VocabularyCardCreator;
