import type { Cases, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";
import { prisma } from "../lib/prisma.js";

export class CaseRepository extends BaseRepository<Cases, Prisma.CasesCreateInput, Prisma.CasesUpdateInput> {
    constructor() {
        super(prisma.cases);
    }
    
}
