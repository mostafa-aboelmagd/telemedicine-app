
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
