/*Este arquivo intercepta requisições HTTP, extrai dados do body/params
e delega ao Service, retornando respostas JSON com tratamento de erros.*/

const produtoService = require('../service/produto_service');

// LISTAR PRODUTOS
async function listarProdutos(req, res) {
    res.json(await produtoService.listarProdutos());
}

//INSERIR PRODUTO
async function inserirProduto(req, res) {
    let produto = req.body;
    try { 
        produto = await produtoService.inserir(produto);
        res.status(201).json(produto);
    }
    catch(err) {
        const status = (err && Number.isInteger(err.status)) ? err.status
            : (err && Number.isInteger(err.statusCode)) ? err.statusCode
            : 500;
        const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
        res.status(status).json(payload);
    }
    console.log(req.body) 
}

//BUSCAR PRODUTO POR ID
async function buscarProdutoPorId(req, res) {    
    const id = +req.params.id;
    try {
        res.json(await produtoService.buscarProdutoPorId(id));
    } catch(err) {
        const status = (err && Number.isInteger(err.status)) ? err.status
            : (err && Number.isInteger(err.statusCode)) ? err.statusCode
            : 500;
        const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
        res.status(status).json(payload);
    }
}

//ATUALIZAR PRODUTO
async function atualizarProduto(req, res) {
    const id = +req.params.id;
    let produto = req.body;
    try{
        res.json(await produtoService.atualizarProduto(id, produto));
    } catch(err) {
        const status = (err && Number.isInteger(err.status)) ? err.status
            : (err && Number.isInteger(err.statusCode)) ? err.statusCode
            : 500;
        const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
        res.status(status).json(payload);
    }
}

//DELETAR PRODUTO
async function deletarProduto(req, res) {
    const id = +req.params.id;
    try {
        res.json(await produtoService.deletarProduto    (id));
    } catch(err) {
        const status = (err && Number.isInteger(err.status)) ? err.status
            : (err && Number.isInteger(err.statusCode)) ? err.statusCode
            : 500;
        const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
        res.status(status).json(payload);
    }
}

module.exports = {
    listarProdutos, 
    inserirProduto, 
    buscarProdutoPorId, 
    atualizarProduto, 
    deletarProduto
}