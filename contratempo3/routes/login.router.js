import * as login from "../controllers/auth.controllers.js";
import { Router } from "express";

const loginRouter = Router();

loginRouter.post("/", login.logar)


export default loginRouter;