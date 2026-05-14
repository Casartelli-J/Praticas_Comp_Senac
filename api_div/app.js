import "dotenv/config";
import express from "express";
import db from "./config/database.js";
import { convidadoRouter } from "./route/usuarios.routes.js";
import cors from "cors";

export function createApp(){
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use("/convidados", convidadoRouter);

    return app
}