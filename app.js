/*Este arquivo configura o servidor Express, 
injetando o decodificador JSON nativo e amarrando o arquivo de rotas globais.*/

const express = require('express');
const clienteRouter = require('./router/cliente_router');
const produtoRouter = require('./router/produto_router');
const categoriasRouter = require('./router/categoria_router');
const tipoQuartoRouter = require('./router/tipo_quarto_router');
const quartoRouter = require('./router/quarto_router');
const reservaQuartoRouter = require('./router/reserva_quarto_router');
const routerEstadias = require('./router/estadia_router');
const routerConsumos = require('./router/consumo_router');

const app = express();

// Middleware obrigatório para permitir o recebimento e leitura de corpos de requisição em formato JSON
app.use(express.json());

// Injeta o arquivo de rotas do clientes, produto e categorias associado ao prefixo global da API (/api)
app.use('/api', clienteRouter);
app.use('/api', produtoRouter);
app.use('/api', categoriasRouter);
app.use('/api', tipoQuartoRouter);
app.use('/api', quartoRouter);
app.use('/api', reservaQuartoRouter);
app.use('/api', routerEstadias);
app.use('/api', routerConsumos);

// Exporta o aplicativo configurado para ser ligado pelo arquivo centralizador server.js
module.exports = app;
 