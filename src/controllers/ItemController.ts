import type { Items, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController";
import { ItemService } from "../services/ItemService";


export class ItemController extends BaseController<Items, Prisma.ItemsCreateInput, Prisma.ItemsUpdateInput> {
    private itemService: ItemService
    constructor() {
        const service = new ItemService();
        super(service);
        this.itemService = service;
    }
}