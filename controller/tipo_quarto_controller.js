/* Este arquivo intercepta requisições HTTP, extrai dados do body/params
e delega ao Service, retornando respostas JSON com tratamento de erros para TIPOS DE QUARTO. */

const tipoQuartoService = require('../service/tipo_quarto_service');

function handleError(res, err) {
    const status = (err && Number.isInteger(err.status)) ? err.status
        : (err && Number.isInteger(err.statusCode)) ? err.statusCode
        : 500;
    const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
    return res.status(status).json(payload);
}

// LISTAR TIPOS DE QUARTO
async function listarTiposQuarto(req, res) {
    try {
        const lista = await tipoQuartoService.listarTiposQuarto();
        res.json(lista);
    } catch (err) {
        handleError(res, err);
    }
}

// INSERIR TIPO DE QUARTO
async function criarTipoQuarto(req, res) {
    const tipoQuarto = req.body;
    try {
        const criado = await tipoQuartoService.criarTipoQuarto(tipoQuarto);
        res.status(201).json(criado);
    } catch (err) {
        handleError(res, err);
    }
}

// BUSCAR POR ID
async function buscarTipoQuartoPorId(req, res) {
    const id = +req.params.id; 
    try {
        const tipo = await tipoQuartoService.buscarTipoQuartoPorId(id);
        res.json(tipo);
    } catch (err) {
        handleError(res, err);
    }
}

// ATUALIZAR
async function atualizarTipoQuarto(req, res) {
    const id = +req.params.id;
    const tipoQuarto = req.body;
    try {
        const atualiz = await tipoQuartoService.atualizarTipoQuarto(id, tipoQuarto);
        res.json(atualiz);
    } catch (err) {
        handleError(res, err);
    }
}

// DELETAR
async function deletarTipoQuarto(req, res) {
    const id = +req.params.id;
    try {
        const del = await tipoQuartoService.deletarTipoQuarto(id);
        res.json(del);
    } catch (err) {
        handleError(res, err);
    }
}

module.exports = {
    listarTiposQuarto,
    criarTipoQuarto,
    buscarPorId: buscarTipoQuartoPorId, 
    atualizar: atualizarTipoQuarto,     
    deletar: deletarTipoQuarto          
};