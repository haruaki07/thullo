import { prop, Ref } from "@typegoose/typegoose";
import { Task, User } from ".";

export class Comment {
  @prop({ required: true, trim: true })
  content!: string;

  @prop({ ref: "Task" })
  taskId: Ref<Task>;

  @prop({ ref: "User" })
  userId: Ref<User>;
}
