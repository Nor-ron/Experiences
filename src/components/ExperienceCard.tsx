'use client';

import React, { useState } from 'react';
import { Experience } from '@/types/experience';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
  onLike: (id: string) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onLike }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(experience.id);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer"
      onClick={toggleExpanded}
    >
      {/* キャッチコピー */}
      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-relaxed">
        {experience.catchCopy}
      </h3>

      {/* 要約 */}
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        {experience.summary}
      </p>

      {/* カテゴリタグ */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
          {experience.mainCategory}
        </span>
        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
          {experience.subCategory}
        </span>
      </div>

      {/* 展開された詳細情報 */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          {/* 本文 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">本文</h4>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
              {experience.content}
            </div>
          </div>

          {/* タグセクション */}
          <div className="space-y-4">
            {/* 小タグ */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">小タグ</h4>
              <div className="flex flex-wrap gap-2">
                {experience.smallTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 感情タグ */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">感情タグ</h4>
              <div className="flex flex-wrap gap-2">
                {experience.emotionTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 文脈タグ */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">文脈タグ</h4>
              <div className="flex flex-wrap gap-2">
                {experience.contextTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 下部のアクション */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-gray-500">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span className="ml-1 text-sm">
            {isExpanded ? '閉じる' : '詳細を見る'}
          </span>
        </div>
        
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors duration-200 ${
            experience.isLiked
              ? 'bg-red-50 text-red-600 hover:bg-red-100'
              : 'text-gray-500 hover:bg-gray-50 hover:text-red-600'
          }`}
        >
          <Heart
            size={16}
            className={experience.isLiked ? 'fill-current' : ''}
          />
          <span className="text-sm font-medium">{experience.likes}</span>
        </button>
      </div>
    </div>
  );
};