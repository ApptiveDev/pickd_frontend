export type Application = {
  id: number;
  company: string;
  position: string;
  status: string;
  applyDate: string;
  interviewDate?: string;
  memo?: string;
  file?: File | null;
};
