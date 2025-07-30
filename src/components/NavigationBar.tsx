'use client';

import React from 'react';
import { Home, PlusCircle, User } from 'lucide-react';

interface NavigationBarProps {
  activeTab?: 'home' | 'post' | 'user';
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab = 'home' }) => {
  const handlePostClick = () => {
    // 体験談投稿ページへの遷移（未実装）
    alert('体験談投稿ページは未実装です');
  };

  const handleUserClick = () => {
    // ユーザーページへの遷移（未実装）
    alert('ユーザーページは未実装です');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {/* ホーム */}
        <button
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
            activeTab === 'home'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Home size={24} className={activeTab === 'home' ? 'fill-current' : ''} />
          <span className="text-xs mt-1 font-medium">ホーム</span>
        </button>

        {/* 投稿 */}
        <button
          onClick={handlePostClick}
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
            activeTab === 'post'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <PlusCircle size={24} className={activeTab === 'post' ? 'fill-current' : ''} />
          <span className="text-xs mt-1 font-medium">投稿</span>
        </button>

        {/* ユーザー */}
        <button
          onClick={handleUserClick}
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
            activeTab === 'user'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <User size={24} className={activeTab === 'user' ? 'fill-current' : ''} />
          <span className="text-xs mt-1 font-medium">ユーザー</span>
        </button>
      </div>
    </div>
  );
};