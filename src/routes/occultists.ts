import { Router } from "express";
import { OccultistController } from "../controllers/OccultistController.js";
import { upload } from "../middleware/upload.js";

const router = Router();
const controller = new OccultistController();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", upload.single("image"), controller.create);
router.put("/:id", upload.single("image"), controller.update);
router.delete("/:id", controller.delete);

router.post("/:occultistId/cases/:caseId", controller.addToCase);
router.delete("/:occultistId/cases/:caseId", controller.removeFromCase);

export default router;
