import router from "express";
import { login, register, logout } from "../controllers/auth.controller.js";
export const authRouter = router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);