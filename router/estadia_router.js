const express = require('express');
const routerEstadias = express.Router();

const estadiaController = require('../controller/estadia_controller');

// ROTAS DE ESTADIAS
// CHECK-IN
routerEstadias.post('/estadias/checkin', estadiaController.checkin);

// CHECK-OUT
routerEstadias.put('/estadias/:id/checkout', estadiaController.checkout);

// BUSCAR ESTADIA POR ID
routerEstadias.get('/estadias/:id', estadiaController.buscarEstadiaPorId);

// LISTAR ESTADIAS
routerEstadias.get('/estadias', estadiaController.listarEstadias);

module.exports = routerEstadias;