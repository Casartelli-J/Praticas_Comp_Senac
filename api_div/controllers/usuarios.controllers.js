import db from "../config/database.js";

export const listUsers = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;
    
    let query = "SELECT * FROM convidados";
    let params = [];

    if(id){
        query += "AND id = ?";
        params.push(id);
    }

    if(nome){
        query += "AND nome LIKE = ?";
        params.push(`%${nome}%`);
    }

    const [rows] = await db.query(query, params);
    res.status(201).json(rows);
}


export const insertUser = async (req, res) => {
    const {cpf, nome, email, telefone, data} = req.body;
    const query = "INSERT INTO convidados (cpf, nome, email, telefone, data) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(query, [cpf, nome, email, telefone, data]);
    
    res.status(201).json("Convidado metido!");
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {cpf, nome, email, telefone, data} = req.body;

    const sql = "UPDATE convidados SET cpf = ?, nome = ?, email = ?, telefone = ?, data = ? WHERE id = ?";
    const [result] = await db.query(sql, [cpf, nome, email, telefone, data, id]);

    if(result.affectedRows === 0){
        res.status(404).json("N deu nada");
    }else{
        res.status(201).json("deu bom");
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM convidados WHERE id = ?";
    const [result] = await db.query(sql, [id]);

    if(result.affectedRows === 0){
        res.status(404).json("N achou ngm meu nobre");
    }else{
        res.status(201).json("apagou legal");
    }
}