import { Router } from "express";
import * as convidado from "../controllers/convidado.controller.js";

export const convidadoRouter = Router();

convidadoRouter.get("/", convidado.getConvidado);
convidadoRouter.post("/", convidado.insertConvidado);
convidadoRouter.put("/:id", convidado.updateConvidado);
convidadoRouter.delete("/:id", convidado.deleteConvidado);
