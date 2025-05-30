import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = process.env.NODE_ENV === 'test' ? {
  query: async () => ({ rows: [] }) // Mocked query method for testing
} : new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

if (process.env.NODE_ENV !== 'test') {
  const initializeSchema = async () => {
    const usersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        deleted_at TIMESTAMP DEFAULT NULL
      );
    `;

    const tasksTable = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        assigned_to INT REFERENCES users(id),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await pool.query(usersTable);
      await pool.query(tasksTable);
      console.log('Database schema initialized');
    } catch (error) {
      console.error('Error initializing database schema:', error.message);
    }
  };

  initializeSchema();
}

export default pool;
