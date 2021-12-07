import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { InviteService } from "../services";
import { Request } from "../types";

export class InviteController {
  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .status(201)
        .json(await InviteService.store(req.params.id, req.user, req.body));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await InviteService.findAll(req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await InviteService.findById(req.params.id, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await InviteService.delete(req.params.id, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async accept(req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .status(202)
        .json(await InviteService.accept(req.params.token, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }
}
