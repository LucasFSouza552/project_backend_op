import type { Prisma, AgentTeam, TeamDesignation, TeamStatus } from "@prisma/client";
import { AgentTeamRepository } from "../repositories/AgentTeamRepository.js";
import { TeamCasesRepository } from "../repositories/TeamCasesRepository.js";

export class AgentTeamService {
    constructor(private repository: AgentTeamRepository) {
    }

    getAll(filters?: { designation?: TeamDesignation; status?: TeamStatus }) {
        const where: Record<string, unknown> = {};
        if (filters?.designation) where.designation = filters.designation;
        if (filters?.status) where.status = filters.status;
        return this.repository.findAll({ where });
    }

    async addAgentToTeam(agentId: string, teamId: string): Promise<AgentTeam> {
        return await this.repository.create({
            agent: { connect: { id: agentId } },
            team: { connect: { id: teamId } }
        });
    }

    async removeAgentFromTeam(agentId: string, teamId: string) {
        return await this.repository.deleteWhere({
            agentId_teamId: {
                agentId,
                teamId
            }
        });
    }

    async removeAllByAgent(agentId: string) {
        return await this.repository.deleteManyByAgent(agentId);
    }

    async removeAllByTeam(teamId: string) {
        return await this.repository.deleteManyByTeam(teamId);
    }

}
