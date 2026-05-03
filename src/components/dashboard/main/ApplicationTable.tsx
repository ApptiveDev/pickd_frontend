import ApplicationState from "./ApplicationState";
import { useApplication } from "../../../context/ApplicationContext";
import { getStatusStyle } from "../../../utils/status";
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

export default function ApplicationTable({
  onAdd,
  onEdit,
  onCompanyClick,
}: any) {
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

  const getUniqueValues = (key: string) => {
    const values = applications.map((row: any) => row[key]).filter(Boolean);
    return [...new Set(values)];
  };

  const filteredRows = applications.filter((row: any) => {
    if (!filterType || !filterValue) return true;
    return row[filterType] === filterValue;
  });

  const EMPTY_COUNT = Math.max(0, 8 - filteredRows.length);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-lg">지원 현황</h2>
          <p className="text-sm text-gray-400">
            총 {applications.length}개의 지원
          </p>
        </div>

        <button
          onClick={onAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + 추가
        </button>
      </div>

      <ApplicationState />

      <div className="grid grid-cols-[48px_1fr_1.4fr_1fr_1fr_1fr_0.8fr_1fr_0.8fr_1fr_0.8fr_1fr] bg-[#F1F5F9] text-xs text-gray-500 px-4 py-3 mt-4 border-b">
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

      <div className="max-h-[400px] overflow-y-auto">
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
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center
                  ${isChecked ? "border-blue-500" : "border-gray-400"} bg-white`}
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

              <span
                className="cursor-pointer hover:text-green-600"
                onClick={() => onCompanyClick(row)}
              >
                {row.company}
              </span>

              <span>{row.jobTitle}</span>

              <div>
                <span className="px-2 py-[2px] bg-orange-100 text-orange-500 rounded text-xs">
                  {row.position}
                </span>
              </div>

              <span>{row.industry}</span>
              <span>{row.deadlineDate}</span>

              <span className="text-red-500 font-semibold">
                {getDDay(row.deadlineDate)}
              </span>

              <div>
                <span
                  className={`px-2 py-[2px] rounded text-xs ${getStatusStyle(
                    row.status,
                  )}`}
                >
                  {row.status}
                </span>
              </div>

              <span>{row.applyDate || "-"}</span>
              <span>{row.interviewDate || "-"}</span>
              <span>{row.file ? "제출됨" : "미제출"}</span>
              <span className="truncate">{row.memo || "-"}</span>

              <div className="flex gap-2">
                <button onClick={() => onEdit(row)}>✏️</button>
                <button>🗑️</button>
              </div>
            </div>
          );
        })}

        {Array.from({ length: EMPTY_COUNT }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="grid grid-cols-[48px_1fr_1.4fr_1fr_1fr_1fr_0.8fr_1fr_0.8fr_1fr_0.8fr_1fr] px-4 py-3"
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
