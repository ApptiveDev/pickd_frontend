import { useState } from "react";
import ApplicationModal from "../components/modal/ApplicationModal";
import ApplicationStateCard from "../components/dashboard/ApplicationStateCard";
import ApplicationTable from "../components/dashboard/ApplicationTable";
import CalendarBox from "../components/dashboard/CalendarBox";

export default function MainScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [googleEvents, setGoogleEvents] = useState<any[]>([]);

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <h1 className="text-2xl font-bold mb-2">지원 대시보드</h1>
      <p className="text-gray-500 mb-6">
        나의 취업 준비 현황을 한눈에 확인하세요
      </p>

      <ApplicationStateCard />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <ApplicationTable onAdd={() => setIsModalOpen(true)} />
        </div>
      </div>

      <div className="fixed right-6 top-24 w-[18.05%] min-w-[240px] border-l border-gray-200 pl-6">
        <CalendarBox
          googleEvents={googleEvents}
          setGoogleEvents={setGoogleEvents}
        />
      </div>

      {isModalOpen && (
        <ApplicationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
