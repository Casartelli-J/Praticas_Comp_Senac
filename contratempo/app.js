import "dotenv/config";
import cors from "cors";
import { convidadoRouter } from "./routes/convidados.routes.js";
import express from "express";

export function createApp(){
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/convidados", convidadoRouter);

    return app;
}