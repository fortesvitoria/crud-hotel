/* Este arquivo configura a conexão com o banco PostgreSQL para garantir persistência dos dados */

const { Pool } = require('pg');

// Configuração da conexão com o banco local PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hotel_bd',
    password: 'senacrs', // SENHA USADA PGADMIN4
    port: 5432,
});

module.exports = pool;
