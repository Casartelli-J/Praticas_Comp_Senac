import { Router } from "express";
import * as convidados from "../controllers/convidado.controller.js";
import * as validation from "../middleware/auth.js";

export const convidadoRouter = Router();

convidadoRouter.get("/", convidados.getConvidado);
convidadoRouter.get("/export", convidados.exportaConvidado);
convidadoRouter.post("/", convidados.insertConvidado);
convidadoRouter.put("/:id", convidados.updateConvidado);
convidadoRouter.delete("/:id", convidados.deleteConvidado);
convidadoRouter.put("/check/:id", convidados.checkinConvidado);
