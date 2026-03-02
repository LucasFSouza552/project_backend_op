import { Router } from "express";
import { OccultistController } from "../controllers/OccultistController";

const router = Router();
const controller = new OccultistController();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;