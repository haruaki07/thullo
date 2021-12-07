import { Router } from "express";
import AuthRoutes from "./auth.routes";
import BoardRoutes from "./board.routes";
import InviteRoutes from "./invite.routes";
import ListRoutes from "./list.routes";
import TaskRoutes from "./task.routes";
import LabelRoutes from "./label.routes";

const router = Router();

router.use("/", AuthRoutes);
router.use("/boards", BoardRoutes);
router.use("/invites", InviteRoutes);
router.use("/lists", ListRoutes);
router.use("/tasks", TaskRoutes);
router.use("/labels", LabelRoutes);

export default router;
