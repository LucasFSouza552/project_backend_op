import { Router } from "express";
import { OrganizationController } from "../controllers/OrganizationController";

const router = Router();
const controller = new OrganizationController();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;