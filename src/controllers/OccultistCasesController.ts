import type { NextFunction, Request, Response } from "express";

import type { Occultist, OccultistCases, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController";

import { OccultistCasesService } from "../services/OccultistCasesService";

export class OccultistCasesController extends BaseController<OccultistCases, Prisma.OccultistCasesCreateInput, Prisma.OccultistCasesUpdateInput> {
    private occultistCasesService: OccultistCasesService;
    constructor() {
        const occultistCasesService = new OccultistCasesService();
        super(occultistCasesService);
        this.occultistCasesService = occultistCasesService;
    }

    addToCase = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const occultistId = req.params.occultistId as string;
            const casesId = req.params.casesId as string;
            const item = await this.occultistCasesService.addToCase(occultistId, casesId);
            res.json(item);
        } catch (e: unknown) {
            next(e);
        }
    };

    removeFromCase = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const occultistId = req.params.occultistId as string;
            const casesId = req.params.casesId as string;
            const item = await this.occultistCasesService.removeFromCase(occultistId, casesId);
            res.json(item);
        } catch (e: unknown) {
            next(e);
        }
    };
}