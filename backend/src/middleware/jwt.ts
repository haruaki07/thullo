import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import { UserModel } from "../models/user.model";
import { Request } from "../types";

export default async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  if (!token) return next(createHttpError(401, "Unauthorized"));

  try {
    const payload = verify(token, TOKEN_SECRET) as any;

    const user = await UserModel.findOne({ id: payload.userId, token });
    if (!user) throw new Error("Invalid Token");

    req.user = user;
    return next();
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return next(createHttpError(400, "Invalid Token"));
    }
    return next(createHttpError(400, e));
  }
};
