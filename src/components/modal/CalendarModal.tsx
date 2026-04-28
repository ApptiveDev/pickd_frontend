import { useState } from "react";

export default function CalendarModal({
  onClose,
  onCreate,
  selectedDate,
}: {
  onClose: () => void;
  onCreate: (data: any) => void;
  selectedDate: Date;
}) {
  const [title, setTitle] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="font-bold mb-3">일정 추가</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="일정 제목"
          className="border w-full p-2 mb-3"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>취소</button>
          <button
            onClick={() => {
              onCreate({
                summary: title,
                start: selectedDate,
                end: selectedDate,
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
