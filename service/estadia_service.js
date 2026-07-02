/* Este arquivo centraliza a inteligência do sistema, validando regras de negócio 
para o fluxo de Check-in, Checkout e cálculo de Consumos de uma estadia. */

const estadiaRepository = require('../repository/estadia_repository');
const clienteRepository = require('../repository/cliente_repository');
const quartoRepository = require('../repository/quarto_repository');
const consumoRepository = require('../repository/consumo_repository');

// CHECK-IN
async function checkIn(dados) {
    if (dados === undefined || dados === null) {
        throw { status: 400, message: "Dados de check-in incompletos." };
    }

    const numeroQuarto = Number(dados.numero_quarto);
    const valorDiaria = Number(dados.valor_diaria);
    const cpfCliente = dados.cpf_cliente && dados.cpf_cliente.toString().trim();

    if (!cpfCliente || Number.isNaN(numeroQuarto) || !Number.isInteger(numeroQuarto) || Number.isNaN(valorDiaria) || valorDiaria <= 0) {
        throw { status: 400, message: "Dados de check-in inválidos. Use numero_quarto inteiro e valor_diaria numérico." };
    }

    const cliente = await clienteRepository.buscarClientePorId(cpfCliente);
    if (!cliente) throw { status: 404, message: "Cliente não encontrado." };

    const quarto = await quartoRepository.buscarQuartoPorId(numeroQuarto);
    if (!quarto) throw { status: 404, message: "Quarto não encontrado." };

    return await estadiaRepository.registrarCheckIn({
        numero_quarto: numeroQuarto,
        cpf_cliente: cpfCliente,
        valor_diaria: valorDiaria
    });
}

// LISTAR ESTADIAS
async function listarEstadias() {
    return await estadiaRepository.listarEstadias();
}

// BUSCAR ESTADIA POR ID
async function buscarEstadiaPorId(id) {
    const estadia = await estadiaRepository.buscarEstadiaPorId(id);
    if (!estadia) {
        throw { status: 404, message: "Estadia não encontrada." };
    }
    return estadia;
}

// CHECK-OUT (Calcula automaticamente as diarias)
async function checkOut(id) {
    const estadia = await estadiaRepository.buscarEstadiaPorId(id);
    if (!estadia) {
        throw { status: 404, message: "Estadia não encontrada." };
    }

    const dataSaida = new Date();
    const entrada = new Date(estadia.data_entrada);
    const dias = Math.ceil((dataSaida - entrada) / (1000 * 60 * 60 * 24));
    const valorDiarias = dias * Number(estadia.valor_diaria);
    const consumoTotal = await consumoRepository.calcularTotalConsumo(id);
    const totalFinal = valorDiarias + Number(consumoTotal);

    return await estadiaRepository.registrarCheckOut(id, totalFinal);
}

module.exports = {
    checkIn,
    listarEstadias,
    buscarEstadiaPorId,
    checkOut
};