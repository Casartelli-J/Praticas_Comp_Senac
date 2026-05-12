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
    Back:
        1- Criptografar senha usuario com Bcrypt
    Front/Back:
        2- Lógica para atualizar o checkin dos users
        3- Usar JWT(JSON Web Token) para bloquear as páginas

*/