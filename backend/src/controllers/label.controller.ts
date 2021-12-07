import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { LabelService } from "../services";
import { Request } from "../types";

export class LabelController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { boardId } = req.query;

      return res
        .status(200)
        .json(await LabelService.findAll(boardId as string, req.user.id));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .status(200)
        .json(await LabelService.findById(req.params.id, req.user.id));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .status(201)
        .json(await LabelService.store(req.body, req.user.id));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await LabelService.delete(req.params.id, req.user.id);

      return res.sendStatus(204);
    } catch (e) {
      next(createHttpError(400, e));
    }
  }
}
