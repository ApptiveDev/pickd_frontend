export function getStatusStyle(status: string) {
  switch (status) {
    case "서류통과":
      return "bg-green-100 text-green-600";
    case "면접예정":
      return "bg-yellow-100 text-yellow-600";
    case "불합격":
      return "bg-gray-200 text-gray-600";
    case "최종합격":
      return "bg-red-100 text-red-600";
    case "대기중":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-500";
  }
}