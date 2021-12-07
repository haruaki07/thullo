import { DocumentType } from "@typegoose/typegoose";
import { BoardModel, ListModel, TaskModel, User, UserModel } from "../models";

interface TaskDTO {
  title: string;
  order: number;
  cover?: string;
  description?: string;
  listId: string;
  boardId: string;
}

export class TaskService {
  static async findAll(listId: any, boardId: any, user: DocumentType<User>) {
    const board = await BoardModel.findOne({ _id: boardId });

    if (!board) throw new Error("Board not found");
    if (!board.isVisibleBy(user)) throw new Error("Not allowed");

    const task = await TaskModel.find({ listId, boardId });
    return task;
  }

  static async findById(taskId: string, user: DocumentType<User>) {
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) throw new Error("List not found");

    const board = await BoardModel.findById(task.boardId);
    if (!board.isVisibleBy(user)) throw new Error("Not allowed");

    return task;
  }

  static async store(data: TaskDTO, user: DocumentType<User>) {
    const board = await BoardModel.findOne({ _id: data.boardId });
    if (!board) throw new Error("Board not found");

    const list = await ListModel.findById(data.listId);
    if (!list) throw new Error("List not found");

    if (!board.isMember(user.id)) throw new Error("Not allowed");

    const task = await TaskModel.create({ ...(data as any), userId: user.id });

    await task.addMember(user);

    return task;
  }

  static async update(taskId: string, data: Partial<TaskDTO>, userId: string) {
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) throw new Error("Task not found");

    const board = await BoardModel.findById(task.boardId);
    if (!board) throw new Error("Board not found");

    if (data.listId) {
      const list = await ListModel.findById(data.listId);
      if (!list) throw new Error("List not found");
    }

    if (!board.isAdmin(userId) || !task.isOwner(userId))
      throw new Error("Not allowed");

    await task.updateOne(data);

    return TaskModel.findById(task.id);
  }

  static async delete(taskId: string, userId: string) {
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) throw new Error("Task not found");

    const board = await BoardModel.findById(task.boardId);
    if (!board.isAdmin(userId) || !task.isOwner(userId))
      throw new Error("Not allowed");

    await task.deleteOne();

    return true;
  }

  static async addMember(taskId: string, data: any, userId: string) {
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) throw new Error("Task not found");

    const board = await BoardModel.findById(task.boardId);
    if (!board.isAdmin(userId) || !task.isOwner(userId))
      throw new Error("Not allowed");

    const cond: any = {};
    if (data.userId) cond._id = data.userId;
    if (!cond._id && data.email) cond.email = data.email;

    const user = await UserModel.findOne(cond);
    if (!user) throw new Error("User not found");

    await task.addMember(user);

    return user.toJSON();
  }

  static async deleteMember(taskId: string, data: any, userId: string) {
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) throw new Error("Task not found");

    const board = await BoardModel.findById(task.boardId);
    if (!board.isAdmin(userId) || !task.isOwner(userId))
      throw new Error("Not allowed");

    await task.deleteMember(data.userId);

    return true;
  }

  static async addLabel(taskId: string, data: any, userId: string) {}
}
