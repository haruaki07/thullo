import {
  getModelForClass,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Board, BoardModel } from ".";

export class Label {
  @prop({ required: true, trim: true })
  name: string;

  @prop({ required: true })
  color: string;

  @prop({ ref: "Board" })
  boardId: Ref<Board>;

  public static async findByIdAndUserId(
    this: ReturnModelType<typeof Label>,
    labelId: string,
    userId: string
  ) {
    const label = await this.findOne({ _id: labelId });
    if (!label) throw new Error("Label not found");

    const board = await BoardModel.findById(label.boardId);
    if (!board) throw new Error("Board not found");

    if (!board.isMember(userId)) throw new Error("Not allowed");

    return label;
  }
}

export const LabelModel = getModelForClass(Label);
