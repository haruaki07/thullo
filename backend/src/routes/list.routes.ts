import Router from "express-promise-router";
import { ListController } from "../controllers";
import jwt from "../middleware/jwt";
import {
  createListSchema,
  updateListSchema,
  validateQueryIds,
  validate,
} from "../utils/validator";

const router = Router();

router.get("/", jwt, validateQueryIds("boardId"), ListController.index);
router.get("/:id", jwt, ListController.show);
router.post("/", jwt, validate(createListSchema), ListController.create);
router.put("/:id", jwt, validate(updateListSchema), ListController.update);
router.delete("/:id", jwt, ListController.delete);

export default router;
