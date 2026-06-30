
// Importa o arquivo database.js 
const pool = require('../db');


// Função para criar um tipo de quarto no banco
const criarTipoQuarto = async (nome, capacidade) => {
    const query = 'INSERT INTO tipos_quarto (nome, capacidade) VALUES ($1, $2) RETURNING *';
    const values = [nome, capacidade];
    const resultado = await pool.query(query, values);
    return resultado.rows[0];
};

// Função para listar todos os tipos de quarto do banco
const listarTiposQuarto = async () => {
    const query = 'SELECT * FROM tipos_quarto';
    const resultado = await pool.query(query);
    return resultado.rows;
};

module.exports = {
    criarTipoQuarto,
    listarTiposQuarto
};