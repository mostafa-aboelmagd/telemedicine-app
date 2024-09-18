create sequence patients_patient_id_seq
    as integer;


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
    user_birth_year    integer,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table doctor
(
    doctor_user_id_reference      integer   default nextval('doctors_doctor_id_seq'::regclass)      not null
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
    doctor_table_id               smallint  default nextval('doctors_doctor_user_id_seq'::regclass) not null,
    doctor_nearest_appointment_reference integer, -- will reference the nearest appointment for the doctor
    doctor_city                   varchar,
    doctor_clinic_location        varchar
);

alter sequence doctors_doctor_id_seq owned by doctor.doctor_user_id_reference;

alter sequence doctors_doctor_user_id_seq owned by doctor.doctor_table_id;

create table patient
(
    patient_user_id_reference integer  default nextval('patients_patient_id_seq'::regclass)      not null
        constraint patients_pkey
            primary key
        constraint fk_patient_user
            references users
            on delete cascade,
    patient_current_doctor_id integer
        constraint patients_current_doctor_id_fkey
            references doctor,
    patient_wallet            integer,
    patient_table_id          smallint default nextval('patients_patient_user_id_seq'::regclass) not null,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

alter sequence patients_patient_id_seq owned by patient.patient_user_id_reference;

alter sequence patients_patient_user_id_seq owned by patient.patient_table_id;

create table review
(
    review_doctor_id  integer
        constraint reviews_doctor_id_fkey
            references doctor
            on delete cascade,
    review_patient_id integer
        constraint reviews_patient_id_fkey
            references patient
            on delete cascade,
    review_text       text,
    review_stars      smallint
        constraint reviews_stars_check
            check ((review_stars > 0) AND (review_stars < 6)),
    review_date       timestamp,
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
    interest_id               serial
        primary key,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);

create table doctor_availability
(
    doctor_availability_doctor_id integer
        constraint doctor_availability_doctor_id_fkey
            references doctor
            on delete cascade,
    doctor_availability_type    varchar(16) constraint users_role_check
            check ((doctor_availability_status)::text = ANY
                   (ARRAY [('Online'::character varying)::text, ('Onsite'::character varying)::text])),
    doctor_availability_status    varchar(16) constraint users_role_check
            check ((doctor_availability_status)::text = ANY
                   (ARRAY [('Booked'::character varying)::text, ('Pending'::character varying)::text, ('Available'::character varying)::text])),

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
            check ((appointment_review_commitment_rating > 0) AND (appointment_review_commitment_rating < 6))
);

-- we will delete the prescription table and merge it with the follow up table
create table prescriptions
(
    prescription_id              serial
        primary key,
    prescription_patient_id      integer
        references patient
            on delete cascade,
    prescriptions_doctor_id      integer
        references doctor
            on delete cascade,
    prescriptions_appointment_id integer
        references appointment
            on delete cascade,
    prescriptions_notes          text,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);


create table request_appointment
(
    request_appointment_patient_id        integer
        constraint appointment_request_patient_id_fkey
            references patient
            on delete cascade,
    request_appointment_doctor_id         integer
        constraint appointment_request_doctor_id_fkey
            references doctor
            on delete cascade,
    request_appointment_availability_slot integer default nextval('appointment_slot_seq'::regclass) not null
        constraint appointment_slot_fkey
            references doctor_availability
            on delete cascade,
    request_appointment_type              varchar
        constraint check_appointment_type
            check ((request_appointment_type)::text = ANY
                   (ARRAY ['Followup'::text, 'Investigation'::text])),
    request_appointment_duration          integer,
    request_appointment_id                serial
        constraint pk_request_appointment
            primary key,
    request_appointment_complaint text not null,

    request_appointment_location          varchar
        constraint appointment_appointment_location_check
            check ((request_appointment_location)::text = ANY
                   ((ARRAY ['online'::character varying, 'onsite'::character varying])::text[])),

    request_appointment_status varchar check ((request_appointment_status)::text = ANY
                   (ARRAY ['Approved'::text, 'Chat'::text, 'Waiting'::text, 'Declined'::text])),
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);
alter sequence appointment_slot_seq owned by request_appointment.request_appointment_availability_slot;


create table medications_plan
(
    medication_plan_id           serial
        primary key,
    medication_plan_appointment_reference_id integer
        constraint medication_plan_appointment_reference_id_fkey
            references request_appointment,
    medication_plan_name         varchar(255),
    medication_plan_dosage      varchar(255),
    medication_plan_note        text,
    medication_plan_start_date  date,
    medication_plan_end_date    date
);

create table medical_documents
(
    medical_document_id          serial
        primary key,
    medical_document_appointment_reference integer
        constraint medical_document_appointment_reference_fkey
            references appointment
            on delete cascade,
    medical_documents_patient_id integer
        references patient,
    medical_document_type        varchar(255),
    medical_document_name        varchar(255),
    medical_document_data        bytea,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP

);

create table followup
(
    --treatment plan
    --next appointment
    --prescription
    followup_diagnosis text not null ,

    followup_appointment_reference integer
        constraint followup_appointment_reference_fkey
            references request_appointment
            on delete cascade    ,
    followup_next_appointment integer -- here when the value is not null it creates a new appointment with an accepted request
        -- if the attribute of followup in the appointment table is true
        constraint followup_next_appointment_reference_fkey
        references appointment
        on delete cascade ,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP
);
