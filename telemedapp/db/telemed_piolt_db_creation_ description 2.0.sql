/*
Users table:
    - birth year >> brith date
    -
Doctor table:
    - added doctor_account_state : describe the status of the doctor account
    - serialization of table id
patient table:
    - added patient_account_state : describe the status of the patient account
Review table:
    - Ignored the review table from the creation in this version
Doctor_availability:
    - edited the availability type and added new option for two types of availability

Revise the comments and remove the requests table
*/

/*
New Database modifications:
    - double check the data base
    - add the new slots table
    - remove availability table
    - edit the logic of appointment table
    - clean the code
*/
create table doctor
(
    doctor_user_id_reference      integer     not null
        constraint doctors_pkey
            primary key
        constraint fk_doctor_user
            references users
            on delete cascade, -- refer to the doctor ID in the users table
    doctor_specialization         varchar(255), -- the specific specialization of the doctor (Radiology ...)
    doctor_country                varchar, -- Country of residence
    doctor_thirty_min_price       integer, -- The price of a 30 min appointment
    doctor_sixty_min_price        integer, -- The price if we extended the appointment to one hour
    created_at                    timestamp default CURRENT_TIMESTAMP,
    updated_at                    timestamp default CURRENT_TIMESTAMP,
    doctor_image                  bytea,
    doctor_table_id               smallint  not null, -- ID of doctor row in this table
    doctor_nearest_appointment_reference integer, -- refer to the nearest appointment reserved with this doctor
    doctor_city                   varchar, -- the city where the doctor clinic or hospital is in.
    doctor_clinic_location        varchar, -- the specific location and description of doctor clinic
    -- (may be in the future one doctor will have multiple locations)
    doctor_account_state varchar default 'On_hold' constraint doctor_state_check -- the account status of the doctor as it is must be approved after signing up from the admins
            check ((doctor_account_state)::text = ANY
                   (ARRAY [('Active'::character varying)::text, ('On_hold'::character varying)::text, ('Panned'::character varying)::text]))
            -- Active: doctor account can operate,     On_hold: the doctor registration and account waiting to be accepted from admins, Banned: the doctor account and data are blacklisted
            -- Edit Panned to be Banned
);

create table users
(
    user_id            serial
        primary key, -- refer to the main user ID that will be referenced in the application
    user_email         varchar(255) not null
        constraint users_email_key
            unique, -- user email not hashed
    user_password_hash varchar(255) not null, -- the hashed password (depend on the hash function in the backend)
    user_role          varchar(50) -- Decide user roles which control the user access to the data and his journey
        constraint users_role_check
            check ((user_role)::text = ANY
                   (ARRAY [('Patient'::character varying)::text, ('Doctor'::character varying)::text, ('Admin'::character varying)::text])),
    user_phone_number  varchar(20),
    user_gender        varchar(10) -- could be useful in some applications and suggestions
        constraint users_gender_check
            check ((user_gender)::text = ANY
                   ((ARRAY ['Male'::character varying, 'Female'::character varying])::text[])),
    user_first_name    varchar(255),
    user_last_name     varchar(255),
    user_birth_date    date, -- to calculate age or relevant dates
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);
-- alter table
create table patient
(
    -- refer to the doctor ID in the users table
    patient_user_id_reference integer     not null
        constraint patients_pkey
            primary key
        constraint fk_patient_user
            references users
            on delete cascade,
    patient_current_doctor_id integer
        constraint patients_current_doctor_id_fkey
            references doctor, -- the last doctor that the patient had an appointment with
    patient_wallet            integer,
    patient_table_id          serial not null, -- ID of doctor row in this table
    patient_account_state varchar default 'Active' constraint doctor_state_check
            check ((patient_account_state)::text = ANY -- default is active as the patient account needn't an acceptance
                   (ARRAY [('Active'::character varying)::text, ('On_hold'::character varying)::text, ('Panned'::character varying)::text])),
            -- Active: doctor account can operate,     On_hold: the doctor registration and account waiting to be accepted from admins, Banned: the doctor account and data are blacklisted
            -- Edit Panned to be Banned
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table doctor_experience
(
    doctor_experience_id        serial
        primary key,
    doctor_experience_doctor_id  integer
        constraint doctor_experience_doctor_id_fkey
            references doctor
            on delete cascade,
    doctor_experience_job_title  varchar,
    doctor_experience_firm_name  varchar,
    doctor_experience_department varchar,
    doctor_experience_start_date date,
    doctor_experience_end_date   date,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table doctor_education
(
    doctor_education_id        serial
        primary key,
    education_doctor_id   integer
        constraint education_doctor_id_fkey
            references doctor
            on delete cascade,
    education_certificate varchar,
    education_authority   varchar,
    education_start_date  date,
    education_end_data    date,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table languages
(
    lang_user_id integer
        references users
            on delete cascade,
    language     varchar,
    language_id  serial
        primary key
);

create table doctor_interest
(
    doctor_interest_id        serial
        primary key,
    doctor_interest_doctor_id integer
        constraint doctor_interest_doctor_id_fkey
            references doctor
            on delete cascade,
    doctor_interest_name      varchar,
    doctor_interest_category  varchar,

    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

-- This table will be deleted as the availability will be the slots or it can be merged with other
create table doctor_availability
(
    doctor_availability_doctor_id integer
        constraint doctor_availability_doctor_id_fkey
            references doctor
            on delete cascade,
    doctor_availability_type    varchar(16) constraint availability_type_check
            check ((doctor_availability_type)::text = ANY
                   (ARRAY [('Online'::character varying)::text, ('Onsite'::character varying)::text, ('Online/Onsite'::character varying)::text])),
    doctor_availability_status    varchar(16) constraint users_role_check
            check ((doctor_availability_status)::text = ANY
                   (ARRAY [('Booked'::character varying)::text, ('Pending'::character varying)::text, ('Available'::character varying)::text])),
                    -- Doctor control the status based on the acceptance or if it's exceded the time limit

    doctor_availability_day_hour  timestamp,
    doctor_availability_id        serial
        primary key,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

-- Added table timeslots : has fixed time slots in a week but reserved in the appointments
-- Concerns about the activation of the slot
CREATE TABLE timeslots (
    timeslots_table_id SERIAL PRIMARY KEY, -- the id of the slot in the table
    timeslot_code VARCHAR(10), -- a code that describe the week day and the hour of the doctor availability
    timeslot_type VARCHAR(10), -- the type of the availability >> need to add a constrain on it.
    timeslot_doctor_id INTEGER REFERENCES doctor(doctor_user_id_reference) ON DELETE CASCADE -- doctor that have this time slot available
);

create table appointment
(
    -- where will the doctor add his needed details if he need more clarification from the patient
    -- Availability slot reference was deleted due to the new logic of the appointment reservation
    appointment_patient_id        integer
        constraint appointment_request_patient_id_fkey
            references patient
            on delete cascade,
    appointment_doctor_id         integer
        constraint appointment_request_doctor_id_fkey
            references doctor
            on delete cascade,

    appointment_type              varchar -- refer to the type of the appointment with this doctor within the same complaint
        -- if it's not the first appointment with the doctor and with a new complaint so it's a first time appointment.
        constraint check_appointment_type
            check ((appointment_type)::text = ANY
                   (ARRAY ['Followup'::text, 'First_time'::text])),

    appointment_duration          integer, -- 30min or 60min

    appointment_id                serial
        constraint pk_appointment
            primary key, -- the id of the appointment within the table

    appointment_complaint text not null, -- a text complaint or a voice in which the patient talk about his complaint

    appointment_status varchar default 'Pending' check ((appointment_status)::text = ANY -- this status describe the appointment as if it's a request.
                                      (ARRAY ['Approved'::text, 'Completed'::text, 'Pending'::text, 'Declined'::text])),

    appointment_settings_type varchar check ((appointment_settings_type)::text = ANY -- this status describe the appointment as online or offline.
                                      (ARRAY ['Online'::text, 'Onsite'::text])),

    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

-- when the patient send a request a new raw will be created in the appointment table
-- this raw by default the state of the appointment will be one of three (approved - pending - canceled) and the default is pending

create table appointment_results
(
    appointment_diagnosis text not null , -- a text which the doctor describe the patient status
    appointment_report text, --  this report may be deleted or be a specific field or other table
    results_appointment_reference integer -- referencing the current appointment
        constraint results_appointment_reference_fkey
            references appointment
            on delete cascade,
    appointment_result_id serial primary key,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table treatment_plan
(
    -- prescriptions
    -- requests of scans
    treatment_plan_id           serial
        primary key, -- the id within the table
    treatment_plan_appointment_reference integer
        constraint medication_plan_appointment_reference_id_fkey
            references appointment, -- the reference of the appointment associated with the treatment plan
    treatment_plan_operations text, -- the operations and procedures that the patient need to have
    treatment_plan_speciality_referral varchar, -- if the patient need to go to another speciality
    treatment_plan_referral_notes varchar, -- notes to the doctor of the referral speciality
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table medications
(
    medication_id           serial
        primary key, -- the medication id within the table
    medication_treatment_plan_reference integer --  refer to the medication plan that this medication associated with
        constraint medication_treatment_plan_reference_id_fkey
            references treatment_plan,
    medication_name         varchar(255),
    medication_dosage      varchar(255), -- the dosage for each time that the patient need
    medication_note        text, -- here where the doctor write any more information needed like frequency
    medication_start_date  date,
    medication_end_date    date,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table medical_documents
(
    medical_document_id          serial
        primary key, -- medical document can be a scan or a lab test that was uploaded by the patient after a request from the doctor
    medical_document_appointment_reference integer
        constraint medical_document_appointment_reference_fkey
            references appointment
            on delete cascade, -- the reference to the appointment where the doctor requested this document
    medical_document_treatment_plan_reference integer
        constraint medical_document_treatment_plan__fkey
        references treatment_plan, -- the treatment plan which is associated with the appointment
    medical_document_type        varchar(255), -- the tpe of the document (test - scan)
    medical_document_name        varchar(255), -- specific name of the test <<
    medical_document_data        bytea,
    medical_document_request_note varchar, -- note from the doctor (the note needed by the doctor)
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table appointment_review
(
    appointment_review_id                         serial,
    appointment_review_appointment_id             integer
        constraint appointment_review_appointment_id_review_fkey
            references appointment,
    appointment_review_communication_rating       smallint
        constraint appointment_review_communication_rating_check
            check ((appointment_review_communication_rating > 0) AND (appointment_review_communication_rating < 6)),
    appointment_review_understanding_rating       smallint
        constraint appointment_review_understanding_the_situation_rating_check
            check ((appointment_review_understanding_rating > 0) AND (appointment_review_understanding_rating < 6)),
    appointment_review_providing_solutions_rating smallint
        constraint appointment_review_providing_effective_solutions_rating_check
            check ((appointment_review_providing_solutions_rating > 0) AND
                   (appointment_review_providing_solutions_rating < 6)),
    appointment_review_commitment_rating          smallint
        constraint appointment_review_commitment_rating_check
            check ((appointment_review_commitment_rating > 0) AND (appointment_review_commitment_rating < 6)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

