import db from "../config/database.js";
import bcrypt from "bcrypt";

export const getUsuario = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;

    let sql = " SELECT * FROM usuarios WHERE 1 ";
    let params = [];

    if(id){
        sql += " AND id = ?";
        params.push(id);
    }

    if(nome){
        sql += " AND nome LIKE ?";
        params.push(`%${nome}%`);
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
}

export const postUsuario = async (req, res) => {
    const {tipo, nome, cpf, telefone, email, senha} = req.body;
    const sql = "INSERT INTO usuarios(tipo, nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)";
    if(tipo && nome && cpf && telefone && email && senha){
        bcrypt.hash(senha, 10, async (erro, hash) => {
            if(erro){
                res.status(401).json("Falha ao hashar senha");
            }else{
                const [post] = await db.query(sql, [tipo, nome, cpf, telefone, email, hash])
                res.status(201).json(`Convidado: ${nome} cadastrado com sucesso `)
            }
        })
    }else{
        res.status(404).json("Dados faltantes")
    }    
}

export const putUsuario = async (req, res) => {
    const {id} = req.params;
    const {tipo, nome, cpf, telefone, email, senha} = req.body;
    const sql = "UPDATE convidados SET tipo = ?, nome = ?, cpf = ?, telefone = ?, email = ?, senha = ? WHERE id = ? ";

    if(id && tipo && nome && cpf && telefone && email && senha){
        const [put] = await db.query(sql, [tipo, nome,  cpf, telefone, email, senha, id])
        res.status(200).json(`Usuário: ${nome} atualizado com sucesso `)
    }else{
        res.status(404).json("Dados faltantes")
    }
}

export const deleteUsuario = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM usuarios WHERE id = ?";

    if(id){
        const [del] = await db.query(sql, [id]);
        res.status(200).json(`Usuario deletado com sucesso`);
    }else{
        res.status(404).json("Id não encontrada");
    }
}