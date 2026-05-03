import type { Occultist, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";
import { prisma } from "../lib/prisma.js";

export class OccultistRepository extends BaseRepository<Occultist, Prisma.OccultistCreateInput, Prisma.OccultistUpdateInput> {
  constructor() {
    super(prisma.occultist);
  }
}
