import { User, UserModel } from "../models/user.model";

export class UserService {
  static async findById(id: string) {
    const user = await UserModel.findById(id);
    return user.toJSON();
  }

  static async store({ name, email, password }: User) {
    const exist = await UserModel.findOne({ email });
    if (exist) throw new Error("That email is already registered");

    const user = await UserModel.create({
      email,
      name,
      password: await UserModel.generatePassword(password),
    });

    const { token } = await user.generateAuthToken();

    return {
      user: user.toJSON(),
      token,
    };
  }

  static async login({ email, password }: User) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Could not find user");

    const valid = await UserModel.verifyPassword(user.password, password);
    if (!valid) throw new Error("Wrong credentials");

    const { token } = await user.generateAuthToken();

    return { user, token: token };
  }

  static async logout(id: string) {
    await UserModel.findByIdAndUpdate(id, { token: "" });
    return true;
  }
}
