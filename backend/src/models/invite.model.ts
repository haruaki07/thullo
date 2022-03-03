import {
  DocumentType,
  getModelForClass,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Board, User } from ".";

export class Invite {
  @prop({ required: true })
  token!: string;

  @prop({ ref: "User" })
  from: Ref<User>;

  @prop({ ref: "User" })
  user: Ref<User>;

  @prop({ ref: "Board" })
  board: Ref<Board>;

  @prop({
    type: Date,
    default: () => new Date(Date.now() + 1000 * (86400 * 3)), // 3d
  })
  expiredAt?: Date;

  @prop({
    type: Date,
    default: Date.now,
  })
  createdAt?: Date;

  public toJSON(
    this: DocumentType<Invite>,
    board?: DocumentType<Board>,
    from?: DocumentType<User>,
    invited?: DocumentType<User>
  ) {
    return this.toObject({
      versionKey: false,
      transform: async (doc, ret) => {
        ret.id = ret._id;
        if (from) ret.from = from.toJSON();
        if (invited) ret.user = invited.toJSON();
        if (board) ret.board = board.toJSON({
          strip: ["author"]
        });

        delete ret._id;
        return ret;
      },
    });
  }

  public isExpired(this: DocumentType<Invite>) {
    if (new Date(this.expiredAt).getTime() > Date.now()) {
      return false;
    }
    return true;
  }
}

export const InviteModel = getModelForClass(Invite);
