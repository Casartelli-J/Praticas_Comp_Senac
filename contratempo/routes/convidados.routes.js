import * as convidados from "../controllers/convidados.controllers.js";
import { Router } from "express";

export const convidadoRouter = Router();

convidadoRouter.get("/", convidados.getConvidado);
convidadoRouter.post("/", convidados.insertConvidados);
convidadoRouter.put("/:id", convidados.updateConvidado);
convidadoRouter.delete("/:id", convidados.delConvidado);