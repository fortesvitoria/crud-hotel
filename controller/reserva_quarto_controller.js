/* Este arquivo intercepta requisições HTTP, extrai dados do body/params
e delega ao Service, retornando respostas JSON com tratamento de erros para RESERVAS DE QUARTOS. */

const reservaService = require('../service/reserva_quarto_service');

function handleError(res, err) {
    const status = (err && Number.isInteger(err.status)) ? err.status
        : (err && Number.isInteger(err.statusCode)) ? err.statusCode
            : 500;
    const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
    return res.status(status).json(payload);
}

// LISTAR RESERVAS
async function listarReservas(req, res) {
    res.json(await reservaService.listar());
}

// INSERIR RESERVAS
async function inserirReserva(req, res) {
    const reserva = req.body;
    try {
        const criado = await reservaService.inserirReserva(reserva);
        res.status(201).json(criado);
    } catch (err) {
        handleError(res, err);
    }
}

//BUSCAR RESERVA POR ID
async function buscarReservaPorId(req, res) {    
    const id = +req.params.id;
    try {
        res.json(await reservaService.buscarReservaPorId(id));
    } catch(err) {
        const status = (err && Number.isInteger(err.status)) ? err.status
            : (err && Number.isInteger(err.statusCode)) ? err.statusCode
            : 500;
        const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
        res.status(status).json(payload);
    }
}

//ATUALIZAR RESERVA
async function atualizarReserva(req, res) {
    const id = +req.params.id;
    let reserva = req.body;
    try{
        res.json(await reservaService.atualizarReserva(id, reserva));
    } catch(err) {
        const status = (err && Number.isInteger(err.status)) ? err.status
            : (err && Number.isInteger(err.statusCode)) ? err.statusCode
            : 500;
        const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
        res.status(status).json(payload);
    }
}

//DELETAR RESERVA
async function deletarReserva(req, res) {
    const id = +req.params.id;
    try {
        res.json(await reservaService.deletarReserva(id));
    } catch(err) {
        const status = (err && Number.isInteger(err.status)) ? err.status
            : (err && Number.isInteger(err.statusCode)) ? err.statusCode
            : 500;
        const payload = (err && err.message) ? { error: err.message } : err || { error: 'Internal Server Error' };
        res.status(status).json(payload);
    }
}


module.exports = {
    listarReservas,
    inserirReserva,
    buscarReservaPorId,
    atualizarReserva,
    deletarReserva
};