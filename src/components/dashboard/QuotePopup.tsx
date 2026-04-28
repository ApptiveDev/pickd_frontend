import { useState } from "react";

const QUOTES = [
  "어제의 나보다 오늘의 내가 더 낫다면, 그걸로 충분해요.",
  "포기하지 마세요. 시작은 언제나 힘든 법입니다.",
  "당신의 노력이 결실을 맺을 날이 머지 않았어요!",
  "오늘도 한 걸음 더 가까이, 화이팅!",
];

export const QuotePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");

  const handleOpen = () => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setCurrentQuote(QUOTES[randomIndex]);
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      {" "}
      {/* 기준점 */}
      {/* 아이콘 버튼 */}
      <button
        onClick={handleOpen}
        className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
      >
        😊
      </button>
      {/* 팝업 창 */}
      {isOpen && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 p-4 bg-white rounded-xl shadow-2xl border border-gray-100 z-10 animate-fade-in">
          {/* 상단 닫기 버튼 */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 font-sans text-xl leading-none"
          >
            &times;
          </button>

          {/* 내용 */}
          <div className="flex items-start gap-3 mt-2">
            <span className="text-lg pt-0.5">✨</span>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-gray-800 leading-relaxed">
                {currentQuote}
              </p>
              <p className="text-xs text-gray-400 text-left">
                — Pickd가 응원합니다
              </p>
            </div>
          </div>

          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>
        </div>
      )}
    </div>
  );
};
