import type { OccultistCases, Prisma } from "@prisma/client";
import { BaseService } from "./BaseService";
import { CaseRepository } from "../repositories/CaseRepository";
import { OccultistCasesRepository } from "../repositories/OccultistCasesRepository";
import { OccultistRepository } from "../repositories/OccultistRepository";

export class OccultistCasesService extends BaseService<OccultistCases, Prisma.OccultistCasesCreateInput, Prisma.OccultistCasesUpdateInput> {
    protected repository: OccultistCasesRepository;
    protected occultistsRepository: OccultistRepository;
    protected casesRepository: CaseRepository;

    constructor() {
        const repository: OccultistCasesRepository = new OccultistCasesRepository();
        super(repository);
        this.occultistsRepository = new OccultistRepository();
        this.casesRepository = new CaseRepository();
        this.repository = repository;
    }

    async addToCase(occultistId: string, casesId: string): Promise<OccultistCases> {

        const occultist = await this.occultistsRepository.findById(occultistId);
        const Case = await this.casesRepository.findById(casesId);

        if (!occultist || !Case) {
            throw new Error("Occultist or Case not found");
        }

        return await this.repository.create({
            occultist: { connect: { id: occultistId } },
            cases: { connect: { id: casesId } }
        });
    }

    async removeFromCase(occultistId: string, casesId: string) {

        const occultist = await this.occultistsRepository.findById(occultistId);
        const Case = await this.casesRepository.findById(casesId);

        if (!occultist || !Case) {
            throw new Error("Occultist or Case not found");
        }

        return await this.repository.deleteWhere({
            occultistId_casesId: {
                occultistId,
                casesId
            }
        });
    }

    async removeAllByOccultist(occultistId: string) {
        return await this.repository.deleteManyByOccultist(occultistId);
    }

    async removeAllByCases(caseId: string) {
        return await this.repository.deleteManyByCases(caseId);
    }

}