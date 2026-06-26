/*O controller é responsável por receber a requisição, processar os dados recebidos e retornar a resposta ao cliente,
delegando a lógica de negócio ao service.*/

const clienteService = require('../service/cliente_service');

/*
Função auxiliar responsável por padronizar o tratamento de erros, retornando o status HTTP apropriado e mensagem padronizada.
*/
function handleError(res, err) {
    const status = (err && Number.isInteger(err.status)) ? err.status
        : (err && Number.isInteger(err.statusCode)) ? err.statusCode
        : 500;

    const payload = (err && err.message)
        ? { error: err.message }
        : err || { error: 'Internal Server Error' };

    return res.status(status).json(payload);
}

// LISTAR CLIENTES
async function listarClientes(req, res) {
    try {
        const lista = await clienteService.listarClientes();
        res.json(lista);
    } catch (err) {
        handleError(res, err);
    }
}

// INSERIR CLIENTE
async function inserirCliente(req, res) {
    const cliente = req.body;

    try {
        const criado = await clienteService.inserirCliente(cliente);
        res.status(201).json(criado);
    } catch (err) {
        handleError(res, err);
    }
}

// BUSCAR CLIENTE POR CPF
async function buscarClientePorId(req, res) {
    const cpf = req.params.cpf;

    try {
        const cliente = await clienteService.buscarClientePorId(cpf);
        res.json(cliente);
    } catch (err) {
        handleError(res, err);
    }
}

// ATUALIZAR CLIENTE
async function atualizarCliente(req, res) {
    const cpf = req.params.cpf;
    const cliente = req.body;

    try {
        const atualizado = await clienteService.atualizarCliente(cpf, cliente);
        res.json(atualizado);
    } catch (err) {
        handleError(res, err);
    }
}

// DELETAR CLIENTE
async function deletarCliente(req, res) {
    const cpf = req.params.cpf;

    try {
        const deletado = await clienteService.deletarCliente(cpf);
        res.json(deletado);
    } catch (err) {
        handleError(res, err);
    }
}

module.exports = {
    listarClientes,
    inserirCliente,
    buscarClientePorId,
    atualizarCliente,
    deletarCliente
};