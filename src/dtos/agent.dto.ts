import { z } from "zod";

import { AgentRole, AgentStatus, Privilege } from "@prisma/client";

export const updateAgentSchema = z.object({
    name: z.string().min(3).optional(),
    role: z.enum(AgentRole).optional(),
    image: z.string().optional().nullable(),
    status: z.enum(AgentStatus).optional(),
    accessLevel: z.enum(Privilege).optional(),
    lore: z.string().optional().nullable(),
}).strict();

export const createAgentSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    role: z.enum(AgentRole, `Role deve ser um dos seguintes valores: ${Object.values(AgentRole).join(", ")}`),
    image: z.string().optional().nullable(),
    status: z.enum(AgentStatus, `Status deve ser um dos seguintes valores: ${Object.values(AgentStatus).join(", ")}`),
    accessLevel: z.enum(Privilege, `AccessLevel deve ser um dos seguintes valores: ${Object.values(Privilege).join(", ")}`).default(Privilege.RECRUTA),
    lore: z.string().optional().nullable(),
}).strict();