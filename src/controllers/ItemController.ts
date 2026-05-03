import type { NextFunction, Request, Response } from "express";

import type { Items, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController.js";

import ImageService from "../services/ImageService.js";
import { ItemService } from "../services/ItemService.js";

export class ItemController extends BaseController<Items, Prisma.ItemsCreateInput, Prisma.ItemsUpdateInput> {
    private itemService: ItemService
    constructor() {
        const service = new ItemService();
        super(service);
        this.itemService = service;
    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const body = req.body as Prisma.ItemsUpdateInput;
            const file = req.file;

            const removeImage = req.body.removeImage === "true";

            const current = await this.itemService.getOne(id);
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

            const data: Prisma.ItemsUpdateInput = {
                ...body,
                ...(image !== undefined && { image }),
            };

            delete (data as any).removeImage;
            console.log(data);
            const item = await this.itemService.update(id, data);
            res.json(item);
        } catch (e: unknown) {
            next(e);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log("req.body");
            const body = req.body as Prisma.ItemsCreateInput;
            const file = req.file;
            let image: string | null | undefined;

            if (file) {
                image = await ImageService.upload(file);
            }

            const data = {
                ...body,
                ...(image !== undefined && { image }),
            }

            const item = await this.itemService.create(data);
            res.status(201).json(item);
        } catch (e: unknown) {
            next(e);
        }
    }
}
