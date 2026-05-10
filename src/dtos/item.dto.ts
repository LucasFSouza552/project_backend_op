import z from "zod";

import { ItemElement, ItemSize, ItemType, Privilege } from "@prisma/client";

export const createItemSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    type: z.nativeEnum(ItemType),
    size: z.nativeEnum(ItemSize),
    elements: z.nativeEnum(ItemElement),
    accessLevel: z.nativeEnum(Privilege).default(Privilege.RECRUTA),
    description: z.string().optional().nullable(),
    containment: z.string().optional().nullable(),
    extra_notes: z.string().optional().nullable(),
    image: z.string().optional().nullable()
}).strict();

export const updateItemSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
    type: z.nativeEnum(ItemType).optional(),
    size: z.nativeEnum(ItemSize).optional(),
    elements: z.nativeEnum(ItemElement).optional(),
    accessLevel: z.nativeEnum(Privilege),
    description: z.string().optional().nullable(),
    containment: z.string().optional().nullable(),
    extra_notes: z.string().optional().nullable(),
    image: z.string().optional().nullable()
}).strict();
