import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Pool = gestion des connexions réutilisables
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Fonction helper pour tester la connexion
export async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Connexion PostgreSQL OK:", result.rows[0].now);
  } catch (error) {
    console.error("❌ Erreur connexion PostgreSQL:", error);
  }
}

await pool.query(`
  CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    int1 INTEGER,
    int2 INTEGER,
    limit_value INTEGER,
    str1 TEXT,
    str2 TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )
`);

// // Insérer une requête
// await pool.query(
//   "INSERT INTO requests (int1, int2, limit_value, str1, str2) VALUES ($1, $2, $3, $4, $5)",
//   [3, 5, 100, "Fizz", "Buzz"],
// );

// // Récupérer toutes les requêtes
// const result = await pool.query(
//   "SELECT * FROM requests ORDER BY created_at DESC",
// );
// console.log(">", result.rows);
