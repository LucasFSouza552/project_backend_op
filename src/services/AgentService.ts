import type { Agent, AgentStatus, AgentRole, Prisma, Team } from "@prisma/client";
import { AgentTeamService } from "./AgentTeamService";
import { BaseService } from "./BaseService";
import { createAgentSchema, updateAgentSchema } from "../dtos/agent.dto";
import { AgentRepository } from "../repositories/AgentRepository";
import { AgentTeamRepository } from "../repositories/AgentTeamRepository";


type AgentWithRelations = Prisma.AgentGetPayload<{
  include: {
    teams: {
      include: {
        team: true;
      };
    };
  };
}>;

export type AgentWithTeam = Omit<AgentWithRelations, 'teams'> & {
  teams: Team[];
};

export class AgentService extends BaseService<Agent, Prisma.AgentCreateInput,
  Prisma.AgentUpdateInput> {
  private agentTeamService: AgentTeamService;
  constructor() {
    const repository: AgentRepository = new AgentRepository();
    super(repository);

    this.agentTeamService = new AgentTeamService(new AgentTeamRepository());
  }

  override async create(data: Prisma.AgentCreateInput): Promise<AgentWithTeam> {
    const validatedData = createAgentSchema.parse(data);

    const created = await this.repository.create(validatedData as Prisma.AgentCreateInput);
    const withTeam = await this.getOne(created.id);
    return withTeam ?? (created as AgentWithTeam);
  }

  override async update(id: string, data: Prisma.AgentUpdateInput): Promise<AgentWithTeam> {
    const validated = updateAgentSchema.parse(data);

    await this.repository.update(id, validated as Prisma.AgentUpdateInput);

    const withTeam = await this.getOne(id);

    if (!withTeam) {
      throw new Error("Agente não encontrado");
    }

    return withTeam;
  }

  // Lista agentes com filtros opcionais e include de team
  override async getAll(filters?: { status?: AgentStatus; role?: AgentRole; }) {
    const where: Record<string, unknown> = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.role) where.role = filters.role;

    return this.repository.findAll({
      where,
      include: { teams: { select: { id: true, team: true } } },
      orderBy: { createdAt: "desc" },
    }) as Promise<AgentWithTeam[]>;
  }

  // Busca um agente por ID com team
  override async getOne(id: string): Promise<AgentWithTeam | null> {
    const agent = await this.repository.findById(id, {
      teams: {
        include: {
          team: true
        }
      }
    });

    if (!agent) return null;

    const typedAgent = agent as unknown as AgentWithRelations;

    return {
      ...typedAgent,
      teams: typedAgent.teams.map(t => t.team)
    };
  }

  override async delete(agentId: string) {
    await this.agentTeamService.removeAllByAgent(agentId);
    return await this.repository.delete(agentId);
  }

  async addAgentToTeam(agentId: string, teamId: string) {
    return await this.agentTeamService.addAgentToTeam(agentId, teamId);
  }

  async removeAgentFromTeam(agentId: string, teamId: string) {
    return await this.agentTeamService.removeAgentFromTeam(agentId, teamId);
  }

  async addImage(agentId: string, image: string) {
    return await this.repository.update(agentId, { image });
  }

}