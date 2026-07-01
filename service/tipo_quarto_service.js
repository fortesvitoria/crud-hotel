const tipoQuartoRepository = require('../repository/tipo_quarto_repository');

async function listarTiposQuarto() {
    return await tipoQuartoRepository.listarTiposQuarto();
}

async function criarTipoQuarto(tipoQuarto) {
    if (tipoQuarto && tipoQuarto.nome && tipoQuarto.capacidade) {
        const nomesPermitidos = ['simples', 'duplo', 'suíte'];
        if (!nomesPermitidos.includes(tipoQuarto.nome.toLowerCase())) {
            throw { status: 400, message: "O nome do tipo de quarto deve ser: simples, duplo ou suíte" };
        }
        return await tipoQuartoRepository.criarTipoQuarto(tipoQuarto);
    } else {
        throw { status: 400, message: "Tipo de quarto sem dados corretos" };
    }
}

async function buscarTipoQuartoPorId(id) {
    let tipo = await tipoQuartoRepository.buscarTipoQuartoPorId(id);
    if (tipo) {
        return tipo;
    } else {
        throw { status: 404, message: "Tipo de quarto não encontrado!" };
    }
}

async function atualizarTipoQuarto(id, tipoQuarto) {
    if (tipoQuarto && tipoQuarto.nome && tipoQuarto.capacidade) {
        const nomesPermitidos = ['simples', 'duplo', 'suíte'];
        if (!nomesPermitidos.includes(tipoQuarto.nome.toLowerCase())) {
            throw { status: 400, message: "O nome do tipo de quarto deve ser: simples, duplo ou suíte" };
        }
        const tipoAtualizado = await tipoQuartoRepository.atualizarTipoQuarto(id, tipoQuarto);
        if (tipoAtualizado) {
            return tipoAtualizado;
        } else {
            throw { status: 404, message: "Tipo de quarto não encontrado!" };
        }
    } else {
        throw { status: 400, message: "Tipo de quarto sem dados corretos" };
    }
}

async function deletarTipoQuarto(id) {
    let tipo = await tipoQuartoRepository.deletarTipoQuarto(id);
    if (tipo) {
        return tipo;
    } else {
        throw { status: 404, message: "Tipo de quarto não encontrado!" };
    }
}

module.exports = {
    listarTiposQuarto,
    criarTipoQuarto,
    buscarTipoQuartoPorId,
    atualizarTipoQuarto,
    deletarTipoQuarto
};