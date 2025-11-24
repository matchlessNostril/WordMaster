import React, { useState } from "react";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText = "作成",
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">{children}</div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-8 py-6 border-t border-slate-700/50">
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/30"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Demo
export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg"
      >
        モーダルを開く
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="新規フォルダ作成"
        confirmText="作成"
        onConfirm={() => {
          console.log("Confirmed");
          setIsOpen(false);
        }}
      >
        {/* ここにコンテンツを入れる */}
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              フォルダ名
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              placeholder="フォルダ名を入力"
            />
          </div>
          <p className="text-slate-400 text-sm">
            すでに存在する名前は作成できません。また、「.#$[]」記号は入れられません。
          </p>
        </div>
      </Modal>
    </div>
  );
}
