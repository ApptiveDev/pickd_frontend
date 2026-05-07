// src/pages/CalendarScreen.tsx
import React from 'react';
import MainCalendar from '../components/dashboard/calender/MainCalender';
import Schedulebar from '../components/dashboard/calender/Schedulebar';
import Deadlinebar from '../components/dashboard/calender/Deadlinebar';

const CalendarScreen = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Schedulebar />

      {/* 2. 중앙 메인 영역 (헤더 + 캘린더) */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 상단 네비게이션 */}
        <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">2026년 4월</span>
          </div>
          {/* 뷰 전환 버튼 (월, 주, 목록) */}
        </header>

        <div className="flex-1 overflow-auto">
          <MainCalendar />
        </div>
      </main>

      <Deadlinebar />
    </div>
  );
};

export default CalendarScreen;