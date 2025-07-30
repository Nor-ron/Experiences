'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '@/types/experience';
import { Filter, X } from 'lucide-react';

interface FilterSystemProps {
  selectedMainCategory: string | null;
  selectedSubCategory: string | null;
  onFilterChange: (mainCategory: string | null, subCategory: string | null) => void;
}

export const FilterSystem: React.FC<FilterSystemProps> = ({
  selectedMainCategory,
  selectedSubCategory,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [hoveredMainCategory, setHoveredMainCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowSubCategories(false);
        setHoveredMainCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMainCategoryClick = (categoryName: string) => {
    setHoveredMainCategory(categoryName);
    setShowSubCategories(true);
  };

  const handleSubCategoryClick = (mainCategory: string, subCategory: string) => {
    onFilterChange(mainCategory, subCategory);
    setIsOpen(false);
    setShowSubCategories(false);
    setHoveredMainCategory(null);
  };

  const handleClearFilter = () => {
    onFilterChange(null, null);
    setIsOpen(false);
    setShowSubCategories(false);
    setHoveredMainCategory(null);
  };

  const getSelectedCategory = () => {
    if (selectedMainCategory && selectedSubCategory) {
      return `${selectedMainCategory} > ${selectedSubCategory}`;
    }
    return null;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
          selectedMainCategory
            ? 'bg-blue-50 border-blue-200 text-blue-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Filter size={16} />
        <span className="text-sm font-medium">
          {getSelectedCategory() || 'フィルター'}
        </span>
      </button>

      {/* フィルタークリアボタン */}
      {selectedMainCategory && (
        <button
          onClick={handleClearFilter}
          className="absolute -top-2 -right-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1 transition-colors duration-200"
        >
          <X size={12} />
        </button>
      )}

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-64">
          {!showSubCategories ? (
            /* 大カテゴリ一覧 */
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                カテゴリを選択
              </div>
              {CATEGORIES.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleMainCategoryClick(category.name)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between group"
                >
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-600">
                    {category.subcategories.length} 項目
                  </span>
                </button>
              ))}
            </div>
          ) : (
            /* 中カテゴリ一覧 */
            <div className="py-2">
              <div className="flex items-center px-4 py-2 border-b border-gray-100">
                <button
                  onClick={() => {
                    setShowSubCategories(false);
                    setHoveredMainCategory(null);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  ← 戻る
                </button>
                <span className="ml-2 text-sm text-gray-500">
                  {hoveredMainCategory}
                </span>
              </div>
              {hoveredMainCategory &&
                CATEGORIES.find(cat => cat.name === hoveredMainCategory)?.subcategories.map((subCategory, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubCategoryClick(hoveredMainCategory, subCategory)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span className="text-sm text-gray-700 hover:text-gray-900">
                      {subCategory}
                    </span>
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};