import { UsersResponse } from "@/types/user";

const API_BASE = "https://dummyjson.com/users";

export async function getUsers(
  query: string,
  page: number,
  limit = 10,
): Promise<UsersResponse> {
  const skip = (page - 1) * limit;
  const endpoint = new URL(query ? `${API_BASE}/search` : API_BASE);
  endpoint.searchParams.set("limit", `${limit}`);
  endpoint.searchParams.set("skip", `${skip}`);
  if (query) {
    endpoint.searchParams.set("q", query);
  }

  const res = await fetch(endpoint, { cache: "no-store" }); // Отключаем кэш для актуальности при пагинации

  if (!res.ok) {
    throw new Error("Не удалось загрузить данные пользователей");
  }

  return res.json();
}
