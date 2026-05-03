import { Router } from "express";
import { RandomizerController } from "../controllers/RandomizerController.js";

const router = Router();
const controller = new RandomizerController();

router.get("/:type", controller.getRandomData);
router.post("/:type", controller.createRandom);

export default router;
