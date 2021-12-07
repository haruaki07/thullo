import Router from "express-promise-router";
import { TaskController } from "../controllers";
import jwt from "../middleware/jwt";
import {
  createTaskSchema,
  updateTaskSchema,
  validateQueryIds,
  validate,
} from "../utils/validator";

const router = Router();

router.get(
  "/",
  jwt,
  validateQueryIds("listId", "boardId"),
  TaskController.index
);
router.get("/:id", jwt, TaskController.show);
router.post("/", jwt, validate(createTaskSchema), TaskController.create);
router.put("/:id", jwt, validate(updateTaskSchema), TaskController.update);
router.delete("/:id", jwt, TaskController.delete);
router.post("/:id/members", jwt, TaskController.addMember);
router.delete("/:id/members", jwt, TaskController.deleteMember);

export default router;
