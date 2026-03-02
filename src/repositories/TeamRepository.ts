import type { Prisma, Team } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { prisma } from "../lib/prisma";

export class TeamRepository extends BaseRepository<Team, Prisma.TeamCreateInput, Prisma.TeamUpdateInput> {
  constructor() {
    super(prisma.team);
  }
}