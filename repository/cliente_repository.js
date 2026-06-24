/*Este arquivo gerencia o armazenamento e a persistência direta dos dados
utilizando PostgreSQL, focado exclusivamente no CRUD de CLIENTES.*/

const pool = require('../database');

class HotelRepository {

  
  //CRUD CLIENTES
  
    // Insere um novo cliente no banco
    async saveCliente(dados) {
        const result = await pool.query(
            `INSERT INTO clientes (cpf, nome, telefone, email)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [dados.cpf, dados.nome, dados.telefone, dados.email]
        );

        return result.rows[0];
    }

    // Lista todos os clientes
    async findAllClientes() {
        const result = await pool.query('SELECT * FROM clientes');
        return result.rows;
    }

    // Busca cliente por CPF
    async findClienteByCpf(cpf) {
        const result = await pool.query(
            'SELECT * FROM clientes WHERE cpf = $1',
            [cpf]
        );

        return result.rows[0];
    }

    // Atualiza cliente
    async updateCliente(cpf, dados) {
        const result = await pool.query(
            `UPDATE clientes
             SET nome = $1, telefone = $2, email = $3
             WHERE cpf = $4
             RETURNING *`,
            [dados.nome, dados.telefone, dados.email, cpf]
        );

        return result.rows[0];
    }

    // Remove cliente
    async deleteCliente(cpf) {
        await pool.query(
            'DELETE FROM clientes WHERE cpf = $1',
            [cpf]
        );
    }
}

module.exports = new HotelRepository();