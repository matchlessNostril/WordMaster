import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X, XCircle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const styles = {
    success: 'from-cyan-500/90 to-blue-500/90 text-white border-cyan-400/50',
    error: 'from-red-500/90 to-rose-500/90 text-white border-red-400/50',
    warning: 'from-amber-500/90 to-orange-500/90 text-white border-amber-400/50',
    info: 'from-slate-600/90 to-slate-700/90 text-white border-slate-500/50'
  };

  return (
    <div className={`flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${styles[type]} backdrop-blur-xl rounded-xl border shadow-2xl min-w-[320px] max-w-md animate-slide-in`}>
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="flex-1 font-medium text-sm">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function ToastDemo() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Demo Controls */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Toast Component Demo</h1>
          <p className="text-slate-400 mb-8">Word Master 디자인 스타일의 토스트 알림</p>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => addToast('로그인에 성공했습니다!', 'success')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/30"
            >
              Success Toast
            </button>
            <button
              onClick={() => addToast('이메일 또는 비밀번호가 올바르지 않습니다.', 'error')}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-red-500/30"
            >
              Error Toast
            </button>
            <button
              onClick={() => addToast('비밀번호는 8자 이상이어야 합니다.', 'warning')}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-amber-500/30"
            >
              Warning Toast
            </button>
            <button
              onClick={() => addToast('새로운 기능이 추가되었습니다.', 'info')}
              className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-medium rounded-lg transition-all shadow-lg shadow-slate-500/30"
            >
              Info Toast
            </button>
          </div>

          {/* Usage Code */}
          <div className="mt-8 bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-300 text-sm font-mono">
              {`<Toast
  message="메시지 내용"
  type="success | error | warning | info"
  onClose={() => {}}
  duration={3000}
/>`}
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}