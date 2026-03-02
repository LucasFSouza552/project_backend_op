import type { Prisma, Team, TeamDesignation, TeamStatus } from "@prisma/client";
import { BaseService } from "./BaseService";
import { TeamRepository } from "../repositories/TeamRepository";
import { createTeamSchema, updateTeamSchema } from "../dtos/team.dto";
import { AgentTeamRepository } from "../repositories/AgentTeamRepository";
import { AgentTeamService } from "./AgentTeamService";

export class TeamService extends BaseService<Team, Prisma.TeamCreateInput, Prisma.TeamUpdateInput> {
    private agentTeamService: AgentTeamService;

    constructor() {
        const repository: TeamRepository = new TeamRepository();
        super(repository);

        this.agentTeamService = new AgentTeamService(new AgentTeamRepository());
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