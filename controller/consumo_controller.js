const consumoService = require('../service/consumo_service');

function handleError(res, err) {
    const status = (err && Number.isInteger(err.status)) ? err.status
        : (err && Number.isInteger(err.statusCode)) ? err.statusCode
        : 500;
    const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
    return res.status(status).json(payload);
}

async function listarConsumos(req, res) {
    try {
        const consumos = await consumoService.listarConsumos();
        res.json(consumos);
    } catch (err) {
        handleError(res, err);
    }
}

async function buscarConsumoPorId(req, res) {
    const id = +req.params.id;
    try {
        const consumo = await consumoService.buscarConsumoPorId(id);
        res.json(consumo);
    } catch (err) {
        handleError(res, err);
    }
}

async function inserirConsumo(req, res) {
    try {
        const criado = await consumoService.inserirConsumo(req.body);
        res.status(201).json(criado);
    } catch (err) {
        handleError(res, err);
    }
}

async function atualizarConsumo(req, res) {
    const id = +req.params.id;
    try {
        const atualizado = await consumoService.atualizarConsumo(id, req.body);
        res.json(atualizado);
    } catch (err) {
        handleError(res, err);
    }
}

async function deletarConsumo(req, res) {
    const id = +req.params.id;
    try {
        const deletado = await consumoService.deletarConsumo(id);
        res.json(deletado);
    } catch (err) {
        handleError(res, err);
    }
}

async function calcularTotalEstadia(req, res) {
    const id = +req.params.id;
    try {
        const total = await consumoService.calcularTotalEstadia(id);
        res.json({ consumo_total: total });
    } catch (err) {
        handleError(res, err);
    }
}

module.exports = {
    listarConsumos,
    buscarConsumoPorId,
    inserirConsumo,
    atualizarConsumo,
    deletarConsumo,
    calcularTotalEstadia
};