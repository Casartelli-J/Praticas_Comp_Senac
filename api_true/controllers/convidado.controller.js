import db from "../config/database.js";


export const listUser = async (req, res) => {
    const {id} = req.params;
    const {name} = req.params;

    let query = "SELECT * FROM convidados";
    let params = [];

    if(id){
        query += "AND id = ?";
        params.push(id);
    }

    if(name){
        query += "AND nome LIKE = ?";
        params.push(name);
    }

    const [rows] = await db.query(query, params);
    res.status(201).json(rows);
}

export const insertUser = async (req, res) => {
    
}