import { useNavigate, useLocation } from "react-router-dom";
import { LogoIcon, DashboardIcon, PortfolioIcon, DocumentIcon } from "../assets";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 메뉴 설정 배열
  const menuItems = [
    { name: "지원 대시보드", path: "/main", Icon: DashboardIcon, size: 21 },
    { name: "개인경험 정리", path: "/experience", Icon: PortfolioIcon, size: 24 },
    { name: "AI 자소서", path: "/ai", Icon: DocumentIcon, size: 22 },
  ];

  return (
    <nav className="w-[60px] min-h-screen bg-white border-r border-gray-200 flex flex-col items-center py-6 sticky top-0 h-screen">
      {/* 로고 영역 */}
      <div className="mb-7 cursor-pointer" onClick={() => navigate("/main")}>
        <LogoIcon size={32} />
      </div>

      {/* 메뉴 아이콘 리스트 */}
      <div className="flex-1 flex flex-col gap-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                isActive 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
              title={item.name}
            >
              <item.Icon 
                size={item.size} 
                color={isActive ? "#2563EB" : "#94A3B8"} 
              />
              
              <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
