import React, { useState } from 'react';

// UI를 고려하여, 직접 달력 그리드를 구현하는 컴포넌트
const CalendarGrid = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3)); // 2026년 4월 (월은 0부터 시작)

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 해당 월의 첫 번째 날과 마지막 날 계산
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0(일) ~ 6(토)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 그리드에 표시할 날짜 배열 생성 (이전 달 빈칸 포함)
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="flex flex-col w-full h-full bg-white border-l border-t border-gray-200">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayNames.map((day) => (
          <div key={day} className="py-2 text-center text-sm font-medium text-gray-500 border-r border-gray-200">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 flex-grow">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className="min-h-[120px] p-2 border-r border-b border-gray-200 flex flex-col gap-1 transition-colors hover:bg-gray-50"
          >
            {day && (
              <>
                <span className={`text-sm font-semibold ${day === 9 ? 'bg-black text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-700'}`}>
                  {day}
                </span>
                
                {/* 일정 예시 (데이터에 따라 렌더링) */}
                {day === 8 && (
                  <div className="text-[10px] p-1 bg-purple-50 text-purple-600 rounded border border-purple-100">
                    👤 AI 자소서 초안 작성
                  </div>
                )}
                {day === 10 && (
                  <div className="text-[10px] p-1 bg-blue-50 text-blue-600 rounded border border-blue-100 flex justify-between">
                    <span>🏢 삼성전자 서류 마감</span>
                    <span className="font-bold text-red-500">D-1</span>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;