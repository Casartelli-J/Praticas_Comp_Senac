import "dotenv/config";
import express from "express";
import cors from "cors";
import convidadosRouter from "./router/convidados.router.js";
import usuariosRouter from "./router/usuarios.router.js";
import mesasRouter from "./router/mesas.router.js";
import authRouter from "./router/auth.router.js";

export function createApp(){
    const app = express();
    app.use(express.json());
    app.use(cors())
    app.use("/convidados", convidadosRouter);
    app.use("/usuarios", usuariosRouter);
    app.use("/mesas", mesasRouter);
    app.use("/login", authRouter);

    return app;
}