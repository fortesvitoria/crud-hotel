const express = require('express');
const routerTiposQuarto = express.Router();
const tipoQuartoController = require('../controller/tipo_quarto_controller');

// Mapeamento das rotas para o CRUD de Tipos de Quarto
routerTiposQuarto.get('/tipos', tipoQuartoController.listarTiposQuarto);
routerTiposQuarto.post('/tipos', tipoQuartoController.criarTipoQuarto);
routerTiposQuarto.get('/tipos/:id', tipoQuartoController.buscarPorId);
routerTiposQuarto.put('/tipos/:id', tipoQuartoController.atualizar);
routerTiposQuarto.delete('/tipos/:id', tipoQuartoController.deletar);

module.exports = routerTiposQuarto;