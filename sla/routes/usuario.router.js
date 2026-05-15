import { Router } from "express";
import * as usuario from "../controllers/usuarios.controllers.js";

export const usuarioRota = Router();

usuarioRota.get("/", usuario.selectUser)
usuarioRota.post("/", usuario.insertUser)
usuarioRota.put("/:id", usuario.updateUser)
usuarioRota.delete("/:id", usuario.deleteUser)