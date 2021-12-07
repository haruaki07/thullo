import Router from "express-promise-router";
import { AuthController } from "../controllers/auth.controller";
import jwt from "../middleware/jwt";
import { loginSchema, registerSchema, validate } from "../utils/validator";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/logout", jwt, AuthController.logout);
router.get("/me", jwt, AuthController.me);

export default router;
