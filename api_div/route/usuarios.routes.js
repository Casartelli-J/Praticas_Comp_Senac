import { Router } from "express";
import * as convidado from "../controllers/usuarios.controllers.js";

export const convidadoRouter = Router()

convidadoRouter.get("/", convidado.listUsers);
convidadoRouter.post("/", convidado.insertUser);
convidadoRouter.delete("/:id", convidado.deleteUser);
convidadoRouter.put("/:id", convidado.updateUser);