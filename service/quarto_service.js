/* Este arquivo centraliza a inteligência do sistema,
validando regras de negócio para QUARTOS. */

const quartoRepository = require('../repository/quarto_repository');

// LISTAR QUARTOS
async function listar() {
    return await quartoRepository.listarQuartos();
}

// INSERIR QUARTO
async function inserirQuarto(quarto) {
    if (quarto && quarto.numero && quarto.tipo_id && quarto.valor_diaria && quarto.status) {
        const statusPermitidos = ['disponível', 'reservado', 'ocupado'];
        if (!statusPermitidos.includes(quarto.status.toLowerCase())) {
            throw { status: 400, message: "O status deve ser: disponível, reservado ou ocupado" };
        }
        return await quartoRepository.inserirQuarto(quarto);
    } else {
        throw { status: 400, message: "Quarto sem dados corretos" };
    }
}

// BUSCAR QUARTO POR ID
async function buscarQuartoPorId(id) {
    let quarto = await quartoRepository.buscarQuartoPorId(id);
    if (quarto) {
        return quarto;
    } else {
        throw { status: 404, message: "Quarto não encontrado!" };
    }
}

// ATUALIZAR QUARTO
async function atualizarQuarto(id, quarto) {
    if (quarto && quarto.numero && quarto.tipo_id && quarto.valor_diaria && quarto.status) {
        const statusPermitidos = ['disponível', 'reservado', 'ocupado'];
        if (!statusPermitidos.includes(quarto.status.toLowerCase())) {
            throw { status: 400, message: "O status deve ser: disponível, reservado ou ocupado" };
        }
        const quartoAtualizado = await quartoRepository.atualizarQuarto(id, quarto);
        if (quartoAtualizado) {
            return quartoAtualizado;
        } else {
            throw { status: 404, message: "Quarto não encontrado!" };
        }
    } else {
        throw { status: 400, message: "Quarto sem dados corretos" };
    }
}

// DELETAR QUARTO
async function deletarQuarto(id) {
    let quarto = await quartoRepository.deletarQuarto(id);
    if (quarto) {
        return quarto;
    } else {
        throw { status: 404, message: "Quarto não encontrado!" };
    }
}

module.exports = {
    listar,
    inserirQuarto,
    buscarQuartoPorId,
    atualizarQuarto,
    deletarQuarto
};