import { useState, useMemo } from "react";
import QUOTES from "../../constants/quotes.json";

export const QuotePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentQuote = useMemo(() => {
    const today = new Date();
    const dateSeed = 
      today.getFullYear() * 10000 + 
      (today.getMonth() + 1) * 100 + 
      today.getDate();
    
    const index = dateSeed % QUOTES.length;
    return QUOTES[index];
  }, []);

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      {/* 임시 아이콘 */}
      <button
        onClick={togglePopup}
        className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="오늘의 명언 보기"
      >
        😊
      </button>

      {/* 팝업 창 */}
      {isOpen && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 p-4 bg-white rounded-xl shadow-2xl border border-gray-100 z-10 animate-fade-in">
          {/* 닫기 버튼 */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 font-sans text-xl leading-none"
          >
            &times;
          </button>

          {/* 명언 내용 섹션 */}
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