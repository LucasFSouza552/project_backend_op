import { z } from "zod";

import { AgentRole, OrganizationStatus, OperationScope, OrganizationType, Privilege, RiskLevel, OrderRelationship } from "@prisma/client";

export const updateOrganizationSchema = z.object({
    name: z.string().min(3).optional(),
    role: z.enum(AgentRole).optional(),
    status: z.enum(OrganizationStatus).optional(),
    accessLevel: z.enum(Privilege).optional(),
    lore: z.string().optional().nullable(),
}).strict();

export const createOrganizationSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    type: z.enum(OrganizationType, `Type deve ser um dos seguintes valores: ${Object.values(OrganizationType).join(", ")}`),
    scope: z.enum(OperationScope, `Scope deve ser um dos seguintes valores: ${Object.values(OperationScope).join(", ")}`),
    ideology: z.string().optional().nullable(),
    accessLevel: z.enum(Privilege, `AccessLevel deve ser um dos seguintes valores: ${Object.values(Privilege).join(", ")}`).default(Privilege.RECRUTA),
    threatLevel: z.enum(RiskLevel, `ThreatLevel deve ser um dos seguintes valores: ${Object.values(RiskLevel).join(", ")}`),
    status: z.enum(OrganizationStatus, `Status deve ser um dos seguintes valores: ${Object.values(OrganizationStatus).join(", ")}`),
    relationship: z.enum(OrderRelationship, `Relationship deve ser um dos seguintes valores: ${Object.values(OrderRelationship).join(", ")}`),
}).strict();