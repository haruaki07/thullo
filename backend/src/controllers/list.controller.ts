import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { ListService } from "../services";
import { Request } from "../types";

export class ListController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const boardId = req.query.boardId;

      return res.json(await ListService.findAll(<string>boardId, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await ListService.findById(req.params.id, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .status(201)
        .json(await ListService.store(req.body, req.user.id));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(
        await ListService.update(req.params.id, req.body, req.user.id)
      );
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ListService.delete(req.params.id, req.user.id);
      return res.sendStatus(204);
    } catch (e) {
      next(createHttpError(400, e));
    }
  }
}
