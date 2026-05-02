import type { Organization, Prisma } from "@prisma/client";
import { BaseService } from "./BaseService";
import { createOrganizationSchema, updateOrganizationSchema } from "../dtos/organization.dto";
import { OrganizationRepository } from "../repositories/OrganizationRepository";

export class OrganizationService extends BaseService<Organization, Prisma.OrganizationCreateInput, Prisma.OrganizationUpdateInput> {
    constructor() {
        super(new OrganizationRepository());
    }

    override async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
        const validatedData = createOrganizationSchema.parse(data);
        return this.repository.create(validatedData as Prisma.OrganizationCreateInput);
    }

    override async update(id: string, data: Prisma.OrganizationUpdateInput) {
        console.log(data);
        const validated = updateOrganizationSchema.parse(data);
        return this.repository.update(id, validated as Prisma.OrganizationUpdateInput);
    }
}