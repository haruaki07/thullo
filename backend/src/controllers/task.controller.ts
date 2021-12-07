import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { TaskService } from "../services";
import { Request } from "../types";

export class TaskController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { listId, boardId } = req.query;

      return res.json(await TaskService.findAll(listId, boardId, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await TaskService.findById(req.params.id, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(await TaskService.store(req.body, req.user));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await TaskService.update(req.params.id, req.body, req.user.id));
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await TaskService.delete(req.params.id, req.user.id);
      return res.sendStatus(204);
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async addMember(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, email } = req.body;
      if (!userId && !email) throw new Error("userId or email is required!");

      res.json(
        await TaskService.addMember(req.params.id, req.body, req.user.id)
      );
    } catch (e) {
      next(createHttpError(400, e));
    }
  }

  static async deleteMember(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.userId) throw new Error("userId is required!");

      res.json(
        await TaskService.deleteMember(req.params.id, req.body, req.user.id)
      );
    } catch (e) {
      next(createHttpError(400, e));
    }
  }
}
