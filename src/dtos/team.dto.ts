import { TeamDesignation, TeamStatus } from "@prisma/client";
import z from "zod";

export const updateTeamSchema = z.object({
    name: z.string().min(3).optional(),
    status: z.enum(TeamStatus).optional(),
    designation: z.string().optional()
}).strict();

export const createTeamSchema = z.object({
    name: z.string("Nome é obrigatório").min(3, "Nome deve ter no mínimo 3 caracteres"),
    status: z.enum(TeamStatus, `Status deve ser um dos seguintes valores: ${Object.values(TeamStatus).join(", ")}`),
    designation: z.enum(TeamDesignation, `A designação da equipe deve ser um dos seguintes valores: ${Object.values(TeamDesignation).join(", ")}`),
}).strict();