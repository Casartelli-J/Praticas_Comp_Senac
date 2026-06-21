import * as usuarios from "../controllers/usuarios.controllers.js";
import { Router } from "express";

const usuariosRouter = Router();

usuariosRouter.get("/", usuarios.getUsuario)
usuariosRouter.post("/", usuarios.postUsuario)
usuariosRouter.put("/:id", usuarios.putUsuario)
usuariosRouter.delete("/:id", usuarios.deleteUsuario)

export default usuariosRouter;