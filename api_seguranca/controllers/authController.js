import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../config/database.js";

export const login = async (req, res) => {
    const {email, senha} = req.body;
    const users = "SELECT * from usuarios WHERE email = ?";
    const [busca] = await db.query(users, [email]);
    if(busca != ""){
        const user = busca[0];
        const comparaSenha = await bcrypt.compare(senha, user["senha"]);
        console.log(comparaSenha);
        
        if(user["email"] && comparaSenha){    
            const secret = process.env.SECRET;
    
            const token = jwt.sign({ id : user["id"]}, secret, {expiresIn : "1h"});
            res.json({token : token, auth : true});
        }else{
            res.status(401).json("Senha incorreta")
        }
    }else{
        res.status(401).json("Email incorreto")
    }
}