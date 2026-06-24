/* Este arquivo centraliza a inteligência do sistema,
validando regras de negócio para CLIENTES. */

const hotelRepository = require('../repository/cliente_repository');

class HotelService {

    // =========================
    // ✅ CRUD CLIENTES
    // =========================

    // Criação com validações
// =========================
// ✅ CREATE CLIENTE (COM VALIDAÇÕES)
// =========================

async createCliente(dados) {

    // =========================
    // 🔹 CAMPOS OBRIGATÓRIOS
    // =========================
    if (!dados.nome) throw new Error("Nome é obrigatório.");
    if (!dados.cpf) throw new Error("CPF é obrigatório.");
    if (!dados.telefone) throw new Error("Telefone é obrigatório.");
    if (!dados.email) throw new Error("Email é obrigatório.");

    // Remove espaços e formatação
    const nome = dados.nome.trim();
    const cpf = dados.cpf.replace(/\D/g, '');
    const telefone = dados.telefone;
    const email = dados.email;

    // =========================
    // 🔹 VALIDAÇÕES INTERMEDIÁRIAS
    // =========================

    // Nome mínimo
    if (nome.length < 3) {
        throw new Error("Nome deve ter pelo menos 3 caracteres.");
    }

    // CPF com 11 dígitos
    if (!/^\d{11}$/.test(cpf)) {
        throw new Error("CPF deve conter 11 dígitos numéricos.");
    }

    // Telefone válido
    if (!/^\d{10,11}$/.test(telefone)) {
        throw new Error("Telefone inválido.");
    }

    // Email válido
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error("Email inválido.");
    }

    // =========================
    // 🔹 CPF DUPLICADO
    // =========================
    const existente = await hotelRepository.findClienteByCpf(cpf);
    if (existente) {
        throw new Error("Cliente já cadastrado.");
    }

    // =========================
    // 🔹 SALVAR
    // =========================
    return await hotelRepository.saveCliente({
        nome,
        cpf,
        telefone,
        email
    });
}

    // Listagem
    async getClientes() {
        return await hotelRepository.findAllClientes();
    }

    // Atualização
    
async updateCliente(cpf, dados) {

    // 🔹 Busca cliente atual
    const cliente = await hotelRepository.findClienteByCpf(cpf);
    if (!cliente) {
        throw new Error("Cliente não encontrado.");
    }

    // 🔹 Impede alteração de CPF (boa prática)
    if (dados.cpf) {
        throw new Error("CPF não pode ser alterado.");
    }

    // 🔹 Mantém valores antigos se não enviados
    const nome = dados.nome ?? cliente.nome;
    const telefone = dados.telefone ?? cliente.telefone;
    const email = dados.email ?? cliente.email;

    // 🔹 Validação de email
    if (email && !email.includes('@')) {
        throw new Error("Email inválido.");
    }

    // 🔹 Executa update com valores completos
    return await hotelRepository.updateCliente(cpf, {
        nome,
        telefone,
        email
    });
}

    // Remoção
    async deleteCliente(cpf) {

        const cliente = await hotelRepository.findClienteByCpf(cpf);
        if (!cliente) {
            throw new Error("Cliente não encontrado.");
        }

        await hotelRepository.deleteCliente(cpf);

        return { msg: "Cliente removido com sucesso." };
    }
}

module.exports = new HotelService();
