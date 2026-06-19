import db from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const logar = async (req, res) => {
    const {email} = req.body;
    const {senha} = req.body;
    if(!email.length < 6 && email.includes("@") && !senha.length < 6){
        const sql = "SELECT * FROM usuarios WHERE email = ?";
        const [result] = await db.query(sql, [email]);
        if(result != ""){
            const User = result[0]
            bcrypt.compare(senha, User.senha, async (err, senhaDesc)=>{
                if(err){
                    res.status(401).json("Senha n coisada")
                }else{
                    const token = jwt.sign({id : User.id, nome : User.nome}, process.env.CHAVESECRETA, {expiresIn : 60 * 10});
                    console.log(token)
                    res.status(201).json("Login Efetuado")
                }
            })
        }else{
            res.status(404).json("Fudeu")
        }
    }else{
        res.status(404).json("Fudeu")
    }
}

