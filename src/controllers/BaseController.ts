import { type NextFunction, type Request, type Response } from "express";
import type { BaseService } from "../services/BaseService";

export class BaseController<T,
  CreateInput,
  UpdateInput> {
  constructor(private service: BaseService<T,
    CreateInput,
    UpdateInput>) {

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
      const item = await this.service.create(req.body);
      res.status(201).json(item);
    } catch (e: unknown) {
      next(e);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const item = await this.service.update(id, req.body);
      res.json(item);
    } catch (e: unknown) {
      console.error("Testar error", e);
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