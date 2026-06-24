/*Este arquivo intercepta requisições HTTP, extrai dados do body/params
e delega ao Service, retornando respostas JSON com tratamento de erros.*/

const categoriaService = require('../service/categoria_service');

function handleError(res, err) {
    const status = (err && Number.isInteger(err.status)) ? err.status
        : (err && Number.isInteger(err.statusCode)) ? err.statusCode
        : 500;
    const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
    return res.status(status).json(payload);
}

// LISTAR CATEGORIAS
async function listarCategorias(req, res) {
    try {
        const lista = await categoriaService.listarCategorias();
        res.json(lista);
    } catch (err) {
        handleError(res, err);
    }
}

// INSERIR CATEGORIA
async function inserirCategoria(req, res) {
    const categoria = req.body;
    try {
        const criado = await categoriaService.inserirCategoria(categoria);
        res.status(201).json(criado);
    } catch (err) {
        handleError(res, err);
    }
}

// BUSCAR POR ID
async function buscarCategoriaPorId(req, res) {
    const id = +req.params.id;
    try {
        const cat = await categoriaService.buscarCategoriaPorId(id);
        res.json(cat);
    } catch (err) {
        handleError(res, err);
    }
}

// ATUALIZAR
async function atualizarCategoria(req, res) {
    const id = +req.params.id;
    const categoria = req.body;
    try {
        const atualiz = await categoriaService.atualizarCategoria(id, categoria);
        res.json(atualiz);
    } catch (err) {
        handleError(res, err);
    }
}

// DELETAR
async function deletarCategoria(req, res) {
    const id = +req.params.id;
    try {
        const del = await categoriaService.deletarCategoria(id);
        res.json(del);
    } catch (err) {
        handleError(res, err);
    }
}

module.exports = {
    listarCategorias,
    inserirCategoria,
    buscarCategoriaPorId,
    atualizarCategoria,
    deletarCategoria
};