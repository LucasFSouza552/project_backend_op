 import type { Items, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { prisma } from "../lib/prisma";

export class ItemRepository extends BaseRepository<Items, Prisma.ItemsCreateInput, Prisma.ItemsUpdateInput> {
    constructor() {
        super(prisma.items);
    }
}