const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id UUID PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
}

/**
 * Cuenta permanente: no hay verificación de código, no hay trial, no hay
 * suscripción que pueda expirar. Introducir el email crea (o recupera) la
 * cuenta y su link MCP se puede usar indefinidamente.
 */
async function findOrCreateAccount(email) {
  const existing = await pool.query("SELECT id, email FROM accounts WHERE email = $1", [email]);
  if (existing.rows.length > 0) return existing.rows[0];

  const id = uuidv4();
  await pool.query("INSERT INTO accounts (id, email) VALUES ($1, $2)", [id, email]);
  return { id, email };
}

async function accountExists(userId) {
  const result = await pool.query("SELECT id FROM accounts WHERE id = $1", [userId]);
  return result.rows.length > 0;
}

module.exports = { initSchema, findOrCreateAccount, accountExists };
