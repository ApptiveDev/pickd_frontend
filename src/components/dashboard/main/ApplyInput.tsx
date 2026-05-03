export default function ApplyInput({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex items-center justify-between">
      <input
        placeholder="채용 공고 URL을 붙여넣으세요"
        className="flex-1 outline-none text-sm text-[#334155]"
      />

      <button
        onClick={onAdd}
        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        + 공고등록
      </button>
    </div>
  );
}
