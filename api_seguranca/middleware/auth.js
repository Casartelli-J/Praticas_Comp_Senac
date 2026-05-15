import jwt from "jsonwebtoken";

export const verificaToken = async (req, res, next) =>{
    const token = req.headers["x-access-token"]
    const secret = "aimeudeus";
    if(token = ""){
        return res.status(403).json("Sem token");
    }else{
        const confere = jwt.verify(token, secret, function(erro, decoded){
            if(erro){
                res.status(500).json("Token inválido");
            }else{
                next();
            }
        });
    }
}