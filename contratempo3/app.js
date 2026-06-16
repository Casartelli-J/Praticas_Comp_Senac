import cors from "cors";
import "dotenv/config";
import convidadosRouter from "./routes/convidados.router.js";
import usuariosRouter from "./routes/usuarios.router.js";
import express from "express";

function createApp(){
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/convidados", convidadosRouter);
    app.use("/usuarios", usuariosRouter);

    return app
}

export default createApp;