const express = require('express');
const routerConsumos = express.Router();

const consumoController = require('../controller/consumo_controller');

// ROTAS PARA CONSUMOS
routerConsumos.get('/consumos', consumoController.listarConsumos);
routerConsumos.get('/consumos/:id', consumoController.buscarConsumoPorId);
routerConsumos.post('/consumos', consumoController.inserirConsumo);
routerConsumos.put('/consumos/:id', consumoController.atualizarConsumo);
routerConsumos.delete('/consumos/:id', consumoController.deletarConsumo);
routerConsumos.get('/estadias/:id/consumos/total', consumoController.calcularTotalEstadia);

module.exports = routerConsumos;