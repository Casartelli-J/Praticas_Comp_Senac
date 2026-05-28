import { Router } from "express";
import * as convidado from "../controllers/convidado.controller.js";

export const convidadoRouter = Router();

convidadoRouter.get("/", convidados.getConvidado);
convidadoRouter.get("/export", convidados.exportaConvidado);
convidadoRouter.post("/", convidados.insertConvidado);
convidadoRouter.put("/:id", convidados.updateConvidado);
convidadoRouter.delete("/:id", convidados.deleteConvidado);
convidadoRouter.put("/check/:id", convidados.checkinConvidado);
