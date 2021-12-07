import { getToken } from "@/store";
import { get } from "@/utils/request";
import type { Board } from "./types";

export async function getBoards() {
  return get<Board[]>("boards", getToken());
}

export async function getBoardDetails(id: string) {
  return get<Board>(`boards/${id}`, getToken());
}
