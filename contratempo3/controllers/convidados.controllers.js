import db from "../config/database.js";

export const getConvidado = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;
    const {ordem} = req.query;

    let sql = " SELECT c.*, m.nome as mesa_id FROM convidados c LEFT JOIN mesas m ON c.mesa_id = m.id WHERE 1 "
    let params = [];

    if(id){
        sql += " AND c.id = ?";
        params.push(id);
    }

    if(nome){
        sql += "AND c.nome LIKE ?";
        params.push(`%${nome}%`);
    }

    if(ordem){
        sql += ` ORDER BY ${ordem}`;
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
    
}


export const postConvidado = async (req, res) => {
    const {nome, sobrenome, cpf, telefone, email, mesa_id} = req.body;
    const sql = "INSERT INTO convidados(nome, sobrenome, cpf, telefone, email, mesa_id) VALUES (?, ?, ?, ?, ?, ?)";
    if(nome && sobrenome && cpf && telefone && mesa_id){
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa_id]);
        res.status(201).json("Convidado inserido com sucesso");
    }else{
        res.status(404).json("Dados faltantes");
    }
}


export const putConvidado = async (req, res) => {
    const {id} = req.params;
    const {nome, sobrenome, cpf, telefone, mesa_id} = req.body;
    const sql = "UPDATE convidados SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, mesa_id = ?";

    if(nome && sobrenome && cpf && telefone && mesa_id){
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, mesa_id]);
        res.status(201).json("Convidado inserido com sucesso");
    }else{
        res.status(404).json("Dados faltantes");
    }
}


export const deleteConvidado = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM convidados WHERE id = ?";

    const [result] = await db.query(sql, [id]);
    if(result.affectedRows === 0){
        res.status(404).json("Convidado não encontrado");
    }else{
        res.status(200).json("Convidado deletado com sucesso");
    }
}