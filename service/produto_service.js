/* Este arquivo centraliza a inteligência do sistema,
validando regras de negócio para PRODUTOS. */

const produtoRepository = require('../repository/produto_repository');


async function listarProdutos() {
    return await produtoRepository.listarProdutos();
}

//INSERIR PRODUTO
async function inserirProduto(produto) {
    if (!produto || Object.keys(produto).length === 0) {
        throw { status: 400, message: 'Produto vazio' };
    }

    const errors = [];

    // nome: string não vazio
    if (!produto.nome || typeof produto.nome !== 'string' || produto.nome.trim() === '') {
        errors.push('nome');
    }

    // categoria: inteiro
    if (produto.categoria === undefined || produto.categoria === null || produto.categoria === '') {
        errors.push('categoria');
    } else {
        const cat = Number.parseInt(produto.categoria, 10);
        if (Number.isNaN(cat)) errors.push('categoria (deve ser inteiro)');
        else produto.categoria = cat;
    }

    // preco_unitario: número
    if (produto.preco_unitario === undefined || produto.preco_unitario === null || produto.preco_unitario === '') {
        errors.push('preco_unitario');
    } else {
        const preco = Number.parseFloat(produto.preco_unitario);
        if (Number.isNaN(preco)) errors.push('preco_unitario (deve ser número)');
        else produto.preco_unitario = preco;
    }

    if (errors.length > 0) {
        throw { status: 400, message: `Campos inválidos ou ausentes: ${errors.join(', ')}` };
    }

    return await produtoRepository.inserirProduto(produto);


}

//BUSCAR PRODUTO POR ID
async function buscarProdutoPorId(id) {
    let produto = await produtoRepository.buscarProdutoPorId(id);
    if(produto) {
        return produto;
    }
    else {
        throw { status: 404, message: "Produto não encontrado!" };
    }
}

// ATUALIZAR PRODUTO
async function atualizarProduto(id, produto) {
    if(produto && produto.nome && produto.categoria && produto.preco_unitario) {
        const produtoAtualizado = await produtoRepository.atualizarProduto(id, produto);
        if(produtoAtualizado) {
            return produtoAtualizado;
        }        
        else {
            throw { status: 404, message: "Produto não encontrado" };
        }
    }
    else {
        throw { status: 400, message: "Produto sem dados corretos" };
    }
}

//DELETA PRODUTO
async function deletarProduto(id) {
    let produto = await produtoRepository.deletarProduto(id);
    if(produto) {
        return produto;
    }
    else {
        throw { status: 404, message: "Produto não encontrado!" };
    }
}

module.exports = {
    listarProdutos,
    inserirProduto,
    inserirProduto,
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto
}