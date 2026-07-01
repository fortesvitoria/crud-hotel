/* Este arquivo gerencia o armazenamento e a persistência direta dos dados
utilizando PostgreSQL, focado exclusivamente no CRUD de TIPOS DE QUARTO. */

const pool = require('../database'); 

// LISTAR TIPOS DE QUARTO
async function listarTiposQuarto() {
    const client = await pool.connect();
    try {
        const sql = `
        SELECT tq.id, tq.nome, tq.capacidade
        FROM tipos_quarto tq
        `;

        const result = await client.query(sql);
        const listaTipos = result.rows.map(t => ({
            id: t.id,
            nome: t.nome,
            capacidade: t.capacidade
        }));

        return listaTipos;
    } finally {
        client.release();
    }
}

// INSERIR TIPO DE QUARTO
async function criarTipoQuarto(tipoQuarto) {
    const client = await pool.connect();
    try {
        const sql = "INSERT INTO tipos_quarto(nome, capacidade) VALUES ($1, $2) RETURNING *";
        const values = [tipoQuarto.nome, tipoQuarto.capacidade];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// BUSCAR TIPO DE QUARTO POR ID
async function buscarTipoQuartoPorId(id) {
    const client = await pool.connect();
    try {
        const sql = "SELECT * FROM tipos_quarto WHERE id=$1";
        const values = [id];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// ATUALIZAR TIPO DE QUARTO
async function atualizarTipoQuarto(id, tipoQuarto) {
    const sql = 'UPDATE tipos_quarto SET nome=$1, capacidade=$2 WHERE id=$3 RETURNING *';
    const values = [tipoQuarto.nome, tipoQuarto.capacidade, id];

    const client = await pool.connect();
    try {
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// DELETAR TIPO DE QUARTO
async function deletarTipoQuarto(id) {
    const sql = 'DELETE FROM tipos_quarto WHERE id=$1 RETURNING *';
    const values = [id];

    const client = await pool.connect();
    try {
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

module.exports = {
    listarTiposQuarto,
    criarTipoQuarto,
    buscarTipoQuartoPorId,
    atualizarTipoQuarto,
    deletarTipoQuarto
};