import * as mesas from "../controller/mesas.controller.js";
import { Router } from "express";

const mesasRouter = Router();

mesasRouter.get("/", mesas.getMesa);
mesasRouter.post("/", mesas.postMesa);
mesasRouter.put("/:id", mesas.putMesa);
mesasRouter.delete("/:id", mesas.deleteMesa);

export default mesasRouter;