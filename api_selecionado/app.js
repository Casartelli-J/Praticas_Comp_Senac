import dotenv from "dotenv/config";
import { userRouter } from "./router/usuarios.router.js";
import cors from "cors";
import db from "./config/database.js";
import express from "express";


export function createApp(){
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use("/usuarios", userRouter)

    return app
} 

