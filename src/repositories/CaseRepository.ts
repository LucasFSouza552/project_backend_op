import type { Cases, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { prisma } from "../lib/prisma";

export class CaseRepository extends BaseRepository<Cases, Prisma.CasesCreateInput, Prisma.CasesUpdateInput> {
    constructor() {
        super(prisma.cases);
    }
    
}