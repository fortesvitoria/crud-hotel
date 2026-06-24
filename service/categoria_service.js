/* Este arquivo centraliza a inteligência do sistema,
validando regras de negócio para CATEGORIAS. */

const categoriaRepository = require('../repository/categoria_repository');

// LISTAR CATEGORIAS
async function listarCategorias() {
    return await categoriaRepository.listarCategorias();
}

//INSERIR CATEGORIA
async function inserirCategoria(categoria) {
    //Validar se produto tem id, nome e descricao
    if(categoria && categoria.nome && categoria.id && categoria.descricao) {
        return await categoriaRepository.inserirCategoria(categoria);
    }
    else {
        //Erro
        throw { id: 400, msg: "Categoria sem dados corretos"};
    }


}

//BUSCAR CATEGORIA POR ID
async function buscarCategoriaPorId(id) {
    let categoria = await categoriaRepository.buscarCategoriaPorId(id);
    if(categoria) {
        return categoria;
    }
    else {
        throw { status: 404, message: "Categoria não encontrada!" };
    }
}

// ATUALIZAR CATEGORIA
async function atualizarCategoria(id, categoria) {
    if(categoria && categoria.nome && categoria.descricao) {
        const categoriaAtualizada = await categoriaRepository.atualizarCategoria(id, categoria);
        if(categoriaAtualizada) {
            return categoriaAtualizada;
        }
        else {
            throw { status: 404, message: "Categoria não encontrada!" };
        }
    }
    else {
        throw { status: 400, message: "Categoria sem dados corretos" };
    }
}

//DELETA CATEGORIA
async function deletarCategoria(id) {
    let categoria = await categoriaRepository.deletarCategoria(id);
    if(categoria) {
        return categoria;
    }
    else {
        throw { status: 404, message: "Categoria não encontrada!" };
    }
}

module.exports = {
    listarCategorias,
    inserirCategoria,
    buscarCategoriaPorId,
    atualizarCategoria,
    deletarCategoria
}