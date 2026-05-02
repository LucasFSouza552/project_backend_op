import type { Request, Response, NextFunction } from "express";
import { RandomizerService } from "../services/RandomizerService";
import { AgentService } from "../services/AgentService";
import { TeamService } from "../services/TeamService";
import { OccultistService } from "../services/OccultistService";
import { OrganizationService } from "../services/OrganizationService";
import { ItemService } from "../services/ItemService";
import { CasesService } from "../services/CasesService";

export class RandomizerController {
  private agentService = new AgentService();
  private teamService = new TeamService();
  private occultistService = new OccultistService();
  private organizationService = new OrganizationService();
  private itemService = new ItemService();
  private casesService = new CasesService();

  getRandomData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;
      let data;

      switch (type) {
        case "agent": data = RandomizerService.agent(); break;
        case "occultist": data = RandomizerService.occultist(); break;
        case "item": data = RandomizerService.item(); break;
        case "team": data = RandomizerService.team(); break;
        case "organization": data = RandomizerService.organization(); break;
        case "case": data = RandomizerService.case(); break;
        default: return res.status(400).json({ error: "Tipo inválido" });
      }

      res.json(data);
    } catch (e) {
      next(e);
    }
  };

  createRandom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;
      let item;

      switch (type) {
        case "agent": item = await this.agentService.create(RandomizerService.agent() as any); break;
        case "occultist": item = await this.occultistService.create(RandomizerService.occultist() as any); break;
        case "item": item = await this.itemService.create(RandomizerService.item() as any); break;
        case "team": item = await this.teamService.create(RandomizerService.team() as any); break;
        case "organization": item = await this.organizationService.create(RandomizerService.organization() as any); break;
        case "case": item = await this.casesService.create(RandomizerService.case() as any); break;
        default: return res.status(400).json({ error: "Tipo inválido" });
      }

      res.status(201).json(item);
    } catch (e) {
      next(e);
    }
  };
}
