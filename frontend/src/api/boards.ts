import { getToken } from "@/store";
import { get, post } from "@/utils/request";
import type { Board, ListWithTasks } from "./types";

export interface AddBoardDTO {
  title: string,
  isPublic: boolean,
  cover?: string,
  description?: string,
}

export async function addBoard(body: AddBoardDTO) {
  return post<AddBoardDTO, Board>("boards", body, getToken());
}

export async function getBoards() {
  return get<Board[]>("boards", getToken());
}

export async function getBoardDetails(id: string) {
  return get<Board>(`boards/${id}`, getToken());
}

export async function getBoardContents(id: string) {
  return get<ListWithTasks[]>(`boards/${id}/bulk`, getToken());
}
