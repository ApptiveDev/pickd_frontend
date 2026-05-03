import { useState } from "react";
import { useApplication } from "../../context/ApplicationContext";
import PdfPreview from "../pdf/PdfPreview";

export default function ApplicationModal({ onClose }: any) {
  console.log("🔥 새로운 모달 코드 실행됨");
  const { addApplication } = useApplication();

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [position, setPosition] = useState("");
  const [industry, setIndustry] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: any) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = () => {
    console.log("submit 직전:", jobTitle, position);

    addApplication({
      id: Date.now(),
      company,
      jobTitle,
      position,
      industry,
      status: "진행중",
      applyDate: new Date().toISOString(),
      interviewDate: undefined,
      deadlineDate,
      submitted: false,
      checklistInComplete: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[900px] h-[600px] flex gap-6">
        {/* 왼쪽 입력 영역 */}
        <div className="flex-1 flex flex-col">
          <h2 className="font-bold mb-4">새 지원 추가</h2>

          <input
            placeholder="회사명"
            value={company || ""}
            onChange={(e) => setCompany(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <input
            placeholder="공고명"
            value={jobTitle || ""}
            onChange={(e) => setJobTitle(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <input
            placeholder="직무"
            value={position || ""}
            onChange={(e) => setPosition(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <input
            placeholder="산업"
            value={industry || ""}
            onChange={(e) => setIndustry(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <input
            type="date"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          {/* 파일 업로드 */}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFile}
            className="mb-4"
          />

          <div className="mt-auto flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border p-2 rounded"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-green-500 text-white p-2 rounded"
            >
              추가하기
            </button>
          </div>
        </div>

        <div className="w-[350px] border rounded p-2 overflow-hidden">
          <PdfPreview file={preview} />
        </div>
      </div>
    </div>
  );
}
