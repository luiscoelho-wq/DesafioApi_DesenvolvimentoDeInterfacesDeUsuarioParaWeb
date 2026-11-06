require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const usuario = {
    id: 1,
    nome: 'Administrador',
    email: 'admin@teste.com',
    senha: '123456'
};

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: 'Informe o e-mail e a senha.'
        });
    }

    if (email !== usuario.email || senha !== usuario.senha) {
        return res.status(401).json({
            mensagem: 'E-mail ou senha incorretos.'
        });
    }

    const access_token = jwt.sign(
        {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return res.status(200).json({
        mensagem: 'Login realizado com sucesso!',
        access_token: access_token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    });
});

app.get('/perfil', (req, res) => {
    const autorizacao = req.headers.authorization;

    if (!autorizacao || !autorizacao.startsWith('Bearer ')) {
        return res.status(401).json({
            mensagem: 'Token não informado.'
        });
    }

    const token = autorizacao.slice(7).trim();

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({
            mensagem: 'Token válido!',
            usuario: dados
        });

    } catch (erro) {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado.'
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});