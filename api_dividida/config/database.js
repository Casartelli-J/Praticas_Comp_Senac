import mysql from "mysql2/promise"

//EXPORT permite que a função possa ser usada fora do arquivo

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
    
});

export default db;
