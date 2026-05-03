import { type NextFunction, type Request, type Response } from "express";

import type { BaseService } from "../services/BaseService.js";

export class BaseController<Entity,
  Create,
  Update> {
  constructor(private service: BaseService<Entity,
    Create,
    Update>) {

  }

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.service.getAll();
      res.json(items);
    } catch (e: unknown) {
      next(e);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const item = await this.service.getOne(id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (e: unknown) {
      next(e);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as Create;
      const item = await this.service.create(body);
      res.status(201).json(item);
    } catch (e: unknown) {
      next(e);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const body = req.body as Update;

      const item = await this.service.update(id, body);
      res.json(item);
    } catch (e: unknown) {
      next(e);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await this.service.delete(id);
      res.status(204).send();
    } catch (e: unknown) {
      next(e);
    }
  };

}
