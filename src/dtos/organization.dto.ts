import { z } from "zod";

import { AgentRole, OrganizationStatus, OperationScope, OrganizationType, Privilege, RiskLevel, OrderRelationship } from "@prisma/client";

export const updateOrganizationSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
    type: z.nativeEnum(OrganizationType).optional(),
    scope: z.nativeEnum(OperationScope).optional(),
    status: z.nativeEnum(OrganizationStatus).optional(),
    accessLevel: z.nativeEnum(Privilege).optional(),
    threatLevel: z.nativeEnum(RiskLevel).optional(),
    relationship: z.nativeEnum(OrderRelationship).optional(),
    ideology: z.string().optional().nullable(),
});



export const createOrganizationSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    type: z.nativeEnum(OrganizationType),
    scope: z.nativeEnum(OperationScope),
    ideology: z.string().optional().nullable(),
    accessLevel: z.nativeEnum(Privilege).default(Privilege.RECRUTA),
    threatLevel: z.nativeEnum(RiskLevel),
    status: z.nativeEnum(OrganizationStatus),
    relationship: z.nativeEnum(OrderRelationship),
}).strict();
