import type { Prisma, TeamCases } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";
import { prisma } from "../lib/prisma.js";

export class TeamCasesRepository extends BaseRepository<TeamCases, Prisma.TeamCasesCreateInput, Prisma.TeamCasesUpdateInput> {
    constructor() {
        super(prisma.teamCases);
    }
}
