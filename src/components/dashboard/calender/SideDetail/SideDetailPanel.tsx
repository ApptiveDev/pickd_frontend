import React from "react";
import { ChevronDown, Plus } from "lucide-react";
import ProgressCircle from "./ProgressCircle";
import SectionHeader from "./SectionHeader";
import TodoItem from "./TodoItem";
import AnnouncementItem from "./AnnouncementItem";

const SideDetailPanel = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="w-[400px] h-full bg-white border-l border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{formattedDate}</h2>
          <p className="text-sm text-gray-500 mt-1">오늘의 진행률</p>
        </div>
        <ProgressCircle percentage={13} />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* 2. 다가오는 공고 섹션 */}
        <section className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-1 mb-4">
            <ChevronDown size={18} className="text-gray-400" />
            <span className="font-semibold text-gray-700">다가오는 공고</span>
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
              5
            </span>
          </div>

          <div className="space-y-4">
            <AnnouncementItem
              title="HR"
              company="SK하이닉스"
              step="면접 전형"
              dday="D-Day"
              isHighPriority
            />
            <AnnouncementItem
              title="프론트엔드 개발"
              company="네이버"
              step="서류 전형"
              dday="D-1"
            />
            <AnnouncementItem
              title="사무직"
              company="한국전력공사"
              step="서류 전형"
              dday="D-3"
            />
          </div>
          <button className="w-full text-center text-sm text-gray-400 mt-4 hover:underline">
            더보기 +2
          </button>
        </section>

        {/* 3. 오늘 일정 & 할 일 섹션 */}
        <section className="p-6">
          <SectionHeader title="오늘 일정" count={1} />
          <div className="mt-3 p-4 bg-gray-50 rounded-xl flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">
                1차 면접{" "}
                <span className="text-gray-400 ml-2 text-sm font-normal">
                  SK하이닉스
                </span>
              </p>
            </div>
            <span className="text-sm text-gray-500">14:00</span>
          </div>

          <div className="mt-8">
            <SectionHeader title="오늘 할 일" count={8} />
            <div className="mt-4 space-y-3">
              <TodoItem
                task="LG전자 자기소개서 수정"
                company="LG전자"
                time="13:00"
                priority="긴급"
                isOverdue
              />
              <TodoItem
                task="현대자동차 면접 예상질문 정리"
                company="현대자동차"
                time="15:00"
                priority="보통"
                isOverdue
              />
              <TodoItem
                task="삼성전자 자소서 최종 검토"
                company="삼성전자"
                time="18:00"
                priority="긴급"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SideDetailPanel;
