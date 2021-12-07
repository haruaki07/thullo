import {
  prop,
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import { verify, hash } from "argon2";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export class User {
  @prop()
  name?: string;

  @prop({ index: true, unique: true, required: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop()
  token?: string;

  @prop()
  avatar?: string;

  public static generatePassword(
    this: ReturnModelType<typeof User>,
    password: string
  ) {
    try {
      return hash(password);
    } catch (e) {
      console.log(e);
    }
  }

  public static verifyPassword(
    this: ReturnModelType<typeof User>,
    hash: string,
    password: string
  ) {
    try {
      return verify(hash, password);
    } catch (e) {
      console.log(e);
    }
  }

  public generateAuthToken(this: DocumentType<User>) {
    const user = this;
    const token = jwt.sign(
      {
        uid: user.id,
      },
      TOKEN_SECRET,
      { expiresIn: "3d" }
    );
    user.token = token;
    return user.save();
  }

  public toJSON(this: DocumentType<User>) {
    let { name, email, avatar } = this.toObject();
    return {
      id: this.id,
      name,
      email,
      avatar,
    };
  }
}

export const UserModel = getModelForClass(User);
