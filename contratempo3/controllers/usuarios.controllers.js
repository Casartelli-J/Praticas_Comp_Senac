import db from "../config/database.js";
import bct from "bcrypt";

export const getUsuario = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;

    let sql = " SELECT u.*, c.nome as cargo_id FROM usuarios u LEFT JOIN cargos c ON u.cargo_id = c.id WHERE 1 "
    let params = [];

    if(id){
        sql += " AND c.id = ?";
        params.push(id);
    }

    if(nome){
        sql += "AND c.nome LIKE ?";
        params.push(`%${nome}%`);
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
    
}


export const postUsuario = async (req, res) => {
    const {cargo_id, nome, cpf, telefone, email, senha} = req.body;
    const sql = "INSERT INTO usuarios(cargo_id, nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)";
    if(cargo_id && nome && cpf && telefone && email && senha){
        bct.hash(senha, 10, async (err ,hash) =>{
            if(err){
                res.status(401).json("Falha na senha, envia de novo")
            }else{
                const [result] = await db.query(sql, [cargo_id, nome, cpf, telefone, email, hash]);
                res.status(201).json("Usuário inserido com sucesso");
            }
        })
    }else{
        res.status(404).json("Dados faltantes");
    }
}


export const putUsuario = async (req, res) => {
    const {id} = req.params;
    const {cargo_id, nome, cpf, telefone, email, senha} = req.body;
    const sql = "UPDATE usuarios SET cargo_id = ?, nome = ?, cpf = ?, telefone = ?, email = ?, senha = ?";

    if(cargo_id && nome && cpf && telefone && email && senha){
        const [result] = await db.query(sql, [cargo_id, nome, cpf, telefone, email, senha]);
        res.status(201).json("Usuário inserido com sucesso");
    }else{
        res.status(404).json("Dados faltantes");
    }
}


export const deleteUsuario = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM usuarios WHERE id = ?";

    const [result] = await db.query(sql, [id]);
    if(result.affectedRows === 0){
        res.status(404).json("Usuário não encontrado");
    }else{
        res.status(200).json("Usuário deletado com sucesso");
    }
}