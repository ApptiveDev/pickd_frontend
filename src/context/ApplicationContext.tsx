import { createContext, useContext, useState } from "react";
import { type Application } from "../types/application";

type ContextType = {
  applications: Application[];
  addApplication: (app: Application) => void;
  updateApplication: (app: Application) => void;
};

const AppContext = createContext<ContextType | null>(null);

export function ApplicationProvider({ children }: any) {
  const [applications, setApplications] = useState<Application[]>([]);

  const addApplication = (app: Application) => {
    setApplications((prev) => [...prev, app]);
  };

  const updateApplication = (updated: Application) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a)),
    );
  };

  return (
    <AppContext.Provider
      value={{ applications, addApplication, updateApplication }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApplication() {
  return useContext(AppContext)!;
}
