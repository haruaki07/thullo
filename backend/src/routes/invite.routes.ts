import Router from "express-promise-router";
import { InviteController } from "../controllers";
import jwt from "../middleware/jwt";

const router = Router();

router.get("/", jwt, InviteController.index);
router.get("/:id", jwt, InviteController.show);
router.delete("/:id", jwt, InviteController.delete);
router.post("/:token", jwt, InviteController.accept);

export default router;
