/*Este arquivo gerencia o armazenamento e a persistência direta dos dados
utilizando PostgreSQL, focado exclusivamente no CRUD de PRODUTOS.*/

const pool = require('../database');

// LISTAR PRODUTOS 
async function listarProdutos() {
    //conectar
    const cliente = await database.connect();

    //executar query do banco com join para trazer a categoria do produto
    const sql = `
    SELECT prod.id, prod.nome, prod.preco_unitario,
    cat.id as cat_id, cat.nome as cat_nome, cat.descricao as cat_descricao
    FROM produtos prod 
    INNER JOIN categorias cat
    ON prod.categoria = cat.id
    ORDER BY id
    `;

    const result = await cliente.query(sql);
    const listaProdutos = result.rows.map(produto => {
        return {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            categoria: {
                id: produto.cat_id,
                nome: produto.cat_nome,
                descricao: produto.cat_descricao   
            }
        }
    });
    

    //liberar a conexao
    await cliente.release();
    //retornar a lista de produtos
    return listaProdutos;
}


// INSERIR PRODUTO
async function inserirProduto(produto) {
    //conectar
    const cliente = await database.connect();
    //executar query
    const sql = "INSERT INTO produtos(nome, categoria, preco_unitario) VALUES ($1, $2, $3) RETURNING *";
    const values = [produto.nome, produto.categoria, produto.preco_unitario];
    const result = await cliente.query(sql, values);
    const produtoInserido = result.rows[0];
    //liberar a conexao
    await cliente.release();

    return produtoInserido;
}

// BUSCAR PRODUTO POR ID
async function buscarProdutoPorId(id) {
    const cliente = await database.connect();
    const sql = `
        SELECT prod.id, prod.nome, prod.preco_unitario, 
        cat.id as cat_id, cat.nome as cat_nome, cat.descricao as cat_descricao
        FROM produtos prod
        INNER JOIN categorias cat 
        ON prod.categoria=cat.id WHERE prod.id=$1`;
    const values = [id];
    const result = await cliente.query(sql, values);
    const produtoEncontrado = result.rows[0];
    cliente.release();

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

    const cliente = await bd.connect();
    const result = await cliente.query(sql, values);
    const produtoAtualizado = result.rows[0];
    cliente.release();
    return (produtoAtualizado);
}

// DELETAR PRODUTO
async function deletarProduto(id) {
    const sql = 'DELETE FROM produtos WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = await bd.connect();

    const result = await cliente.query(sql, values);

    await cliente.release();

    const produtoDeletado = result.rows[0];
    return (produtoDeletado);
}

module.exports = {
    listarProdutos,
    inserirProduto,
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto
}


