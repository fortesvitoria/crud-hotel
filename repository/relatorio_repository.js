//relatório 1

const pool = require('../database');

async function listarEstadiasPorCliente(cpf, mes, ano) {
    const client = await pool.connect();

    try {
        let sql = `
            SELECT
                e.id,
                e.numero_quarto,
                e.cpf_cliente,
                c.nome AS cliente_nome,
		c.email,
		c.telefone,
                e.valor_diaria,
                e.data_entrada,
                e.data_saida,
                e.status,
                e.valor_total
            FROM estadias e
            INNER JOIN clientes c
                ON c.cpf = e.cpf_cliente
            WHERE 1=1
        `;

        const params = [];
        let indice = 1;

        if (cpf) {
            sql += ` AND e.cpf_cliente = $${indice++}`;
            params.push(cpf);
        }

        if (mes) {
            sql += ` AND EXTRACT(MONTH FROM e.data_entrada) = $${indice++}`;
            params.push(mes);
        }

        if (ano) {
            sql += ` AND EXTRACT(YEAR FROM e.data_entrada) = $${indice++}`;
            params.push(ano);
        }

        sql += ` ORDER BY e.data_entrada DESC`;

        const result = await client.query(sql, params);

        return result.rows;
    }
    finally {
        client.release();
    }
}


//relatório 2 > por número = código de estadia

async function listarConsumoPorEstadia(idEstadia) {

    const client = await pool.connect();

    try {
        const sql = `
		SELECT
    			e.id AS estadia_id,
  			e.numero_quarto,
 			e.cpf_cliente,
		       cli.nome AS cliente_nome,

		       p.id AS produto_id,
                       p.nome AS produto_nome,
                       p.preco_unitario,

		       c.quantidade,

		      (c.quantidade * p.preco_unitario) AS subtotal

		FROM consumos c

		INNER JOIN produtos p
		    ON p.id = c.id_produto

		INNER JOIN estadias e
		    ON e.id = c.id_estadia

		INNER JOIN clientes cli
		    ON cli.cpf = e.cpf_cliente

		WHERE e.id = $1

		ORDER BY p.nome;
	`;

        const result = await client.query(
            sql,
            [idEstadia]
        );

        const valorTotal = result.rows.reduce(
            (total, item) =>
                total + Number(item.subtotal),
            0
        );

        return {
            estadia_id: idEstadia,
            produtos: result.rows,
            valor_total: valorTotal
        };
    }
        
    finally {
        client.release();
    }
}

module.exports = {
    listarEstadiasPorCliente,
    listarConsumoPorEstadia
};