import { useEffect, useState } from "react";
import Header from "../components/dashboard/main/Header";
import ApplyInput from "../components/dashboard/main/ApplyInput";
import ApplicationTable from "../components/dashboard/main/ApplicationTable";
import RightTab from "../components/dashboard/right/RightTab";
import PostRegistration from "../components/modal/PostRegistration";
import { useApplication } from "../context/ApplicationContext";

export default function MainScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [googleEvents, setGoogleEvents] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const { addApplication } = useApplication();

  useEffect(() => {
    fetch("/api/user", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="flex">
        <div className="flex-1 p-6">
          {user && (
            <>
              <Header user={user} />

              <div className="mt-6 space-y-4">
                <ApplyInput onAdd={() => setIsModalOpen(true)} />
                <ApplicationTable />
              </div>
            </>
          )}
        </div>

        {user && (
          <div className="w-[18.05%] min-w-[240px] border-l border-gray-200 pl-6">
            <RightTab
              googleEvents={googleEvents}
              setGoogleEvents={setGoogleEvents}
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[600px]">
            <PostRegistration
              onClose={() => setIsModalOpen(false)}
              onSubmit={(data: any) => {
                addApplication({
                  id: Date.now(),
                  company: data.company,
                  jobTitle: data.jobTitle,
                  position: data.position,
                  industry: data.industry,
                  deadlineDate: data.deadlineDate,
                  applyDate: new Date().toISOString(),
                  status: "진행중",
                  submitted: false,
                  checklistInComplete: true,
                });

                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
