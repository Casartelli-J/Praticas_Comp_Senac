import express from "express";
import cors from "cors";
import "dotenv/config";
import { convidadoRouter } from "./routes/convidados.routes.js";
import { usuarioRouter } from "./routes/usuarios.routes.js";
import db from "./config/database.js";

export function createApp(){
    const app = express();
    app.use(cors())
    app.use(express.json())
    app.use("/convidados", convidadoRouter)
    app.use("/usuarios", usuarioRouter)

    return app
}