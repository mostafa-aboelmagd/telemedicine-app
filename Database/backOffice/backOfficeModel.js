const pg = require("pg");
require("dotenv").config();
const { catchAsyncError } = require("../../Utilities");
const { PGHOST, PGDATABASE, PGUSER } = process.env;

const pool = new pg.Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: true,
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    client.release();
  } catch (error) {
    console.error("Database connection error", error.stack);
  }
})();

exports.retrieveAllPatients = catchAsyncError(async () => {
  const result = await pool.query("SELECT * FROM users  AND user_role = $1", [
    "Patient",
  ]);
  if (result.rows.length) {
    return result.rows;
  }
  return false;
});
