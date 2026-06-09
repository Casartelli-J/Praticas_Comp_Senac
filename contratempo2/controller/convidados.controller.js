import db from "../config/database.js";

export const getConvidado = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;
    const {presente} = req.query;
    const {ordem} = req.query;

    let sql = " SELECT c.*, m.nome as mesa FROM convidados c LEFT JOIN mesas m ON c.mesa = m.id WHERE 1";
    let params = [];

    if(id){
        sql += " AND c.id = ?";
        params.push(id);
    }

    if(nome){
        sql += " AND c.nome LIKE ?";
        params.push(`%${nome}%`);
    }

    if(presente){
        sql += " AND c.presente = ?";
        params.push(presente);
    }

    if(ordem){
        sql += ` ORDER BY ${ordem}`;
        params.push(ordem);
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
}

export const postConvidado = async (req, res) => {
    const {nome, sobrenome, cpf, telefone, email, mesa} = req.body;
    const sql = "INSERT INTO convidados(nome, sobrenome, cpf, telefone, email, mesa) VALUES (?, ?, ?, ?, ?, ?)";
    if(nome && sobrenome && cpf && telefone && email && mesa){
        const [post] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa])
        res.status(201).json(`Convidado: ${nome} cadastrado com sucesso `)
    }else{
        res.status(404).json("Dados faltantes")
    }    
}

export const putConvidado = async (req, res) => {
    const {id} = req.params;
    const {nome, sobrenome, cpf, telefone, email, mesa} = req.body;
    const sql = "UPDATE convidados SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, email = ?, mesa = ? WHERE id = ? ";

    if(id && nome && sobrenome && cpf && telefone && email && mesa){
        const [put] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa, id])
        res.status(200).json(`Convidado: ${nome} atualizado com sucesso `)
    }else{
        res.status(404).json("Dados faltantes")
    }
}

export const deleteConvidado = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM convidados WHERE id = ?";

    if(id){
        const [del] = await db.query(sql, [id]);
        res.status(200).json(`Convidado deletado com sucesso`);
    }else{
        res.status(404).json("Id não encontrada");
    }
}

export const presencaConvidado = async (req, res) => {
    const {id} = req.params;
    const busca = "SELECT * FROM convidados WHERE id = ?";
    const [convidados] = await db.query(busca, [id]);
    if(convidados != ""){
        const convidado = convidados[0];
        let sql = `UPDATE convidados SET presente =`;
        if(convidado.presente === 0){
            sql += " 1 "
        }else{
            sql += " 0 "
        }
        sql += `WHERE id = ${convidado.id}`;
        const [presenca] = await db.query(sql)
        res.status(200).json(`Convidado: ${convidado.nome} atualizado com sucesso`);
    }else{
        res.status(404).json("Convidado não encontrado");
    }
}