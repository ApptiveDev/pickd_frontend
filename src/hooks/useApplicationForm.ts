import { useState, useRef } from "react";
import type { RegistrationTab, Application } from "../types/application";

export const useApplicationForm = () => {
  const [activeTab, setActiveTab] = useState<RegistrationTab>("PDF");
  const [formData, setFormData] = useState<Partial<Application>>({
    company: "",
    jobTitle: "",
    position: "",
    industry: "",
    deadlineDate: "",
  });

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (activeTab === "PDF") pdfInputRef.current?.click();
    if (activeTab === "IMAGE") imageInputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "PDF" | "IMAGE",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`${type} 선택됨:`, file.name);
      // 추가 로직: 서버 업로드 등
    }
  };

  const updateField = (field: keyof Application, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    activeTab,
    setActiveTab,
    formData,
    updateField,
    pdfInputRef,
    imageInputRef,
    handleUploadClick,
    handleFileChange,
  };
};
