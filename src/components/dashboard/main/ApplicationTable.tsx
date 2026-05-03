import ApplicationState from "./ApplicationState";
import { useApplication } from "../../../context/ApplicationContext";
import { useState } from "react";

const getDDay = (deadline?: string) => {
  if (!deadline) return "-";

  const end = new Date(deadline);
  if (isNaN(end.getTime())) return "-";

  const today = new Date();
  const diff = Math.ceil(
    (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diff < 0) return "마감";
  if (diff === 0) return "D-Day";
  return `D-${diff}`;
};

export default function ApplicationTable() {
  const { applications } = useApplication();

  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const toggleCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const toggleFilter = (type: string) => {
    setIsOpen((prev) => (prev === type ? null : type));
    setFilterType(type);
  };

  const tempRows = [
    {
      id: 1,
      company: "삼성전자",
      jobTitle: "SW 엔지니어",
      position: "풀스택",
      industry: "제조전자",
      deadlineDate: "2026-04-30",
      status: "지원완료",
    },
    {
      id: 2,
      company: "네이버",
      jobTitle: "프론트엔드 개발자",
      position: "프론트엔드",
      industry: "IT/테크",
      deadlineDate: "2026-05-07",
      status: "진행중",
    },
  ];

  const allRows = [...tempRows, ...applications];

  const getUniqueValues = (key: string) => {
    const values = allRows.map((row: any) => row[key]).filter(Boolean);
    return [...new Set(values)];
  };

  const filteredRows = allRows.filter((row: any) => {
    if (!filterType || !filterValue) return true;
    return row[filterType] === filterValue;
  });

  // 🔥 빈 row 계산
  const EMPTY_COUNT = Math.max(0, 8 - filteredRows.length);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl relative">
      <div className="flex items-center px-4 py-3 text-sm border-b border-[#E2E8F0]">
        <ApplicationState />
      </div>

      {/* 헤더 */}
      <div className="grid grid-cols-[48px_1fr_1.4fr_1fr_1fr_1fr_0.8fr_1fr_0.8fr_1fr_0.8fr_1fr] bg-[#F1F5F9] text-xs text-gray-500 px-4 py-3 border-b">
        <span></span>

        {[
          ["company", "기업명"],
          ["jobTitle", "공고명"],
          ["position", "직무"],
          ["industry", "산업"],
          ["deadlineDate", "지원기한"],
          ["deadlineDate", "D-day"],
          ["status", "지원상태"],
          ["submitted", "제출"],
          ["checklistInComplete", "체크리스트"],
          ["documents", "서류"],
          ["notes", "메모"],
        ].map(([key, label]) => (
          <span key={key} className="relative">
            <div className="flex items-center gap-1 cursor-pointer">
              {label}
              <button onClick={() => toggleFilter(key)}>▼</button>
            </div>

            {isOpen === key && (
              <div className="absolute top-6 left-0 bg-white border rounded shadow p-2 z-[999]">
                {getUniqueValues(key).map((value: any) => (
                  <div
                    key={value}
                    onClick={() => {
                      setFilterValue(value);
                      setFilterType(key);
                      setIsOpen(null);
                    }}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    {value}
                  </div>
                ))}
                <div
                  onClick={() => {
                    setFilterValue(null);
                    setFilterType(null);
                    setIsOpen(null);
                  }}
                  className="px-2 py-1 text-gray-400 cursor-pointer"
                >
                  전체
                </div>
              </div>
            )}
          </span>
        ))}
      </div>

      {/* 🔥 스크롤 영역 */}
      <div className="max-h-[400px] overflow-y-auto">
        {/* 실제 데이터 */}
        {filteredRows.map((row) => {
          const isChecked = checkedIds.includes(row.id);

          return (
            <div
              key={row.id}
              className="grid grid-cols-[48px_1fr_1.4fr_1fr_1fr_1fr_0.8fr_1fr_0.8fr_1fr_0.8fr_1fr] items-center px-4 py-3 text-sm border-b hover:bg-gray-50"
            >
              <label className="flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked}
                  onChange={() => toggleCheck(row.id)}
                />

                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition
                  ${isChecked ? "border-blue-500" : "border-gray-400"}
                  bg-white`}
                >
                  {isChecked && (
                    <svg
                      className="w-3 h-3 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </label>

              <span>{row.company}</span>
              <span>{row.jobTitle}</span>
              <div className="flex items-center">
                <span className="px-2 py-[2px] bg-orange-100 text-orange-500 rounded text-xs">
                  {row.position}
                </span>
              </div>
              <span>{row.industry}</span>
              <span>{row.deadlineDate}</span>
              <span className="text-red-500 font-semibold">
                {getDDay(row.deadlineDate)}
              </span>
              <div className="flex items-center">
                <span className="px-2 py-[2px] bg-green-100 text-green-600 rounded text-xs">
                  {row.status}
                </span>
              </div>
              <span className="text-gray-400">제출</span>
              <span className="text-gray-400">3/5</span>
              <span className="text-gray-400">1건</span>
              <span className="text-gray-400">메모</span>
            </div>
          );
        })}
        {/* 🔥 빈 row */}
        {Array.from({ length: EMPTY_COUNT }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="grid grid-cols-[48px_1fr_1.4fr_1fr_1fr_1fr_0.8fr_1fr_0.8fr_1fr_0.8fr_1fr] items-center px-4 py-3 text-sm"
          >
            {Array(12)
              .fill(null)
              .map((_, idx) => (
                <span key={idx}>&nbsp;</span>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
