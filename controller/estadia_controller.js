const estadiaService = require('../service/estadia_service');

function handleError(res, err) {
    const status = (err && Number.isInteger(err.status)) ? err.status
        : (err && Number.isInteger(err.statusCode)) ? err.statusCode
        : 500;
    const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
    return res.status(status).json(payload);
}

async function checkin(req, res) {
    try {
        const criado = await estadiaService.checkIn(req.body);
        res.status(201).json(criado);
    } catch (err) {
        handleError(res, err);
    }
}

async function checkout(req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return handleError(res, { status: 400, message: 'ID de estadia inválido.' });
    }
    try {
        const atualizacao = await estadiaService.checkOut(id);
        res.json(atualizacao);
    } catch (err) {
        handleError(res, err);
    }
}

async function buscarEstadiaPorId(req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return handleError(res, { status: 400, message: 'ID de estadia inválido.' });
    }
    try {
        const estadia = await estadiaService.buscarEstadiaPorId(id);
        res.json(estadia);
    } catch (err) {
        handleError(res, err);
    }
}

async function listarEstadias(req, res) {
    try {
        const lista = await estadiaService.listarEstadias();
        res.json(lista);
    } catch (err) {
        handleError(res, err);
    }
}

module.exports = {
    checkin,
    checkout,
    buscarEstadiaPorId,
    listarEstadias
};