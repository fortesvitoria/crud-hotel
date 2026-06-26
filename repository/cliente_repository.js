/*Este arquivo gerencia o armazenamento e a persistência direta dos dados
utilizando PostgreSQL, focado exclusivamente no CRUD de CLIENTES.*/

const pool = require('../database');

// LISTAR CLIENTES
async function listarClientes() {
    const client = await pool.connect();
    try {
        const sql = `
            SELECT cpf, nome, telefone, email
            FROM clientes
            ORDER BY nome
        `;

        const result = await client.query(sql);
        return result.rows;
    } finally {
        client.release();
    }
}

// INSERIR CLIENTE
 
async function inserirCliente(cliente) {
    const client = await pool.connect();
    try {
        const sql = `
            INSERT INTO clientes (cpf, nome, telefone, email)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const values = [
            cliente.cpf,
            cliente.nome,
            cliente.telefone,
            cliente.email
        ];

        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// BUSCAR CLIENTE POR CPF
async function buscarClientePorId(cpf) {
    const client = await pool.connect();
    try {
        const sql = `
            SELECT cpf, nome, telefone, email
            FROM clientes
            WHERE cpf = $1
        `;

        const result = await client.query(sql, [cpf]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// ATUALIZAR CLIENTE
async function atualizarCliente(cpf, cliente) {
    const client = await pool.connect();
    try {
        const sql = `
            UPDATE clientes
            SET nome = $1,
                telefone = $2,
                email = $3
            WHERE cpf = $4
            RETURNING *
        `;

        const values = [
            cliente.nome,
            cliente.telefone,
            cliente.email,
            cpf
        ];

        const result = await client.query(sql, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// DELETAR CLIENTE
async function deletarCliente(cpf) {
    const client = await pool.connect();
    try {
        const sql = `
            DELETE FROM clientes
            WHERE cpf = $1
            RETURNING *
        `;

        const result = await client.query(sql, [cpf]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

module.exports = {
    listarClientes,
    inserirCliente,
    buscarClientePorId,
    atualizarCliente,
    deletarCliente
};