import type { Prisma, Team } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";
import { prisma } from "../lib/prisma.js";

export class TeamRepository extends BaseRepository<Team, Prisma.TeamCreateInput, Prisma.TeamUpdateInput> {
  constructor() {
    super(prisma.team);
  }
}
