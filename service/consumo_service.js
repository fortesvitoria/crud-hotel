const consumoRepository = require('../repository/consumo_repository');

async function listarConsumos() {
    return await consumoRepository.listarConsumos();
}

async function buscarConsumoPorId(id) {
    const consumo = await consumoRepository.buscarConsumoPorId(id);
    if (!consumo) {
        throw { status: 404, message: 'Consumo não encontrado.' };
    }
    return consumo;
}

async function inserirConsumo(consumo) {
    if (!consumo || !consumo.id_estadia || !consumo.id_produto || !consumo.quantidade) {
        throw { status: 400, message: 'Dados de consumo incompletos.' };
    }
    return await consumoRepository.registrarConsumo(consumo.id_estadia, consumo.id_produto, consumo.quantidade);
}

async function atualizarConsumo(id, consumo) {
    if (!consumo || !consumo.id_estadia || !consumo.id_produto || !consumo.quantidade) {
        throw { status: 400, message: 'Dados de consumo incompletos.' };
    }
    const atualizado = await consumoRepository.atualizarConsumo(id, consumo);
    if (!atualizado) {
        throw { status: 404, message: 'Consumo não encontrado.' };
    }
    return atualizado;
}

async function deletarConsumo(id) {
    const removido = await consumoRepository.deletarConsumo(id);
    if (!removido) {
        throw { status: 404, message: 'Consumo não encontrado.' };
    }
    return removido;
}

async function calcularTotalEstadia(id) {
    return await consumoRepository.calcularTotalConsumo(id);
}

module.exports = {
    listarConsumos,
    buscarConsumoPorId,
    inserirConsumo,
    atualizarConsumo,
    deletarConsumo,
    calcularTotalEstadia
};