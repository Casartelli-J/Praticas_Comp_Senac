import "dotenv/config";
import express from "express";
import { createPool } from "./config/database.js";
import { usuarioRouter } from "./rotas/usuarios.routes.js";

export function createApp(){
    const app = express()

    app.use(express.json())

    app.use("/usuarios", usuarioRouter);

    return app
}

