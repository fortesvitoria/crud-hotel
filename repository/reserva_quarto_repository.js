/*Este arquivo gerencia o armazenamento e a persistência direta dos dados
utilizando PostgreSQL, focado exclusivamente no CRUD de RESERVAS DE QUARTOS.*/

const pool = require('../database');

async function listarReservas() {
    const client = await pool.connect();
    try {
        const sql = `
            SELECT r.id, r.qtd_pessoas, r.data_entrada, r.data_saida, r.data_criacao,
                   c.cpf as cliente_cpf, c.nome as cliente_nome,
                   q.numero as quarto_numero, q.valor_diaria
            FROM reservas r
            INNER JOIN clientes c ON r.cpf_cliente = c.cpf
            INNER JOIN quartos q ON r.numero_quarto = q.numero
            ORDER BY r.data_entrada
        `;
        const result = await client.query(sql);

        //transforma os dados do banco em um objeto json
        const listaReservas = result.rows.map(p => ({
            id: p.id,
            qtd_pessoas: p.qtd_pessoas,
            data_entrada: p.data_entrada,
            data_saida: p.data_saida,
            data_criacao: p.data_criacao,
            cliente: {
                cpf: p.cliente_cpf,
                nome: p.cliente_nome
            },
            quarto: {
                numero: p.quarto_numero,
                valor_diaria: p.valor_diaria
            }
        }));

        return listaReservas;
    } finally {
        client.release();
    }
}

async function inserirReserva(reserva) {
    const client = await pool.connect();
    try {
        const sql = `
            INSERT INTO reservas (cpf_cliente, numero_quarto, qtd_pessoas, data_entrada, data_saida)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [
            reserva.cpf_cliente,
            reserva.numero_quarto,
            reserva.qtd_pessoas,
            reserva.data_entrada,
            reserva.data_saida
        ];
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// BUSCAR RESERVA POR ID
async function buscarReservaPorId(id) {
    const client = await pool.connect();
    const sql = `
        SELECT r.id, r.qtd_pessoas, r.data_entrada, r.data_saida, r.data_criacao, c.cpf as cliente_cpf, c.nome as cliente_nome, q.numero as quarto_numero, q.valor_diaria
        FROM reservas r
        INNER JOIN clientes c ON r.cpf_cliente = c.cpf
        INNER JOIN quartos q ON r.numero_quarto = q.numero
        WHERE r.id = $1
    `;
    const values = [id];
    const result = await client.query(sql, values);
    const reservaEncontrada = result.rows[0];
    client.release();

    if (reservaEncontrada) {
        return {
            id: reservaEncontrada.id,
            qtd_pessoas: reservaEncontrada.qtd_pessoas,
            data_entrada: reservaEncontrada.data_entrada,
            data_saida: reservaEncontrada.data_saida,
            data_criacao: reservaEncontrada.data_criacao,
            cliente: {
                cpf: reservaEncontrada.cliente_cpf,
                nome: reservaEncontrada.cliente_nome
            },
            quarto: {
                numero: reservaEncontrada.quarto_numero,
                valor_diaria: reservaEncontrada.valor_diaria
            }
        };
    }
    return undefined;
}


//ATUALIZAR RESERVA
async function atualizarReserva(id, reserva) {
    const sql = 'UPDATE reservas set cpf_cliente=$1, numero_quarto=$2, qtd_pessoas=$3, data_entrada=$4, data_saida=$5 WHERE id=$6 RETURNING *'
    const values = [reserva.cpf_cliente, reserva.numero_quarto, reserva.qtd_pessoas, reserva.data_entrada, reserva.data_saida, id];

    const client = await pool.connect();
    try {
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// DELETAR RESERVA
async function deletarReserva(id) {
    const sql = 'DELETE FROM reservas WHERE id=$1 RETURNING *'
    const values = [id];

    const client = await pool.connect();
    try {
        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// Busca conflitos de reservas na mesma data para o mesmo quarto
async function buscarConflitoPeriodo(numeroQuarto, dataEntrada, dataSaida) {
    const client = await pool.connect();
    try {
        const sql = `
            SELECT * FROM reservas 
            WHERE numero_quarto = $1 
              AND (
                -- A nova data de entrada cai dentro de uma reserva já existente
                (data_entrada <= $2 AND data_saida >= $2) OR
                
                -- A nova data de saída cai dentro de uma reserva já existente
                (data_entrada <= $3 AND data_saida >= $3) OR
                
                -- O novo período começa antes e termina depois de uma reserva já existente
                (data_entrada >= $2 AND data_saida <= $3)
              )
            LIMIT 1
        `;
        const result = await client.query(sql, [numeroQuarto, dataEntrada, dataSaida]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// Busca os detalhes do quarto e capacidade
async function buscarDetalhesQuarto(numeroQuarto) {
    const client = await pool.connect();
    try {
        const sql = `
            SELECT q.numero, q.status, tq.capacidade 
            FROM quartos q
            INNER JOIN tipos_quarto tq ON q.id_tipo = tq.id
            WHERE q.numero = $1
        `;
        const result = await client.query(sql, [numeroQuarto]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

module.exports = {
    listarReservas,
    inserirReserva,
    buscarReservaPorId,
    atualizarReserva,
    deletarReserva,
    buscarConflitoPeriodo,
    buscarDetalhesQuarto
};