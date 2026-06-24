const express = require('express');
const routerClientes = express.Router();
const clienteController = require('../controller/cliente_controller');

//  CLIENTES

routerClientes.post('/clientes', clienteController.createCliente);
routerClientes.get('/clientes', clienteController.getClientes);
routerClientes.put('/clientes/:cpf', clienteController.updateCliente);
routerClientes.delete('/clientes/:cpf', clienteController.deleteCliente);

module.exports = router;
