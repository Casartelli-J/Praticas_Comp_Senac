import db from "../config/database.js";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";


export const getConvidado = async (req, res) => {
    const {id} = req.query;
    const {nome} = req.query;

    let sql = "SELECT * FROM convidados WHERE 1 ";
    let params = [];

    if(id){
        sql += " AND id = ? ";
        params.push(id);
    }

    if(nome){
        sql += " AND nome LIKE ? ";
        params.push(`%${nome}%`);
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
}

export const insertConvidado = async (req, res) => {
    const {nome, sobrenome, cpf, telefone, email, mesa} = req.body;
    const sql = "INSERT INTO convidados(nome, sobrenome, cpf, telefone, email, mesa) VALUES (?, ?, ?, ?, ?, ?)";
    
    if(nome && sobrenome && cpf && telefone && email && mesa){
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa]);
        res.status(201).json("Convidado inserido com sucesso");
    }else{
        res.status(404).json("Falta dados");
    }
}

export const updateConvidado = async (req, res) => {
    const {nome, sobrenome, cpf, telefone, email, mesa} = req.body;
    const {id} = req.params;
    const sql = "UPDATE convidados SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, email = ?, mesa = ? WHERE id = ?";

    if(nome && sobrenome && cpf && telefone && email && mesa && id){
        const [result] = await db.query(sql, [nome, sobrenome, cpf, telefone, email, mesa, id]);
        res.status(200).json("Convidado atualizado com sucesso");
    }else{
        res.status(404).json("Falta dados");
    }
    
}

export const deleteConvidado = async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM convidados WHERE id = ?";

    if(id){
        const [result] = await db.query(sql, [id]);
        res.status(200).json("Convidado removido com sucesso");
    }else{
        res.status(404).json("Convidado não encontrado");
    }
}

export const checkinConvidado = async (req, res) => {
    const {id} = req.params;
    let sql = "SELECT id, presente FROM convidados WHERE id = ?";
    const [convidado] = await db.query(sql, [id]);

    if(convidado[0]["presente"] === 0){
       sql = "UPDATE convidados SET presente = 1 WHERE id = ?";
       const [result] = await db.query(sql, [id]);
       res.status(200).json("Convidado marcado como presente") ;
    }else{
        sql = "UPDATE convidados SET presente = 0 WHERE id = ?";
        const [result] = await db.query(sql, [id]);
        res.status(200).json("Convidado marcado como ausente") ;
    }

}

export const exportaConvidado = async (req, res) => {
    const sql = "SELECT * FROM convidados WHERE 1 ";
    const [rows] = await db.query(sql)
    const convidados = [rows]
    const convidado = convidados[0]
    let linhas = []
    convidado.forEach(convidado =>{
        if(convidado.presente === 0){
            convidado.presente = "Ausente"
        }else{
            convidado.presente = "Presente"
        }
        const novalinha = [convidado.nome, convidado.sobrenome, convidado.cpf, convidado.presente];
        linhas.push(novalinha)
    })

    const doc = jsPDF();
    autoTable(doc, {
        head : [["Nome", "Sobrenome", "CPF", "Presente"]],
        body : linhas
        
    });
    doc.save("Arquivo_fds.pdf")
}

export const checkConvidado