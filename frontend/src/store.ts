import { writable, get } from "svelte/store";
import type { Board, User } from "./api/types";

export const token = writable(localStorage.getItem("token") || "");
token.subscribe((v) => localStorage.setItem("token", v));

export const getToken = () => get(token);

export const user = writable<User>(null);

export const boards = writable<Board[]>([]);
