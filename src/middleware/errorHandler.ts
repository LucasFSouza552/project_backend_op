import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError, type ZodIssue } from "zod";


export function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("error", error);

    if (error instanceof ZodError) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: error.issues.map((issue) => {

                if (issue.code === "unrecognized_keys") {
                    return {
                        field: "body",
                        message: `Campos não permitidos: ${issue.keys.join(", ")}`
                    };
                }

                return {
                    field: issue.path.length ? issue.path.join(".") : "body",
                    message: issue.message
                };
            })
        });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2025 = Record not found
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(400).json({
            message: "Database operation failed",
            code: error.code,
        });
    }

    // 🔥 Erros de validação
    if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(422).json({
            message: "Invalid data sent to database",
        });
    }

    // 🔥 Erro genérico
    return res.status(500).json({
        message: "Internal server error",
    });
}
