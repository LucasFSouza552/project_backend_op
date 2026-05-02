import { Router } from "express";

import agentRoutes from "./agents";
import casesRoutes from "./cases";
import imageRoutes from "./images";
import itemRoutes from "./items";
import occultistRoutes from "./occultists";
import organizationRoutes from "./organizations";
import teamRoutes from "./teams";
import randomRoutes from "./random";

const router = Router();

router.use("/agents", agentRoutes);
router.use("/teams", teamRoutes);
router.use("/occultists", occultistRoutes);
router.use("/organizations", organizationRoutes);
router.use("/items", itemRoutes);
router.use("/images", imageRoutes);
router.use("/cases", casesRoutes);
router.use("/random", randomRoutes);

export default router;