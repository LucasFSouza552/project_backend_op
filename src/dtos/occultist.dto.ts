import { z } from "zod";

import { AgentStatus, OperationScope, OrderRelationship, OrganizationStatus, OrganizationType, Privilege, RiskLevel } from "@prisma/client";

export const updateOccultistSchema = z.object({
    name: z.string().min(3).optional(),
    status: z.nativeEnum(AgentStatus).optional(),
    lore: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    cases: z.string().optional().nullable(),
    accessLevel: z.nativeEnum(Privilege),
}).strict();

export const createOccultistSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    status: z.nativeEnum(AgentStatus),
    lore: z.string().optional().nullable(),
    accessLevel: z.nativeEnum(Privilege).default(Privilege.RECRUTA),
    image: z.string().optional().nullable(),
    cases: z.string().optional().nullable(),
}).strict();
