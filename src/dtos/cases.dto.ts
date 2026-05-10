import { z } from "zod";

import { Privilege } from "@prisma/client";

export const CaseSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),

    accessLevel: z.nativeEnum(Privilege),
    occultists: z.array(
        z.object({
            id: z.string().optional(),
        })
    ),
    teams: z.array(
        z.object({
            id: z.string().optional(),
        })
    ),
});

export const updateCaseSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
    description: z.string().optional(),

    occultists: z.array(
        z.object({
            id: z.string()
        })
    ).optional(),

    accessLevel: z.nativeEnum(Privilege),
    teams: z.array(
        z.object({
            id: z.string()
        })
    ).optional(),

}).strict();

export const createCaseSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    description: z.string(),

    accessLevel: z.nativeEnum(Privilege).default(Privilege.RECRUTA),
    occultists: z.array(
        z.object({
            id: z.string()
        })
    ).optional(),

    teams: z.array(
        z.object({
            id: z.string()
        })
    ).optional(),

}).strict();
