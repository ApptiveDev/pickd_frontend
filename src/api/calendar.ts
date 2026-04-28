export async function createEvent(data: any) {
  const res = await fetch("/api/calendar/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      summary: data.summary,
      location: "",
      description: "",
      start: {
        dateTime: data.start.toISOString(),
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: data.end.toISOString(),
        timeZone: "Asia/Seoul",
      },
    }),
  });

  if (!res.ok) throw new Error("생성 실패");
}

export async function deleteEvent(id: string) {
  const res = await fetch(`/api/calendar/events/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("삭제 실패");
}
