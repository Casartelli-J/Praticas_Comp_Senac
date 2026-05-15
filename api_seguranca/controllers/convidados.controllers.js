import db from "../config/database.js";

export const selectUser = async (req, res) => {
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
        params.push(`%${nome}%`)
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
}

export const insertUser = async (req, res) =>{
    const {nome, sobrenome, cpf, telefone, email, mesa} = req.body;
    const sql = "INSERT INTO convidados(nome, sobrenome, cpf, telefone, email, mesa, presente) VALUES (?, ?, ?, ?, ?, ?, 0)";
    if(nome && sobrenome && cpf && telefone && email && mesa){
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa]);
        res.status(201).json("Convidado inserido com sucesso");
    }else{
        res.status(400).json("Faltam dados para preencher");
    }
    
}

export const updateUser = async (req, res) => {
    const {nome, sobrenome, cpf, telefone, email, mesa} = req.body;
    const {id} = req.params;
    const sql = "UPDATE convidados SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, email = ?, mesa = ? WHERE id = ?";
    
    
    if(nome && sobrenome && cpf && telefone && email && mesa){
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa, id]);
        if(result.affectedRows === 0){
            res.status(404).json("Convidado não encontrado");
        }else{
            res.status(200).json("Convidado modificado com sucesso");
        }
    }else{
        res.status(400).json("Faltam dados para preencher");
    }
}

export const deleteUser = async (req, res) =>{
    const {id} = req.params;
    const sql = "DELETE FROM convidados WHERE id = ?";
    
    const [result] = await db.query(sql, [id]);
    if(result.affectedRows === 0){
        res.status(404).json("Convidado não encontrado");
    }else{
        res.status(200).json("Convidado deletado com sucesso");
    }
}

export const checkUser = async(req, res) =>{
    const {id} = req.params;
    const sql = "SELECT presente from convidados WHERE id = ?";
    const [presente] = await db.query(sql, [id]);

    let sql2 = "";
    if(presente[0]["presente"] === 0){
        sql2 += "UPDATE convidados SET presente = 1 WHERE id = ?";
    }else{
        sql2 += "UPDATE convidados SET presente = 0 WHERE id = ?";
    }

    const [result] = await db.query(sql2, [id]);
    if(result.affectedRows === 0){
        res.status(404).json("Convidado não encontrado");
    }else{
        res.status(200).json("Usuário modificado");
    }

    
}