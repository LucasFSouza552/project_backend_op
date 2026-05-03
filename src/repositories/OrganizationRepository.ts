
import type { Organization, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";
import { prisma } from "../lib/prisma.js";

export class OrganizationRepository extends BaseRepository<Organization, Prisma.OrganizationCreateInput, Prisma.OrganizationUpdateInput> {
    constructor() {
        super(prisma.organization);
    }
}
