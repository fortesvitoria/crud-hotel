const express = require('express');
const routerProdutos = express.Router();

const produtoController = require('../controller/produto_controller');

// ROTAS PARA PRODUTOS

// Listar produtos
routerProdutos.get('/produtos', produtoController.listarProdutos);
// Inserir produto
routerProdutos.post('/produtos', produtoController.inserirProduto);
routerProdutos.get('/produtos/:id', produtoController.buscarProdutoPorId);
routerProdutos.put('/produtos/:id', produtoController.atualizarProduto);
routerProdutos.delete('/produtos/:id', produtoController.deletarProduto);

module.exports = routerProdutos;
