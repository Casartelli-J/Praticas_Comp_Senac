import db from "../config/database.js";
import bcrypt from "bcrypt";


export const getUsuarios = async (req, res) => {
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

export const insertUsuarios = async (req, res) => {
    const {tipo, nome, cpf, telefone, email, senha} = req.body;
    const sql = "INSERT INTO usuarios(tipo, nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)";
    
    if(tipo && nome && cpf && telefone && email && senha){
        bcrypt.hash(senha, 10, async function(error, hash){
            if(error){
                res.status(400).json("N cripitografou");
                console.log("N cripitografou");
            }else{
                const [result] = await db.query(sql, [tipo, nome, cpf, telefone, email, hash]);
                res.status(201).json("Usuário inserido com sucesso");
            }
        })
    }else{
        res.status(400).json("Falta dados")
    }
}

export const updateUsuarios = async (req, res) => {
    const {tipo, nome, cpf, telefone, email, senha} = req.body;
    const {id} = req.params;
    
    if(tipo && nome && cpf && telefone && email && id){
        let sql = "UPDATE usuarios SET tipo = ?, nome = ?, cpf = ?, telefone = ?, email = ? WHERE id = ?";
        if(senha){
            sql = "UPDATE usuarios SET tipo = ?, nome = ?, cpf = ?, telefone = ?, email = ?, senha = ? WHERE id = ?";
            bcrypt.hash(senha, 10, async function(error, hash){
                if(error){
                    res.status(400).json("N cripitografou");
                    console.log("N cripitografou");
                }else{
                    const [result] = await db.query(sql, [tipo, nome, cpf, telefone, email, hash, id]);
                    res.status(201).json("Usuário atualizado com sucesso");
                }
            })
        }else{
            const [result] = await db.query(sql, [tipo, nome, cpf, telefone, email, id])
            res.status(201).json("Usuário atualizado com sucesso")
        }
    }else{
        res.status(400).json("Falta dados")
    }
}


export const deleteConvidado = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM usuarios WHERE id = ?";

    if(id){
        const [result] = await db.query(sql, [id]);
        res.status(200).json("Usuario removido com sucesso");
    }else{
        res.status(404).json("Usuario não encontrado");
    }
}

