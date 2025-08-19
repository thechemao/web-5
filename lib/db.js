import pkg from 'pg';
const { Pool } = pkg;

// usar Pool para manejar múltiples conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
