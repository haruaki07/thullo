import Router from "express-promise-router";
import { LabelController } from "../controllers";
import jwt from "../middleware/jwt";
import {
  createLabelSchema,
  validateQueryIds,
  validate,
} from "../utils/validator";

const router = Router();

router.get("/", jwt, validateQueryIds("boardId"), LabelController.index);
router.get("/:id", jwt, LabelController.show);
router.post("/", jwt, validate(createLabelSchema), LabelController.create);
router.delete("/:id", jwt, LabelController.delete);

export default router;
