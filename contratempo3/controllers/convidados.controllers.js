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
    try {
        const sql = "INSERT INTO convidados(nome, sobrenome, cpf, telefone, email, mesa_id) VALUES (?, ?, ?, ?, ?, ?)";
        if(nome.length < 3 || sobrenome.length < 3){
            res.status(400).json("Nome e Sobrenome tem que ter mínimo de 3 caractéres")
        }
        if(cpf.length != 14){
            res.status(400).json("O CPF precisa ser preenchido corretamente")
        }
        if(telefone.length != 14){
            res.status(400).json("Número de telefone inválido")
        }
        if(email.length < 6 && email.includes("@")){
            res.status(400).json("Email incorreto");
        }
        if(isNaN(mesa_id)){
            res.status(400).json("Mesa inválida");
        }
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa_id]);
        res.status(201).json("Convidado inserido com sucesso");
    } catch (err){
        if(err.code === "ER_DUP_ENTRY"){
            if(err.sqlMessage.includes("cpf")){
                return res.status(409).json("Cpf já cadastrado")
            }
            if(err.sqlMessage.includes("email")){
                return res.status(409).json("Email já cadastrado")
            }
            if(err.sqlMessage.includes("telefone")){
                return res.status(409).json("Telefone já cadastrado")
            }
        }
        
    }
}


export const putConvidado = async (req, res) => {
    const {id} = req.params;
    const {nome, sobrenome, cpf, telefone, email, mesa_id} = req.body;
    try{
        const sql = "UPDATE convidados SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, email = ?, mesa_id = ? WHERE id = ?";
    
        if(nome.length < 3 || sobrenome.length < 3){
        res.status(400).json("Nome e Sobrenome tem que ter mínimo de 3 caractéres")
        }
        if(cpf.length != 14){
            res.status(400).json("O CPF precisa ser preenchido corretamente")
        }
        if(telefone.length != 14){
            res.status(400).json("Número de telefone inválido")
        }
        if(email.length < 6 || !email.includes("@")){
            res.status(400).json("Email incorreto");
        }
        if(isNaN(mesa_id)){
            res.status(400).json("Mesa inválida");
        }
        if(isNaN(id)){
            res.status(400).json("Id inválido")
        }
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa_id, id]);
        if(result.affectedRows === 0){
            res.status(404).json("Convidado não econtrado")
        }
        res.status(201).json("Convidado inserido com sucesso");
    }catch (err){
        if(err.code === "ER_DUP_ENTRY"){
            if(err.sqlMessage.includes("cpf")){
                return res.status(409).json("Cpf já cadastrado")
            }
            if(err.sqlMessage.includes("email")){
                return res.status(409).json("Email já cadastrado")
            }
            if(err.sqlMessage.includes("telefone")){
                return res.status(409).json("Telefone já cadastrado")
            }
        }
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