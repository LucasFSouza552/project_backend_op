import { Router } from "express";

import agentRoutes from "./agents.js";
import casesRoutes from "./cases.js";
import imageRoutes from "./images.js";
import itemRoutes from "./items.js";
import occultistRoutes from "./occultists.js";
import organizationRoutes from "./organizations.js";
import teamRoutes from "./teams.js";
import randomRoutes from "./random.js";

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
