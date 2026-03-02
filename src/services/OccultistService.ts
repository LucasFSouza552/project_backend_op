import type { Occultist, Prisma } from "@prisma/client";
import { BaseService } from "./BaseService";
import { OccultistRepository } from "../repositories/OccultistRepository";
import { createOccultistSchema } from "../dtos/occultist.dto";

export class OccultistService extends BaseService<Occultist, Prisma.OccultistCreateInput, Prisma.OccultistUpdateInput> {
    constructor() {
        super(new OccultistRepository());
    }

    override async create(data: Prisma.OccultistCreateInput) {
        const validatedData = createOccultistSchema.parse(data);
        return this.repository.create(validatedData as Prisma.OccultistCreateInput);
    }

    override async update(id: string, data: Prisma.OccultistUpdateInput) {
        const validated = createOccultistSchema.parse(data);
        return this.repository.update(id, validated as Prisma.OccultistUpdateInput);
    }
}