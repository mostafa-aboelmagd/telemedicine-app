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
create table doctor
(
    doctor_user_id_reference      integer     not null
        constraint doctors_pkey
            primary key
        constraint fk_doctor_user
            references users
            on delete cascade,
    doctor_specialization         varchar(255),
    doctor_country                varchar,
    doctor_thirty_min_price       integer,
    doctor_sixty_min_price        integer,
    created_at                    timestamp default CURRENT_TIMESTAMP,
    updated_at                    timestamp default CURRENT_TIMESTAMP,
    doctor_image                  bytea,
    doctor_table_id               smallint  not null,
    doctor_nearest_appointment_reference integer,
    doctor_city                   varchar,
    doctor_clinic_location        varchar,
    doctor_account_state varchar default 'On_hold' constraint doctor_state_check
            check ((doctor_account_state)::text = ANY
                   (ARRAY [('Active'::character varying)::text, ('On_hold'::character varying)::text, ('Panned'::character varying)::text]))

);

create table users
(
    user_id            serial
        primary key,
    user_email         varchar(255) not null
        constraint users_email_key
            unique,
    user_password_hash varchar(255) not null,
    user_role          varchar(50)
        constraint users_role_check
            check ((user_role)::text = ANY
                   (ARRAY [('Patient'::character varying)::text, ('Doctor'::character varying)::text, ('Admin'::character varying)::text])),
    user_phone_number  varchar(20),
    user_gender        varchar(10)
        constraint users_gender_check
            check ((user_gender)::text = ANY
                   ((ARRAY ['Male'::character varying, 'Female'::character varying])::text[])),
    user_first_name    varchar(255),
    user_last_name     varchar(255),
    user_birth_date    date,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);
-- alter table
create table patient
(
    patient_user_id_reference integer     not null
        constraint patients_pkey
            primary key
        constraint fk_patient_user
            references users
            on delete cascade,
    patient_current_doctor_id integer
        constraint patients_current_doctor_id_fkey
            references doctor,
    patient_wallet            integer,
    patient_table_id          serial not null,
    patient_account_state varchar default 'Active' constraint doctor_state_check
            check ((patient_account_state)::text = ANY
                   (ARRAY [('Active'::character varying)::text, ('On_hold'::character varying)::text, ('Panned'::character varying)::text])),

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

create table languages
(
    lang_user_id integer
        references users
            on delete cascade,
    language     varchar,
    language_id  serial
        primary key
);


create table appointment
(
    appointment_patient_id        integer
        constraint appointment_request_patient_id_fkey
            references patient
            on delete cascade,
    appointment_doctor_id         integer
        constraint appointment_request_doctor_id_fkey
            references doctor
            on delete cascade,
    appointment_availability_slot integer not null
        constraint appointment_slot_fkey
            references doctor_availability
            on delete cascade,
    appointment_type              varchar
        constraint check_appointment_type
            check ((appointment_type)::text = ANY
                   (ARRAY ['Followup'::text, 'First_time'::text])), -- changed investigation to first time

-- what is the duration
    -- duration col should part of the request
    appointment_duration          integer, -- 30min or 60min

    appointment_id                serial
        constraint pk_appointment
            primary key,

-- should part of the request
    appointment_complaint text not null,
-- needed to be transferred to requests table
    appointment_status varchar default 'Pending' check ((appointment_status)::text = ANY
                                      (ARRAY ['Approved'::text, 'Completed'::text, 'Pending'::text, 'Declined'::text])), -- add the status completed
-- reverse the relation that the follow up references the appointment


-- refer the parent appointment
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

-- when the patient send a request a new raw will be created in the appointment table
-- this raw by default the state of the appointment will be one of three (approved - pending - canceled) and the default is pending

create table appointment_results
(
    --treatment plans
    --next appointment
    --prescription
    --operations and producers
    --scans and tests

    appointment_diagnosis text not null ,
    appointment_report text,
    results_appointment_reference integer -- referencing the current appointment
        constraint followup_appointment_reference_fkey
            references appointment
            on delete cascade,



    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table treatment_plan
(
    -- prescriptions
    -- requests of scans
    -- referrals:
        --speciality
        --note
    -- diagnosis
    -- reference the
    treatment_plan_id           serial
        primary key,
    treatment_plan_appointment_reference integer
        constraint medication_plan_appointment_reference_id_fkey
            references appointment,
    treatment_plan_operations text,
    treatment_plan_speciality_referral varchar,
    treatment_plan_referral_notes varchar,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table medications
(
    medication_id           serial
        primary key,
    medication_treatment_plan_reference integer
        constraint medication_treatment_plan_reference_id_fkey
            references treatment_plan,
    medication_plan_name         varchar(255),
    medication_plan_dosage      varchar(255),
    medication_plan_note        text,
    medication_plan_start_date  date,
    medication_plan_end_date    date,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table medical_documents
(
    medical_document_id          serial
        primary key,
    medical_document_appointment_reference integer
        constraint medical_document_appointment_reference_fkey
            references appointment
            on delete cascade,
    medical_document_treatment_plan_reference integer
        constraint medical_document_treatment_plan__fkey
        references treatment_plan,
    medical_document_type        varchar(255),
    medical_document_name        varchar(255),
    medical_document_data        bytea,
    medical_document_request_note varchar,
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