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

exports.retrieveAllPatients = async (queryOptions, fields) => {
  try {
    let query = `SELECT `;
    if (fields) {
      fields = fields.replace(
        "languages",
        "array_agg(L.language) AS languages "
      );
      query += fields.split(",");
    } else {
      query += `U.user_email, U.user_phone_number, U.user_gender, U.user_birth_date, U.user_first_name, U.user_last_name,
      array_agg(L.language) AS languages `;
    }
    query += `
    FROM users U
    LEFT JOIN languages L ON u.user_id = L.lang_user_id
    WHERE  U.user_role = $1
    GROUP BY U.user_email, U.user_phone_number, U.user_gender, U.user_birth_date, U.user_first_name, U.user_last_name ${queryOptions}`;
    const result = await pool.query(query, ["Patient"]);
    if (result.rows.length) {
      return result.rows;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

exports.retrieveAllDoctors = async (queryOptions, fields, state) => {
  try {
    let query = `SELECT `;
    if (state) {
      state = `WHERE d.doctor_account_state = '${state}' `;
      console.log(state);
    } else state = "";
    if (fields) {
      query += fields;
    } else {
      query += ` 
      u.user_id,
      u.user_first_name, 
      u.user_last_name,
      u.user_email,
      u.user_gender,
      u.user_phone_number,
      u.user_birth_date,
      d.doctor_account_state,
      d.doctor_country, 
      d.doctor_specialization, 
      d.doctor_city, 
      d.doctor_clinic_location,
      d.doctor_sixty_min_price, 
      d.doctor_thirty_min_price, 
      doctor_image,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'title', e.doctor_experience_job_title,
            'firm', e.doctor_experience_firm_name,
            'department', e.doctor_experience_department,
            'startDate', e.doctor_experience_start_date,
            'endDate', e.doctor_experience_end_date
          )
        ) 
      ) AS experiences,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'category', i.doctor_interest_category,
            'name', i.doctor_interest_name 
          )
        ) 
      ) AS interests,
      array_agg(DISTINCT l.language) AS languages 
    `;
    }
    query += `           
      FROM 
        users u
      JOIN 
        doctor d ON u.user_id = d.doctor_user_id_reference
      LEFT JOIN 
        languages l ON u.user_id = l.lang_user_id
      LEFT JOIN 
        doctor_experience e ON u.user_id = e.doctor_experience_doctor_id 
      LEFT JOIN 
        doctor_interest i ON u.user_id = i.doctor_interest_doctor_id 

      ${state}
      GROUP BY 
        u.user_id, 
        u.user_first_name, 
        u.user_last_name, 
        u.user_email, 
        u.user_gender, 
        u.user_phone_number, 
        u.user_birth_date, 
        d.doctor_account_state,
        d.doctor_country, 
        d.doctor_city, 
        d.doctor_clinic_location, 
        d.doctor_sixty_min_price, 
        d.doctor_thirty_min_price, 
        d.doctor_specialization, 
        doctor_image
        ${queryOptions}
    `;

    const result = await pool.query(query);
    if (result.rows.length) {
      return result.rows;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

exports.retrievePatientAppointments = async (id, queryOptions, fields) => {
  try {
    let query = `SELECT `;
    if (fields) {
      const arrFields = fields.split(",");
      arrFields.forEach((element, index) => {
        if (element === "doctor_name") {
          element = `(d.user_first_name || ' ' || d.user_last_name) AS doctor_name `;
        } else {
          element = `a.${element}  `;
        }
        query += `${element}`;
        if (index < arrFields.length - 1) {
          query += ", ";
        }
      });
    } else {
      query += `
      a.appointment_patient_id,
      a.appointment_status,
      (d.user_first_name|| ' ' || d.user_last_name) AS doctor_name,
      a.appointment_date,
      a.appointment_duration
      `;
    }
    query += `FROM
        appointment a
        JOIN users p ON a.appointment_patient_id = p.user_id
        JOIN users d ON a.appointment_doctor_id = d.user_id
        JOIN doctor doc ON a.appointment_doctor_id = doc.doctor_user_id_reference
      WHERE
        p.user_id = $1 
        ${queryOptions}
    `;
    const result = await pool.query(query, [id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
exports.changePersonState = async (user, id, state) => {
  try {
    const query = `UPDATE ${user} SET ${user}_account_state=$1 WHERE ${user}_user_id_reference=$2 RETURNING ${user}_user_id_reference`;
    const result = await pool.query(query, [state, id]);

    if (result.rowCount > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error updating ${user} state:`, error);
    throw new Error(`Failed to update ${user} state`);
  }
};
