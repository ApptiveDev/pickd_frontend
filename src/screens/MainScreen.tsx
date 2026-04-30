import { useEffect, useState } from "react";
import ApplicationModal from "../components/modal/ApplicationModal";
import ApplicationStateCard from "../components/dashboard/ApplicationStateCard";
import ApplicationTable from "../components/dashboard/ApplicationTable";
import CalendarBox from "../components/dashboard/CalendarBox";

export default function MainScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [googleEvents, setGoogleEvents] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">
                {user ? `${user.name}님의 대시보드` : "대시보드"}
              </h1>
              <p className="text-[14px] text-[#64748B]">
                오늘도 한 걸음 더 가까이, 화이팅!
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!user ? (
                <button
                  onClick={() => {
                    window.location.href =
                      "http://localhost:8080/oauth2/authorization/google";
                  }}
                  className="px-3 py-1 rounded-lg bg-red-500 text-white"
                >
                  구글 로그인
                </button>
              ) : (
                <>
                  <button className="px-3 py-1 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] text-[15px] text-[#334155]">
                    이번 달 목표
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] text-[15px] text-[#334155]">
                    지난 달 리포트
                  </button>
                  <img
                    src={user.image || "/default-profile.png"}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </>
              )}
            </div>
          </div>
          {user && (
            <>
              <ApplicationStateCard />
              <div className="mt-6">
                <ApplicationTable onAdd={() => setIsModalOpen(true)} />
              </div>
            </>
          )}
        </div>

        {user && (
          <div className="w-[18.05%] min-w-[240px] border-l border-gray-200 pl-6">
            <CalendarBox
              googleEvents={googleEvents}
              setGoogleEvents={setGoogleEvents}
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <ApplicationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
