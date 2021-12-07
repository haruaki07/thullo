import { getToken } from "@/store";
import { get, post } from "@/utils/request";
import type { User } from "./types";

export type ReqLogin = {
  email: string;
  password: string;
};

export type ResAuth = {
  token: string;
  user: User;
};

export type ReqRegister = ReqLogin & { name: string };

export async function login(data: ReqLogin) {
  return post<ReqLogin, ResAuth>("login", data);
}

export async function register(data: ReqRegister) {
  return post<ReqRegister, ResAuth>("register", data);
}

export async function checkAuth() {
  return get<User>("me", getToken());
}
