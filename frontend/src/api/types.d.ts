export interface ResError extends Error {
  status: string;
}

export interface ResValidation<T> extends Error {
  statusCode: number;
  error: string;
  details: Partial<T> | Record<string, string>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Board {
  members: BoardMember[];
  title: string;
  isPublic: boolean;
  author: string;
  cover?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  lists: List[];
  id: string;
}

export interface BoardMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

export interface List {
  boardId: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Task {
  cover: string;
  members: User[];
  labels: string[];
  comments: string[];
  _id: string;
  title: string;
  order: number;
  description: string;
  listId: string;
  boardId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListWithTasks extends List {
  tasks: Task[];
}