
import type { Organization, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { prisma } from "../lib/prisma";

export class OrganizationRepository extends BaseRepository<Organization, Prisma.OrganizationCreateInput, Prisma.OrganizationUpdateInput> {
    constructor() {
        super(prisma.organization);
    }
}