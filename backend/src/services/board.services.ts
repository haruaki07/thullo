import { DocumentType } from "@typegoose/typegoose";
import { ListModel, TaskModel } from "../models";
import { BoardModel } from "../models/board.model";
import { User, UserModel } from "../models/user.model";
import { Types } from "mongoose";

export class BoardService {
  static async findAllUserBoard(user: DocumentType<User>) {
    const boards = await BoardModel.aggregate([
      { $match: { "members.userId": user._id } },
      {
        $lookup: {
          from: UserModel.collection.name,
          let: { userId: "$members.userId" },
          as: "members",
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$userId"] } } },
            { $project: { name: 1, avatar: 1 } },
            { $addFields: { id: "$_id" } },
          ],
        },
      },
      { $addFields: { id: "$_id" } },
    ])
      .project({ __v: 0, _id: 0, lists: 0, "members._id": 0 })
      .exec();

    return boards;
  }

  static async findById(id: string, user: DocumentType<User>) {
    const board = await BoardModel.findById(id);

    if (!board) throw new Error("Board not found");
    if (!board.isAdmin(user._id) && !board.isVisibleBy(user))
      throw new Error("Not allowed");
    
    return board.toJSON({
      user: board.author,
      populateMembers: true
    });
  }

  static async store(data: any) {
    const board = await BoardModel.create(data);
    await board.addMember(data.author._id, true);

    return board.toJSON({
      user: data.author,
      strip: ["members"]
    });
  }

  static async update(id: string, data: any, author: DocumentType<User>) {
    const board = await BoardModel.findById(id);

    if (!board) throw new Error("Board not found");
    if (!board.isAdmin(author.id)) throw new Error("Not allowed");

    if (data.title) board.title = data.title;
    if (data.isPublic) board.isPublic = data.isPublic;
    if (data.description) board.description = data.description;
    if (data.cover) board.cover = data.cover;

    await board.save();

    return board.toJSON({
      user: author,
      strip: ["members"]
    });
  }

  static async delete(id: string, author: DocumentType<User>) {
    const board = await BoardModel.findById(id);

    if (!board) throw new Error("Board not found");
    if (!board.isAdmin(author._id)) throw new Error("Not allowed");

    await board.deleteOne();
    return true;
  }

  static async getBulk(id: string) {
    // wath is dis?
    const data = await ListModel.aggregate([
      { $match: { boardId: Types.ObjectId.createFromHexString(id) } },
      {
        $lookup: {
          from: TaskModel.collection.name,
          let: { listId: "$_id" },
          as: "tasks",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$$listId", "$listId"] },
              },
            },
            {
              $lookup: {
                from: UserModel.collection.name,
                let: { userId: "$members" },
                as: "members",
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$userId"] } } },
                  { $project: { name: 1, avatar: 1, email: 1 } },
                ],
              },
            },
            { $addFields: { id: "$_id" } },
            { $project: { __v: 0, _id: 0 } },
          ],
        },
      },

      { $addFields: { id: "$_id" } },
    ])
      .project({ __v: 0, _id: 0 })
      .exec();

    return data;
  }
}
