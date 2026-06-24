/*Este arquivo configura o servidor Express, 
injetando o decodificador JSON nativo e amarrando o arquivo de rotas globais.*/

const express = require('express');
const hotelRouter = require('./router/hotel_router');

const app = express();

// Middleware obrigatório para permitir o recebimento e leitura de corpos de requisição em formato JSON
app.use(express.json());

// Injeta o arquivo de rotas do hotel associado ao prefixo global da API (/api)
app.use('/api', hotelRouter);

// Exporta o aplicativo configurado para ser ligado pelo arquivo centralizador server.js
module.exports = app;
