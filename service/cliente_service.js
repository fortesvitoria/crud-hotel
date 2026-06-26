/*
Este arquivo centraliza a inteligência do sistema,
validando regras de negócio para CLIENTES antes de acessar o repository.
*/

const clienteRepository = require('../repository/cliente_repository');

//  LISTAR CLIENTES
async function listarClientes() {
    return await clienteRepository.listarClientes();
}

// INSERIR CLIENTE (COM VALIDAÇÕES COMPLETAS)
async function inserirCliente(dados) {

    // CAMPOS OBRIGATÓRIOS
    if (!dados.nome) throw { status: 400, message: "Nome é obrigatório." };
    if (!dados.cpf) throw { status: 400, message: "CPF é obrigatório." };
    if (!dados.telefone) throw { status: 400, message: "Telefone é obrigatório." };
    if (!dados.email) throw { status: 400, message: "Email é obrigatório." };

    // Remove espaços e formatação
    const nome = dados.nome.trim();
    const cpf = dados.cpf.replace(/\D/g, '');
    const telefone = dados.telefone;
    const email = dados.email;

    // VALIDAÇÕES INTERMEDIÁRIAS

    // Nome mínimo
    if (nome.length < 3) {
        throw { status: 400, message: "Nome deve ter pelo menos 3 caracteres." };
    }

    // CPF com 11 dígitos numéricos
    if (!/^\d{11}$/.test(cpf)) {
        throw { status: 400, message: "CPF deve conter 11 dígitos numéricos." };
    }

    // Telefone válido
    /*
    Validação com regex (/^\d{10,11}$/):
    - aceita apenas números
    - exige entre 10 e 11 dígitos (com DDD) - padrão brasileiro
    */
    if (!/^\d{10,11}$/.test(telefone)) {
        throw { status: 400, message: "Telefone inválido." };
    }

    // Email válido
    /*
    Validação com regex (/^\S+@\S+\.\S+$/):
    - exige texto antes do "@"
    - exige domínio depois do "@"
    - exige sufixo (.com, .br, etc.)
    */
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        throw { status: 400, message: "Email inválido." };
    }

    // CPF DUPLICADO
    const existente = await clienteRepository.buscarClientePorId(cpf);
    if (existente) {
        throw { status: 400, message: "Cliente já cadastrado." };
    }

    // SALVAR
    return await clienteRepository.inserirCliente({
        nome,
        cpf,
        telefone,
        email
    });
}

// BUSCAR CLIENTE POR CPF
async function buscarClientePorId(cpf) {

    const cliente = await clienteRepository.buscarClientePorId(cpf);

    if (!cliente) {
        throw { status: 404, message: "Cliente não encontrado." };
    }

    return cliente;
}

// ATUALIZAR CLIENTE (COM VALIDAÇÕES)

async function atualizarCliente(cpf, dados) {

    // 🔹 Busca cliente atual
    const cliente = await clienteRepository.buscarClientePorId(cpf);
    if (!cliente) {
        throw { status: 404, message: "Cliente não encontrado." };
    }

    // 🔹 Impede alteração de CPF
    if (dados.cpf) {
        throw { status: 400, message: "CPF não pode ser alterado." };
    }

    // Mantém valores antigos se não enviados
    const nome = dados.nome ?? cliente.nome;
    const telefone = dados.telefone ?? cliente.telefone;
    const email = dados.email ?? cliente.email;

    // VALIDAÇÃO CONDICIONAL DE NOME > para permitir a atualização parcial sem perder integridade
    /*
    - Se NÃO enviar nome → mantém o valor antigo
    - Se enviar nome → obrigatoriamente deve ser válido
    */
    if (dados.nome !== undefined) {
        if (!nome || nome.trim().length < 3) {
            throw { status: 400, message: "Nome é obrigatório e deve ter pelo menos 3 caracteres." };
        }
    }

    // VALIDAÇÃO DE TELEFONE
    /*
    A validação do telefone utiliza regex (/^\d{10,11}$/),
    garantindo apenas números e tamanho válido (10 ou 11 dígitos).
    */
    if (dados.telefone !== undefined) {
        if (!/^\d{10,11}$/.test(telefone)) {
            throw { status: 400, message: "Telefone inválido." };
        }
    }

    // VALIDAÇÃO DE EMAIL
    /*
    A validação do email utiliza regex (/^\S+@\S+\.\S+$/),
    garantindo estrutura mínima de email válida.
    */
    if (dados.email !== undefined) {
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            throw { status: 400, message: "Email inválido." };
        }
    }

    // EXECUTA UPDATE
    return await clienteRepository.atualizarCliente(cpf, {
        nome,
        telefone,
        email
    });
}

// DELETAR CLIENTE

async function deletarCliente(cpf) {

    const cliente = await clienteRepository.buscarClientePorId(cpf);

    if (!cliente) {
        throw { status: 404, message: "Cliente não encontrado." };
    }

    const deletado = await clienteRepository.deletarCliente(cpf);

    return deletado;
}

module.exports = {
    listarClientes,
    inserirCliente,
    buscarClientePorId,
    atualizarCliente,
    deletarCliente
};