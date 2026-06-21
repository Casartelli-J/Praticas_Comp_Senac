import db from "../config/database.js";
import bct from "bcrypt";

export const getUsuario = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;

    let sql = " SELECT u.*, c.nome as cargo_id FROM usuarios u LEFT JOIN cargos c ON u.cargo_id = c.id WHERE 1 "
    let params = [];

    if(id){
        sql += " AND c.id = ?";
        params.push(id);
    }

    if(nome){
        sql += "AND c.nome LIKE ?";
        params.push(`%${nome}%`);
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
    
}


export const postUsuario = async (req, res) => {
    const {cargo_id, nome, cpf, telefone, email, senha} = req.body;
    try {
        const sql = "INSERT INTO usuarios(cargo_id, nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)";
        if(isNaN(cargo_id)){
            res.status(400).json("Cargo inválido");
        }
        if(nome.length < 3){
            res.status(400).json("Nome tem que ter mínimo de 3 caractéres")
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
        if(senha.length < 6){
            res.status(400).json("Senha precisa de no mínimo 6 caractéres!")
        }else{
            bct.hash(senha, 10, async (err, hash) => {
                if(err){
                    res.status(500).json("Falhei em criptografar, manda dnv")
                }else{
                    const [result] = await db.query(sql, [cargo_id, nome, cpf, telefone, email, hash]);
                    res.status(201).json("Usuário inserido com sucesso");
                }
            })
        }
    }catch (err){
        if(err.code === "ER_DUP_ENTRY"){
            return res.status(409).json("CPF já existente")
        }

        console.error(err);
        return res.status(500).json("Erro interno do servidor");
    }
}


export const putUsuario = async (req, res) => {
    const {id} = req.params;
    const {cargo_id, nome, cpf, telefone, email, senha} = req.body;
    const sql = "UPDATE usuarios SET cargo_id = ?, nome = ?, cpf = ?, telefone = ?, email = ?, senha = ? WHERE id = ?";

    if(isNaN(cargo_id)){
        res.status(400).json("Cargo inválido");
    }
    if(nome.length < 3){
        res.status(400).json("Nome tem que ter mínimo de 3 caractéres");
    }
    if(cpf.length != 14){
        res.status(400).json("O CPF precisa ser preenchido corretamente");
    }
    if(telefone.length != 14){
        res.status(400).json("Número de telefone inválido");
    }
    if(email.length < 6 && email.includes("@")){
        res.status(400).json("Email incorreto");
    }
    if(isNaN(id)){
        res.status(400).json("Id inválido");
    }
    if(senha.length < 6){
        res.status(400).json("Senha precisa de no mínimo 6 caractéres!");
    }else{
        bct.hash(senha, 10, async (err, hash) => {
            if(err){
                res.status(500).json("Falhei em criptografar, manda dnv");
            }else{
                const [result] = await db.query(sql, [cargo_id, nome, cpf, telefone, email, hash, id]);
                if(result.affectedRows === 0){
                    res.status(404).json("Usuário não encontrado");
                }
                res.status(201).json("Usuário atualizado com sucesso");
            }
        })
    }
}


export const deleteUsuario = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM usuarios WHERE id = ?";

    const [result] = await db.query(sql, [id]);
    if(result.affectedRows === 0){
        res.status(404).json("Usuário não encontrado");
    }else{
        res.status(200).json("Usuário deletado com sucesso");
    }
}