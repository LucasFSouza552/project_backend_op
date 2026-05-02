import z from "zod";

import { ItemElement, ItemSize, ItemType, Privilege } from "@prisma/client";

export const createItemSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    type: z.enum(ItemType, `Type deve ser um dos seguintes valores: ${Object.values(ItemType).join(", ")}`),
    size: z.enum(ItemSize, `Size deve ser um dos seguintes valores: ${Object.values(ItemSize).join(", ")}`),
    elements: z.enum(ItemElement, `Elements devem ser um dos seguintes valores: ${Object.values(ItemElement).join(", ")}`),
    accessLevel: z.enum(Privilege, `AccessLevel deve ser um dos seguintes valores: ${Object.values(Privilege).join(", ")}`).default(Privilege.RECRUTA),
    description: z.string().optional().nullable(),
    containment: z.string().optional().nullable(),
    extra_notes: z.string().optional().nullable(),
    image: z.string().optional().nullable()
}).strict();

export const updateItemSchema = z.object({
    name: z.string().min(3).optional(),
    type: z.enum(ItemType).optional(),
    size: z.enum(ItemSize).optional(),
    elements: z.enum(ItemElement).optional(),
    accessLevel: z.enum(Privilege, `AccessLevel deve ser um dos seguintes valores: ${Object.values(Privilege).join(", ")}`),
    description: z.string().optional().nullable(),
    containment: z.string().optional().nullable(),
    extra_notes: z.string().optional().nullable(),
    image: z.string().optional().nullable()
}).strict();