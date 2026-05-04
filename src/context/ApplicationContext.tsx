import { createContext, useContext, useState } from "react";
import { type Application } from "../types/application";

type ContextType = {
  applications: Application[];
  addApplication: (app: Application) => void;
  updateApplication: (id: number, updatedData: any) => void;
  deleteApplications: (ids: number[]) => void;

  getCounts: () => {
    total: number;
    ongoing: number;
    urgent: number;
    done: number;
    submitted: number;
    checklistInComplete: number;
  };
};

const AppContext = createContext<ContextType | null>(null);

export function ApplicationProvider({ children }: any) {
  const [applications, setApplications] = useState<Application[]>([]);

  const addApplication = (app: Application) => {
    setApplications((prev) => [...prev, app]);
  };

  const deleteApplications = (ids: number[]) => {
    setApplications((prev) => prev.filter((app) => !ids.includes(app.id)));
  };

  const updateApplication = (id: number, updatedData: any) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updatedData } : app)),
    );
  };
  
  const getCounts = () => {
    const total = applications.length;

    const ongoing = applications.filter((a) => a.status === "진행중").length;

    const urgent = applications.filter((a) => a.status === "마감임박").length;

    const done = applications.filter((a) => a.status === "마감완료").length;

    const submitted = applications.filter((a) => a.submitted).length;

    const checklistInComplete = applications.filter(
      (a) => a.checklistInComplete,
    ).length;

    return { total, ongoing, urgent, done, submitted, checklistInComplete };
  };

  return (
    <AppContext.Provider
      value={{
        applications,
        addApplication,
        deleteApplications,
        updateApplication,
        getCounts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApplication() {
  return useContext(AppContext)!;
}
