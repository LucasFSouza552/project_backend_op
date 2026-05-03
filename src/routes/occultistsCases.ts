import { Router } from "express";

import { OccultistCasesController } from "../controllers/OccultistCasesController.js";

const router = Router();
const controller = new OccultistCasesController();

router.get("/", controller.getAll);
router.delete("/:id", controller.delete);

router.post("/:occultistId/cases/:caseId", controller.addToCase);
router.delete("/:occultistId/cases/:caseId", controller.removeFromCase);

export default router;
