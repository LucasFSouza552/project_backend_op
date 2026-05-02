import { z } from "zod";

import { AgentStatus, OperationScope, OrderRelationship, OrganizationStatus, OrganizationType, Privilege, RiskLevel } from "@prisma/client";

export const updateOccultistSchema = z.object({
    name: z.string().min(3).optional(),
    status: z.enum(AgentStatus).optional(),
    lore: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    cases: z.string().optional().nullable(),
    accessLevel: z.enum(Privilege, `AccessLevel deve ser um dos seguintes valores: ${Object.values(Privilege).join(", ")}`),
}).strict();

export const createOccultistSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    status: z.enum(AgentStatus, `Status deve ser um dos seguintes valores: ${Object.values(AgentStatus).join(", ")}`),
    lore: z.string().optional().nullable(),
    accessLevel: z.enum(Privilege, `AccessLevel deve ser um dos seguintes valores: ${Object.values(Privilege).join(", ")}`).default(Privilege.RECRUTA),
    image: z.string().optional().nullable(),
    cases: z.string().optional().nullable(),
}).strict();