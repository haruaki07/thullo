import { DocumentType } from "@typegoose/typegoose";
import { BoardModel, ListModel, User } from "../models";

interface ListDTO {
  title: string;
  boardId: string;
}

export class ListService {
  static async findAll(boardId: string, user: DocumentType<User>) {
    const board = await BoardModel.findOne({ _id: boardId });

    if (!board) throw new Error("Board not found");
    if (!board.isVisibleBy(user)) throw new Error("Not allowed");

    const lists = await ListModel.find({ boardId });
    return lists;
  }

  static async findById(listId: string, user: DocumentType<User>) {
    const list = await ListModel.findOne({ _id: listId });
    console.log(list, listId);
    if (!list) throw new Error("List not found");

    const board = await BoardModel.findById(list.boardId);

    if (!board.isVisibleBy(user)) throw new Error("Not allowed");

    return list;
  }

  static async store(data: ListDTO, userId: string) {
    const board = await BoardModel.findById(data.boardId);

    if (!board) throw new Error("Board not found");
    if (!board.isMember(userId)) throw new Error("Not allowed");

    const list = await ListModel.create({ ...data, userId });
    board.addList(list);

    return list.toJSON({
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        
        return ret;
      }
    });
  }

  static async update(listId: string, data: Partial<ListDTO>, userId: string) {
    const list = await ListModel.findOne({ _id: listId });
    if (!list) throw new Error("List not found");

    const board = await BoardModel.findById(list.boardId);

    if (!board.isAdmin(userId) || !list.isOwner(userId))
      throw new Error("Not allowed");

    // if (data.boardId) list.boardId = data.boardId as any;
    if (data.title) list.title = data.title;

    return list.save();
  }

  static async delete(listId: string, userId: string) {
    const list = await ListModel.findOne({ _id: listId });
    if (!list) throw new Error("List not found");

    const board = await BoardModel.findById(list.boardId);
    if (!board.isAdmin(userId) || !list.isOwner(userId))
      throw new Error("Not allowed");

    await list.deleteOne();
    await board.deleteList(list.id);

    return true;
  }
}
