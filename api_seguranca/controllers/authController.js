import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../config/database.js";

export const login = async (req, res) => {
    const {email, senha} = req.body;
    const users = "SELECT * from usuarios WHERE email = ?";
    
    if(email && senha){
        const [busca] = await db.query(users, [email]);
        const user = busca[0]
        
        const comparaSenha = await bcrypt.compare(senha, user["senha"])
        console.log(comparaSenha)
    }
    

}