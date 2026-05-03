import type { Prisma, TeamCases } from "@prisma/client";
import { BaseService } from "./BaseService.js";
import { TeamCasesRepository } from "../repositories/TeamCasesRepository.js";

export class TeamCasesService extends BaseService<TeamCases, Prisma.TeamCasesCreateInput, Prisma.TeamCasesUpdateInput> {
    constructor() {
        super(new TeamCasesRepository());
    }

        async addCaseToTeam(caseId: string, teamId: string) {
        return await this.repository.create({
            case: { connect: { id: caseId } },
            team: { connect: { id: teamId } }
        });
    }

    async removeCaseFromTeam(caseId: string, teamId: string) {
        return await this.repository.deleteWhere({
            caseId_teamId: {
                caseId,
                teamId
            }
        });
    }

} 
