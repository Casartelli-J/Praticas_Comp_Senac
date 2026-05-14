import { Router } from "express";
import * as usuarios from "../controllers/usuarios.controllers.js";
import * as auth from "../controllers/authController.js";
export const usuarioRouter = Router();

usuarioRouter.get("/", usuarios.selectUser)
usuarioRouter.post("/", usuarios.insertUser)
usuarioRouter.put("/:id", usuarios.updateUser)
usuarioRouter.delete("/:id", usuarios.deleteUser)
usuarioRouter.post("/login", auth.login)