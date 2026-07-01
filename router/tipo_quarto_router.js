const express = require('express');
const router = express.Router();
const tipoQuartoController = require('../controller/tipo_quarto_controller');

// Mapeamento das rotas para o CRUD de Tipos de Quarto
router.get('/', tipoQuartoController.listarTiposQuarto);
router.post('/', tipoQuartoController.criarTipoQuarto);
router.get('/:id', tipoQuartoController.buscarPorId);
router.put('/:id', tipoQuartoController.atualizar);
router.delete('/:id', tipoQuartoController.deletar);

module.exports = router;