import { token as jwt } from "../store";
import { router } from "tinro";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface IRequest {
  path: string;
  method: Method;
  body?: any;
  token?: string;
}

interface IOptions {
  body?: string;
  method: Method;
  headers?: Headers | Record<string, string>;
}

let endpoint = import.meta.env.VITE_API_URL;

async function send<T>({ method, path, body, token }: IRequest): Promise<T> {
  const opts: IOptions = { method };
  const headers = new Headers();

  if (body) {
    headers.append("Content-Type", "application/json");
    opts.body = JSON.stringify(body);
  }

  if (token) headers.append("Authorization", "Bearer " + token);

  opts.headers = headers;

  const res = await fetch(`${endpoint}/${path}`, opts);

  if (!res.ok) {
    const body = await res.json();
    if (
      ["unauthorized", "invalid token"].includes(body.message.toLowerCase())
    ) {
      jwt.set("");
      router.goto("/login");
    }
    // TODO: return error details from request
    throw body;
  }

  return res.json().catch(() => ({}));
}

export function get<T>(path: string, token?: string): Promise<T> {
  return send<T>({ method: "GET", path, token });
}

export function post<T, U>(path: string, body: T, token?: string): Promise<U> {
  return send<U>({ method: "POST", path, body, token });
}

export function put<T, U>(path: string, body: T, token?: string): Promise<U> {
  return send<U>({ method: "PUT", path, body, token });
}

export function del<T, U>(path: string, body?: T, token?: string): Promise<U> {
  const params = { method: "DELETE", path, token } as IRequest;
  if (body) params.body = body;

  return send<U>(params);
}

export function networkError(e: any) {
  switch (e.message) {
    case "NetworkError when attempting to fetch resource.":
    case "Failed to fetch":
      return true;
  }
  return false;
}
