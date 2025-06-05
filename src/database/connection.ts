import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT,
} = process.env;

const db = knex({
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: parseInt(DB_PORT || '5432'),
  },
});

export default db