export default function Sidebar({ open, onClose, onNavigate }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30">
      <div className="w-64 bg-white h-full p-4">
        <button onClick={onClose}>✕</button>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => onNavigate("main")}
            className="w-full text-left p-2 rounded hover:bg-gray-100"
          >
            지원 대시보드
          </button>
          <button
            onClick={() => onNavigate("experience")}
            className="w-full text-left p-2 rounded hover:bg-gray-100"
          >
            개인경험 정리
          </button>
          <button
            onClick={() => onNavigate("ai")}
            className="w-full text-left p-2 rounded hover:bg-gray-100"
          >
            AI 자소서
          </button>
        </div>
      </div>
    </div>
  );
}
