import { Router } from "express";
import { TeamController } from "../controllers/TeamController.js";
import { CasesController } from "../controllers/CasesController.js";

const router = Router();
const controller = new TeamController();
const casesController = new CasesController();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

router.post("/:teamId/cases/:caseId", casesController.addCaseToTeam);
router.delete("/:teamId/cases/:caseId", casesController.removeCaseFromTeam);

export default router;
