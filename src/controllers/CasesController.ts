import type { NextFunction, Request, Response } from "express";

import type { Cases, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController";

import { CasesService } from "../services/CasesService";

export class CasesController extends BaseController<Cases, Prisma.CasesCreateInput, Prisma.CasesUpdateInput> {
    private CasesService: CasesService;
    constructor() {
        const casesService = new CasesService();
        super(casesService);
        this.CasesService = casesService;
    }

    addCaseToTeam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const caseId = req.params.caseId as string;
            const teamId = req.params.teamId as string;

            if (!caseId || !teamId) {
                return res.status(400).json({ message: "CaseId e teamId é obrigatorio" });
            }

            const item = await this.CasesService.addCaseToTeam(caseId, teamId);
            res.json(item);
        } catch (e: unknown) {
            next(e)
        }
    }

    removeCaseFromTeam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const caseId = req.params.caseId as string;
            const teamId = req.params.teamId as string;

            if (!caseId || !teamId) {
                return res.status(400).json({ message: "CaseId e teamId é obrigatorio" });
            }

            const item = await this.CasesService.removeCaseFromTeam(caseId, teamId);
            res.json(item);
        } catch (e: unknown) {
            next(e)
        }
    }
}