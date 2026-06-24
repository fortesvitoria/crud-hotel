/* Este arquivo centraliza a inteligência do sistema,
validando regras de negócio para PRODUTOS. */

const produtoRepository = require('../repository/produto_repository');


async function listar() {
    return await produtoRepository.listarProdutos();
}

//INSERIR PRODUTO
async function inserirProduto(produto) {
    //Validar se produto tem nomen categoria e preço
    if(produto && produto.nome && produto.categoria && produto.preco_unitario) {
        return await produtoRepository.inserirProduto(produto);
    }
    else {
        //Erro
        throw { id: 400, msg: "Produto sem dados corretos"};
    }


}

//BUSCAR PRODUTO POR ID
async function buscarProdutoPorId(id) {
    let produto = await produtoRepository.buscarProdutoPorId(id);
    if(produto) {
        return produto;
    }
    else {
        throw { id: 404, msg: "Produto não encontrado!"};
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
            throw {id:404, msg: "Produto não encontrado"};
        }
    }
    else {
        throw {id:400, msg: "Produto sem dados corretos"};
    }
}

//DELETA PRODUTO
async function deletarProduto(id) {
    let produto = await produtoRepository.deletarProduto(id);
    if(produto) {
        return produto;
    }
    else {
        throw { id: 404, msg: "Produto não encontrado!" }
    }
}

module.exports = {
    listar,
    inserirProduto,
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto
}