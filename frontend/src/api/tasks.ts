import { getToken } from "@/store";
import { post, put } from "@/utils/request";
import type { Task } from "./types";

interface ReqTaskDTO {
  title: string;
  order: number;
  cover?: string;
  description?: string;
  listId: string;
  boardId: string;
}

export async function addTask(body: ReqTaskDTO) {
  return post<ReqTaskDTO, Task>('/tasks', body, getToken());
}

export async function updateTask(taskId: string, body: Partial<ReqTaskDTO>) {
  return put<ReqTaskDTO, Task>(`tasks/${taskId}`, body, getToken());
}