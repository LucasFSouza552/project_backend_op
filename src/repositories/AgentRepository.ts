import type { $Enums, Agent, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { prisma } from "../lib/prisma";

export class AgentRepository extends BaseRepository<Agent, Prisma.AgentCreateInput, Prisma.AgentUpdateInput> {
  constructor() {
    super(prisma.agent);
  }

}