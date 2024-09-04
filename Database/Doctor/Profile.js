const pg = require('pg');
require('dotenv').config();

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
        console.log('Connected to the database');
        client.release();
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
})();


const retrieveDoctorInfo = async (id, email) => {
    try {
        const query = 
        `SELECT 
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
        D.*
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

    const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
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

const retrieveDoctorPatients = async (id, email) => {
    try {
        const query = 
        `SELECT 
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
        D.*,
        P.*
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        LEFT JOIN patient P ON D.doctor_user_id_reference = P.patient_current_doctor_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

        const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
            console.log('Doctor patients found', result.rows);
            return result.rows;
        }

        console.log('Doctor patients not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrieveDoctorAppointments = async (id, email) => {
    try {
        const query = 
        `SELECT 
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
        D.*,
        A.*
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        LEFT JOIN appointment A ON D.doctor_user_id_reference = A.appointment_doctor_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

        const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
            console.log('Doctor appointments found', result.rows);
            return result.rows;
        }

        console.log('Doctor appointments not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrieveDoctorReviews = async (id, email) => {
    try {
        const query = 
        `SELECT 
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
        D.*,
        R.*
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        LEFT JOIN review R ON D.doctor_user_id_reference = R.review_doctor_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

        const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
            console.log('Doctor reviews found', result.rows);
            return result.rows;
        }

        console.log('Doctor reviews not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrieveDoctorAvailability = async (id, email) => {
    try {
        const query = 
        `SELECT 
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
        D.*,
        DA.*
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        LEFT JOIN doctor_availability DA ON D.doctor_user_id_reference = DA.doctor_availability_doctor_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

        const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
            console.log('Doctor availability found', result.rows);
            return result.rows;
        }

        console.log('Doctor availability not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrieveDoctorExperience = async (id, email) => {
    try {
        const query = 
        `SELECT 
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
        D.*,
        DEX.*
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        LEFT JOIN doctor_experience DEX ON D.doctor_user_id_reference = DEX.doctor_experience_doctor_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

        const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
            console.log('Doctor experience found', result.rows);
            return result.rows;
        }

        console.log('Doctor experience not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrieveDoctorInterests = async (id, email) => {
    try {
        const query = 
        `SELECT 
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
        D.*,
        DI.*
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        LEFT JOIN doctor_interest DI ON D.doctor_user_id_reference = DI.doctor_interest_doctor_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

        const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
            console.log('Doctor interests found', result.rows);
            return result.rows;
        }

        console.log('Doctor interests not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrieveDoctorLanguages = async (id, email) => {
    try {
        const query = 
        `SELECT 
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
        D.*,
        L.*
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        LEFT JOIN languages L ON D.doctor_user_id_reference = L.lang_user_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

        const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
            console.log('Doctor languages found', result.rows);
            return result.rows;
        }

        console.log('Doctor languages not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrieveDoctorEducation = async (id, email) => {
    try {
        const query = 
        `SELECT
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
        D.*,
        DE.*
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        LEFT JOIN doctor_education DE ON D.doctor_user_id_reference = DE.education_doctor_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

        const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
            console.log('Doctor education found', result.rows);
            return result.rows;
        }

        console.log('Doctor education not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { retrieveDoctorInfo, retrieveDoctorPatients, retrieveDoctorAppointments, retrieveDoctorReviews, retrieveDoctorAvailability, retrieveDoctorExperience, retrieveDoctorInterests, retrieveDoctorLanguages, retrieveDoctorEducation };


// LEFT JOIN doctor_availability DA ON D.doctor_user_id_reference = DA.doctor_availability_doctor_id
// LEFT JOIN doctor_experience DEX ON D.doctor_user_id_reference = DEX.doctor_experience_doctor_id
// LEFT JOIN doctor_interest DI ON D.doctor_user_id_reference = DI.doctor_interest_doctor_id
// LEFT JOIN doctor_education DED ON D.doctor_user_id_reference = DED.education_doctor_id
// LEFT JOIN appointment A ON D.doctor_user_id_reference = A.appointment_doctor_id
// LEFT JOIN patient P ON D.doctor_user_id_reference = P.patient_current_doctor_id
// LEFT JOIN review R ON D.doctor_user_id_reference = R.review_doctor_id