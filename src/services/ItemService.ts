import type { Items, Prisma } from "@prisma/client";
import { BaseService } from "./BaseService";
import { createItemSchema, updateItemSchema } from "../dtos/item.dto";
import { ItemRepository } from "../repositories/ItemRepository";

export class ItemService extends BaseService<Items, Prisma.ItemsCreateInput, Prisma.ItemsUpdateInput> {
    constructor() {
        super(new ItemRepository());
    }

    override async create(data: Prisma.ItemsCreateInput) {
        const validatedData = createItemSchema.parse(data);
        return this.repository.create(validatedData as Prisma.ItemsCreateInput);
    }

    override async update(id: string, data: Prisma.ItemsUpdateInput) {
        const validated = updateItemSchema.parse(data);
        return this.repository.update(id, validated as Prisma.ItemsUpdateInput);
    }

}