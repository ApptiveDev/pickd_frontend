import { useState, useEffect } from "react";

export default function CalendarModal({
  onClose,
  onCreate,
  selectedDate,
}: {
  onClose: () => void;
  onCreate: (data: any) => void;
  selectedDate: Date;
}) {
  const [summary, setSummary] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (selectedDate) {
      const base = new Date(selectedDate);

      base.setHours(9, 0);
      const startStr = base.toISOString().slice(0, 16);

      base.setHours(10, 0);
      const endStr = base.toISOString().slice(0, 16);

      setStart(startStr);
      setEnd(endStr);
    }
  }, [selectedDate]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="font-bold mb-3">일정 추가</h2>

        <input
          type="text"
          placeholder="일정 제목"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>취소</button>

          <button
            onClick={() => {
              if (!summary || !start) {
                alert("제목이랑 시작 시간을 입력해 주세요.");
                return;
              }

              onCreate({
                summary,
                start,
                end: end || start,
              });

              onClose();
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
}
