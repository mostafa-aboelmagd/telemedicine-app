const pg = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

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
        console.log('Connected to the database');
        client.release();
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
})();


const retrieveDoctorById = async (id) => {
    try {
        const query = `
        SELECT * 
        FROM doctors D, users U
        WHERE D.user_id = $1 AND D.user_id = U.user_id 
    `;
    const result = await pool.query(query, [id]);
        if (result.rows.length > 0) {
            console.log('Doctor info found', result.rows);
            return result.rows;
        }

        console.log('Doctor info not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


const retrieveDoctorsByName = async (fname, lname) => {
    try {
        const query = `
        SELECT * 
        FROM doctors D, users U
        WHERE D.user_id = U.user_id
    `;
    const allDoctors = await pool.query(query);
    let matchedDoctors = [];
    allDoctors.rows.forEach(doctor => {
        const doctorFname = doctor.first_name.toLowerCase();
        const doctorLname = doctor.last_name.toLowerCase();
        if (doctorFname === fname && doctorLname === lname) {
            matchedDoctors.push(doctor);
        }
    });

    if (matchedDoctors.length > 0) {
        console.log('Doctor info found', matchedDoctors);
        return matchedDoctors;
    }


    console.log('Doctor info not found');
    return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


module.exports = { retrieveDoctorById, retrieveDoctorsByName };


// AND D.doctor_id = DA.doctor_id AND D.doctor_id = DE.doctor_id AND 
//         D.doctor_id = DI.doctor_id AND D.doctor_id = A.doctor_id AND D.doctor_id = E.doctor_id AND D.doctor_id = R.doctor_id
//         AND D.doctor_id = P.current_doctor_id 
// doctor_availability DA, doctor_experience DE, doctor_interest DI, appointment A, education E, reviews R,
// patients P,