import type { Prisma, TeamCases } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { prisma } from "../lib/prisma";

export class TeamCasesRepository extends BaseRepository<TeamCases, Prisma.TeamCasesCreateInput, Prisma.TeamCasesUpdateInput> {
    constructor() {
        super(prisma.teamCases);
    }
}