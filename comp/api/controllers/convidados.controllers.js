import db from '../config/database.js';
import express from 'express';

export const listUser = async (req, res) => {
    const {id} = req.params;
    const {name} = req.params;

    let sql = "SELECT * FROM convidados WHERE 1";
    let params = [];
    
    if(id){
        sql += " AND id = ?";
        params.push(id);
    }
    
    if(name){
        sql += " AND Nome LIKE ?";
        params.push(`%${name}%`);
    }
        
    
    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
};


export const insertUser = async (req, res) => {
    const {cpf, nome, email, telefone, data} = req.body;
    const query = "INSERT INTO convidados (Cpf, Nome, Email, Telefone, Data) VALUES (?, ?, ?, ?, ?)";

    const [result] = await db.query(query, [cpf, nome, email, telefone, data]);
    res.status(200).json("Convidado inserido com sucesso");
};

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {cpf, nome, email, telefone, data} = req.body;

    const query = "UPDATE convidados SET Cpf = ?, Nome = ?, Email = ?, Telefone = ?, Data = ? WHERE id = ?";
    const [result] = await db.query(query, [cpf, nome, email, telefone, data, id]);

    if(result.affectedRows === 0 ){
        res.status(404).json("Usuário não encontrado.");
    }else{
        res.status(200).json("Usuário atualizado.");
    }
};

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    const query = "DELETE FROM convidados WHERE id = ?";

    const [result] = await db.query(query, [id]);
    if(result.affectedRows === 0){
        res.status(404).json("Usuário não encontrado.");
    }else{
        res.status(200).json("Usuário deletado.");
    }

};