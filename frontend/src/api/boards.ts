import { getToken } from "@/store";
import { get } from "@/utils/request";
import type { Board, ListWithTasks } from "./types";

export async function getBoards() {
  return get<Board[]>("boards", getToken());
}

export async function getBoardDetails(id: string) {
  return get<Board>(`boards/${id}`, getToken());
}

export async function getBoardContents(id: string) {
  return get<ListWithTasks[]>(`boards/${id}/bulk`, getToken());
}
