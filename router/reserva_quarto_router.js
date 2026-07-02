const express = require('express');
const routerReservas = express.Router();

const reservaQuartoController = require('../controller/reserva_quarto_controller');

// ROTAS PARA RESERVAS DE QUARTOS
routerReservas.get('/reservas', reservaQuartoController.listarReservas);
routerReservas.post('/reservas', reservaQuartoController.inserirReserva);
routerReservas.get('/reservas/:id', reservaQuartoController.buscarReservaPorId);
routerReservas.put('/reservas/:id', reservaQuartoController.atualizarReserva);
routerReservas.delete('/reservas/:id', reservaQuartoController.deletarReserva);

module.exports = routerReservas;