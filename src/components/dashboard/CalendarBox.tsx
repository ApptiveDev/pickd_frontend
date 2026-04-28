import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useApplication } from "../../context/ApplicationContext";
import CalendarModal from "../modal/CalendarModal";
import { createEvent, deleteEvent } from "../../api/calendar";

function getEventDate(e: any): Date | null {
  if (!e.start) return null;

  if (e.start.dateTime?.value) {
    return new Date(Number(e.start.dateTime.value));
  }

  if (typeof e.start.dateTime === "string") {
    return new Date(e.start.dateTime);
  }

  if (e.start.date) {
    return new Date(e.start.date);
  }
  return null;
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export default function CalendarBox({
  googleEvents,
  setGoogleEvents,
}: {
  googleEvents: any[];
  setGoogleEvents: (events: any[]) => void;
}) {
  const { applications } = useApplication();
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedEvents = googleEvents.filter((e) => {
    const d = getEventDate(e);
    return d && isSameDay(d, date);
  });

  const mergedEvents = [
    ...googleEvents
      .map((e) => {
        const d = getEventDate(e);
        if (!d) return null;
        return { date: d, type: "google" };
      })
      .filter((e): e is { date: Date; type: string } => e !== null),

    ...applications
      .flatMap((a) => [
        a.interviewDate
          ? { date: new Date(a.interviewDate), type: "interview" }
          : null,
        a.applyDate ? { date: new Date(a.applyDate), type: "apply" } : null,
      ])
      .filter((e): e is { date: Date; type: string } => e !== null),
  ];

  const loadEvents = () => {
    fetch("/api/calendar/events", {
      credentials: "include",
    })
      .then(async (res) => {
        console.log("calendar status:", res.status);

        const text = await res.text();
        console.log("calendar raw response:", text);

        if (!res.ok) throw new Error(text);

        return text ? JSON.parse(text) : [];
      })
      .then((data) => {
        console.log("calendar parsed data:", data);
        setGoogleEvents(data);
      })
      .catch((err) => console.error("캘린더 가져오기 실패", err));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="font-bold mb-3">캘린더</h3>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
      >
        일정 추가
      </button>

      {isModalOpen && (
        <CalendarModal
          selectedDate={date}
          onClose={() => setIsModalOpen(false)}
          onCreate={async (data) => {
            await createEvent(data);
            loadEvents();
          }}
        />
      )}

      <Calendar
        onChange={(value) => setDate(value as Date)}
        value={date}
        tileContent={({ date }) => {
          const hasGoogle = googleEvents.some((e) => {
            const d = getEventDate(e);
            return d && isSameDay(d, date);
          });
          const hasInterview = mergedEvents.some(
            (e) => e.type === "interview" && isSameDay(e.date, date),
          );
          const hasApply = mergedEvents.some(
            (e) => e.type === "apply" && isSameDay(e.date, date),
          );

          return (
            <div className="flex justify-center gap-1 mt-1">
              {hasInterview && (
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              )}
              {hasApply && (
                <div className="w-2 h-2 bg-green-400 rounded-full" />
              )}
              {hasGoogle && (
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
              )}
            </div>
          );
        }}
      />

      <div className="mt-4">
        <h4 className="font-semibold mb-2">선택한 날짜 일정</h4>

        {selectedEvents.length === 0 && (
          <p className="text-sm text-gray-400">일정 없음</p>
        )}

        {selectedEvents.map((e, idx) => (
          <div key={idx} className="bg-blue-50 p-2 rounded mb-2">
            <p className="font-medium">{e.summary || "제목 없음"}</p>
            <p className="text-sm text-gray-500">
              {(() => {
                const d = getEventDate(e);
                return d ? d.toLocaleString("ko-KR") : "";
              })()}
            </p>

            <button
              onClick={async () => {
                if (!e.id) return;
                try {
                  await deleteEvent(e.id);
                  loadEvents();
                } catch (err) {
                  console.error("삭제 실패", err);
                }
              }}
              className="text-red-500 text-xs mt-1"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
