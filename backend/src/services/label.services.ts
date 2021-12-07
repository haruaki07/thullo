import { LabelModel, BoardModel } from "../models";

interface LabelDTO {
  name: string;
  color: string;
  boardId: string;
}

export class LabelService {
  static async findAll(boardId: string, userId: string) {
    const board = await BoardModel.findOne({ _id: boardId });
    if (!board) throw new Error("Board not found");

    if (!board.isMember(userId)) throw new Error("Not allowed");

    return LabelModel.find({ boardId: board.id });
  }

  static async findById(labelId: string, userId: string) {
    try {
      return LabelModel.findByIdAndUserId(labelId, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  static async store(data: LabelDTO, userId: string) {
    const board = await BoardModel.findById(data.boardId);
    if (!board) throw new Error("Board not found");

    if (!board.isMember(userId)) throw new Error("Not allowed");

    const label = await LabelModel.create(data);

    return label;
  }

  static async delete(labelId: string, userId: string) {
    try {
      const label = await LabelModel.findByIdAndUserId(labelId, userId);
      await label.deleteOne();

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
