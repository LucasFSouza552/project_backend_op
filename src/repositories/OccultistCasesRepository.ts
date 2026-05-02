import type { OccultistCases, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { prisma } from "../lib/prisma";

export class OccultistCasesRepository extends BaseRepository<OccultistCases, Prisma.OccultistCasesCreateInput, Prisma.OccultistCasesUpdateInput> {
  constructor() {
    super(prisma.occultistCases);
  }

  async deleteManyByOccultist(occultistId: string) {
    return this.model.deleteMany({
      where: { occultistId }
    })
  }

  async deleteManyByCases(caseId: string) {
    return this.model.deleteMany({
      where: { teamId: caseId }
    })
  }

}