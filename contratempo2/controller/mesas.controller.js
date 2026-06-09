import db from "../config/database.js";

export const getMesa = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;

    let sql = " SELECT * FROM mesas WHERE 1 ";
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

export const postMesa = async (req, res) => {
    const {qtd, nome} = req.body;
    const sql = "INSERT INTO mesas(qtd, nome) VALUES (?, ?)";
    if(qtd && nome){
        const [post] = await db.query(sql, [qtd, nome])
        res.status(201).json(`Mesa: ${nome} cadastrada com sucesso `)
    }else{
        res.status(404).json("Dados faltantes")
    }    
}

export const putMesa = async (req, res) => {
    const {id} = req.params;
    const {qtd, nome} = req.body;
    const sql = "UPDATE mesas SET qtd = ?, nome = ? WHERE id = ? ";

    if(id && qtd && nome ){
        const [put] = await db.query(sql, [qtd, nome, id])
        res.status(200).json(`Mesa: ${nome} atualizada com sucesso `)
    }else{
        res.status(404).json("Dados faltantes")
    }
}

export const deleteMesa = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM mesas WHERE id = ?";

    if(id){
        const [del] = await db.query(sql, [id]);
        res.status(200).json(`Mesa deletado com sucesso`);
    }else{
        res.status(404).json("Id não encontrada");
    }
}