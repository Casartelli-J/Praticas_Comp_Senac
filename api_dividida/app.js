import "dotenv/config";
import express from "express";
import db from "./config/database.js";
import { usuarioRouter } from "./route/usuarios.routes.js";
//Habilita permissão para URLS externas
import cors from 'cors';


export function createApp(){
    const app = express()
    app.use(express.json())
    app.use(cors());
    app.use("/usuarios", usuarioRouter);

    return app
}

