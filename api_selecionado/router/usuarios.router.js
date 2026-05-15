import {Router} from "express";
import * as usuarios from "../controllers/users.controllers.js"

export const userRouter = Router();

userRouter.get("/", usuarios.selectUser);
userRouter.post("/", usuarios.insertUser);
userRouter.put("/:id", usuarios.updateUser);
userRouter.delete("/:id", usuarios.deleteUser);