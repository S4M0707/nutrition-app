import express from "express";
import Auth from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.route("/register").post(Auth.register);
authRouter.route("/login").post(Auth.login);

export default authRouter;