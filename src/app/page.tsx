'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { ExperienceCard } from '@/components/ExperienceCard';
import { FilterSystem } from '@/components/FilterSystem';
import { NavigationBar } from '@/components/NavigationBar';
import { SAMPLE_EXPERIENCES } from '@/data/experiences';
import { Experience } from '@/types/experience';

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>(SAMPLE_EXPERIENCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  // フィルタリングされた体験談
  const filteredExperiences = useMemo(() => {
    return experiences.filter(experience => {
      // 検索クエリでフィルタリング
      const matchesSearch = searchQuery === '' || 
        experience.catchCopy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.mainCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.smallTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // カテゴリでフィルタリング
      const matchesCategory = !selectedMainCategory || 
        (experience.mainCategory === selectedMainCategory && 
         (!selectedSubCategory || experience.subCategory === selectedSubCategory));

      return matchesSearch && matchesCategory;
    });
  }, [experiences, searchQuery, selectedMainCategory, selectedSubCategory]);

  // いいねボタンの処理
  const handleLike = (id: string) => {
    setExperiences(prev => 
      prev.map(exp => 
        exp.id === id 
          ? { 
              ...exp, 
              isLiked: !exp.isLiked, 
              likes: exp.isLiked ? exp.likes - 1 : exp.likes + 1 
            }
          : exp
      )
    );
  };

  // フィルター変更の処理
  const handleFilterChange = (mainCategory: string | null, subCategory: string | null) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory(subCategory);
  };

  // 体験談投稿ボタンの処理
  const handlePostExperience = () => {
    alert('体験談投稿ページは未実装です');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Experience</h1>
          </div>
          
          {/* 検索欄とフィルターボタン */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="カテゴリを自由入力..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <FilterSystem
              selectedMainCategory={selectedMainCategory}
              selectedSubCategory={selectedSubCategory}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* おすすめ体験談セクション */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            おすすめ体験談
            {(selectedMainCategory || searchQuery) && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({filteredExperiences.length}件)
              </span>
            )}
          </h2>
          
          {filteredExperiences.length > 0 ? (
            <div className="space-y-6">
              {filteredExperiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  onLike={handleLike}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <p className="text-gray-600 text-lg mb-2">該当する体験談が見つかりませんでした</p>
              <p className="text-gray-500 text-sm">
                検索条件やフィルターを変更してみてください
              </p>
            </div>
          )}
        </section>

        {/* 体験談投稿ボタン */}
        <div className="fixed bottom-20 right-4 z-30">
          <button
            onClick={handlePostExperience}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus size={24} />
            <span className="hidden sm:inline font-medium">体験談を投稿する</span>
          </button>
        </div>
      </main>

      {/* ナビゲーションバー */}
      <NavigationBar activeTab="home" />
    </div>
  );
}