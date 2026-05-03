import type { Cases, Occultist, Prisma, Team } from "@prisma/client";
import { BaseService } from "./BaseService.js";
import { TeamCasesService } from "./TeamCasesService.js";
import { createCaseSchema } from "../dtos/cases.dto.js";
import { CaseRepository } from "../repositories/CaseRepository.js";

type CaseWithRelations = Prisma.CasesGetPayload<{
    include: {
        occultists: {
            include: {
                occultist: true;
            };
        };
        teams: {
            include: {
                team: true;
            };
        };
    };
}>;

type CaseWithOccultistsAndTeams = Omit<CaseWithRelations, 'occultists' | 'teams'> & {
    occultists: Occultist[];
    teams: Team[];
};

export class CasesService extends BaseService<Cases, Prisma.CasesCreateInput, Prisma.CasesUpdateInput> {
    private teamCasesService: TeamCasesService;
    constructor() {
        super(new CaseRepository());
        this.teamCasesService = new TeamCasesService();
    }

    override async getOne(id: string): Promise<CaseWithOccultistsAndTeams | null> {
        const cases = await this.repository.findUnique(
            { id },
            {
                include: {
                    occultists: {
                        include: {
                            occultist: true
                        }
                    },
                    teams: {
                        include: {
                            team: true
                        }
                    }
                }
            }
        );

        if (!cases) return null;

        return {
            ...cases,
            occultists: (cases as CaseWithRelations).occultists.map(o => o.occultist),
            teams: (cases as CaseWithRelations).teams.map(t => t.team)
        };
    }

    override async create(data: Prisma.CasesCreateInput) {
        const validatedData = createCaseSchema.parse(data);
        return this.repository.create(validatedData as Prisma.CasesCreateInput);
    }

    override async update(id: string, data: Prisma.CasesUpdateInput) {
        const validatedData = createCaseSchema.parse(data);
        return this.repository.update(id, validatedData as Prisma.CasesUpdateInput);
    }

    async addCaseToTeam(caseId: string, teamId: string) {
        return await this.teamCasesService.addCaseToTeam(caseId, teamId);
    }

    async removeCaseFromTeam(caseId: string, teamId: string) {
        return await this.teamCasesService.removeCaseFromTeam(caseId, teamId);
    }
}
