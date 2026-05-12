import db from "../config/database.js";
import bcrypt from "bcrypt";

export const selectUser = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;

    let sql = "SELECT * FROM usuarios WHERE 1 ";
    let params = [];

    if(id){
        sql += " AND id = ? ";
        params.push(id);
    }

    if(nome){
        sql += " AND nome LIKE ? ";
        params.push(`%${nome}%`);
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
}

export const insertUser = async (req, res) =>{
    const {tipo, nome, cpf, email, senha} = req.body;
    const sql = "INSERT INTO usuarios(tipo, nome, cpf, email, senha) VALUES (?, ?, ?, ?, ?)";
    
    if(tipo && nome, cpf && email, senha){
        bcrypt.hash(senha, 10, async function(erro, hash){
            if(erro){
                console.status(400).error("Erro de criptografia", erro);
            }else{
                const [result] = await db.query(sql, [tipo, nome, cpf, email, hash]);
                res.status(201).json("Usuário criado com sucesso");
            }
        })
    }else{
        res.status(400).json("Faltam dados");
    }
}

export const updateUser = async (req, res) => {
    const {tipo, nome, cpf, email, senha} = req.body;
    const {id} = req.params;
    const sql = "UPDATE usuarios SET tipo = ?, nome = ?, cpf = ?, email = ?, senha = ? WHERE id = ?";
    
    
    if(tipo && nome && cpf && email && senha){
        const [result] = await db.query(sql, [tipo, nome, cpf, email, senha, id]);
        if(result.affectedRows === 0){
            res.status(404).json("Usuario não encontrado");
        }else{
            res.status(200).json("Usuario modificado com sucesso");
        }
    }else{
        res.status(400).json("Faltam dados para preencher");
    }
}

export const deleteUser = async (req, res) =>{
    const {id} = req.params;
    const sql = "DELETE FROM usuarios WHERE id = ?";
    
    const [result] = await db.query(sql, [id]);
    if(result.affectedRows === 0){
        res.status(404).json("Usuario não encontrado");
    }else{
        res.status(200).json("Usuario deletado com sucesso");
    }
}