import {
  DocumentType,
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { Board, List, User, Label, Comment } from ".";

export class Task extends TimeStamps {
  @prop({ required: true })
  title!: string;

  @prop()
  description?: string;

  @prop()
  cover?: string;

  @prop({ required: true })
  order: number;

  @prop({ ref: "User" })
  members: Ref<User>[];

  @prop({ required: true, ref: "List" })
  listId: Ref<List>;

  @prop({ required: true, ref: "Board" })
  boardId: Ref<Board>;

  // user id of the author task
  @prop({ required: true, ref: "User" })
  userId: Ref<User>;

  @prop({ ref: "Label", default: [] })
  labels: Ref<Label>[];

  @prop({ ref: "Comment", default: [] })
  comments: Ref<Comment>[];

  public async addMember(this: DocumentType<Task>, user: User) {
    this.members.push(user);
    return this.save();
  }

  public async deleteMember(
    this: DocumentType<Task>,
    userId: Types.ObjectId | string
  ) {
    const newMembers = this.members.filter((m) => m != userId);
    this.members = [...newMembers];
    return this.save();
  }

  public isOwner(this: DocumentType<List>, userId: string | Types.ObjectId) {
    return this.userId == userId;
  }
}

export const TaskModel = getModelForClass(Task);
