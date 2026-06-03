import * as usuarios from "../controllers/usuarios.controllers.js";
import * as auth from "../controllers/auth.controller.js";
import * as validation from "../middleware/auth.js";
import { Router } from "express";

export const usuarioRouter = Router();

usuarioRouter.get("/",usuarios.getUsuarios);
usuarioRouter.post("/", usuarios.insertUsuarios);
usuarioRouter.put("/:id", usuarios.updateUsuarios);
usuarioRouter.delete("/:id", usuarios.deleteConvidado);
usuarioRouter.post("/login", auth.login);