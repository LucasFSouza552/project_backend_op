import { Router } from "express";

import agentRoutes from "./agents";
import teamRoutes from "./teams";
import occultistRoutes from "./occultists";
import organizationRoutes from "./organizations";
import itemRoutes from "./items";

const router = Router();

router.use("/agents", agentRoutes);
router.use("/teams", teamRoutes);
router.use("/occultists", occultistRoutes);
router.use("/organizations", organizationRoutes);
router.use("/items", itemRoutes);

export default router;