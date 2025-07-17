import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Adjust based on your DB setup
});

export async function sql(queryStrings, ...values) {
  const client = await pool.connect();
  try {
    // Construct parameterized query:
    // Replace template strings with $1, $2, etc.
    let text = "";
    const params = [];

    queryStrings.forEach((str, i) => {
      text += str;
      if (i < values.length) {
        params.push(values[i]);
        text += `$${params.length}`;
      }
    });

    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}
