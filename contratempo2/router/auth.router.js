import * as auth from "../controller/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/", auth.login);


export default authRouter;