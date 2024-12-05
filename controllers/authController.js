const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const express = require('express')



//your routes here 

//Função para registrar novos usuarios
exports.register = async (req,res)=>{
    const {username,password} =req.body;
    try {
        //Verifica se o usuario já existe
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({ error: 'Usuario já existe'})
        }

        //Criptografa a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password,10)

        //Cria um novo usuario
        const newUser = new User({username,password: hashedPassword})
        await newUser.save()
        res.status(201).json({message: 'Usuario registrado com sucesso'})
    } catch (error){
        console.error(error)
        res.status(500).json({error: 'Erro ao registrar usuario'})
    }
};

//Funçao para fazer login de usuarios
exports.login = async (req,res)=>{
    const { username,password } = req.body;

    try{
        //Busca usuario pelo o nome
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json(
            {error: "Usuario não encontrado"})

        //Compara a senha fornecido com a senha armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({
            error: 'Senha incorreta'});
        
        //Cria web token
        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET,
            {expiresIn:'1h'});
        res.json({token});
    }catch (error){
        console.error(error);//Loga o erro
        res.status(500).json({error: 'Erro ao fazer login'});
    }
}