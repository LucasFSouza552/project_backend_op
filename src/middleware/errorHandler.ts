import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError, type ZodIssue } from "zod";


export function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("Error Capturado no Handler", error);

    if (error instanceof ZodError) {
        res.status(400).json({
            message: "Erro de validação",
            errors: error.issues.map((issue) => {

                if (issue.code === "unrecognized_keys") {
                    return {
                        field: "body",
                        message: `Campos não permitidos: ${issue.keys.join(", ")}`
                    };
                }

                if (issue.code === "too_small") {
                    return {
                        field: "body",
                        message: issue.message
                    };
                }

                return {
                    field: issue.path.length ? issue.path.join(".") : "body",
                    message: issue.message
                };
            })
        });
        return
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(400).json({
            message: "Database operation failed",
            code: error.code,
        });
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(422).json({
            message: "Invalid data sent to database",
        });
    }

    return res.status(500).json({
        message: "Internal server error",
    });
}
