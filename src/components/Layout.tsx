import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children, onNavigate }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        onNavigate={(page: string) => {
          onNavigate(page);
          setOpen(false);
        }}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setOpen(true)} />

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
