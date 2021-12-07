import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { BoardService, UserService } from "../services";
import { Request } from "../types";

export class BoardController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await BoardService.findAllUserBoard(req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await BoardService.findById(req.params.id, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.author = req.user;
      return res.status(201).json(await BoardService.store(req.body));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(
        await BoardService.update(req.params.id, req.body, req.user)
      );
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await BoardService.delete(req.params.id, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async bulk(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await BoardService.getBulk(req.params.id))
    } catch (e) {
      next(createHttpError(400, e));
    }
  }
}
