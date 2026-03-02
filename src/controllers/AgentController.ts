import type { NextFunction, Request, Response } from "express";
import type { Agent, AgentStatus, AgentRole, Privilege, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController";
import { AgentService } from "../services/AgentService";

export class AgentController extends BaseController<Agent, Prisma.AgentCreateInput, Prisma.AgentUpdateInput> {
  private agentService: AgentService;

  constructor() {
    const service = new AgentService();
    super(service);
    this.agentService = service;
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = req.body as { name?: string; role?: AgentRole; image?: string; status?: AgentStatus; accessLevel?: Privilege; lore?: string; teamId?: string | null };
    if (!body.name || !body.role) {
      res.status(400).json({ error: "nome e cargo são obrigatórios" });
      return;
    }

    try {
      const item = await this.agentService.create(req.body);
      res.status(201).json(item);
    } catch (e: unknown) {
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
}
