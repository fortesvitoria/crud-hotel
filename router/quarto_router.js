const express = require('express');
const router = express.Router();
const quartoController = require('../controller/quarto_controller');

// Mapeamento das rotas para o CRUD de Quartos
router.get('/', quartoController.listar);
router.post('/', quartoController.inserir);
router.get('/:id', quartoController.buscarPorId);
router.put('/:id', quartoController.atualizar);
router.delete('/:id', quartoController.deletar);

module.exports = router;