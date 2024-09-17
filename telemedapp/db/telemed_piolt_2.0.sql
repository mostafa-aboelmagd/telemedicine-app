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
    user_birth_year    integer
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
    doctor_nearest_appointment_id integer,
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
    patient_table_id          smallint default nextval('patients_patient_user_id_seq'::regclass) not null
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
    review_date       timestamp
);

create table doctor_experience
(
    doctor_experience_doctor_id  integer
        constraint doctor_experience_doctor_id_fkey
            references doctor
            on delete cascade,
    doctor_experience_job_title  varchar,
    doctor_experience_firm_name  varchar,
    doctor_experience_department varchar,
    doctor_experience_start_date date,
    doctor_experience_end_date   date
);

create table doctor_education
(
    education_doctor_id   integer
        constraint education_doctor_id_fkey
            references doctor
            on delete cascade,
    education_certificate varchar,
    education_authority   varchar,
    education_start_date  date,
    education_end_data    date
);

create table doctor_interest
(
    doctor_interest_doctor_id integer
        constraint doctor_interest_doctor_id_fkey
            references doctor
            on delete cascade,
    doctor_interest_name      varchar,
    doctor_interest_category  varchar,
    interest_id               serial
        primary key
);

create table doctor_availability
(
    doctor_availability_doctor_id integer
        constraint doctor_availability_doctor_id_fkey
            references doctor
            on delete cascade,
    doctor_availability_status    varchar(16) constraint users_role_check
            check ((doctor_availability_status)::text = ANY
                   (ARRAY [('Booked'::character varying)::text, ('Pending'::character varying)::text, ('Available'::character varying)::text])),
    doctor_availability_day_hour  timestamp,
    doctor_availability_id        serial
        primary key
);


create table appointment
(
    appointment_patient_id        integer
        constraint appointment_patient_id_fkey
            references patient
            on delete cascade,
    appointment_doctor_id         integer
        constraint appointment_doctor_id_fkey
            references doctor
            on delete cascade,
    appointment_type              varchar,
    appointment_duration          integer,
    appointment_id                serial
        constraint pk_appointment
            primary key,
    appointment_status            varchar
        constraint check_appointment_status
            check ((appointment_status)::text = ANY
                   (ARRAY ['scheduled'::text, 'finished'::text, 'running'::text, 'unbooked'::text])),
    appointment_availability_slot integer default nextval('appointment_slot_seq'::regclass) not null
        constraint appointment_slot_fkey
            references doctor_availability
            on delete cascade,
    appointment_location          varchar
        constraint appointment_appointment_location_check
            check ((appointment_location)::text = ANY
                   ((ARRAY ['online'::character varying, 'onsite'::character varying])::text[]))
);

alter sequence appointment_slot_seq owned by appointment.appointment_availability_slot;

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

create table appointment_request
(
    appointment_request_patient_id        integer
        constraint appointment_request_patient_id_fkey
            references patient
            on delete cascade,
    appointment_request_doctor_id         integer
        constraint appointment_request_doctor_id_fkey
            references doctor
            on delete cascade,
    appointment_request_aviliability_id     integer not null
        constraint appointment_request_aviliability_id_fkey
            references doctor_availability
            on delete cascade,
    appointment_request_complaint_id text not null,
    appointment_request_status varchar check ((appointment_request_status)::text = ANY
                   (ARRAY ['Approved'::text, 'Chat'::text, 'Waiting'::text, 'Declined'::text]))
);

create table prescription_medications
(
    prescription_medication_id           serial
        primary key,
    prescription_medication_reference_id integer
        constraint prescription_medications_prescription_medication_reference_fkey
            references prescriptions,
    prescription_medication_name         varchar(255),
    prescription_medications_dosage      varchar(255),
    prescription_medications_note        text,
    prescription_medications_start_date  date,
    prescription_medications_end_date    date
);

create table medical_documents
(
    medical_document_id          serial
        primary key,
    medical_documents_patient_id integer
        references patient,
    medical_document_type        varchar(255),
    medical_document_name        varchar(255),
    medical_document_data        bytea,
    created_at                   timestamp default CURRENT_TIMESTAMP,
    updated_at                   timestamp default CURRENT_TIMESTAMP

);

create table appointment_followup
(
    --treatment plan
    --next appointment
    --
);
