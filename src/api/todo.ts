export const createTodo = async (applicationId: number, content: string) => {
  await fetch("/api/todo", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      applicationId,
      content,
    }),
  });
};

export const toggleTodoApi = async (id: number) => {
  await fetch(`/api/todo/${id}`, {
    method: "PUT",
    credentials: "include",
  });
};

export const deleteTodoApi = async (id: number) => {
  await fetch(`/api/todo/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};
