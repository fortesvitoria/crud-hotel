const pool = require('../database');

async function listarQuartos() {
    const client = await pool.connect();
    try {
        const sql = 'SELECT * FROM quartos ORDER BY numero ASC';
        const result = await client.query(sql);
        return result.rows;
    } finally {
        client.release();
    }
}

async function inserirQuarto(quarto) {
    const client = await pool.connect();
    try {
        const sql = "INSERT INTO quartos (numero, id_tipo, valor_diaria, status) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [quarto.numero, quarto.tipo_id, quarto.valor_diaria, quarto.status];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function buscarQuartoPorId(id) {
    const client = await pool.connect();
    try {
        const sql = 'SELECT * FROM quartos WHERE numero = $1';
        const values = [id];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function atualizarQuarto(id, quarto) {
    const sql = 'UPDATE quartos SET numero = $1, id_tipo = $2, valor_diaria = $3, status = $4 WHERE numero = $5 RETURNING *';
    const values = [quarto.numero, quarto.tipo_id, quarto.valor_diaria, quarto.status, id];
    
    const client = await pool.connect();
    try {
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function deletarQuarto(id) {
    const sql = 'DELETE FROM quartos WHERE numero = $1 RETURNING *';
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
    listarQuartos,
    inserirQuarto,
    buscarQuartoPorId,
    atualizarQuarto,
    deletarQuarto
};