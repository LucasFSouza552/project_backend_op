import type { Organization, Prisma } from "@prisma/client";
import { BaseController } from "./BaseController.js";
import { OrganizationService } from "../services/OrganizationService.js";

export class OrganizationController extends BaseController<Organization, Prisma.OrganizationCreateInput, Prisma.OrganizationUpdateInput> {
    private organizationService: OrganizationService;

    constructor() {
        const service = new OrganizationService();
        super(service);
        this.organizationService = service;
    }
}
