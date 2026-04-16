const users = [
    {"nome": "Lorenzo", "senha": "adm123", "tipo" : "admin"},
    {"nome": "João", "senha": "teste senha", "tipo" : "usuario"},
    {"nome": "Isabele", "senha": "bel2026", "tipo" : "usuario"},
    {"nome": "Luis", "senha": "Feijão com Farinha", "tipo" : "usuario"}
];

export function listUsuarios(req, res) {
    res.json(users);
}