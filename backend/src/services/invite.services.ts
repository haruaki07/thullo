import { DocumentType } from "@typegoose/typegoose";
import { BoardModel } from "../models/board.model";
import { InviteModel } from "../models/invite.model";
import { User, UserModel } from "../models/user.model";
import cr from "crypto";

export class InviteService {
  /** @param user inviter */
  static async store(
    board_id: string,
    user: DocumentType<User>,
    data: { email: string }
  ) {
    const board = await BoardModel.findById(board_id);

    if (!board) throw new Error("Board not found");
    if (!board.isAdmin(user._id) && user.email == data.email)
      throw new Error("Not allowed");

    const invited = await UserModel.findOne({ email: data.email });

    const invitation = await InviteModel.create({
      token: cr.randomBytes(13).toString("hex"),
      board,
      user: invited,
      from: user,
    });

    return invitation.toJSON(board, user, invited);
  }

  static async findById(id: string, user: DocumentType<User>) {
    const invite = await InviteModel.findOne({ _id: id, user: user.id });

    if (!invite) throw new Error("Not found");
    if (invite.isExpired()) throw new Error("This invitation has expired");

    const board = await BoardModel.findOne({ _id: invite.board });
    const from = await UserModel.findOne({ _id: invite.from });

    return invite.toJSON(board, from);
  }

  static async findAll(user: DocumentType<User>) {
    const invites = await InviteModel.find({ user: user.id });

    return Promise.all(
      invites.map(async (i) => {
        const board = await BoardModel.findOne({ _id: i.board });
        const from = await UserModel.findOne({ _id: i.from });

        return i.toJSON(board, from);
      })
    );
  }

  static async delete(id: string, user: DocumentType<User>) {
    const invite = await InviteModel.findById(id);

    if (!invite) throw new Error("Not found");
    if (invite.from != user.id && invite.user != user.id)
      throw new Error("Not allowed");

    await invite.deleteOne();

    return true;
  }

  static async accept(token: string, user: DocumentType<User>) {
    const invite = await InviteModel.findOne({ token, user: user.id });

    if (!invite) throw new Error("Not found");
    if (!invite.isExpired()) throw new Error("This invitation has expired");

    const board = await BoardModel.findById(invite.board);
    const userId = invite.user as any;

    await board.addMember(userId);
    await invite.deleteOne();

    return true;
  }
}
