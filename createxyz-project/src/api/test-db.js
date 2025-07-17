import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL); // Log for debugging

    const result = await pool.query("SELECT NOW()");
    res.status(200).json({ time: result.rows[0] });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.toString() });
  }
}
