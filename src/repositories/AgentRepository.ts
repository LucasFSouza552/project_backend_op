import type { $Enums, Agent, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";
import { prisma } from "../lib/prisma.js";

export class AgentRepository extends BaseRepository<Agent, Prisma.AgentCreateInput, Prisma.AgentUpdateInput> {
  constructor() {
    super(prisma.agent);
  }

}
