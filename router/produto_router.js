const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotel_controller');

//  CLIENTES

router.post('/clientes', hotelController.createCliente);
router.get('/clientes', hotelController.getClientes);
router.put('/clientes/:cpf', hotelController.updateCliente);
router.delete('/clientes/:cpf', hotelController.deleteCliente);

module.exports = router;
