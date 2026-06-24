/*Este arquivo configura o servidor Express, 
injetando o decodificador JSON nativo e amarrando o arquivo de rotas globais.*/

const express = require('express');
const clienteRouter = require('./router/cliente_router');

const produtoRouter = require('./router/produto_router');

const categoriasRouter = require('./router/categoria_router');

const app = express();

// Middleware obrigatório para permitir o recebimento e leitura de corpos de requisição em formato JSON
app.use(express.json());

// Injeta o arquivo de rotas do clientes, produto e categorias associado ao prefixo global da API (/api)
app.use('/api', clienteRouter);
app.use('/api', produtoRouter);
app.use('/api', categoriasRouter);

// Exporta o aplicativo configurado para ser ligado pelo arquivo centralizador server.js
module.exports = app;
 