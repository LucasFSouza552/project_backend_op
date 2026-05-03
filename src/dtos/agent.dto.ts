import { z } from "zod";

import { AgentRole, AgentStatus, Privilege } from "@prisma/client";

export const updateAgentSchema = z.object({
    name: z.string().min(3).optional(),
    role: z.nativeEnum(AgentRole).optional(),
    image: z.string().optional().nullable(),
    status: z.nativeEnum(AgentStatus).optional(),
    accessLevel: z.nativeEnum(Privilege).optional(),
    lore: z.string().optional().nullable(),
}).strict();

export const createAgentSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    role: z.nativeEnum(AgentRole),
    image: z.string().optional().nullable(),
    status: z.nativeEnum(AgentStatus),
    accessLevel: z.nativeEnum(Privilege).default(Privilege.RECRUTA),
    lore: z.string().optional().nullable(),
}).strict();
