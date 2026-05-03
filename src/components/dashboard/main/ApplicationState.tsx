import { useApplication } from "../../../context/ApplicationContext";

export default function ApplicationState() {
  const { applications } = useApplication();
  const total = applications.length;
  const ongoing = applications.filter((a) => a.status === "진행중").length;
  const urgent = applications.filter((a) => a.status === "마감임박").length;
  const done = applications.filter((a) => a.status === "마감완료").length;
  const submitted = applications.filter((a) => a.submitted).length;
  const checklist = applications.filter((a) => a.checklistInComplete).length;

  return (
    <div className="flex items-center gap-6 text-sm">
      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
        전체 {total}
      </span>
      <span className="text-gray-500">진행중 {ongoing}</span>
      <span className="text-gray-500">마감임박 {urgent}</span>
      <span className="text-gray-500">마감완료 {done}</span>
      <span className="text-gray-500">제출완료 {submitted}</span>
      <span className="text-gray-500">체크리스트 미완료 {checklist}</span>
    </div>
  );
}
