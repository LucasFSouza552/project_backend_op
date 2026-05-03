 import type { Items, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";
import { prisma } from "../lib/prisma.js";

export class ItemRepository extends BaseRepository<Items, Prisma.ItemsCreateInput, Prisma.ItemsUpdateInput> {
    constructor() {
        super(prisma.items);
    }
}
