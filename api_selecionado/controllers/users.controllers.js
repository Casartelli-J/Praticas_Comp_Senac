import db from "../config/database.js";


export const selectUser = async (req, res)=>{
    const {id} = req.params;
    const {name} = req.params;

    let consulta = "SELECT * FROM usuarios WHERE 1";
    let params = []

    if(id){
        consulta += " AND id = ?";
        params.push(id);
    }
    else if(name){
        consulta += " AND nome = ?";
        params.push(`%${name}%`);
    }

    const [rows] = await db.query(consulta, params);
    res.status(200).json(rows);
};

export const insertUser = async (req, res)=>{
    const {tipo, nome, cpf, email, senha} = req.body;
    const query = "INSERT INTO usuarios (tipo, nome, cpf, email, senha) VALUES (?, ?, ?, ?, ?)";
    const [response] = await db.query(query,[tipo, nome, cpf, email, senha]);
    
    res.status(201).json("Usuário inserido com sucesso!");
};

export const deleteUser = async (req, res) =>{
    const {id} = req.params;
    const deletar = "DELETE FROM usuarios WHERE id = ?";

    const [resp] = await db.query(deletar)
    res.status(200).json("Usuário deletado com sucesso!");
};


export const updateUser = async (req, res) =>{
    const {id} = req.params;
    const {tipo, name, cpf, email, senha} = req.body;
    const update = "UPDATE usuarios SET tipo = ?, nome = ?, cpf = ?, email = ?, senha = ? WHERE id = ?";

    const [resp] = await db.query(update, [tipo, name, cpf, email, senha, id])
    if(resp.affectedRows === 0){
        res.status(404).json("Usuário não encontrado");
    }else{
        res.status(201).json("Usuário modificado");
    }
}