import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { UserService } from "../services/user.services";
import { Request } from "../types";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).json(await UserService.store(req.body));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await UserService.login(req.body));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await UserService.logout(req.user.id));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await UserService.findById(req.user.id));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }
}
