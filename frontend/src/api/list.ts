import { getToken } from "@/store";
import { del, post, put } from "@/utils/request";
import type { Board, List } from "./types";

interface ReqAddList {
  boardId: string;
  title: string;
}

export async function addList(body: ReqAddList) {
  return post<ReqAddList, List>("/lists", body, getToken());
}

interface RenameListDTO {
  title: string;
}

export async function renameList(listId: string, body: RenameListDTO) {
  return put<RenameListDTO, List>(`/lists/${listId}`, body, getToken());
}

export async function deleteList(listId: string) {
  return del<void, void>(`/lists/${listId}`, null, getToken());
}
