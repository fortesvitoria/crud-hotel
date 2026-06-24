const express = require("express");
const routerCategorias = express.Router();
const categoriaController = require('../controller/categoria_controller');

routerCategorias.get('/categorias', categoriaController.listarCategorias);
routerCategorias.post('/categorias', categoriaController.inserirCategoria);
routerCategorias.get('/categorias/:id', categoriaController.buscarCategoriaPorId);
routerCategorias.put('/categorias/:id', categoriaController.atualizarCategoria);
routerCategorias.delete('/categorias/:id', categoriaController.deletarCategoria);

module.exports = routerCategorias;  