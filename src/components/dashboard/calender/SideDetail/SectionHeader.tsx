import React from 'react';
import { Plus } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  count?: number;
}

const SectionHeader = ({ title, count }: SectionHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        {/* 개수 표시 배지 */}
        {count !== undefined && (
          <span className="flex items-center justify-center w-5 h-5 bg-gray-200 text-gray-500 text-[11px] font-bold rounded-full">
            {count}
          </span>
        )}
      </div>
      
      {/* 우측 추가 버튼 */}
      <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
        <Plus size={20} className="text-gray-400" />
      </button>
    </div>
  );
};

export default SectionHeader;