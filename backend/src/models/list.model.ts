import {
  DocumentType,
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { Board, User } from ".";

export class List extends TimeStamps {
  @prop({ required: true })
  title!: string;

  @prop({ required: true, ref: "Board" })
  boardId: Ref<Board>;

  // user id of the author list
  @prop({ required: true, ref: "User" })
  userId: Ref<User>;

  public isOwner(this: DocumentType<List>, userId: string | Types.ObjectId) {
    return this.userId == userId;
  }
}

export const ListModel = getModelForClass(List);
