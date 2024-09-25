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
10. **Patient Get doctors availability:** `/patient/appointment/Availabilities/:doctorId`(tested)
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
21. **Doctor View Availability:** `/doctor/profile/availabilities`(Tested)
22. **Doctor View Experience:** `/doctor/profile/experience`
23. **Doctor View Education:** `/doctor/profile/education`
24. **Doctor View reviews:** `/doctor/profile/reviews`
25. **Doctor View interests:** `/doctor/profile/interests`
26. **Doctor Availability Addition:** `/doctor/availability/add`(Tested)
27. **Doctor Availability Deletion:** `/doctor/availability/delete`(Tested)
28. **Doctor Profile Picture Upload:** `/doctor/profile-picture/upload`
29. **Doctor Patient Prescription Addition:** `/doctor/patient-prescription/add`(Canceled)
30. **Doctor Appointment Confirm/Decline:** `/doctor/AppointmentResponse/:appointmentId/:response`(Tested)
31. **Patient view appointments history:** `/patient/appointment/appointmentsHistory`(Tested)
32. **Doctor view appointments history:** `/doctor/appointmentHistory`(Tested)
33. **Doctor view appointment details:** `/doctor/appointmentDetails/:appointmentId`(Tested)
34. **Doctor view Patient appointments:** `/doctor/PatientSummary/:patientID`(Tested)

---
---
---

## **Endpoint Documentation**

1. **User Login:** `/login`
  * **Method:** POST
  * **Request Headers:**
    * `Content-Type: application/json`
  * **Request Body:**
    ```json
    {
      "email": "patient4@test.com",
      "password": "test@123!"
    }
    ```
  * **Response Body:**
    ```json
    {
    "message": "Login successful",
    "token": ""
    }
    ```

    ---

2. **User Logout:** `/logout`
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
    ---

3. **Patient Registration:** `/patient/register`
  * **Method:** POST
  * **Request Headers:**
    * `Content-Type: application/json`
  * **Request Body:**
    ```json
    {"fName": "Jacob",
    "lName": "Anderson",
    "email": "patient4@test.com",
    "password": "test@123!",
    "gender": "Male",
    "phone": "+521234567890",
    "birthDate": "1994-03-28"
    }
    ```
  * **Response Body:**
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
    ---

4. **Patient Profile Info:** `/patient/profile/info`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
    ```json
    {
    "message": "Patient info retrieved successfully",
    "formattedPatient": {
        "firstName": "David",
        "lastName": "Miller",
        "email": "patient4@test.com",
        "gender": "Male",
        "phone": "+442081234567",
        "languages": [
            null
        ]
    }
    }
    ```
    ---

5. **Patient Appointments:** `/patient/profile/appointments`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
    ```json
    {
    "appointments": [
        {
            "appointment_patient_id": 3,
            "appointment_doctor_id": 13,
            "appointment_availability_slot": 2,
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
            "doctor_availability_day_hour": "2024-10-02T12:00:00.000Z"
        }]}
---

6. **Patient Requests:** `/patient/profile/requests`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * **Response Body:**
    ```json
    {
    "appointments": [
        {
            "appointment_patient_id": 6,
            "appointment_doctor_id": 13,
            "appointment_availability_slot": 5,
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
        }]}
---

7. **Patient Profile Edit:** `/patient/edit/info`
  * **Method:** PUT
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Request Body:**
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
  * **Response Body:**
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
            "languages": [
                "French"
            ]
           }
         ]
      }
---

8. **Patient Change Password:** `/patient/edit/password`
  * **Method:** PUT
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Request Body:**
    ```json
    {
      "oldPassword": "test@123!!",
      "password": "test@123!",
      "confirmPassword": "test@123!"
    }
    ```
  * **Response Body:**
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
---

9. **Patient Appointment Request:** `/patient/appointment/book`
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Request Body:**
    ```json
      {
      "appointment_availability_slot": 1, // Replace with actual slot ID
      "complaint": "I have a headache",
      "duration": 30,
      "appointment_settings_type": "Online",
      "appointment_type": "Followup",
      "appointment_parent_reference": null
        }
    ```
  * **Response Body:**
    ```json
    {
    "message": "Appointment scheduled successfully"
    }
---

10. **Patient Get Doctors Availability:** `/patient/appointment/Availabilities/:doctorId`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
    ```json
    {
    "message": "Doctor availabilities retrieved successfully",
    "availabilities": {
        "Wed Oct 9 2024": [
            {
                "time": "15:00:00",
                "id": 5
            }
        ],
        "Wed Oct 2 2024": [
            {
                "time": "15:00:00",
                "id": 8
            },
            {
                "time": "15:00:00",
                "id": 2
            }
        ],
        "Fri Feb 2 2024": [
            {
                "time": "15:00:00",
                "id": 11
            }
        ],
        "Tue Feb 13 2024": [
            {
                "time": "15:00:00",
                "id": 14
            }
        ]
    }
    }
---

11. **Patient Get Appointment Details:** `/patient/appointment/appointmentdetails/:appointmentId`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
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
  * **Method:** GET
  * **Response Body:**
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
          "interests": [
              null
          ],
          "country": "Egypt",
          "language": [
              null
          ],
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
          "interests": [
              null
          ],
          "country": "USA",
          "language": [
              null
          ],
          "gender": "Male",
          "isOnline": "true"
      }]
      ```
    
---

13. **Patient Medical Document Upload:** `/patient/medical-document/upload`
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: multipart/form-data`
  * **Request Body:** (Multipart form data)
    * [`files`]("Go to definition"): The medical document file

  * **Response Body:**
    ```json
    {
      "message": "Successfully uploaded ${insertedFiles.length} files from ${uploadedFiles.length}",
      "files": ""
    }
    ```
---

14. **Patient Medical Document Viewing:** `/patient/medical-document/view`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Request Body:**
    ```json
    {

    }
    ```
  * **Response Body:**
    ```json
    {
     
    }
    ```
---

15. **Patient Medical Document Deletion:** `/patient/medical-document/delete`
  * **Method:** DELETE
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Request Body:**
    ```json
    {

    }
    ```
  * **Response Body:**
    ```json
    {
     
    }
    ```
---

16. **Doctor Profile Edit:** `/doctor/edit/info`
  * **Method:** PUT
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Request Body:**
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
  * **Response Body:**
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
            "languages": [
                "Ordo"
            ]
        }
    ]
    }
    ```
---

17. **Doctor Password Change:** `/doctor/edit/password`
  * **Method:** PUT
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Request Body:**
    ```json
    {
      "oldPassword": "test@123!!",
      "password": "test@123!",
      "confirmPassword": "test@123!"
    }
    ```
  * **Response Body:**
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
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
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
        "languages": [
            "Ordo"
        ]
    }
    }
    ```
---

19. **Doctor View Appointments:** `Doctor/Profile/appointments`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
    ```json
      [
        {
            "appointment_patient_id": 6,
            "appointment_doctor_id": 13,
            "appointment_availability_slot": 5,
            "appointment_type": "First_time",
            "appointment_duration": 30,
            "appointment_complaint": "arm pain",
            "appointment_parent_reference": null,
            "appointment_settings_type": null,
            "patient_first_name": "John",
            "patient_last_name": "Doe",
            "doctor_first_name": "samy",
            "doctor_last_name": "ali",
            "doctor_availability_day_hour": "2024-10-09T12:00:00.000Z"
        }
        ]
    ```
---
20. **Doctor View Pending Requests** `/Doctor/Profile/PendingRequests`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Response Body:**
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
21. **Doctor View Availability:** `/doctor/profile/availabilities`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
    ```json
    {
    "message": "Doctor availabilities retrieved successfully",
    "availabilities": {
        "Wed Oct 2 2024": [
            {
                "time": "15:00:00",
                "id": 2,
                "type": "Onsite"
            },
            {
                "time": "15:00:00",
                "id": 8,
                "type": "Onsite"
            }
        ],
        "Wed Oct 9 2024": [
            {
                "time": "15:00:00",
                "id": 5,
                "type": "Onsite"
            }
        ],
        "Fri Feb 2 2024": [
            {
                "time": "15:00:00",
                "id": 11,
                "type": "Onsite"
            }
        ],
        "Tue Feb 13 2024": [
            {
                "time": "15:00:00",
                "id": 14,
                "type": "Onsite"
            }
        ]
    }
    }
    ```
---

22. **Doctor View Experience:** `/doctor/profile/experience`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
---

23. **Doctor View Education:** `/doctor/profile/education`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
---

24. **Doctor View Reviews:** `/doctor/profile/reviews`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
---

25. **Doctor View Interests:** `/doctor/profile/interests`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
---

26. **Doctor Availability Addition:** `/doctor/availability/add`
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Request Body:**
    ```json
        [
      {
        "doctor_availability_type": "Online",
        "doctor_availability_day_hour": "2024-10-25 11:00:00"
      },
      {
        "doctor_availability_type": "Onsite",
        "doctor_availability_day_hour": "2024-11-01 14:00:00"
      },
      {
        "doctor_availability_type": "Online/Onsite",
        "doctor_availability_day_hour": "2024-11-10 09:00:00"
      }
        ]
    ```
  * **Response Body:**
    ```json
    {
    "message": "Doctor availability added successfully"
    }
---

27. **Doctor Availability Deletion:** `/doctor/availability/delete/{availabilityId}`
  * **Method:** DELETE
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Request Body:**
    ```json
        {
    "appointmentIds": [
      1,2,3,4
      ]
      }

      
  * **Response Body:**
    ```json
        {
        "deleted": [
            4
        ],
        "failed": [
          1,
          2,
          3
      ],
      "message": "Some appointments could not be deleted."
      }     
---

28. **Doctor Profile Picture Upload:** `/doctor/profile-picture/upload`
  * **Method:** PUT
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: multipart/form-data`
  * **Request Body:** (Multipart form data)
    * [`file`]("Go to definition"): The profile picture file
  * **Response Body:**
    ```json
    {
      "message": "File uploaded successfully",
      "file": ""
    }

---

29. **Doctor Patient Prescription Addition:** `/doctor/patient-prescription/add/:appointmentId`
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Request Body:**
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
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Parameters:**
    * [`appointmentId`]The ID of the appointment
    * [`response`]"accept" or "decline"
  * **Response Body:**
    ```json
    {
    "message": "Appointment declined successfully"
    "or",
    "message": "Appointment accepted successfully"
    }
    ```
---
31. **Patient view appointments history:** `/patient/appointment/appointmentsHistory`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Response Body:**
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

  32. **Doctor view appointments history:** `/doctor/appointmentHistory`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Response Body:**
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
          }]}
    ```
    If no appointments are available:
    ```json
       { "message": "No Completed appointments found" }
    ```
---

33. **Doctor view appointment details:** `/doctor/appointmentDetails/:appointmentId`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
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

  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
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