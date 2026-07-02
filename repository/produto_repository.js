/*Este arquivo gerencia o armazenamento e a persistência direta dos dados
utilizando PostgreSQL, focado exclusivamente no CRUD de PRODUTOS.*/

const pool = require('../database');

// LISTAR PRODUTOS 
async function listarProdutos() {
    const client = await pool.connect();
    try {
        const sql = `
        SELECT prod.id, prod.nome, prod.preco_unitario,
        cat.id as cat_id, cat.nome as cat_nome, cat.descricao as cat_descricao
        FROM produtos prod 
        INNER JOIN categorias cat
        ON prod.categoria = cat.id
        ORDER BY prod.id
        `;

        const result = await client.query(sql);
        
        //transforma os dados do banco em um objeto json
        const listaProdutos = result.rows.map(p => ({
            id: p.id,
            nome: p.nome,
            preco_unitario: p.preco_unitario,
            categoria: {
                id: p.cat_id,
                nome: p.cat_nome,
                descricao: p.cat_descricao
            }
        }));

        return listaProdutos;
    } finally {
        client.release();
    }
}


// INSERIR PRODUTO
async function inserirProduto(produto) {
    const client = await pool.connect();
    try {
        const sql = "INSERT INTO produtos(nome, categoria, preco_unitario) VALUES ($1, $2, $3) RETURNING *";
        const values = [produto.nome, produto.categoria, produto.preco_unitario];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// BUSCAR PRODUTO POR ID
async function buscarProdutoPorId(id) {
    const client = await pool.connect();
    const sql = `
        SELECT prod.id, prod.nome, prod.preco_unitario, 
        cat.id as cat_id, cat.nome as cat_nome, cat.descricao as cat_descricao
        FROM produtos prod
        INNER JOIN categorias cat 
        ON prod.categoria=cat.id WHERE prod.id=$1`;
    const values = [id];
    const result = await client.query(sql, values);
    const produtoEncontrado = result.rows[0];
    client.release();

    if(produtoEncontrado) {
        return {
            id: produtoEncontrado.id,
            nome: produtoEncontrado.nome,
            preco: produtoEncontrado.preco,
            categoria: {
                id: produtoEncontrado.cat_id,
                nome: produtoEncontrado.cat_nome
            }
        }
    }
    return (undefined);
}

//ATUALIZAR PRODUTO
async function atualizarProduto(id, produto) {
    const sql = 'UPDATE produtos set nome=$1, categoria=$2, preco_unitario=$3 WHERE id=$4 RETURNING *'
    const values = [produto.nome, produto.categoria, produto.preco_unitario, id];

    const client = await pool.connect();
    try {
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// DELETAR PRODUTO
async function deletarProduto(id) {
    const sql = 'DELETE FROM produtos WHERE id=$1 RETURNING *'
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
    listarProdutos,
    inserirProduto,
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto
}


