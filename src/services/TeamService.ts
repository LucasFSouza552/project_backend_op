import type { Cases, Prisma, Team, TeamDesignation, TeamStatus } from "@prisma/client";
import { BaseService } from "./BaseService.js";
import { TeamRepository } from "../repositories/TeamRepository.js";
import { createTeamSchema, updateTeamSchema } from "../dtos/team.dto.js";
import { AgentTeamRepository } from "../repositories/AgentTeamRepository.js";
import { AgentTeamService } from "./AgentTeamService.js";

type TeamWithRelations = Prisma.TeamGetPayload<{
    include: {
        agents: {
            include: {
                agent: true;
            };
        };
        cases: {
            include: {
                case: true;
            };
        };
    };
}>;

type TeamWithCases = Omit<TeamWithRelations, 'cases'> & {
    cases: Cases[];
};

export class TeamService extends BaseService<Team, Prisma.TeamCreateInput, Prisma.TeamUpdateInput> {
    private agentTeamService: AgentTeamService;

    constructor() {
        const repository: TeamRepository = new TeamRepository();
        super(repository);

        this.agentTeamService = new AgentTeamService(new AgentTeamRepository());
    }

    override async getOne(id: string) {
        const team = await this.repository.findUnique({ id }, {
            include: {
                agents: {
                    include: {
                        agent: true
                    }
                },
                cases: {
                    include: {
                        case: true
                    }
                }
            }
        });

        if (!team) return null;

        const typedTeam = team as unknown as TeamWithRelations;

        return {
            ...typedTeam,
            agents: typedTeam.agents.map(a => a.agent),
            cases: typedTeam.cases.map(c => c.case)
        };
    }

    override getAll(filters?: { designation?: TeamDesignation; status?: TeamStatus }) {
        const where: Record<string, unknown> = {};
        if (filters?.designation) where.designation = filters.designation;
        if (filters?.status) where.status = filters.status;
        return this.repository.findAll({ where });
    }

    override create(data: Prisma.TeamCreateInput): Promise<Team> {
        const validatedData = createTeamSchema.parse(data);
        return this.repository.create(validatedData as Prisma.TeamCreateInput);
    }

    override async update(id: string, data: Prisma.TeamUpdateInput) {
        const validated = updateTeamSchema.parse(data);
        return this.repository.update(id, validated as Prisma.TeamUpdateInput);
    }

    override async delete(id: string) {
        await this.agentTeamService.removeAllByTeam(id);
        return this.repository.delete(id);
    }

}
