const express = require('express');
const routerQuartos = express.Router();
const quartoController = require('../controller/quarto_controller');

// Mapeamento das rotas para o CRUD de Quartos
routerQuartos.get('/quartos', quartoController.listar);
routerQuartos.post('/quartos', quartoController.inserir);
routerQuartos.get('/quartos/:id', quartoController.buscarPorId);
routerQuartos.put('/quartos/:id', quartoController.atualizar);
routerQuartos.delete('/quartos/:id', quartoController.deletar);

module.exports = routerQuartos;