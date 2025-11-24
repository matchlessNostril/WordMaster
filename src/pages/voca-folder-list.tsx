import React, { useState } from 'react';
import { BookOpen, Folder, FileText, ChevronDown, Plus, MoreVertical, Edit2, Trash2, X } from 'lucide-react';

export default function VocaFolderList() {
  const [folders, setFolders] = useState([
    { id: 1, name: '単語', type: 'folder', isOpen: false },
    { id: 2, name: '単位', type: 'folder', isOpen: false },
    { id: 3, name: '文法', type: 'folder', isOpen: false },
    { id: 4, name: 'E1', type: 'file', isOpen: false }
  ]);
  
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  const toggleFolder = (id) => {
    setFolders(folders.map(f => 
      f.id === id ? { ...f, isOpen: !f.isOpen } : f
    ));
  };

  const handleContextMenu = (e, item) => {
    e.stopPropagation();
    setContextMenu(contextMenu?.id === item.id ? null : item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-slate-900/50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-xl">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <span>Word Master</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-100">ソル 様の単語帳一覧</h1>
          
          {/* Create Button */}
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/30"
            >
              <Plus className="w-5 h-5" />
            </button>

            {/* Create Dropdown Menu */}
            {showCreateMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowCreateMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 backdrop-blur-xl border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
                  <button className="w-full px-4 py-3 text-left text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors flex items-center gap-3">
                    <Folder className="w-5 h-5 text-cyan-400" />
                    <span>新規フォルダを作成</span>
                  </button>
                  <button className="w-full px-4 py-3 text-left text-slate-200 hover:bg-blue-500/20 hover:text-blue-300 transition-colors flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span>新規単語帳を作成</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Folder/File List */}
        <div className="space-y-3">
          {folders.map((item) => (
            <div key={item.id} className="relative">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-lg hover:border-slate-600 transition-all">
                <div className="flex items-center gap-4 px-6 py-4">
                  {/* Icon */}
                  {item.type === 'folder' ? (
                    <Folder className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  ) : (
                    <FileText className="w-6 h-6 text-slate-400 flex-shrink-0" />
                  )}

                  {/* Name */}
                  <span className="flex-1 text-slate-200 font-medium text-lg">
                    {item.name}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {item.type === 'folder' && (
                      <button
                        onClick={() => toggleFolder(item.id)}
                        className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-all"
                      >
                        <ChevronDown 
                          className={`w-5 h-5 transition-transform ${item.isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                    
                    <div className="relative">
                      <button
                        onClick={(e) => handleContextMenu(e, item)}
                        className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-all"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Context Menu */}
                      {contextMenu?.id === item.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setContextMenu(null)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-slate-800 backdrop-blur-xl border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
                            <button 
                              className="w-full px-4 py-3 text-left text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors flex items-center gap-3"
                            >
                              <Edit2 className="w-4 h-4" />
                              <span>名前を変更</span>
                            </button>
                            <button 
                              className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors flex items-center gap-3"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>削除</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}