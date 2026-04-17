import "dotenv/config";
import express from "express";
import db from "./config/database.js";
import { usuarioRouter } from "./route/usuarios.routes.js";

export function createApp(){
    const app = express()

    app.use(express.json())

    app.use("/usuarios", usuarioRouter);

    return app
}

