
const tipoQuartoService = require('../service/tipo_quarto_service');

const criarTipoQuarto = async (req, res) => {
    try {
        
        const { nome, capacidade } = req.body;
        
        
        const novoTipo = await tipoQuartoService.criarTipoQuarto(nome, capacidade);
        
        
        return res.status(201).json(novoTipo);
        
    } catch (erro) {
        console.log("ERRO DETECTADO:", erro); // Isso vai imprimir o erro real no terminal do VS Code
        return res.status(400).json({ erro: erro.message || "Erro desconhecido" });
    }
};

const listarTiposQuarto = async (req, res) => {
    try {
        const tipos = await tipoQuartoService.listarTiposQuarto();
        return res.status(200).json(tipos);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
};

// Exporta as funções para o Router poder usar
module.exports = {
    criarTipoQuarto,
    listarTiposQuarto
};