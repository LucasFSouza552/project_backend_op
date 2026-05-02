import { Router } from "express";

import { upload } from "./../middleware/upload";
import { ItemController } from "../controllers/ItemController";

const router = Router();
const controller = new ItemController();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", upload.single("image"), controller.create);
router.put("/:id", upload.single("image"), controller.update);
router.delete("/:id", upload.single("image"), controller.delete);

export default router;