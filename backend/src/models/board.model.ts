import {
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { User, List } from ".";
import { UserModel } from "./user.model";

interface BoardMember {
  userId: string;
  isAdmin: boolean;
}

interface toJSONOptions {
  user?: any;
  strip?: string[];
  populateMembers?: boolean;
}

@modelOptions({ options: { allowMixed: 0 } })
export class Board extends TimeStamps {
  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  isPublic!: boolean;

  @prop()
  description?: string;

  @prop()
  cover?: string;

  @prop({ ref: "User" })
  author: Ref<User>;

  @prop({ type: [Object], default: [] })
  members?: Types.Array<BoardMember>;

  @prop({ ref: () => List })
  lists: Ref<List>[];

  toJSON(this: DocumentType<Board>, { user, strip, populateMembers = false }: toJSONOptions) {
    return this.toObject({
      versionKey: false,
      transform: async (_doc, ret) => {
        ret.id = ret._id;

        if (ret.author && user) ret.author = user.toJSON();
        if (strip) strip.forEach((s) => delete ret[s]);

        if (populateMembers) {
          let members = ret.members as BoardMember[];
          const users = await UserModel.find({
            _id: {
              $in: members.map(m => m.userId)
            }
          }).select('_id name email avatar').exec();

          members = members.map(member => {
            for (const user of users) {
              if (user._id.equals(member.userId)) {
                let userJson = user.toJSON();
                delete member.userId;

                member = Object.assign(member, userJson);
                break;
              }
            }
            return member;
          });

          ret.members = members;
        }

        delete ret._id;
        return ret;
      },
    });
  }

  public memberIdx(this: DocumentType<Board>, userId: string | Types.ObjectId) {
    return this.members.findIndex((m) => m.userId == userId);
  }

  public getAdmins(this: DocumentType<Board>) {
    return this.members.filter((m) => m.isAdmin);
  }

  /**
   * check if the authorized user can view
   *
   * @param user
   */
  public isVisibleBy(this: DocumentType<Board>, user: DocumentType<User>) {
    if (this.isPublic) return true;
    return user && this.isMember(user.id);
  }

  public isMember(this: DocumentType<Board>, userId: string) {
    return this.members.find((m) => m.userId == userId);
  }

  /**
   * check if the given user id is author/admin
   *
   * @param userId
   */
  public isAdmin(this: DocumentType<Board>, userId: string) {
    const member = this.isMember(userId);

    return member?.isAdmin;
  }

  public async addMember(
    this: DocumentType<Board>,
    userId: string,
    isAdmin: boolean = false
  ) {
    if (!this.isMember(userId)) {
      this.members.push({ userId, isAdmin });
      return this.save();
    }
  }

  public async deleteMember(this: DocumentType<Board>, userId: string) {
    this.members.pull({ userId });
    return this.save();
  }

  public async addList(this: DocumentType<Board>, list: List) {
    this.lists.push(list);
    return this.save();
  }

  public async deleteList(
    this: DocumentType<Board>,
    listId: Types.ObjectId | string
  ) {
    const newList = this.lists.filter((l) => l != listId);
    this.lists = [...newList];
    return this.save();
  }
}

export const BoardModel = getModelForClass(Board);
