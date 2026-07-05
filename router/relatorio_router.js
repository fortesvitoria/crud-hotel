const express = require('express');

const routerRelatorios =
    express.Router();

const relatorioController =
    require('../controller/relatorio_controller');


routerRelatorios.get(
    '/relatorios/estadias',
    relatorioController.listarEstadiasPorCliente
);

routerRelatorios.get(
    '/relatorios/estadias/:id/consumos',
    relatorioController.listarConsumoPorEstadia
);

module.exports = routerRelatorios;




