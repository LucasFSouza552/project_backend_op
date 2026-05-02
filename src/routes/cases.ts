import { Router } from "express";

import { CasesController } from "../controllers/CasesController";

const router = Router();
const controller = new CasesController();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post("/:caseId/teams/:teamId", controller.addCaseToTeam);
router.delete("/:caseId/teams/:teamId", controller.removeCaseFromTeam);

router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;