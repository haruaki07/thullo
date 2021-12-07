import { BoardController, InviteController } from "../controllers";
import {
  createBoardSchema,
  createInviteSchema,
  updateBoardSchema,
  validate,
} from "../utils/validator";
import Router from "express-promise-router";
import jwt from "../middleware/jwt";

const router = Router();

router.get("/", jwt, BoardController.index);
router.post("/", jwt, validate(createBoardSchema), BoardController.create);
router.get("/:id", jwt, BoardController.show);
router.put("/:id", jwt, validate(updateBoardSchema), BoardController.update);
router.delete("/:id", jwt, BoardController.delete);
router.post(
  "/:id/invite",
  jwt,
  validate(createInviteSchema),
  InviteController.store
);

// get all lists and tasks
router.get("/:id/bulk", jwt, BoardController.bulk);

export default router;
