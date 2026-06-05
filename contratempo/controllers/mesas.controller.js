import db from "../config/database.js";

export const espacoMesas = async (req, res) => {
    const sql = `SELECT m.id, (m.qtd - COUNT(c.mesa)) as espacoTotal, m.nome FROM mesas m
    LEFT JOIN convidados c on m.id = c.mesa
    GROUP BY m.id HAVING espacoTotal > 0;
    `;
    const [query] = await db.query(sql);
    res.status(200).json(query);
}

export const listaMesas = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;
    let sql = `SELECT m.id, m.qtd, m.nome, (m.qtd - COUNT(c.mesa)) as espacoTotal from mesas m
LEFT JOIN convidados c on m.id = c.mesa WHERE 1 `;
    let params = [];
    if(id){
        sql += " AND m.id = ? ";
        params.push(id);
    }
    if(nome){
        sql += " AND m.nome LIKE ? ";
        params.push(`%${nome}%`);
    }
    sql += " GROUP BY m.id ";

    const [query] = await db.query(sql, params);
    res.status(200).json(query);
}

export const adicionaMesa = async (req, res) => {
    const {qtd, nome} = req.body;
    const sql = "INSERT INTO mesas(qtd, nome) VALUES (?, ?)";

    const [result] = await db.query(sql, [qtd, nome]);
    if(result){
        res.status(201).json("Mesa inserida com sucesso");
    }else{
        res.status(404).json("Falha ao inserir");
    }
}

export const atualizaMesa = async (req, res) => {
    const {id} = req.params;
    const {qtd, nome} = req.body;
    const sql = "UPDATE mesas SET qtd = ?, nome = ? WHERE id = ?";

    const [result]  = await db.query(sql, [qtd, nome, id]);
    if(result){
        res.status(201).json("Mesa update com sucesso");
    }else{
        res.status(404).json("Falha ao atualizar");
    }
    
}

export const deleteMesa = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM mesas WHERE id = ?";

    const [result]  = await db.query(sql, [id]);
    if(result){
        res.status(201).json("Mesa update com sucesso");
    }else{
        res.status(404).json("Falha ao atualizar");
    }
}