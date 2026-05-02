import type { NextFunction, Request, Response } from "express";
import type { Agent, AgentStatus, AgentRole, Privilege, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController";
import { AgentService } from "../services/AgentService";
import ImageService from "../services/ImageService";

export class ImageController {


    upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const file = req.file;
            if (!file) {
                throw new Error("Arquivo nao enviado");
            }

            const fileId = await ImageService.upload(file);
            res.json({ fileId });
        } catch (e: unknown) {
            next(e);
        }
    };

    getStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("Pegar Imagem")
        try {
            const fileId = req.params?.id as string;
            if (!fileId) {
                throw new Error("Arquivo nao encontrado");
            }
            const stream = await ImageService.getStream(fileId);
            stream.pipe(res);
        } catch (e: unknown) {
            next(e);
        }
    }

}
