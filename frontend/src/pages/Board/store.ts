import type { Board, Task } from "@/api/types";
import {user} from "@/store";
import { derived, writable } from "svelte/store";

export const board = writable<Board>(null);

export const selectedTask = writable<Task>(null);

export const currentUserAdmin = derived([board, user], ([$board, $user]) => {
  return $board.author === $user.id
})
