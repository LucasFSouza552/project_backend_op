import type { Occultist, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController";
import { OccultistService } from "../services/OccultistService";
import type { NextFunction, Request, Response } from "express";

export class OccultistController extends BaseController<Occultist, Prisma.OccultistCreateInput, Prisma.ItemsUpdateInput> {
    private occultistService: OccultistService;

    constructor() {
        const service = new OccultistService();
        super(service);
        this.occultistService = service;
    }

}