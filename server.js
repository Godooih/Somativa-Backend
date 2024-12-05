// arquivo principal da api
// inicia o servidor
require('dotenv').config()// Carrega as variaveis do arquivo venv
const express = require('express')//define uma constante chamada express e puxa a extensão 'express'
const mongoose = require('mongoose') // define uma constante chamada mongoose e puxa a extensão 'mongoose' que serve para fazer a conexão com o MONGO DB

const cors = require('cors')// Importa a biblioteca CORS para habilitar o compartilhamento de recursos entre diferentes domínios
const bodyParser = require('body-parser')



const app = express(); // inicialização do app express
app.use(cors()); // Aplica o middleware CORS para permitir requisições de outros domínios
app.use(express.json());// Aplica o middleware para interpretar requisições JSON

const authRoutes = require('./routes/authRoutes')

// Conexão com o mongo db com as informações fornecidas pelo o proprio MONGO DB

mongoose.connect('mongodb+srv://thalesgodoi1:104599150@library.pxx0i.mongodb.net/?retryWrites=true&w=majority&appName=library'
   
    ,{
    useNewUrlParser: true, // Configuração para utilizar o novo parser de URL do Mongoose
    useUnifiedTopology: true // Configuração para utilizar a nova engine de gerenciamento de conexões do Mongoose
    
})
.then(()=>console.log('Mongodb conectado'))// Se a conexão for bem-sucedida, exibe uma mensagem no console
.catch(err=>console.error('Erro ao conectar no mongo',err));// se a conexão não for bem sucedida, exibe a mensagem acima

// Importação das rotas
const bookRoutes = require('./routes/books');
//app.use('/api/books',bookRoutes); // irá retornar a rota dos livros
app.use('/api/auth',authRoutes);
// Define a porta do servidor

app.use('/api/books',bookRoutes);

app.listen(5000,()=>{
    console.log('Servidor executando na porta 5000');
});