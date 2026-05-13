import { Router } from "express";
import * as convidados from "../controllers/convidados.controllers.js";

export const convidadoRouter = Router();

convidadoRouter.get("/", convidados.selectUser)
convidadoRouter.post("/", convidados.insertUser)
convidadoRouter.put("/:id", convidados.updateUser)
convidadoRouter.delete("/:id", convidados.deleteUser)
convidadoRouter.put("/check/:id", convidados.checkUser)