import { formatDate } from "../utils/date";
import { useEffect, useState } from "react";

export default function Header({ onMenuClick }: any) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/calendar/me", {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((data) => {
        if (data) setUser(data);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-4">
      <button onClick={onMenuClick}>☰</button>

      <h1 className="font-bold">Pickd</h1>

      {!user ? (
        <button
          onClick={() => {
            window.location.href =
              "http://localhost:8080/oauth2/authorization/google";
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          구글 로그인
        </button>
      ) : (
        <span className="text-sm text-gray-500">
          {formatDate(new Date())}
        </span>
      )}
    </div>
  );
}