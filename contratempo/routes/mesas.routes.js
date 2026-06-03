import * as mesas from "../controllers/mesas.controller.js";
import * as validation from "../middleware/auth.js";
import { Router } from "express";

export const mesaRouter = Router();

mesaRouter.get("/", mesas.listaMesas);
mesaRouter.get("/espaco", mesas.espacoMesas);
mesaRouter.post("/", mesas.adicionaMesa);
mesaRouter.put("/:id", mesas.atualizaMesa);
mesaRouter.delete("/:id", mesas.deleteMesa);

