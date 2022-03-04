import {
  DocumentType,
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ToObjectOptions, Types } from "mongoose";
import { Board, TaskModel, User } from ".";

export class List extends TimeStamps {
  @prop({ required: true })
  title!: string;

  @prop({ required: true, ref: "Board" })
  boardId: Ref<Board>;

  // user id of the author list
  @prop({ required: true, ref: "User" })
  userId: Ref<User>;

  public deleteAllTask(this: DocumentType<List>) {
    return TaskModel.deleteMany({ listId: this._id });
  }

  public isOwner(this: DocumentType<List>, userId: string | Types.ObjectId) {
    return this.userId == userId;
  }

  public responseJSON(this: DocumentType<List>, options?: ToObjectOptions) {
    const opts = {
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;

        return ret;
      },
    } as ToObjectOptions;

    return this.toJSON(Object.assign(opts, options));
  }
}

export const ListModel = getModelForClass(List);
