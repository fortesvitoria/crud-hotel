/* Este arquivo intercepta requisições HTTP, extrai dados do body/params
e delega ao Service, retornando respostas JSON com tratamento de erros para QUARTOS. */

const quartoService = require('../service/quarto_service');

function handleError(res, err) {
    const status = (err && Number.isInteger(err.status)) ? err.status
        : (err && Number.isInteger(err.statusCode)) ? err.statusCode
        : 500;
    const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
    return res.status(status).json(payload);
}

// LISTAR QUARTOS
async function listarQuartos(req, res) {
    try {
        const lista = await quartoService.listar(); // Usa a função listar() do service
        res.json(lista);
    } catch (err) {
        handleError(res, err);
    }
}

// INSERIR QUARTO
async function inserirQuarto(req, res) {
    const quarto = req.body;
    try {
        const criado = await quartoService.inserirQuarto(quarto);
        res.status(201).json(criado);
    } catch (err) {
        handleError(res, err);
    }
}

// BUSCAR POR ID
async function buscarQuartoPorId(req, res) {
    const id = +req.params.id;
    try {
        const quarto = await quartoService.buscarQuartoPorId(id);
        res.json(quarto);
    } catch (err) {
        handleError(res, err);
    }
}

// ATUALIZAR
async function atualizarQuarto(req, res) {
    const id = +req.params.id;
    const quarto = req.body;
    try {
        const atualiz = await quartoService.atualizarQuarto(id, quarto);
        res.json(atualiz);
    } catch (err) {
        handleError(res, err);
    }
}

// DELETAR
async function deletarQuarto(req, res) {
    const id = +req.params.id;
    try {
        const del = await quartoService.deletarQuarto(id);
        res.json(del);
    } catch (err) {
        handleError(res, err);
    }
}

module.exports = {
    listar: listarQuartos,            // Nomeado assim para bater com o seu router
    inserir: inserirQuarto,           // Nomeado assim para bater com o seu router
    buscarPorId: buscarQuartoPorId,   // Nomeado assim para bater com o seu router
    atualizar: atualizarQuarto,       // Nomeado assim para bater com o seu router
    deletar: deletarQuarto            // Nomeado assim para bater com o seu router
};