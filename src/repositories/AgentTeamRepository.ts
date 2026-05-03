import type { AgentTeam, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";
import { prisma } from "../lib/prisma.js";

export class AgentTeamRepository extends BaseRepository<AgentTeam, Prisma.AgentTeamCreateInput, Prisma.AgentTeamUpdateInput> {
  constructor() {
    super(prisma.agentTeam);
  }

  async deleteManyByAgent(agentId: string) {
    return this.model.deleteMany({
      where: { agentId }
    })
  }

  async deleteManyByTeam(teamId: string) {
    return this.model.deleteMany({
      where: { teamId }
    })
  }

}
