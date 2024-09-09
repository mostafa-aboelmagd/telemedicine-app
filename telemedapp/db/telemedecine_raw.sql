/*
not completed
    - patients table
not added:
    - session review table
    - images to doctors view
    - edit the foreign key of users id to be the primary key in the doctors table

-- New edits sprint 4:
    - New type of appointment >> onsite
        - You need to add the adress of the clinc to doctor table
        - city attribute
        - address attribute everyone has his own clinc
    - Medical history for patients:

*/
CREATE TYPE appointment_status_type AS ENUM ('scheduled', 'finished', 'running');
CREATE TYPE day_name AS ENUM ('sat', 'sun', 'mon', 'tue', 'wen', 'thu', 'fri');

CREATE FUNCTION get_nearest_appointment(needed_doctor_id int)
returns int
language plpgsql
as
$$
    declare
    nearest_appointment_id int;
    begin
        select *
        from appointment join doctor_availability on appointment.appointment_availability_slot == doctor_availability.doctor_availability_id
        where appointment.appointment_doctor_id == get_nearest_appointment.needed_doctor_id
        order by doctor_availability.
        limit 1 order by ;

    end;

    $$

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name_english VARCHAR(255),
    name_arabic VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('Patient', 'Doctor', 'Admin', 'Nurse', 'Staff')),
    phone_number VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female')),
    language_preference VARCHAR(50) DEFAULT 'Arabic',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users RENAME COLUMN brith_year TO birth_year;


CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    current_doctor_id INT REFERENCES doctors(doctor_id),
    -- gender_preference VARCHAR(10) CHECK (gender_preference IN ('Male', 'Female', 'No Preference')),
    -- adress - country
    -- language
    --
    wallet INT
);

CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    specialization VARCHAR(255),
    country VARCHAR,
    language VARCHAR,
    thirty_min_price INT,
    sixty_min_price INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE reviews(
    doctor_id INT REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    patient_id INT REFERENCES patients(patient_id) ON DELETE CASCADE,
    review_text TEXT,
    stars smallint CHECK (stars > 0 AND stars < 6),
    review_date TIMESTAMP
);

CREATE TABLE  doctor_experience(
    doctor_id INT REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    job_title VARCHAR,
    firm_name VARCHAR,
    department VARCHAR,
    start_date DATE,
    end_data DATE
);

CREATE TABLE education(
    doctor_id INT REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    certificate VARCHAR,
    authority VARCHAR,
    start_date DATE,
    end_data DATE
);

CREATE TABLE doctor_interest(
    doctor_id INT REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    interest VARCHAR
);

CREATE TABLE doctor_availability(
    doctor_id INT REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    day timestamp, -- will be changed based on how doctor can add his slots
    status BOOLEAN -- True is aviliable false is booked
);

CREATE TABLE doctor_availability(
    doctor_availability_id SERIAL UNIQUE PRIMARY KEY ,
    doctor_id INT REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    day DATE, -- will be changed based on how doctor can add his slots
    hour smallint CHECK (hour >= 0 AND hour < 24),
    status BOOLEAN -- True is aviliable false is booked
);
ALTER TABLE doctor_availability DROP COLUMN day;
ALTER TABLE doctor_availability ADD COLUMN availabile_day DATE;
ALTER TABLE doctor_availability ADD COLUMN hour smallint CHECK (hour >= 0 AND hour < 24);
ALTER TABLE doctor_availability ADD COLUMN  doctor_availability_id SERIAL UNIQUE PRIMARY KEY;



CREATE TABLE appointment(

    patient_id INT REFERENCES patients (patient_id) ON DELETE CASCADE,
    doctor_id  INT REFERENCES doctors (doctor_id) ON DELETE CASCADE,
    slot       timestamp, -- need to be linked to the doctor availability table
    type       VARCHAR,   -- single or bundle
    duration   INT       -- 60min or 30min

);

CREATE TABLE appointment_review(
    appointment_review_id SERIAL,
    appointment_id_review INT REFERENCES appointment (appointment_id),
    communication_rating smallint CHECK (communication_rating > 0 AND communication_rating < 6),
    understanding_the_situation_rating smallint CHECK (understanding_the_situation_rating > 0 AND understanding_the_situation_rating < 6),
    providing_effective_solutions_rating smallint CHECK (providing_effective_solutions_rating > 0 AND providing_effective_solutions_rating < 6),
    commitment_rating smallint CHECK (commitment_rating > 0 AND commitment_rating < 6)
);

CREATE TABLE languages(
    lang_user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    language VARCHAR
);

CREATE TABLE prescriptions (
    prescription_id SERIAL PRIMARY KEY,
    prescription_patient_id INT REFERENCES patient(patient_user_id_reference) ON DELETE CASCADE,
    prescriptions_doctor_id INT REFERENCES doctor(doctor_user_id_reference) ON DELETE CASCADE,
    prescriptions_appointment_id INT REFERENCES  appointment(appointment_id) On DELETE CASCADE,
    prescriptions_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE prescription_medications (
  prescription_medication_id SERIAL PRIMARY KEY,
  prescription_medication_reference_id INT REFERENCES prescriptions(prescription_id),
  prescription_medication_name VARCHAR(255),
  prescription_medications_dosage VARCHAR(255),
  prescription_medications_note TEXT,
  prescription_medications_start_date DATE,
  prescription_medications_end_date DATE
);

ALTER TABLE prescriptions
DROP COLUMN medication_name;
CREATE TABLE medical_documents (
  medical_document_id SERIAL PRIMARY KEY,
  medical_documents_patient_id INT REFERENCES patient(patient_user_id_reference),
  medical_document_type VARCHAR(255),
  medical_document_name VARCHAR(255),
  medical_document_data BYTEA,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




ALTER TABLE doctors ADD COLUMN doc_profile_image bytea;
ALTER TABLE doctors DROP COLUMN user_id;
ALTER TABLE doctors ADD CONSTRAINT fk_doctor_user FOREIGN KEY (doctor_id) REFERENCES users (user_id) ON DELETE CASCADE;
ALTER TABLE doctors ADD COLUMN doctor_user_id SERIAL;
ALTER TABLE doctor ADD COLUMN doctor_city VARCHAR;
ALTER TABLE doctor ADD COLUMN doctor_clinic_location VARCHAR;


ALTER TABLE doctors DROP COLUMN language;

ALTER TABLE doctors ALTER COLUMN doctor_id TYPE INT;
ALTER TABLE doctors ALTER COLUMN doctor_user_id TYPE SERIAL;

ALTER TABLE doctors DROP COLUMN appointment_id;
ALTER TABLE appointment ADD COLUMN appointment_id SERIAL;
ALTER TABLE appointment ADD COLUMN appointment_location VARCHAR CHECK(appointment_location in ('online', 'onsite'));

ALTER TABLE appointment ADD CONSTRAINT pk_appointment PRIMARY KEY (appointment_id);
ALTER TABLE appointment RENAME patient_id TO appointment_patient_id;
ALTER TABLE appointment RENAME doctor_id TO appointment_doctor_id;
ALTER TABLE appointment RENAME type TO appointment_type;
ALTER TABLE appointment RENAME duration TO appointment_duration;
ALTER TABLE appointment RENAME slot TO appointment_availability_slot;
ALTER TABLE appointment ALTER COLUMN appointment_status TYPE VARCHAR;
ALTER TABLE appointment ADD CONSTRAINT check_appointment_status CHECK ( public.appointment.appointment_status IN ('scheduled', 'finished', 'running')  );

ALTER TABLE appointment_review RENAME appointment_id_review TO appointment_review_appointment_id;
ALTER TABLE appointment_review RENAME commitment_rating TO appointment_review_commitment_rating;
ALTER TABLE appointment_review RENAME understanding_the_situation_rating TO appointment_review_understanding_rating;
ALTER TABLE appointment_review RENAME providing_effective_solutions_rating TO appointment_review_providing_solutions_rating;
ALTER TABLE appointment_review RENAME communication_rating TO appointment_review_communication_rating;

ALTER TABLE doctor_availability RENAME doctor_id TO doctor_availability_doctor_id;
ALTER TABLE doctor_availability RENAME status TO doctor_availability_status;
ALTER TABLE doctor_availability RENAME availabile_day TO doctor_availability_day;
ALTER TABLE doctor_availability RENAME hour TO doctor_availability_hour;
ALTER TABLE doctor_availability DROP COLUMN date_time;
ALTER TABLE doctor_availability
DROP COLUMN doctor_availability_hour;
ALTER TABLE doctor_availability
DROP COLUMN doctor_availability_hour;

--



ALTER TABLE doctor_experience RENAME doctor_id TO doctor_experience_doctor_id;
ALTER TABLE doctor_experience RENAME job_title TO doctor_experience_job_title;
ALTER TABLE doctor_experience RENAME firm_name TO doctor_experience_firm_name;
ALTER TABLE doctor_experience RENAME department TO doctor_experience_department;
ALTER TABLE doctor_experience RENAME start_date TO doctor_experience_start_date;
ALTER TABLE doctor_experience RENAME doctor_experience_end_data TO doctor_experience_end_date;

ALTER TABLE doctor_interest RENAME doctor_id TO doctor_interest_doctor_id;
ALTER TABLE doctor_interest RENAME interest TO doctor_interest_name;
ALTER TABLE doctor_interest RENAME category TO doctor_interest_category;

ALTER TABLE doctors RENAME TO doctor;
ALTER TABLE doctor RENAME doctor_id TO doctor_user_id_reference;
ALTER TABLE doctor RENAME specialization TO doctor_specialization;
ALTER TABLE doctor RENAME country TO doctor_country;
ALTER TABLE doctor RENAME thirty_min_price TO doctor_thirty_min_price;
ALTER TABLE doctor RENAME sixty_min_price TO doctor_sixty_min_price;
ALTER TABLE doctor RENAME doc_profile_image TO doctor_image;
ALTER TABLE doctor RENAME doctor_user_id TO doctor_table_id;
ALTER TABLE doctor ADD COLUMN doctor_nearest_appointment_id INT;


ALTER TABLE education RENAME TO doctor_education;
ALTER TABLE doctor_education RENAME doctor_id TO education_doctor_id;
ALTER TABLE doctor_education RENAME certificate TO education_certificate;
ALTER TABLE doctor_education RENAME authority TO education_authority;
ALTER TABLE doctor_education RENAME start_date TO education_start_date;
ALTER TABLE doctor_education RENAME end_data TO education_end_data;

ALTER TABLE patients RENAME TO patient;
ALTER TABLE patient RENAME patient_id TO patient_user_id_reference;
ALTER TABLE patient RENAME current_doctor_id TO patient_current_doctor_id;
ALTER TABLE patient RENAME wallet TO patient_wallet;
ALTER TABLE patient RENAME patient_user_id TO patient_table_id;

ALTER TABLE reviews RENAME TO review;
ALTER TABLE review RENAME doctor_id TO review_doctor_id;
ALTER TABLE review RENAME patient_id TO review_patient_id;
ALTER TABLE review RENAME stars TO review_stars;

ALTER TABLE users RENAME email TO user_email;
ALTER TABLE users RENAME password_hash TO user_password_hash;
ALTER TABLE users RENAME role TO user_role;
ALTER TABLE users RENAME phone_number TO user_phone_number;
ALTER TABLE users RENAME gender TO user_gender;
ALTER TABLE users RENAME first_name TO user_first_name;
ALTER TABLE users RENAME last_name TO user_last_name;
ALTER TABLE users RENAME birth_year TO user_birth_year;









ALTER TABLE doctor_interest ADD COLUMN category VARCHAR;
ALTER TABLE appointment ADD COLUMN appointment_status appointment_status_type;
ALTER TABLE appointment DROP COLUMN slot;
ALTER TABLE appointment ADD COLUMN appointment_status appointment_status_type;
ALTER TABLE appointment ADD COLUMN slot SERIAL REFERENCES doctor_availability(doctor_availability_id);

ALTER TABLE patients DROP COLUMN user_id;

ALTER TABLE patients ADD CONSTRAINT fk_patient_user FOREIGN KEY (patient_id) REFERENCES users (user_id) ON DELETE CASCADE;
ALTER TABLE patients ALTER COLUMN patient_id TYPE INT;
ALTER TABLE patients ALTER COLUMN patient_user_id TYPE SERIAL;

ALTER TABLE patients ADD COLUMN patient_user_id SERIAL;


INSERT INTO users (first_name, last_name, email, password_hash, role, phone_number, birth_year, gender)
VALUES
-- Patients
('John', 'Doe', 'john.doe@example.com', 'hashed_password_1', 'Patient', '+1234567890', 1990, 'Male'),
('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password_2', 'Patient', '+1234567891', 1985, 'Female'),
('Ahmed', 'Ali', 'ahmed.ali@example.com', 'hashed_password_3', 'Patient', '+1234567892', 1992, 'Male'),
('Sara', 'Ibrahim', 'sara.ibrahim@example.com', 'hashed_password_4', 'Patient', '+1234567893', 1994, 'Female'),
('Mohammed', 'Hassan', 'mohammed.hassan@example.com', 'hashed_password_5', 'Patient', '+1234567894', 1988, 'Male'),
('Laila', 'Youssef', 'laila.youssef@example.com', 'hashed_password_6', 'Patient', '+1234567895', 1991, 'Female'),
('Omar', 'Nasser', 'omar.nasser@example.com', 'hashed_password_7', 'Patient', '+1234567896', 1987, 'Male'),
('Hana', 'Khaled', 'hana.khaled@example.com', 'hashed_password_8', 'Patient', '+1234567897', 1995, 'Female'),
('Ali', 'Mostafa', 'ali.mostafa@example.com', 'hashed_password_9', 'Patient', '+1234567898', 1993, 'Male'),
('Nour', 'Fatima', 'nour.fatima@example.com', 'hashed_password_10', 'Patient', '+1234567899', 1989, 'Female'),

-- Doctors
('Khaled', 'Mansour', 'dr.khaled@example.com', 'hashed_password_11', 'Doctor', '+1234500001', 1975, 'Male'),
('Mariam', 'Samir', 'dr.mariam@example.com', 'hashed_password_12', 'Doctor', '+1234500002', 1980, 'Female'),
('Tamer', 'Fahmy', 'dr.tamer@example.com', 'hashed_password_13', 'Doctor', '+1234500003', 1978, 'Male'),
('Reem', 'Hani', 'dr.reem@example.com', 'hashed_password_14', 'Doctor', '+1234500004', 1982, 'Female'),
('Ayman', 'Saeed', 'dr.ayman@example.com', 'hashed_password_15', 'Doctor', '+1234500005', 1979, 'Male');

INSERT INTO users (first_name, last_name, email, password_hash, role, phone_number, birth_year, gender)
VALUES
-- Admins
('Admin', 'A', 'admin.a@example.com', 'hashed_password_16', 'Admin', '+1234500011', 1983, 'Female'),
('Admin', 'B', 'admin.b@example.com', 'hashed_password_17', 'Admin', '+1234500012', 1977, 'Male'),
('Admin', 'C', 'admin.c@example.com', 'hashed_password_18', 'Admin', '+1234500013', 1986, 'Female'),
('Admin', 'D', 'admin.d@example.com', 'hashed_password_19', 'Admin', '+1234500014', 1984, 'Male'),
('Admin', 'E', 'admin.e@example.com', 'hashed_password_20', 'Admin', '+1234500015', 1981, 'Female');


INSERT INTO doctors (specialization, country, thirty_min_price, sixty_min_price, doc_profile_image, doctor_id)
VALUES
-- Doctor 1
('Cardiology', 'Egypt', 100, 180, NULL, (SELECT user_id FROM users WHERE email = 'dr.khaled@example.com')),

-- Doctor 2
('Dermatology', 'Jordan', 120, 200, NULL, (SELECT user_id FROM users WHERE email = 'dr.mariam@example.com')),

-- Doctor 3
('Neurology', 'Lebanon', 150, 250, NULL, (SELECT user_id FROM users WHERE email = 'dr.tamer@example.com')),

-- Doctor 4
('Pediatrics', 'Morocco', 80, 150, NULL, (SELECT user_id FROM users WHERE email = 'dr.reem@example.com')),

-- Doctor 5
('Orthopedics', 'UAE', 130, 220, NULL, (SELECT user_id FROM users WHERE email = 'dr.ayman@example.com'));


INSERT INTO patients (current_doctor_id, wallet, patient_id)
VALUES
-- Patient 1
((SELECT doctor_id FROM doctors WHERE specialization = 'Cardiology' LIMIT 1), 500, (SELECT user_id FROM users WHERE email = 'john.doe@example.com')),

-- Patient 2
((SELECT doctor_id FROM doctors WHERE specialization = 'Dermatology' LIMIT 1), 300, (SELECT user_id FROM users WHERE email = 'jane.smith@example.com')),

-- Patient 3
((SELECT doctor_id FROM doctors WHERE specialization = 'Neurology' LIMIT 1), 700, (SELECT user_id FROM users WHERE email = 'ahmed.ali@example.com')),

-- Patient 4
((SELECT doctor_id FROM doctors WHERE specialization = 'Pediatrics' LIMIT 1), 400, (SELECT user_id FROM users WHERE email = 'sara.ibrahim@example.com')),

-- Patient 5
((SELECT doctor_id FROM doctors WHERE specialization = 'Orthopedics' LIMIT 1), 800, (SELECT user_id FROM users WHERE email = 'mohammed.hassan@example.com')),

-- Patient 6
((SELECT doctor_id FROM doctors WHERE specialization = 'Cardiology' LIMIT 1), 350, (SELECT user_id FROM users WHERE email = 'laila.youssef@example.com')),

-- Patient 7
((SELECT doctor_id FROM doctors WHERE specialization = 'Dermatology' LIMIT 1), 600, (SELECT user_id FROM users WHERE email = 'omar.nasser@example.com')),

-- Patient 8
((SELECT doctor_id FROM doctors WHERE specialization = 'Neurology' LIMIT 1), 550, (SELECT user_id FROM users WHERE email = 'hana.khaled@example.com')),

-- Patient 9
((SELECT doctor_id FROM doctors WHERE specialization = 'Pediatrics' LIMIT 1), 700, (SELECT user_id FROM users WHERE email = 'ali.mostafa@example.com')),

-- Patient 10
((SELECT doctor_id FROM doctors WHERE specialization = 'Orthopedics' LIMIT 1), 250, (SELECT user_id FROM users WHERE email = 'nour.fatima@example.com'));


-- Insert Prescription 1
INSERT INTO prescriptions (prescription_patient_id, prescriptions_doctor_id, prescriptions_appointment_id, prescriptions_notes)
VALUES
((SELECT patient_user_id_reference FROM patient WHERE patient_table_id = 1),
 (SELECT doctor_user_id_reference FROM doctor WHERE doctor_table_id = 1),
 NULL,
 'Patient to take medication for a week.');

-- Insert Prescription 2
INSERT INTO prescriptions (prescription_patient_id, prescriptions_doctor_id, prescriptions_appointment_id, prescriptions_notes)
VALUES
((SELECT patient_user_id_reference FROM patient WHERE patient_table_id = 2),
 (SELECT doctor_user_id_reference FROM doctor WHERE doctor_table_id = 2),
 NULL,
 'Patient to take antibiotic after meals.');

-- Insert Prescription 3 (this one will have three medications)
INSERT INTO prescriptions (prescription_patient_id, prescriptions_doctor_id, prescriptions_appointment_id, prescriptions_notes)
VALUES
((SELECT patient_id FROM patients WHERE patient_id = 3),
 (SELECT doctor_id FROM doctors WHERE doctor_id = 3),
 NULL,
 'Patient to take multiple medications as prescribed.');



-- Insert Medications for Prescription 1 (single medication)
INSERT INTO prescription_medications (prescription_medication_reference_id, prescription_medication_name, prescription_medications_dosage, prescription_medications_note, prescription_medications_start_date, prescription_medications_end_date)
VALUES
((SELECT prescription_id FROM prescriptions WHERE prescription_patient_id = 1 LIMIT 1),
 'Aspirin',
 '1 tablet',
 'Take one daily for a week',
 CURRENT_DATE,
 CURRENT_DATE + INTERVAL '7 days');

-- Insert Medications for Prescription 2 (single medication)
INSERT INTO prescription_medications (prescription_medication_reference_id, prescription_medication_name, prescription_medications_dosage, prescription_medications_note, prescription_medications_start_date, prescription_medications_end_date)
VALUES
((SELECT prescription_id FROM prescriptions WHERE prescription_patient_id = 2 LIMIT 1),
 'Antibiotic',
 '1 pill',
 'Take after meals for 5 days',
 CURRENT_DATE,
 CURRENT_DATE + INTERVAL '5 days');

-- Insert Medications for Prescription 3 (three medications)
-- Medication 1 for Prescription 3
INSERT INTO prescription_medications (prescription_medication_reference_id, prescription_medication_name, prescription_medications_dosage, prescription_medications_note, prescription_medications_start_date, prescription_medications_end_date)
VALUES
((SELECT prescription_id FROM prescriptions WHERE prescription_patient_id = 23 LIMIT 1),
 'Ibuprofen',
 '1 tablet every 8 hours',
 'Take for pain relief',
 CURRENT_DATE,
 CURRENT_DATE + INTERVAL '5 days');

-- Medication 2 for Prescription 3
INSERT INTO prescription_medications (prescription_medication_reference_id, prescription_medication_name, prescription_medications_dosage, prescription_medications_note, prescription_medications_start_date, prescription_medications_end_date)
VALUES
((SELECT prescription_id FROM prescriptions WHERE prescription_patient_id = 22 LIMIT 1),
 'Paracetamol',
 '1 tablet every 6 hours',
 'Take for fever',
 CURRENT_DATE,
 CURRENT_DATE + INTERVAL '5 days');

-- Medication 3 for Prescription 3
INSERT INTO prescription_medications (prescription_medication_reference_id, prescription_medication_name, prescription_medications_dosage, prescription_medications_note, prescription_medications_start_date, prescription_medications_end_date)
VALUES
((SELECT prescription_id FROM prescriptions WHERE prescription_patient_id = 22 LIMIT 1),
 'Vitamin C',
 '1 tablet daily',
 'Take for immunity boost',
 CURRENT_DATE,
 CURRENT_DATE + INTERVAL '30 days');
