import "dotenv/config";
import cors from "cors";
import { usuarioRota } from "./routes/usuario.router.js";
import express from "express";


export function createApp(){
    const app = express();
    app.use(express.json())
    app.use("/usuarios", usuarioRota)
    app.use(cors())

    return app
}