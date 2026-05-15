import { useEffect, useState } from "react";
import type { Application } from "../types/application";
import type { Todo } from "../types/todo";

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

export const useSidePanelData = (data: Application[]) => {
  const [googleEvents, setGoogleEvents] = useState<any[]>([]);
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "자기소개서 수정하기",
      completed: false,
      dueDateTime: "2025-03-20T10:00:00",
      memo: "긴급! 1번 문항 위주로 수정",
      application: {
        id: 101,
        company: "구글코리아",
        jobTitle: "프론트엔드 개발자",
      },
    },
    {
      id: 2,
      title: "포트폴리오 업데이트",
      completed: false,
      dueDateTime: "2027-03-19T14:00:00",
      application: {
        id: 102,
        company: "네이버",
        jobTitle: "웹 서비스 개발",
      },
    },
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 추후 할일 백엔드 API 연동 필요 - 현재는 임시 데이터로 구현
  useEffect(() => {
    fetch("/api/calendar/events", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setGoogleEvents(data))
      .catch((err) => console.error("캘린더 가져오기 실패", err));
  }, []);

  const combinedAnnouncements = [
    ...data.map((app) => ({
      id: `db-${app.id}`,
      title: app.jobTitle,
      company: app.company,
      step: app.status,
      date: app.deadlineDate ? new Date(app.deadlineDate) : null,
    })),

    ...googleEvents
      .filter(
        (e) =>
          (e.summary || "").includes("마감") ||
          (e.summary || "").includes("면접") ||
          (e.summary || "").includes("제출"),
      )
      .map((e) => {
        const summary = e.summary || "";

        let step = "일반 일정";

        if (summary.includes("면접")) {
          step = "면접 전형";
        } else if (summary.includes("마감")) {
          step = "지원 마감";
        } else if (summary.includes("제출")) {
          step = "서류 제출";
        }

        const cleanTitle = summary.replace(/면접|마감|제출/g, "").trim();

        const words = cleanTitle.split(" ");

        const company = words[0];
        const jobTitle = words.slice(1).join(" ") || cleanTitle;

        return {
          id: `google-${e.id}`,
          title: jobTitle,
          company,
          step,
          date: getEventDate(e),
        };
      }),
  ];

  const todaySchedules = combinedAnnouncements
    .filter((item) => {
      if (!item.date) return false;

      return (
        item.date.getFullYear() === today.getFullYear() &&
        item.date.getMonth() === today.getMonth() &&
        item.date.getDate() === today.getDate()
      );
    })
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());

  const sortedList = combinedAnnouncements
    .filter((item) => item.date && item.date >= today)
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());

  // 추후 할일 백엔드 API 연동 필요 - 현재는 임시 데이터로 구현
  const handleAddTodo = (newTodoData: any) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: newTodoData.title,
      completed: false,
      dueDateTime: newTodoData.dueDateTime,
      application: newTodoData.application,
      memo: newTodoData.memo,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const calculateDDay = (targetDate: Date) => {
    const diff = Math.ceil(
      (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    return diff === 0 ? "D-Day" : `D-${diff}`;
  };

  return {
    todos,
    today,
    sortedList,
    todaySchedules,
    handleAddTodo,
    toggleTodo,
    calculateDDay,
  };
};
