import { TeamDesignation, TeamStatus } from "@prisma/client";
import z from "zod";

export const updateTeamSchema = z.object({
    name: z.string().min(3).optional(),
    status: z.nativeEnum(TeamStatus).optional(),
    designation: z.string().optional()
}).strict();

export const createTeamSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    status: z.nativeEnum(TeamStatus),
    designation: z.nativeEnum(TeamDesignation),
}).strict();
