const pg = require("pg");
require("dotenv").config();
const { catchAsyncError } = require("../../Utilities");
const { PGHOST, PGDATABASE, PGUSER, PGPORT } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = new pg.Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
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

exports.retrieveAllPatients = async (queryOptions) => {
  try {
    const query = `SELECT user_id, 
    user_first_name, 
    user_last_name, 
    created_at 
    FROM users WHERE user_role = $1 ${queryOptions}`;
    const result = await pool.query(query, ["Patient"]);
    if (result.rows.length) {
      return result.rows;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

exports.changePatientState = async (id, state) => {
  try {
    const query = `UPDATE patient SET patient_account_state=$1 WHERE patient_user_id_reference=$2 RETURNING *`;
    const result = await pool.query(query, [state, id]); // Safe injection

    console.log(result.rows);
    if (result.rows.length) return result.rows;
    return false;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
