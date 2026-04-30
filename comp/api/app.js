import dotenv from "dotenv/config";
import cors from "cors";
import { convidadoRouter } from "./routes/convidados.router.js";
import db from "./config/database.js";
import express from "express";

export function createApp(){
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/convidados", convidadoRouter);
    
    return app;
}