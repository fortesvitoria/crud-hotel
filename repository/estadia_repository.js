/* Este arquivo gerencia o armazenamento e a persistência direta dos dados
utilizando PostgreSQL, focado no ciclo de vida da Estadia (Check-in, Checkout e Consumo). */

const pool = require('../database');

// REGISTRA CHECK-IN
async function registrarCheckIn(checkIn) {
    const client = await pool.connect();
    try {
        const sql = `
            INSERT INTO estadias (numero_quarto, cpf_cliente, valor_diaria, data_entrada, status, valor_total)
            VALUES ($1, $2, $3, $4, 'ativa', 0)
            RETURNING *
        `;
        const values = [checkIn.numero_quarto, checkIn.cpf_cliente, checkIn.valor_diaria, new Date()];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// LISTA ESTADIAS
async function listarEstadias() {
    const client = await pool.connect();
    try {
        const sql = 'SELECT * FROM estadias ORDER BY id ASC';
        const result = await client.query(sql);
        return result.rows;
    } finally {
        client.release();
    }
}

// BUSCA ESTADIA POR ID
async function buscarEstadiaPorId(id) {
    const client = await pool.connect();
    try {
        const sql = 'SELECT * FROM estadias WHERE id = $1';
        const result = await client.query(sql, [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// REGISTRA CHECK-OUT (Atualiza data de saida e calcula o valor total das diárias)
async function registrarCheckOut(id, valorTotalEstadia) {
    const client = await pool.connect();
    try {
        const sql = `
            UPDATE estadias 
            SET data_saida = $1, valor_total = $2, status = 'finalizada'
            WHERE id = $3
            RETURNING *
        `;
        const values = [new Date(), valorTotalEstadia, id];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

module.exports = {
    registrarCheckIn,
    listarEstadias,
    buscarEstadiaPorId,
    registrarCheckOut
};