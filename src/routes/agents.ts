import { Router } from "express";
import { AgentController } from "../controllers/AgentController";

const router = Router();
const controller = new AgentController();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

router.post("/:agentId/teams/:teamId", controller.addToTeam);
router.delete("/:agentId/teams/:teamId", controller.removeFromTeam);

export default router;
