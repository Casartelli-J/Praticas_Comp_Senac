import mysql from "mysql2/promise";

const db = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
})

export default db;




/* 
O que falta:        
    frontEnd:
        1 - CRUD convidados completo
        2 - CRUD usuarios completo
        3 - Atualizar presenca convidado com check
        4 - Dashboard
    backEnd:
        1 - Proteger rotas
        2 - Criar checkin na API
        3 - Criar restrições pro usuário (admin acesso full, cerimonialista só tem acesso a lista com checks)
        4 - Usar JWT(JSON Web Token) para bloquear as páginas


*/