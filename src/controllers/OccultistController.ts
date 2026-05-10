import type { NextFunction, Request, Response } from "express";

import type { Occultist, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController.js";

import ImageService from "../services/ImageService.js";
import { OccultistService } from "../services/OccultistService.js";

export class OccultistController extends BaseController<Occultist, Prisma.OccultistCreateInput, Prisma.OccultistUpdateInput> {
    private occultistService: OccultistService;

    constructor() {
        const service = new OccultistService();
        super(service);
        this.occultistService = service;
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body as Prisma.OccultistCreateInput;
            const file = req.file;
            let image: string | null | undefined;

            if (file) {
                image = await ImageService.upload(file);
            }

            const caseIds = this.getCaseIds(req.body);
            
            const data: Prisma.OccultistCreateInput = {
                ...body,
                ...(image !== undefined && { image }),
                cases: {
                    create: caseIds.map(id => ({
                        casesId: id
                    }))
                }
            };

            delete (data as any)["cases[]"];

            const item = await this.occultistService.create(data);
            res.status(201).json(item);
        } catch (e: unknown) {
            next(e);
        }
    }

    private getCaseIds(body: any): string[] {
        let caseIds: string[] = [];
        if (body.cases) {
            caseIds = Array.isArray(body.cases) ? body.cases : [body.cases];
        } else if (body["cases[]"]) {
            caseIds = Array.isArray(body["cases[]"])
                ? body["cases[]"]
                : [body["cases[]"]];
        }
        return caseIds;
    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const body = req.body as Prisma.OccultistUpdateInput;
            const file = req.file;

            let image: string | null | undefined;
            const removeImage = req.body.removeImage === "true";

            const current = await this.occultistService.getOne(id);

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

            const caseIds = this.getCaseIds(req.body);

            const data: Prisma.OccultistUpdateInput = {
                ...body,
                ...(image !== undefined && { image }),

                cases: {
                    deleteMany: {},
                    create: caseIds.map(id => ({
                        casesId: id
                    }))
                }
            };

            delete (data as any).removeImage;
            delete (data as any)["cases[]"];

            const item = await this.occultistService.update(id, data);

            res.json(item);

        } catch (e: unknown) {
            next(e);
        }
    };

    addToCase = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { occultistId, caseId } = req.params;
            if (!occultistId || !caseId) {
                res.status(400).json({ error: "occultistId e caseId são obrigatórios" });
                return;
            }
            
            const item = await this.occultistService.addOccultistToCase(occultistId as string, caseId as string);
            res.json(item);
        } catch (e: unknown) {
            next(e);
        }
    }

    removeFromCase = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { occultistId, caseId } = req.params;
            if (!occultistId || !caseId) {
                res.status(400).json({ error: "occultistId e caseId são obrigatórios" });
                return;
            }
            const item = await this.occultistService.removeOccultistFromCase(occultistId as string, caseId as string);
            res.json(item);
        } catch (e: unknown) {
            next(e);
        }
    }

}
