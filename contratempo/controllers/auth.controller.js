import jwt from "jsonwebtoken";
import db from "../config/database.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    const senhaToken = process.env.SENHATOKEN;
    const {email, senha} = req.body;
    if(email && senha){
        const sql = "SELECT id, email, senha, tipo FROM usuarios WHERE email = ?";
        const [usuario] = await db.query(sql, [email, senha]);
        const user = usuario[0]
        const comparaSenha = await bcrypt.compare(senha, user["senha"]);
        if(comparaSenha){
            const token = jwt.sign({id : user["id"], tipo : user["tipo"], nome : user["nome"]}, senhaToken, {expiresIn: "1h"});
            res.status(200).json({auth : true, tipo : user["tipo"], token : token});
        }else{
            res.status(404).json("Senha incorreta")
        }
    }else{
        res.status(404).json("Dados faltantes")
    }
    
}