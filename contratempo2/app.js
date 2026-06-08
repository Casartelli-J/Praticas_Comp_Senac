import "dotenv/config";
import express from "express";
import cors from "cors";
import convidadosRouter from "./router/convidados.router.js";

export function createApp(){
    const app = express();
    app.use(express.json());
    app.use(cors())
    app.use("/convidados", convidadosRouter);

    return app;
}