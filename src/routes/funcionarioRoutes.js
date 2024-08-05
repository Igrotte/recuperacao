import { Router } from "express";
import { encontrarFunc, info } from "../controllers/FuncionarioController.js";
import { authPrivate } from "../middlewares/Auth.js";

const router = Router();

router.get("/funcionarios", encontrarFunc);

router.get("/user/me", authPrivate, info);
// router.put("/user/me", update);

export default router;