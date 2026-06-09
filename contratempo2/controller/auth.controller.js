import db from "../config/database.js";
import bcrypt from "bcrypt";
import jswt from "jsonwebtoken";

export const login = async (req, res) => {
    const {email} = req.body;
    const {senha} = req.body;
    const sql = "SELECT * FROM usuarios WHERE email= ?"
    if(email && senha){
        const [login] = await db.query(sql, [email]);
        console.log(login)
        if(login != ""){
            const user = login[0]
            console.log(user.senha)
            bcrypt.compare(senha, user.senha, (erro, senhaHashada)=> {
                if(senhaHashada){
                    const token = jswt.sign({id : user.id}, process.env.JSENHA, {expiresIn: '1h'});
                    res.status(201).json({auth : true, token: token, id: user.id})
                }else{
                    res.status(404).json("Senha incorreta")
                }
            })
        }else{
            res.status(404).json("Email ou senha incorretos")
        }             
    }else{
        res.status(404).json("Dados faltantes")
    }


}