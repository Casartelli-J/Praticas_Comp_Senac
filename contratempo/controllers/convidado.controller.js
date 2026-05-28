import db from "../config/database.js";

export const getConvidado = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;

    let sql = "SELECT * FROM convidados WHERE 1 ";
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

export const insertConvidado = async (req, res) => {
    const { nome, sobrenome, cpf, telefone, email, mesa} = req.body;
    const sql = "INSERT INTO convidados(nome, sobrenome, cpf, telefone, email, mesa) VALUES (?, ?, ?, ?, ?, ?)";
    
    if(nome && sobrenome && cpf && telefone && email && mesa){
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa]);
        res.status(201).json("Convidado inserido com sucesso");
    }else{
        res.status(400).json("Faltam dados");
    }
}

export const updateConvidado = async (req, res) => {
    const { nome, sobrenome, cpf, telefone, email, mesa} = req.body;
    const {id} = req.params;
    const sql = "UPDATE convidados SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, email = ?, mesa = ? WHERE id = ?";

    if(nome && sobrenome && cpf && telefone && email && mesa){
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa, id]);
        res.status(200).json("Convidado atualizado com sucesso");
    }else{
        res.status(400).json("Faltam dados");
    }

}

export const deleteConvidado = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM convidados WHERE id = ?";

    const [result] = await db.query(sql, [id]);
    if(result){
        res.status(200).json("Convidado deletado com sucesso!");
    }else{
        res.status(404).json("Convidado não encontrado.");
    }
}

export const checkConvidado