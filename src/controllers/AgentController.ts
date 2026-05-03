import type { NextFunction, Request, Response } from "express";

import type { Agent, AgentStatus, AgentRole, Privilege, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController.js";

import { AgentService } from "../services/AgentService.js";
import ImageService from "../services/ImageService.js";

export class AgentController extends BaseController<Agent, Prisma.AgentCreateInput, Prisma.AgentUpdateInput> {
  private agentService: AgentService;
  

  constructor() {
    const service = new AgentService();
    super(service);
    this.agentService = service;
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const item = await this.agentService.getOne(id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (e: unknown) {
      next(e);
    }
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = req.body as Prisma.AgentCreateInput;
    const file = req.file;
    let image: string | null | undefined;

    if (!body.name || !body.role) {
      res.status(400).json({ error: "nome e cargo são obrigatórios" });
      return;
    }

    if (file) {
      image = await ImageService.upload(file);
    }

    const data = {
      ...body,
      ...(image !== undefined && { image }),
    };

    try {
      const item = await this.agentService.create(data);
      res.status(201).json(item);
    } catch (e: unknown) {
      next(e);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const body = req.body as Prisma.AgentUpdateInput;
      const file = req.file;

      const removeImage = req.body.removeImage === "true";

      const current = await this.agentService.getOne(id);

      let image: string | null | undefined;

      if (file) {
        if (current?.image) {
          await ImageService.delete(current.image);
        }

        image = await ImageService.upload(file);
      } else if (removeImage) {
        if (current?.image) {
          await ImageService.delete(current.image);
        }

        image = null;
      }

      const data: Prisma.AgentUpdateInput = {
        ...body,
        ...(image !== undefined && { image }),
      };

      delete (data as any).removeImage;

      const item = await this.agentService.update(id, data);

      res.json(item);
    } catch (e) {
      next(e);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, role } = req.query;
      const filters: { status?: AgentStatus; role?: AgentRole; } = {};
      if (status && typeof status === "string") filters.status = status as AgentStatus;
      if (role && typeof role === "string") filters.role = role as AgentRole;

      const items = await this.agentService.getAll(filters);
      res.json(items);
    } catch (e: unknown) {
      next(e);
    }
  };

  addToTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { agentId, teamId } = req.params;
      if (!agentId || !teamId) {
        res.status(400).json({ error: "agentId e teamId são obrigatórios" });
        return;
      }
      const item = await this.agentService.addAgentToTeam(agentId as string, teamId as string);
      res.json(item);
    } catch (e: unknown) {
      next(e);
    }
  }

  removeFromTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { agentId, teamId } = req.params;
      if (!agentId || !teamId) {
        res.status(400).json({ error: "agentId e teamId são obrigatórios" });
        return;
      }
      const item = await this.agentService.removeAgentFromTeam(agentId as string, teamId as string);
      res.json(item);
    } catch (e: unknown) {
      next(e);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const agent = await this.agentService.getOne(id);
      if (!agent) {
        res.status(404).json({ error: "Agente não encontrado" });
        return;
      }

      if (agent.image) {
        await ImageService.delete(agent.image);
      }

      const item = await this.agentService.delete(id);
      res.json(item);
    } catch (e: unknown) {
      next(e);
    }
  }

}
