import { Router } from "express";
import { ItemController } from "../controllers/ItemController";

const router = Router();
const controller = new ItemController();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;