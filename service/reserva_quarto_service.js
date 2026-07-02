/* Este arquivo centraliza a inteligência do sistema,
validando regras de negócio para RESERVAS DE QUARTOS. */

const reservaRepository = require('../repository/reserva_quarto_repository');
const clienteRepository = require('../repository/cliente_repository');

//LISTAR RESERVA

async function listar() {
    return await reservaRepository.listarReservas();
}

//INSERIR RESERVA
async function inserirReserva(reserva) {
    if (!reserva || !reserva.cpf_cliente || !reserva.numero_quarto || !reserva.qtd_pessoas || !reserva.data_entrada || !reserva.data_saida) {
        throw { status: 400, message: "Reserva sem dados corretos ou incompletos." };
    }

    // Verifica se o cliente existe
    const cliente = await clienteRepository.buscarClientePorId(reserva.cpf_cliente);
    if (!cliente) {
        throw { status: 404, message: "Cliente informado não existe." };
    }

    // Verifica se o quarto existe
    const quarto = await reservaRepository.buscarDetalhesQuarto(reserva.numero_quarto);
    if (!quarto) {
        throw { status: 404, message: "Quarto informado não existe." };
    }

    // verifica se a quantidade de pessoas não excede a capacidade do quarto
    if (reserva.qtd_pessoas > quarto.capacidade) {
        throw { status: 400, message: `Quantidade de pessoas superior à capacidade máxima do quarto (${quarto.capacidade} pessoas).` };
    }

    // verifica se a data de entrada é anterior à data de saída
    const conflito = await reservaRepository.buscarConflitoPeriodo(reserva.numero_quarto, reserva.data_entrada, reserva.data_saida);
    if (conflito) {
        throw { status: 400, message: "Este quarto já possui uma reserva ativa para o período selecionado." };
    }

    try {
        return await reservaRepository.inserirReserva(reserva);
    } catch (err) {
        if (err && err.code === '23503') {
            if (err.constraint === 'reservas_cpf_cliente_fkey') {
                throw { status: 404, message: "CPF do cliente informado não existe." };
            }
            if (err.constraint === 'reservas_numero_quarto_fkey') {
                throw { status: 404, message: "Quarto informado não existe." };
            }
        }
        throw err;
    }
}

//BUSCAR RESERVA POR ID
async function buscarReservaPorId(id) {
    let reserva = await reservaRepository.buscarReservaPorId(id);
    if(reserva) {
        return reserva;
    }
    else {
        throw { status: 404, message: "Reserva não encontrada!" };
    }
}

// ATUALIZAR RESERVA
async function atualizarReserva(id, reserva) {
    if (reserva && reserva.cpf_cliente && reserva.numero_quarto && reserva.qtd_pessoas && reserva.data_entrada && reserva.data_saida) {
        const cliente = await clienteRepository.buscarClientePorId(reserva.cpf_cliente);
        if (!cliente) {
            throw { status: 404, message: "Cliente informado não existe." };
        }

        const quarto = await reservaRepository.buscarDetalhesQuarto(reserva.numero_quarto);
        if (!quarto) {
            throw { status: 404, message: "Quarto informado não existe." };
        }

        if (reserva.qtd_pessoas > quarto.capacidade) {
            throw { status: 400, message: `Quantidade de pessoas superior à capacidade máxima do quarto (${quarto.capacidade} pessoas).` };
        }

        try {
            const reservaAtualizada = await reservaRepository.atualizarReserva(id, reserva);
            if (reservaAtualizada) {
                return reservaAtualizada;
            } else {
                throw { status: 404, message: "Reserva não encontrada" };
            }
        } catch (err) {
            if (err && err.code === '23503') {
                if (err.constraint === 'reservas_cpf_cliente_fkey') {
                    throw { status: 404, message: "CPF do cliente informado não existe." };
                }
                if (err.constraint === 'reservas_numero_quarto_fkey') {
                    throw { status: 404, message: "Quarto informado não existe." };
                }
            }
            throw err;
        }
    } else {
        throw { status: 400, message: "Reserva sem dados corretos" };
    }
}

//DELETA RESERVA
async function deletarReserva(id) {
    let reserva = await reservaRepository.deletarReserva(id);
    if(reserva) {
        return reserva;
    }
    else {
        throw { status: 404, message: "Reserva não encontrada!" };
    }
}


module.exports = {
    listar,
    inserirReserva,
    buscarReservaPorId,
    atualizarReserva,
    deletarReserva
};