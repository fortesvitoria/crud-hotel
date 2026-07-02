/*Este arquivo gerencia o armazenamento e a persistência direta dos dados
utilizando PostgreSQL, focado no CRUD de consumos.*/

const pool = require('../database');

async function listarConsumos() {
    const client = await pool.connect();
    try {
        const sql = 'SELECT * FROM consumos ORDER BY id ASC';
        const result = await client.query(sql);
        return result.rows;
    } finally {
        client.release();
    }
}

async function buscarConsumoPorId(id) {
    const client = await pool.connect();
    try {
        const sql = 'SELECT * FROM consumos WHERE id = $1';
        const result = await client.query(sql, [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function registrarConsumo(estadiaId, produtoId, quantidade) {
    const client = await pool.connect();
    try {
        const sql = `
            INSERT INTO consumos (id_estadia, id_produto, quantidade)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

        const values = [estadiaId, produtoId, quantidade];
        const result = await client.query(sql, values);

        return result.rows[0];
    } finally {
        client.release();
    }
}

async function atualizarConsumo(id, consumo) {
    const client = await pool.connect();
    try {
        const sql = `
            UPDATE consumos
            SET id_estadia = $1, id_produto = $2, quantidade = $3
            WHERE id = $4
            RETURNING *
        `;
        const values = [consumo.id_estadia, consumo.id_produto, consumo.quantidade, id];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function deletarConsumo(id) {
    const client = await pool.connect();
    try {
        const sql = 'DELETE FROM consumos WHERE id = $1 RETURNING *';
        const result = await client.query(sql, [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function calcularTotalConsumo(estadiaId) {
    const client = await pool.connect();
    try {
        const sql = `
            SELECT SUM(c.quantidade * p.preco_unitario) AS consumo_total
            FROM consumos c
            INNER JOIN produtos p ON p.id = c.id_produto
            WHERE c.id_estadia = $1
        `;

        const result = await client.query(sql, [estadiaId]);
        return result.rows[0].consumo_total || 0;
    } finally {
        client.release();
    }
}

module.exports = {
    listarConsumos,
    buscarConsumoPorId,
    registrarConsumo,
    atualizarConsumo,
    deletarConsumo,
    calcularTotalConsumo
};