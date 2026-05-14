
import db from "../config/database.js"

export const listUsuarios = async (req, res) =>{
    const {id} = req.query;
    const {nome} = req.query;

    let query = "SELECT * FROM usuario WHERE 1";
    let params = [];
    if(id){
        query += " AND ID_USUARIO = ?";
        params.push(id);
    }

    if(nome){
        query += " AND nome LIKE ?";
        params.push(`%${nome}%`);
    }
    const [rows] = await db.query(query, params);
    res.status(200).json(rows)
};

//Inserir dados INSERT (POST)

export const insertUser = async (req, res) =>{
    const {nome, email, senha} = req.body;
    const query = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
    const [result] = await db.query( query, [ nome, email, senha]);

    res.status(201).json("Convidado inserido com sucesso");
}

// UPDATE -  Atualizar dados
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const sql = "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE ID_usuario = ?";
    const [result] = await db.query(sql, [nome, email, senha, id] );

    if(result.affectedRows === 0){
        res.status(404).json("Usuario não encontrado");
    }else{
        res.status(201).json("FOI MEUUU");
    }
}

//Constante / função = Método
//Delete
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM usuario WHERE ID_usuario = ?";
    const [result] = await db.query(sql, [id]);

    if(result.affectedRows === 0){
        res.status(404).json("Não encontramos o home");
    }else{
        res.status(201).json("Usuário removido com sucesso");
    }
}
// SIX SEVEN