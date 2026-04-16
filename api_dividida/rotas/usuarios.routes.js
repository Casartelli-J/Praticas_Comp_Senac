import {Router} from "express"
import * as usuarios from "../controllers/usuarios.controllers.js"

export const usuarioRouter = Router()

usuarioRouter.get("/", usuarios.listUsuarios)