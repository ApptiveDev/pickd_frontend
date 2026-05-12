export interface Todo {
  id: number;
  content: string;
  completed: boolean;

  application?: {
    id: number;
    company?: string;
    jobTitle?: string;
  };
}
