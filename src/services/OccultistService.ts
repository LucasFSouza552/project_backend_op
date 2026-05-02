import type { Cases, Occultist, Prisma } from "@prisma/client";
import { BaseService } from "./BaseService";
import { OccultistCasesService } from "./OccultistCasesService";
import { createOccultistSchema } from "../dtos/occultist.dto";
import { OccultistCasesRepository } from "../repositories/OccultistCasesRepository";
import { OccultistRepository } from "../repositories/OccultistRepository";

type OccultistWithRelations = Prisma.OccultistGetPayload<{
    include: {
        cases: {
            include: {
                cases: true;
            };
        };
    };
}>;

type OccultistWithCases = Omit<OccultistWithRelations, 'cases'> & {
    cases: Cases[];
};
export class OccultistService extends BaseService<Occultist, Prisma.OccultistCreateInput, Prisma.OccultistUpdateInput> {

    private occultistCasesService: OccultistCasesService;

    constructor() {
        super(new OccultistRepository());
        this.occultistCasesService = new OccultistCasesService();
    }

    override async getOne(id: string): Promise<OccultistWithCases | null> {
        const occultist = await this.repository.findUnique(
            { id },
            {
                include: {
                    cases: {
                        include: {
                            cases: true
                        }
                    }
                }
            }
        );

        if (!occultist) return null;

        return {
            ...occultist,
            cases: (occultist as OccultistWithRelations).cases.map(c => c.cases)
        };
    }

    override async create(data: Prisma.OccultistCreateInput) {
        const validatedData = createOccultistSchema.parse(data);
        return this.repository.create(validatedData as Prisma.OccultistCreateInput);
    }

    override async update(id: string, data: Prisma.OccultistUpdateInput) {
        const validated = createOccultistSchema.parse(data);
        return this.repository.update(id, validated as Prisma.OccultistUpdateInput);
    }

    async addOccultistToCase(agentId: string, teamId: string) {
        return await this.occultistCasesService.addToCase(agentId, teamId);
    }

    async removeOccultistFromCase(agentId: string, teamId: string) {
        return await this.occultistCasesService.removeFromCase(agentId, teamId);
    }

}