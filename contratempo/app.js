import "dotenv/config";
import { convidadoRouter } from "./routes/convidados.routes.js";
import { usuarioRouter } from "./routes/usuarios.routes.js";
import cors from "cors";
import express from "express";

function createApp(){
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/convidados", convidadoRouter);
    app.use("/usuarios", usuarioRouter);

    return app;
}

export default createApp;
