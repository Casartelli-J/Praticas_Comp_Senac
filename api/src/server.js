/*
   1 - Instalar node no pc
   2 - Iniciar o NPM - npm init -y
   3 - Instalar o express no pc - npm i express
   4 - Importar o express pro server.js (arquivo do servidor)
   5 - Adicionar no package.json o type module
   6 - Por o servidor pra rodar - node + --watch + server.js (nome do arquivo)
   7 - Habilitar o express pra usar JSON
   8 - Instalar o mySQL2 - npm i mysql2
*/

import express, { json } from "express";
import mysql from 'mysql2/promise';
import 'dotenv/config'

/*
SEGURANÇA DOS DADOS NO BANCO DE DADOS
    1 - Instalar o pacote: npm install dotenv   
    2 - Criamos o env e colocamos as informações do BD
    3 - Susbtituimos as variáveis do Banco pelo padrão process.env.DB_HOST
    4 - Importar o import 'dotenv/config';
*/

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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

//req.query =  variáveis do GET na URL
//req.params =  Parâmetro na URL
//req.body =  Corpo da requisição


// const convidados = []
//BLOCO PRA ADICIONAR PESSOAS
app.post("/convidados", async (req, res) => {
    // convidados.push(req.body);
    const {nome, email, telefone, mesa} = req.body;
    const [result] = await pool.query("INSERT INTO convidados (nome , email, telefone, mesa) VALUES (?, ?, ?, ?)", [nome, email, telefone, mesa]);
    res.status(201).json(["Convidado inserido com sucesso"]);
})


//BLOCO PRA EDITAR PESSOAS
app.put("/convidados/", async (req, res) => {
    const { id } = req.query;
    const { nome, email, telefone, mesa, confirmacao} = req.body;
    const [result] = await pool.query("UPDATE convidados SET nome = ?, email = ?, telefone = ?, mesa = ?, confirmacao = ? WHERE ID_convidado = ?", 
        [nome, email, telefone, mesa, confirmacao, id]);
        
        if(result.affectedRows === 0){
            res.json("Não encontramos nada");
        }
    });
    

//BLOCO PRA SELECIONAR PESSOAS
app.get("/convidados", async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;

    let query = "SELECT * FROM convidados WHERE 1";
    let params = [];
    if(id){
        query += " AND ID_CONVIDADO = ?";
        params.push(id);
    }

    if(nome){
        query += " AND nome LIKE ?";
        params.push(`%${nome}%`);
    }
    const [rows] = await pool.query(query, params);
    res.status(200).json(rows)
});

//CÓDIGO PRA DELETAR PESSOAS
app.delete("/convidados/:id", async (req, res) =>{
    const { id } = req.params;
    const query = "DELETE FROM convidados WHERE ID_convidado = ?";
    const [result] = await pool.query(query, [ id ])
    if(result.affectedRows === 0){
        res.json("Não encontramos o convidado solicitado");
    }else{
        res.json("Convidado deletado com sucesso!");
    }
})

app.listen(3000, () => console.log("Servidor Ronaldo - http://localhost:3000"));