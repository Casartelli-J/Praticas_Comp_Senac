import * as convidados from "../controllers/convidados.controllers.js";
import { Router } from "express";

export const convidadoRouter = Router();

convidadoRouter.get("/", convidados.getConvidado);
convidadoRouter.post("/", convidados.insertConvidado);
convidadoRouter.put("/:id", convidados.updateConvidado);
convidadoRouter.delete("/:id", convidados.deleteConvidado);
convidadoRouter.put("/check/:id", convidados.checkinConvidado);