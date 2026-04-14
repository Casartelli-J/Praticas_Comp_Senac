/*
   1 - Instalar node no pc
   2 - Iniciar o NPM - npm init -y
   3 - Instalar o express no pc - npm i express
   4 - Importar o express pro server.js (arquivo do servidor)
   5 - Adicionar no package.json o type module
   6 - Por o servidor pra rodar - node + server.js (nome do arquivo)
   7 - Habilitar o express pra usar JSON
   8 - Instalar o mySQL2 - npm i mysql2
*/

import express, { json } from "express";
import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    pass: "",
    Database: "Root",
})
const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Olá mundo")
});

const users = [
    {
        "nome": "Lorenzo",
        "senha": "adm123"
    },
    {
        "nome": "João",
        "senha": "teste senha"
    },
    {
        "nome": "Isabele",
        "senha": "bel2026"
    },
    {
        "nome": "Luis",
        "senha": "Feijão com Farinha"
    }
]

app.get("/usuarios", (req, res) => {
    res.json(users)
});

const convidados = []
app.post("/convidados", (req, res) => {
    convidados.push(req.body);
    res.json(req.body);
})

app.get("/convidados", (req, res) => {
    res.send("Convidados page")
});

app.listen(3000, () => console.log("Servidor Ronaldo - http://localhost:3000"));