import {Router} from "express"
import * as usuarios from "../controllers/usuarios.controllers.js"

export const usuarioRouter = Router()

usuarioRouter.get("/", usuarios.listUsuarios);
usuarioRouter.post("/", usuarios.insertUser);
usuarioRouter.put("/:id", usuarios.updateUser);
usuarioRouter.delete("/:id", usuarios.deleteUser)