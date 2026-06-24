const express = require('express');
const router = express.Router();
const clienteController = require('../controller/cliente_controller');

//  CLIENTES

router.post('/clientes', clienteController.createCliente);
router.get('/clientes', clienteController.getClientes);
router.put('/clientes/:cpf', clienteController.updateCliente);
router.delete('/clientes/:cpf', clienteController.deleteCliente);

module.exports = router;
