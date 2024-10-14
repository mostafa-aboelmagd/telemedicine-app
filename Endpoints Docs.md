### **General Notes**

##### **- This is a primary documentation for each endpoint in the the application just for development in integration tests.**

##### **- If you face any issues with integration don't hesitate to contact any of our APIs developers**

##### **- Add this root URL before each endpoint to access the deployed server**

**(https://telemedicine-pilot-d2anbuaxedbfdba9.southafricanorth-01.azurewebsites.net)**

---

#### Endpoints listed are:

1. **User Login:** `/login` (tested)
2. **User Logout:** `/logout`
3. **Patient Registration:** `/patient/register` (tested)
4. **Patient Profile info:** `/patient/profile/info`(tested)
5. **Patient appointments:** `/patient/profile/appointments`(tested)
6. **Patient Requests:** `/patient/profile/requests`(tested)
7. **Patient Profile Edit:** `/patient/edit/info`(tested)
8. **Patient Change Password:** `/patient/edit/password`(tested)
9. **Patient Appointment Request:** `/patient/appointment/book`(tested)
10. **Patient Get doctors availability:** `/patient/appointment/Availabilities/:doctorId`
11. **Patient Get Appointment details:** `/patient/appointment/appointmentdetails/:appointmentId` (tested)
12. **Patient Home (Dashboard retriev doctors data):** `/patient/home`(tested)
13. **Patient Medical Document Upload:** `/patient/medical-document/upload`
14. **Patient Medical Document Viewing:** `/patient/medical-document/view`
15. **Patient Medical Document Deletion:** `/patient/medical-document/delete`
16. **Doctor Profile Edit:** `/doctor/edit/info`(tested)
17. **Doctor Password change:** `/doctor/edit/password`(tested)
18. **Doctor Profile info:** `/doctor/profile/info`(tested)
19. **Doctor View appointments** `Doctor/Profile/appointments`(Tested)
20. **Doctor View Pending Requests** `/Doctor/Profile/PendingRequests`(Tested)
21. **Doctor View Availability:** `/doctor/availability/view`(Tested)
22. **Doctor View Personal Profile Further Information:** `/doctor/profile/DoctorFurtherInformation`

<!-- 22. **Doctor View Experience:** `/doctor/profile/experience`
23. **Doctor View Education:** `/doctor/profile/education`
24. **Doctor View reviews:** `/doctor/profile/reviews`
25. **Doctor View interests:** `/doctor/profile/interests` -->
26. **Doctor Availability Addition:** `/doctor/availability/add`(tested)
27. **Doctor Availability Deletion:** `/doctor/availability/delete`(tested)
28. **Doctor Profile Picture Upload:** `/doctor/profile-picture/upload`
29. **Doctor Patient Prescription Addition:** `/doctor/patient-prescription/add`(Canceled)
30. **Doctor Appointment Confirm/Decline:** `/doctor/AppointmentResponse/:appointmentId/:response`(Tested)
31. **Patient view appointments history:** `/patient/appointment/appointmentsHistory`(Tested)
32. **Doctor view appointments history:** `/doctor/appointmentHistory`(Tested)
33. **Doctor view appointment details:** `/doctor/appointmentDetails/:appointmentId`(Tested)
34. **Doctor view Patient appointments:** `/doctor/PatientSummary/:patientID`(Tested)
35. **Doctor submit appointment's results:** `doctor/AppointmentResults/:appointmentId/submitresults`(Tested)
36. **Doctor Registration:** `/doctor/register`(Tested)
37. **Doctor Books Followup Appointment:** `/doctor/FollowupAppointment`(Tested)
38. **Doctor adds language:**`/doctor/profile/languages`(Tested)
39. **Doctor adds Experience:**`/doctor/profile/experience`(Tested)
40. **Doctor adds Education:**`/doctor/profile/education`(Tested)
41. **Doctor adds Interest:**`/doctor/profile/interests`(Tested)
42. **Doctor deletes experience:**`/experience/:doctor_experience_id`(Tested)
43. **Doctor deletes education:**`education/:doctor_education_id`(Tested)
44. **Doctor deletes language:**`/languages/:language_id`(Tested)
45. **Doctor deletes Interest:**`interests/:doctor_interest_id`(Tested)


---

---

---

## **Endpoint Documentation**

1. **User Login:** `/login`

- **Method:** POST
- **Request Headers:**
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "patient4@test.com",
    "password": "test@123!"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Login successful",
    "token": ""
  }
  ```
- **Response Body (Account On_hold):**

  ```json
  {
    "message": "Account has not been activated yet"
  }
  ```

- **Response Body (Account Bannedd):**

  ```json
  {
  "message": "Account has  been Banned"
  }

  ---
  ```

2. **User Logout:** `/logout`

- **Method:** POST
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
  ***

3. **Patient Registration:** `/patient/register`

- **Method:** POST
- **Request Headers:**
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "fName": "Jacob",
    "lName": "Anderson",
    "email": "patient4@test.com",
    "password": "test@123!",
    "gender": "Male",
    "phone": "+521234567890",
    "birthDate": "1994-03-28"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Patient created successfully",
    "patient": {
      "user_id": 15,
      "user_first_name": "Jacob",
      "user_last_name": "Anderson",
      "user_email": "patient4@test.com",
      "user_phone_number": "+521234567890",
      "user_gender": "Male",
      "user_role": "Patient",
      "user_birth_date": "1994-03-27T22:00:00.000Z",
      "patient_wallet": 0
    }
  }
  ```
  ***

4. **Patient Profile Info:** `/patient/profile/info`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Response Body:**
  ```json
  {
    "message": "Patient info retrieved successfully",
    "formattedPatient": {
      "firstName": "David",
      "lastName": "Miller",
      "email": "patient4@test.com",
      "gender": "Male",
      "phone": "+442081234567",
      "languages": [null]
    }
  }
  ```
  ***

5. **Patient Appointments:** `/patient/profile/appointments`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Response Body:**
  ```json
  {
    "appointments": [
      {
        "appointment_patient_id": 3,
        "appointment_doctor_id": 13,
        "appointment_availability_slot": 2,
        "appointment_type": "Followup",
        "appointment_id": 2,
        "appointment_duration": 60,
        "appointment_complaint": "ta3ban ",
        "appointment_parent_reference": null,
        "appointment_settings_type": "Onsite",
        "patient_first_name": "mohamed ",
        "patient_last_name": "salem",
        "doctor_first_name": "samy",
        "doctor_last_name": "ali",
        "doctor_specialization": "Cardiology",
        "doctor_availability_day_hour": "2024-10-02T12:00:00.000Z"
      }
    ]
  }
  ```

---

6. **Patient Requests:** `/patient/profile/requests`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - **Response Body:**
  ```json
  {
    "appointments": [
      {
        "appointment_patient_id": 6,
        "appointment_doctor_id": 13,
        "appointment_type": "First_time",
        "appointment_duration": 30,
        "appointment_complaint": "chest pain",
        "appointment_parent_reference": null,
        "appointment_settings_type": null,
        "patient_first_name": "John",
        "patient_last_name": "Doe",
        "doctor_first_name": "samy",
        "doctor_last_name": "ali",
        "doctor_availability_day_hour": "2024-10-09T12:00:00.000Z"
      }
    ]
  }
  ```

---

7. **Patient Profile Edit:** `/patient/edit/info`

- **Method:** PUT
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "gender": "",
    "phone": "",
    "birthDate": "1999-05-11",
    "languages": ["French"]
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Patient info updated successfully",
    "patient": [
      {
        "user_id": 6,
        "user_first_name": "John",
        "user_last_name": "Doe",
        "user_email": "patient4@test.com",
        "user_gender": "Male",
        "user_phone_number": "+442081234567",
        "user_birth_date": "1999-05-10T21:00:00.000Z",
        "languages": ["French"]
      }
    ]
  }
  ```

---

8. **Patient Change Password:** `/patient/edit/password`

- **Method:** PUT
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "oldPassword": "test@123!!",
    "password": "test@123!",
    "confirmPassword": "test@123!"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Patient password updated successfully",
    "patient": [
      {
        "user_id": 6,
        "user_email": "patient4@test.com",
        "user_password_hash": "$2a$10$OOCQTu5MBH1NFK6KUWGrsO4CvfgUHHrAgFUjdomX145t1TbtQ7jvK",
        "user_role": "Patient",
        "user_phone_number": "+442081234567",
        "user_gender": "Male",
        "user_first_name": "John",
        "user_last_name": "Doe",
        "user_birth_date": "1999-05-10T21:00:00.000Z",
        "created_at": "2024-09-23T09:13:40.513Z",
        "updated_at": "2024-09-23T09:13:40.513Z"
      }
    ]
  }
  ```

---

9. **Patient Appointment Request:** `/patient/appointment/book`

- **Method:** POST
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "doctor_id": 14,
    "complaint": "Ta3baaan",
    "duration": 60,
    "appointment_type": "First_time",
    "appointment_date": "2024-09-26T14:00:00Z",
    "appointment_parent_reference": null,
    "time_slot_code": "1_03_S"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Appointment created successfully"
  }
  ```

---

10. **Patient Get Doctors Availability:** `/patient/appointment/Availabilities/:doctorId`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Response Body:**
  ```json
  {
    "available_slots": "2_01_L,7_10_L,7_11_L,7_12_L,7_09_L,7_08_L,7_07_L",
    "booked": [
      "2024-09-26T11:00:00.000Z",
      "2024-09-26T11:00:00.000Z",
      "2024-09-28T11:00:00.000Z",
      "2024-09-27T11:00:00.000Z",
      "2024-09-26T11:00:00.000Z",
      "2024-09-26T11:00:00.000Z"
    ]
  }
  ```

---

11. **Patient Get Appointment Details:** `/patient/appointment/appointmentdetails/:appointmentId`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Response Body:**
  ```json
  {
    "appointment": {
      "appointment_patient_id": 2,
      "appointment_doctor_id": 12,
      "appointment_availability_slot": 1,
      "appointment_type": "First_time",
      "appointment_duration": 30,
      "appointment_complaint": "Headache",
      "appointment_status": "Approved",
      "appointment_parent_reference": null,
      "appointment_settings_type": null,
      "patient_first_name": "yahya",
      "patient_last_name": "khalaf",
      "doctor_first_name": "Olivia",
      "doctor_last_name": "Martinez",
      "doctor_availability_day_hour": "2024-10-01T07:00:00.000Z",
      "doctor_specialization": "Internal Medicine",
      "doctor_clinic_location": "Maadi",
      "appointmentResults": [
        {
          "appointment_diagnosis": "Migraine",
          "appointment_report": "Patient will recover with rest and medication.",
          "updated_at": "2024-09-23T10:13:15.984Z"
        }
      ],
      "treatmentPlan": {
        "treatment_plan_operations": "Rest, medication",
        "treatment_plan_speciality_referral": null,
        "treatment_plan_referral_notes": null,
        "treatment_plan_id": 1
      },
      "medications": [
        {
          "medication_note": "For headache relief",
          "medication_start_date": "2024-09-30T21:00:00.000Z",
          "medication_end_date": "2024-10-06T21:00:00.000Z",
          "medication_id": 1,
          "medication_name": "Ibuprofen",
          "medication_dosage": "400mg, 3 times daily"
        }
      ],
      "medicalDocuments": []
    }
  }
  ```
  with wrong appointmentId:

```json
{
  "message": "Appointment not found"
}
```

---

12. **Patient Home (Dashboard):** `/patient/home`

- **Method:** GET
- **Response Body:**
  ```json
  [
    {
      "id": "12",
      "name": "Dr. Olivia Martinez",
      "nearestApp": "2024-09-23T20:28:41.256Z",
      "title": "Internal Medicine",
      "rating": 0,
      "numSessions": 0,
      "numReviews": 0,
      "fees60min": 150,
      "fees30min": 100,
      "image": null,
      "interests": [null],
      "country": "Egypt",
      "language": [null],
      "gender": "Female",
      "isOnline": "true"
    },
    {
      "id": "13",
      "name": "Dr. Ethan Wilson",
      "nearestApp": "2024-09-23T20:28:41.256Z",
      "title": "Cardiology",
      "rating": 0,
      "numSessions": 0,
      "numReviews": 0,
      "fees60min": 300,
      "fees30min": 200,
      "image": null,
      "interests": [null],
      "country": "USA",
      "language": [null],
      "gender": "Male",
      "isOnline": "true"
    }
  ]
  ```

---

13. **Patient Medical Document Upload:** `/patient/medical-document/upload`

- **Method:** POST
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: multipart/form-data`
- **Request Body:** (Multipart form data)

  - [`files`]("Go to definition"): The medical document file

- **Response Body:**
  ```json
  {
    "message": "Successfully uploaded ${insertedFiles.length} files from ${uploadedFiles.length}",
    "files": ""
  }
  ```

---

14. **Patient Medical Document Viewing:** `/patient/medical-document/view`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Request Body:**

  ```json
  {}
  ```

- **Response Body:**
  ```json
  {}
  ```

---

15. **Patient Medical Document Deletion:** `/patient/medical-document/delete`

- **Method:** DELETE
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Request Body:**

  ```json
  {}
  ```

- **Response Body:**
  ```json
  {}
  ```

---

16. **Doctor Profile Edit:** `/doctor/edit/info`

- **Method:** PUT
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "firstName": "samy",
    "lastName": "ali",
    "gender": "",
    "phone": "",
    "birthDate": "1989-08-27",
    "languages": ["Ordo"],
    "residenceCountry": "Oman",
    "sixtyMinPrice": "600",
    "thirtyMinPrice": "350",
    "specialization": ""
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Doctor info updated successfully",
    "doctor": [
      {
        "user_id": 13,
        "user_first_name": "samy",
        "user_last_name": "ali",
        "user_email": "doctor2@test.com",
        "user_gender": "Male",
        "user_phone_number": "+791234567890",
        "user_birth_date": "1997-05-21T21:00:00.000Z",
        "doctor_country": "Oman",
        "doctor_sixty_min_price": 600,
        "doctor_thirty_min_price": 350,
        "doctor_specialization": "Cardiology",
        "languages": ["Ordo"]
      }
    ]
  }
  ```

---

17. **Doctor Password Change:** `/doctor/edit/password`

- **Method:** PUT
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "oldPassword": "test@123!!",
    "password": "test@123!",
    "confirmPassword": "test@123!"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Doctor password updated successfully",
    "doctor": [
      {
        "user_id": 13,
        "user_email": "doctor2@test.com",
        "user_password_hash": "$2a$10$khI7nw4O4U1eyloFxyIiduQdWXdbq828519gjbYMNlMxv2/09BtHC",
        "user_role": "Doctor",
        "user_phone_number": "+791234567890",
        "user_gender": "Male",
        "user_first_name": "samy",
        "user_last_name": "ali",
        "user_birth_date": "1997-05-21T21:00:00.000Z",
        "created_at": "2024-09-23T09:17:29.138Z",
        "updated_at": "2024-09-23T09:17:29.138Z"
      }
    ]
  }
  ```

---

18. **Doctor Profile Info:** `/doctor/profile/info`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Response Body:**
  ```json
  {
    "message": "Doctor info retrieved successfully",
    "formattedDoctor": {
      "firstName": "samy",
      "lastName": "ali",
      "email": "doctor2@test.com",
      "gender": "Male",
      "phone": "+791234567890",
      "image": null,
      "residenceCountry": "Oman",
      "sixtyMinPrice": 600,
      "thirtyMinPrice": 350,
      "specialization": "Cardiology",
      "languages": ["Ordo"]
    }
  }
  ```

---

19. **Doctor View Appointments:** `Doctor/Profile/appointments`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Response Body:**
  ```json
  [
    {
      "appointment_patient_id": 3,
      "appointment_doctor_id": 13,
      "appointment_availability_slot": 2,
      "appointment_type": "Followup",
      "appointment_id": 2,
      "appointment_duration": 60,
      "appointment_complaint": "ta3ban ",
      "appointment_parent_reference": null,
      "appointment_settings_type": "Onsite",
      "patient_first_name": "mohamed ",
      "patient_last_name": "salem",
      "doctor_first_name": "samy",
      "doctor_last_name": "ali",
      "doctor_availability_day_hour": "2024-10-02T12:00:00.000Z"
    }
  ]
  ```

---

20. **Doctor View Pending Requests** `/Doctor/Profile/PendingRequests`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Response Body:**
  ```json
  [
    {
      "appointment_patient_id": 3,
      "appointment_doctor_id": 13,
      "appointment_availability_slot": 55,
      "appointment_id": 72,
      "appointment_type": "Followup",
      "appointment_duration": 30,
      "appointment_complaint": "I have a headache",
      "appointment_parent_reference": null,
      "appointment_settings_type": "Onsite",
      "patient_first_name": "mohamed ",
      "patient_last_name": "salem",
      "doctor_first_name": "samy",
      "doctor_last_name": "ali",
      "doctor_availability_day_hour": "2024-11-17T07:00:00.000Z"
    }
  ]
  ```

---

21. **Doctor View Availability:** `/doctor/availability/view`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Response Body:**
  ```json
  {
    "timeslots": [
      "1_01_S",
      "2_02_L",
      "3_03_S",
      "4_04_S",
      "5_05_L",
      "1_01_S",
      "2_02_L",
      "3_03_S",
      "4_04_S",
      "5_05_L"
    ]
  }
  ```

---

22. **Doctor View Personal Profile Further Information:** `/doctor/profile/DoctorFurtherInformation`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - **Response Body:**
  ```json
   {
    "certificates": [
        {
            "id": 22,
            "authority": "Test firm",
            "startDate": "2015-10-05T22:00:00.000Z",
            "endDate": "2024-10-05T21:00:00.000Z",
            "name": "Test title"
        }
    ],
    "experiences": [
        {
            "id": 14,
            "department": "Test certificate ",
            "firm": "Test auth ",
            "startDate": "2010-10-05T22:00:00.000Z",
            "endDate": "2014-10-05T22:00:00.000Z",
            "title": null
        }
    ],
    "interests": [
        {
            "id": 15,
            "category": "Cat1",
            "name": "Interest test 1"
        },
        {
            "id": 16,
            "category": "Cat2",
            "name": "Interest 2"
        }
    ],
    "languages": [
        {
            "id": 70,
            "name": "English"
        },
        {
            "id": 71,
            "name": "Spanish"
        },
        {
            "id": 72,
            "name": "French"
        },
        {
            "id": 73,
            "name": "Arabic"
        }
    ]
   }
  ```

---

<!-- 23. **Doctor View Education:** `/doctor/profile/education` -->

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`

---

24. **Doctor View Reviews:** `/doctor/profile/reviews`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`

---

25. **Doctor View Interests:** `/doctor/profile/interests`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`

---

26. **Doctor Availability Addition:** `/doctor/availability/add`

- **Method:** POST
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  ["1_01_S", "2_02_L", "3_03_M", "4_04_S", "5_05_L"]
  ```
- **Response Body:**
  ```json
  {
    "message": "Doctor availability added successfully"
  }
  ```

---

27. **Doctor Availability Deletion:** `/doctor/availability/delete`

- **Method:** DELETE
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  ["1_01_S", "2_02_L", "3_03_S", "4_04_S", "5_05_L"]
  ```

---

28. **Doctor Profile Picture Upload:** `/doctor/profile-picture/upload`

- **Method:** PUT
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: multipart/form-data`
- **Request Body:** (Multipart form data)
  - [`file`]("Go to definition"): The profile picture file
- **Response Body:**
  ```json
  {
    "message": "File uploaded successfully",
    "file": ""
  }
  ```

---

29. **Doctor Patient Prescription Addition:** `/doctor/patient-prescription/add/:appointmentId`

- **Method:** POST
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "patientId": 123,
    "medicationName": "Ibuprofen",
    "dosage": "200mg",
    "startDate": "2023-10-15",
    "endDate": "2023-10-25"
  }
  ```

---

30. **Doctor Appointment Confirm/Decline:** `/doctor/AppointmentResponse/:appointmentId/:response`

- **Method:** POST
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Parameters:**
  - [`appointmentId`]The ID of the appointment
  - [`response`]"accept" or "decline"
- **Response Body:**
  ```json
  {
  "message": "Appointment declined successfully"
  "or",
  "message": "Appointment accepted successfully"
  }
  ```

---

31. **Patient view appointments history:** `/patient/appointment/appointmentsHistory`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Response Body:**
  ```json
  {
    "appointments": [
      {
        "appointment_patient_id": 3,
        "appointment_doctor_id": 13,
        "appointment_availability_slot": 55,
        "appointment_type": "Followup",
        "appointment_id": 72,
        "appointment_duration": 30,
        "appointment_complaint": "I have a headache",
        "appointment_parent_reference": null,
        "appointment_settings_type": "Onsite",
        "patient_first_name": "mohamed ",
        "patient_last_name": "salem",
        "doctor_first_name": "samy",
        "doctor_last_name": "ali",
        "doctor_specialization": "Cardiology",
        "doctor_availability_day_hour": "2024-11-17T07:00:00.000Z"
      }
    ]
  }
  ```
  If no appointments are available:
  ```json
  { "message": "No Completed appointments found" }
  ```

---

32. **Doctor view appointments history:** `/doctor/appointmentHistory`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
  - `Content-Type: application/json`
- **Response Body:**
  ```json
  {
    "appointments": [
      {
        "appointment_patient_id": 3,
        "appointment_doctor_id": 13,
        "appointment_availability_slot": 55,
        "appointment_type": "Followup",
        "appointment_duration": 30,
        "appointment_complaint": "I have a headache",
        "appointment_parent_reference": null,
        "appointment_settings_type": "Onsite",
        "patient_first_name": "mohamed ",
        "patient_last_name": "salem",
        "doctor_first_name": "samy",
        "doctor_last_name": "ali",
        "doctor_specialization": "Cardiology",
        "doctor_availability_day_hour": "2024-11-17T07:00:00.000Z"
      }
    ]
  }
  ```
  If no appointments are available:
  ```json
  { "message": "No Completed appointments found" }
  ```

---

33. **Doctor view appointment details:** `/doctor/appointmentDetails/:appointmentId`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Response Body:**
  ```json
  {
    "appointment": {
      "appointment_patient_id": 2,
      "appointment_doctor_id": 12,
      "appointment_availability_slot": 1,
      "appointment_type": "First_time",
      "appointment_duration": 30,
      "appointment_complaint": "Headache",
      "appointment_status": "Approved",
      "appointment_parent_reference": null,
      "appointment_settings_type": "Onsite",
      "patient_first_name": "yahya",
      "patient_last_name": "khalaf",
      "doctor_first_name": "Olivia",
      "doctor_last_name": "Martinez",
      "doctor_availability_day_hour": "2024-10-01T07:00:00.000Z",
      "doctor_specialization": "Internal Medicine",
      "doctor_clinic_location": "Maadi",
      "appointmentResults": [
        {
          "appointment_diagnosis": "Migraine",
          "appointment_report": "Patient will recover with rest and medication.",
          "updated_at": "2024-09-23T10:13:15.984Z"
        }
      ],
      "treatmentPlan": {
        "treatment_plan_operations": "Rest, medication",
        "treatment_plan_speciality_referral": null,
        "treatment_plan_referral_notes": null,
        "treatment_plan_id": 1
      },
      "medications": [
        {
          "medication_note": "For headache relief",
          "medication_start_date": "2024-09-30T21:00:00.000Z",
          "medication_end_date": "2024-10-06T21:00:00.000Z",
          "medication_id": 1,
          "medication_name": "Ibuprofen",
          "medication_dosage": "400mg, 3 times daily"
        }
      ],
      "medicalDocuments": []
    }
  }
  ```
  with wrong appointmentId:

```json
{
  "message": "Appointment not found"
}
```

---

34. **Doctor view Patient appointments:** `/doctor/PatientSummary/:patientID`

- **Method:** GET
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Response Body:**

```json
{
  "appointments": [
    {
      "appointment_patient_id": 3,
      "appointment_doctor_id": 14,
      "appointment_id": 71,
      "appointment_type": "Followup",
      "appointment_duration": 30,
      "appointment_complaint": "I have a headache",
      "appointment_parent_reference": null,
      "appointment_settings_type": "Online",
      "patient_first_name": "mohamed ",
      "patient_last_name": "salem",
      "doctor_first_name": "Ava",
      "doctor_last_name": "Taylor",
      "doctor_availability_day_hour": "2024-10-03T06:00:00.000Z"
    }
  ]
}
```

with wrong appointmentId:

```json
{
  "message": "No Completed appointments found"
}
```

---

35. **Doctor submit appointment's results:** `doctor/AppointmentResults/:appointmentId/submitresults`

- **Method:** Post
- **Request Headers:**
  - `Authorization: Bearer your_access_token`
- **Parameters:**
  - [`appointmentId`]The ID of the appointment
- **Request Body:**
  ```json
  {
    "appointment_id": 71,
    "diagnosis": "Colonus",
    "operations": "Endoscope",
    "report": "Endoscope",
    "specialityReferral": "ENT",
    "specialityReferralNotes": "Take care",
    "medications": [
      {
        "dose": "500",
        "drugName": "Pentasa",
        "endDate": "2024-09-28",
        "note": "3 times",
        "startDate": "2024-09-08"
      },
      {
        "dose": "500",
        "drugName": "Solepred",
        "endDate": "2024-09-30",
        "note": "2 times ",
        "startDate": "2024-09-25"
      }
    ]
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Appointment result and treatment plan submitted successfully"
  }
  ```

---

36. **Doctor Registration:** `/doctor/register`

- **Method:** Post
- **Request Headers:**
- **Parameters:**
- **Request Body:**
  ````json
  {
  "personalInfo": {
  "firstName": "John",
  "lastName": "Doe",
  "birthdate": "1990-01-01",
  "city": "New York",
  "country": "United States",
  "email": "johndoe@example.com",
  "gender": "Male",
  "location": "New York, NY",
  "password": "password123",
  "phone": "+1 123-456-7890",
  "speciality": "Software Engineer"
  },
  "certificates": [
  {
  "authority": "American College of Surgeons",
  "endDate": "2025-12-31",
  "name": "Board Certified General Surgeon",
  "startDate": "2020-01-01"
  },
  {
  "authority": "American Medical Association",
  "endDate": "2024-12-31",
  "name": "Fellow of the American College of Surgeons",
  "startDate": "2018-01-01"
  }
  ],
  "experiences": [
  {
  "department": "General Surgery",
  "endDate": "2024-06-30",
  "firm": "St. Mary's Hospital",
  "startDate": "2020-07-01",
  "title": "Attending Surgeon"
  },
  {
  "department": "Surgical Oncology",
  "endDate": "2022-12-31",
  "firm": "Memorial Sloan Kettering Cancer Center",
  "startDate": "2018-01-01",
  "title": "Clinical Fellow"
  }
  ],
  "interests": [
  {
  "category": "Medical Research",
  "name": "Surgical Oncology"
  },
  {
  "category": "Teaching",
  "name": "Medical Student Education"
  }
  ],
  "Languages": [
  "English",
  "Spanish"
  ]
  }
      ```
  ````
- **Response Body:**

  ```json
  {
    "message": "Doctor created successfully",
    "doctor": {
      "user_id": 52,
      "user_first_name": "John",
      "user_last_name": "Doe",
      "user_email": "johndoe@example.com",
      "user_phone_number": "+1 123-456-7890",
      "user_gender": "Male",
      "user_role": "Doctor",
      "user_birth_date": "1989-12-31T22:00:00.000Z",
      "doctor_user_id_reference": 52,
      "doctor_specialization": "Software Engineer",
      "doctor_country": "United States",
      "doctor_city": "New York",
      "doctor_clinic_location": "New York, NY",
      "doctor_account_state": "On_hold"
    },
    "certificates": true,
    "experiences": true,
    "interests": true,
    "Languages": true
  }
  ```
37. **Doctor Books Followup Appointment:** `/doctor/FollowupAppointment`

- **Method:** Post
- **Request Headers:**
- **Parameters:**
- **Request Body:**
  ````json
  { "appointmentId":150,
  "complaint": "Follow-up on prior diagnosis",
  "duration": 30,
  "appointment_date": "2025-12-01 19:00:00",
  "time_slot_code": "4_11_L"
  }
      ```
  ````
- **Response Body:**

  ```json
  {
    "message": "Followup Appointment created successfully"
    
  }
  ```
38. **Doctor adds language:**`/doctor/profile/languages`(Tested)

- **Method:** Post
- **Request Headers:**
- **Parameters:**
- **Request Body:**
  ````json
  {
  "doctor_id": "56",
  "language": "seeny"
  }
      ```
  ````
- **Response Body:**

  ```json
  {
    "message": "New Language added"
    
  }
  ```
39. **Doctor adds Experience:**`/doctor/profile/experience`(Tested)

- **Method:** Post
- **Request Headers:**
- **Parameters:**
- **Request Body:**
  ````json
  {
  "experience": {
    "doctor_experience_job_title": "Senior Surgeon",
    "doctor_experience_firm_name": "City Hospital",
    "doctor_experience_department": "Surgery",
    "doctor_experience_start_date": "2020-01-15",
    "doctor_experience_end_date": "2023-10-01"
  }
  }
      ```
  ````
- **Response Body:**

  ```json
  {
    "message": "New Experience added"
    
  }
  ```
  40. **Doctor adds Education:**`/doctor/profile/education`(Tested)
  
- **Method:** Post
- **Request Headers:**
- **Parameters:**
- **Request Body:**
  ````json
  {
  "education": {
    "education_certificate": "MD in Internal Medicine",
    "education_authority": "Harvard Medical School",
    "education_start_date": "2015-09-01",
    "education_end_data": "2020-06-30"
  }
  }

      ```
  ````
- **Response Body:**

  ```json
  {
    "message": "New Certificate added"
    
  }
  ```
  40. **Doctor adds Interest:**`/doctor/profile/interests`(Tested)
  
- **Method:** Post
- **Request Headers:**
- **Parameters:**
- **Request Body:**
  ````json
  {
  "Interest": {
    "interest.doctor_interest_category": "Games",
    "interest.doctor_interest_name": "COD"
  }
  }

      ```
  ````
- **Response Body:**

  ```json
  {
    "message": "New Interest added"
    
  }
  ```
42. **Doctor deletes experience:**`/experience/:doctor_experience_id`(Tested)
- **Method:** Delete
- **Request Headers:**
- **Parameters:**
 - [`doctor_experience_id`]

- **Response Body:**

  ```json
  {
    "message": "Experience deleted successfully"
    
  }
  ```
43. **Doctor deletes education:**`education/:doctor_education_id`(Tested)
- **Method:** Delete
- **Request Headers:**
- **Parameters:**
 - [`doctor_education_id`]

- **Response Body:**

  ```json
  {
    "message": "Education deleted successfully"
    
  }
  ```
44. **Doctor deletes language:**`/languages/:language_id`(Tested)
- **Method:** Delete
- **Request Headers:**
- **Parameters:**
 - [`language_id`]

- **Response Body:**

  ```json
  {
    "message": "Language deleted successfully"
    
  }
  ```
45. **Doctor deletes Interest:**`interests/:doctor_interest_id`(Tested)
- **Method:** Delete
- **Request Headers:**
- **Parameters:**
 - [`doctor_interest_id`]

- **Response Body:**

  ```json
  {
    "message": "Interest deleted successfully"
    
  }
  ```