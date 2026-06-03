import jwt from "jsonwebtoken";

export const validaToken = (req, res, next) => {
    const SENHATOKEN = "samara";
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).json("Token não encontrado/validado");
    }
    const decoded = jwt.verify(token, SENHATOKEN, (erro, decodificado) => {
        if(erro){
            return res.status(500).json("Quebrou")
        }
        if(decodificado){
            next()
        }
    });
}

