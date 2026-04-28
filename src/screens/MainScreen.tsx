import { useState } from "react";
import ApplicationModal from "../components/modal/ApplicationModal";
import ApplicationStateCard from "../components/dashboard/ApplicationStateCard";
import ApplicationTable from "../components/dashboard/ApplicationTable";
import CalendarBox from "../components/dashboard/CalendarBox";

export default function MainScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [googleEvents, setGoogleEvents] = useState<any[]>([]);

  const user = {
    name: "지원자",
    image:
      "https://www.google.com/imgres?q=%EA%B8%B0%EB%B3%B8%20%EC%9D%B4%EB%AF%B8%EC%A7%80&imgurl=https%3A%2F%2Fi.namu.wiki%2Fi%2FBge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp&imgrefurl=https%3A%2F%2Fnamu.wiki%2Fw%2F%25ED%2594%2584%25EB%25A1%259C%25ED%2595%2584%2520%25EC%2582%25AC%25EC%25A7%2584%2F%25EC%259D%25B8%25ED%2584%25B0%25EB%2584%25B7&docid=r-mBUT7Mp7e2wM&tbnid=XDcngI4487QHOM&vet=12ahUKEwjusMn32pCUAxVjgFYBHcd0NFoQnPAOegQIHhAB..i&w=300&h=308&hcb=2&ved=2ahUKEwjusMn32pCUAxVjgFYBHcd0NFoQnPAOegQIHhAB",
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">
                {user.name}님의 대시보드
              </h1>
              <p className="text-[14px] text-[#64748B]">
                오늘도 한 걸음 더 가까이, 화이팅!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-3 py-1 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] text-[15px] text-[#334155]">
                이번 달 목표
              </button>
              <button className="px-3 py-1 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] text-[15px] text-[#334155]">
                지난 달 리포트
              </button>
              <img
                src={user?.image || "/default-profile.png"}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover"
              />
            </div>
          </div>
          <ApplicationStateCard />
          <div className="mt-6">
            <ApplicationTable onAdd={() => setIsModalOpen(true)} />
          </div>
        </div>
        <div className="w-[18.05%] min-w-[240px] border-l border-gray-200 pl-6">
          <CalendarBox
            googleEvents={googleEvents}
            setGoogleEvents={setGoogleEvents}
          />
        </div>
      </div>

      {isModalOpen && (
        <ApplicationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
