const express = require('express');
const router = express.Router();

const tipoQuartoController = require('../controller/tipo_quarto_controller');


router.post('/', tipoQuartoController.criarTipoQuarto);


router.get('/', tipoQuartoController.listarTiposQuarto);

module.exports = router;