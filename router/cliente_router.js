const express = require('express');
const routerClientes = express.Router();
const clienteController = require('../controller/cliente_controller');

// ROTAS PARA CLIENTES

routerClientes.get('/clientes', clienteController.listarClientes);
routerClientes.post('/clientes', clienteController.inserirCliente);
routerClientes.get('/clientes/:cpf', clienteController.buscarClientePorId);
routerClientes.put('/clientes/:cpf', clienteController.atualizarCliente);
routerClientes.delete('/clientes/:cpf', clienteController.deletarCliente);

module.exports = routerClientes;
