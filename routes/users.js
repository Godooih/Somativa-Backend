const express = require('express') // importa o express para criar o servidor
const user = require('../models/user.js') // importa o modelo dos livros Book.js
const router = express.Router(); // cria o elemento para rotear com base nas requisições

app.post('/user',async(req,res)=>{
    const {username,password} = req.body;
    res.send(`Nome:${nome} | Idade:${idade} anos | E-mail: ${login} | Senha: ${senha}`);
    clientes.push({nome,idade,login,senha})
})

app.get('/clientes',(req,res)=>{
    const {nome,idade,login,senha} = req.body;
    res.json(clientes)//armazena a resposta
    res.send(`Nome:${nome} | Idade:${idade} anos | E-mail: ${login} | Senha: ${senha}`);
})