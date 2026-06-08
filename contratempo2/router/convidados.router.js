import * as convidados from "../controller/convidados.controller.js";
import { Router } from "express";

const convidadosRouter = Router();

convidadosRouter.get("/", convidados.getConvidado);
convidadosRouter.post("/", convidados.postConvidado);
convidadosRouter.put("/:id", convidados.putConvidado);
convidadosRouter.delete("/:id", convidados.deleteConvidado);

export default convidadosRouter;