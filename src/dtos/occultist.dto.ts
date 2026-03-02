import { AgentStatus, OperationScope, OrderRelationship, OrganizationStatus, OrganizationType, RiskLevel } from "@prisma/client";
import { z } from "zod";

export const updateOccultistSchema = z.object({
    name: z.string().min(3).optional(),
    status: z.enum(AgentStatus).optional(),
    lore: z.string().optional().nullable(),
    assigned_team: z.string().optional().nullable(),
    cases: z.string().optional().nullable(),
}).strict();

export const createOccultistSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    status: z.enum(AgentStatus, `Status deve ser um dos seguintes valores: ${Object.values(AgentStatus).join(", ")}`),
    lore: z.string().optional().nullable(),
    assigned_team: z.string().optional().nullable(),
    cases: z.string().optional().nullable(),
}).strict();