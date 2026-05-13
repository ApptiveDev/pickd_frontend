import React from 'react';
import { Star } from 'lucide-react';

interface AnnouncementProps {
  title: string;      // 공고 제목 (예: 프론트엔드 개발)
  company: string;    // 기업명 (예: 네이버)
  step: string;       // 전형 단계 (예: 서류 전형)
  dday: string;       // 디데이 (예: D-1)
  isHighPriority?: boolean; // 중요 표시 (노란 별 여부)
}

const AnnouncementItem = ({ title, company, step, dday, isHighPriority }: AnnouncementProps) => {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3">
        {/* 별 아이콘: 중요도에 따라 색상 변경 */}
        <Star 
          size={18} 
          className={`${isHighPriority ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} group-hover:scale-110 transition-transform`} 
        />
        
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-gray-800 leading-none">{title}</h4>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">{company}</span>
            <span className="text-[10px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded">
              {step}
            </span>
          </div>
        </div>
      </div>

      {/* D-Day 배지: 이미지처럼 부드러운 빨간/노란 톤 적용 */}
      <div className={`text-[10px] font-bold px-2 py-1 rounded-md ${
        dday === 'D-Day' || dday === 'D-1' 
          ? 'bg-red-50 text-red-500' 
          : 'bg-yellow-50 text-yellow-600'
      }`}>
        {dday}
      </div>
    </div>
  );
};

export default AnnouncementItem;