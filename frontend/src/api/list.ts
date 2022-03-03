import { getToken } from "@/store";
import { post } from "@/utils/request";
import type { Board, List } from "./types";

interface ReqAddList {
  boardId: string;
  title: string;
}

export async function addList(body: ReqAddList) {
  return post<ReqAddList, List>('/lists', body, getToken());
}