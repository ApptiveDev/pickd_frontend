import { useRef, useState } from "react";
import type { Todo } from "../../../types/todo";
import { useApplication } from "../../../context/ApplicationContext";

interface TodoSectionProps {
  todos: Todo[];
  onClick: () => void;
  focusedApplication?: any;
}

export default function TodoSection({
  todos,
  focusedApplication,
  onClick,
}: TodoSectionProps) {
  const timeouts = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});
  const [mode, setMode] = useState<"all" | "focused">("all");
  const { toggleTodo, removeTodo } = useApplication();

  const targetApplication = focusedApplication || todos[0]?.application;
  const filteredTodos =
    mode === "focused"
      ? focusedApplication
        ? todos.filter((todo) => todo.application?.id === targetApplication?.id)
        : []
      : todos;

  const handleToggle = (id: number) => {
    const target = todos.find((t) => t.id === id);

    toggleTodo(id);

    if (target && !target.completed) {
      const timeout = setTimeout(() => {
        removeTodo(id);
        delete timeouts.current[id];
      }, 10000); // 일단 10초만 이후 하루로 변경

      timeouts.current[id] = timeout;
    } else {
      if (timeouts.current[id]) {
        clearTimeout(timeouts.current[id]);
        delete timeouts.current[id];
      }
    }
  };

  return (
    <div
      onClick={onClick}
      className="mt-4 bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-[0px_1px_3px_0px_#00000040] cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-lg text-[#0F172A] font-bold mb-[15px] mt-2">
          {mode === "all"
            ? "전체 할 일"
            : focusedApplication
              ? `${targetApplication?.company} 할 일`
              : "선택된 공고 할 일"}
        </h4>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setMode(mode === "all" ? "focused" : "all");
          }}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          {mode === "all" ? "선택한 공고 할 일" : "전체 할 일"}
        </button>
      </div>
      <div
        className={`h-[220px] overflow-y-auto pr-1 ${
          filteredTodos.length === 0 ? "flex items-center justify-center" : ""
        }`}
      >
        {filteredTodos.length === 0 ? (
          <p className="text-base text-gray-400">
            {mode === "focused" && !focusedApplication
              ? "공고를 선택하시오"
              : "할 일 없음"}
          </p>
        ) : (
          filteredTodos.map((t) => (
            <div key={t.id} className="flex items-center gap-4 mb-3">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle(t.id);
                }}
                className={`w-[15px] h-[15px] rounded-full flex items-center justify-center
                      ${
                        t.completed
                          ? "border-2 border-green-500 bg-white"
                          : "bg-[#D9D9D9]"
                      }
            `}
              >
                {t.completed && (
                  <svg
                    className="w-[15px] h-[15px] text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              <p
                className={`text-base font-regular ${t.completed ? "line-through text-gray-400" : ""}`}
              >
                <>
                  {mode === "all" && t.application?.company && (
                    <span className="text-[#64748B] mr-1">
                      [{t.application.company}]
                    </span>
                  )}

                  {t.content}
                </>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
