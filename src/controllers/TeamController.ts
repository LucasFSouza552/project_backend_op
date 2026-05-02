import type { NextFunction, Request, Response } from "express";

import type { Prisma, Team, TeamDesignation, TeamStatus } from "@prisma/client";
import { BaseController } from "./BaseController";

import { TeamService } from "../services/TeamService";

export class TeamController extends BaseController<Team, Prisma.TeamCreateInput, Prisma.TeamUpdateInput> {
    private teamService: TeamService;
    constructor() {
        const service = new TeamService();
        super(service);
        this.teamService = service;
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const item = await this.teamService.create(req.body);
            res.status(201).json(item);
        } catch (e: unknown) {
            next(e);
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { designation, status } = req.query;
            const filters: { designation?: TeamDesignation; status?: TeamStatus } = {};
            if (designation && typeof designation === "string") filters.designation = designation as TeamDesignation;
            if (status && typeof status === "string") filters.status = status as TeamStatus;

            const items = await this.teamService.getAll(filters);
            res.json(items);
        } catch (e: unknown) {
            next(e);
        }
    }
}