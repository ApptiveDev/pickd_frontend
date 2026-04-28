import { useState } from "react";
import ApplicationModal from "../components/modal/ApplicationModal";
import ApplicationStateCard from "../components/dashboard/ApplicationStateCard";
import ApplicationTable from "../components/dashboard/ApplicationTable";
import CalendarBox from "../components/dashboard/CalendarBox";

export default function MainScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [googleEvents, setGoogleEvents] = useState<any[]>([]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">지원 대시보드</h1>
      <p className="text-gray-500 mb-6">
        나의 취업 준비 현황을 한눈에 확인하세요
      </p>

      <ApplicationStateCard />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <ApplicationTable onAdd={() => setIsModalOpen(true)} />
        </div>

        <div>
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
