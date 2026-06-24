/*Este arquivo gerencia o armazenamento e a persistência direta dos dados
utilizando PostgreSQL, focado exclusivamente no CRUD de CATEGORIAS.*/

const pool = require('../database');

// LISTAR CATEGORIAS
async function listarCategorias() {
    const client = await pool.connect();
    try {
        const sql = `
        SELECT cat.id, cat.nome, cat.descricao
        FROM categorias cat
        `;

        const result = await client.query(sql);
        const listaCategorias = result.rows.map(c => ({
            id: c.id,
            nome: c.nome,
            descricao: c.descricao
        }));

        return listaCategorias;
    } finally {
        client.release();
    }
}

// INSERIR CATEGORIA
async function inserirCategoria(categoria) {
    const client = await pool.connect();
    try {
        const sql = "INSERT INTO categorias(id, nome, descricao) VALUES ($1, $2, $3) RETURNING *";
        const values = [categoria.id, categoria.nome, categoria.descricao];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// BUSCAR CATEGORIA POR ID
async function buscarCategoriaPorId(id) {
    const client = await pool.connect();
    try {
        const sql = "SELECT * FROM categorias WHERE id=$1";
        const values = [id];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// ATUALIZAR CATEGORIA
async function atualizarCategoria(id, categoria) {
    const sql = 'UPDATE categorias SET nome=$1, descricao=$2 WHERE id=$3 RETURNING *';
    const values = [categoria.nome, categoria.descricao, id];

    const client = await pool.connect();
    try {
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// DELETAR CATEGORIA
async function deletarCategoria(id) {
    const sql = 'DELETE FROM categorias WHERE id=$1 RETURNING *';
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
    listarCategorias,
    inserirCategoria,
    buscarCategoriaPorId,
    atualizarCategoria,
    deletarCategoria
}