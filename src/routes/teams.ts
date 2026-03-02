import { Router } from "express";
import { TeamController } from "../controllers/TeamController";

const router = Router();
const controller = new TeamController();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;