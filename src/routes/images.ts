import { Router } from "express";
import { ImageController } from "../controllers/ImageController.js";

const router = Router();

const controller = new ImageController();

router.get("/:id", controller.getStream);
router.post("/", controller.upload);

export default router;
