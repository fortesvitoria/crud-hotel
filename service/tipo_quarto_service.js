// O Service precisa chamar o Repository para mandar salvar no banco
const tipoQuartoRepository = require('../repository/tipo_quarto_repository');

// Função para validar e RN
const criarTipoQuarto = async (nome, capacidade) => {
    

    if (!nome || !capacidade) {
        throw new Error("O nome e a capacidade do quarto são obrigatórios.");
    }

    
    if (capacidade <= 0) {
        throw new Error("A capacidade de hóspedes deve ser maior que zero.");
    }

    
    return await tipoQuartoRepository.criarTipoQuarto(nome, capacidade);
};


const listarTiposQuarto = async () => {
    return await tipoQuartoRepository.listarTiposQuarto();
};


module.exports = {
    criarTipoQuarto,
    listarTiposQuarto
};