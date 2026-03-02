import type { Occultist, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { prisma } from "../lib/prisma";

export class OccultistRepository extends BaseRepository<Occultist, Prisma.OccultistCreateInput, Prisma.OccultistUpdateInput> {
  constructor() {
    super(prisma.occultist);
  }
}
