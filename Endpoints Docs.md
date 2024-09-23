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
9. **Patient Appointment Request:** `/patient/appointment/book`
10. **Patient Get doctors availability:** `/patient/appointment/Availabilities/:doctorId`
11. **Patient Get Appointment details:** `/patient/appointment/appointmentdetails/:appointmentId`
12. **Patient Home (Dashboard):** `/patient/home`
13. **Patient Medical Document Upload:** `/patient/medical-document/upload`
14. **Patient Medical Document Viewing:** `/patient/medical-document/view`
15. **Patient Medical Document Deletion:** `/patient/medical-document/delete`
16. **Doctor Profile Edit:** `/doctor/edit/info`
17. **Doctor Password change:** `/doctor/edit/password`
18. **Doctor Profile info:** `/doctor/profile/info`
19. **Doctor View appointments** `/doctor/profile/appointments`
20. **Doctor View Pending Requests** `/Doctor/Profile/PendingRequests`(Tested)
21. **Doctor View Availability:** `/doctor/profile/availabilities`(Tested)
22. **Doctor View Experience:** `/doctor/profile/experience`
23. **Doctor View Education:** `/doctor/profile/education`
24. **Doctor View reviews:** `/doctor/profile/reviews`
25. **Doctor View interests:** `/doctor/profile/interests`
26. **Doctor Availability Addition:** `/doctor/availability/add`
27. **Doctor Availability Deletion:** `/doctor/availability/delete`
28. **Doctor Profile Picture Upload:** `/doctor/profile-picture/upload`
29. **Doctor Patient Prescription Addition:** `/doctor/patient-prescription/add`
30. **Doctor Appointment Confirm/Decline:** `/doctor/AppointmentResponse/:appointmentId/:response`
(Tested)

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
  "birthDay": "1994-03-28"}
  
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
            "appointment_patient_id": 6,
            "appointment_doctor_id": 13,
            "appointment_availability_slot": 5,
            "appointment_type": "First_time",
            "appointment_duration": 30,
            "appointment_id": 8,
            "appointment_complaint": "arm pain",
            "appointment_status": "Approved",
            "created_at": "2024-09-23T10:12:35.903Z",
            "updated_at": "2024-09-23T10:12:35.903Z",
            "appointment_parent_reference": null,
            "appointment_settings_type": null,
            "doctor": {
                "firstName": "Ethan",
                "lastName": "Wilson",
                "specialization": "Cardiology",
                "clinicLocation": null
            }
        }
    ]
    }
    ```
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
            "appointment_id": 14,
            "appointment_complaint": "chest pain",
            "appointment_status": "Declined",
            "created_at": "2024-09-23T10:12:52.291Z",
            "updated_at": "2024-09-23T10:12:52.291Z",
            "appointment_parent_reference": null,
            "appointment_settings_type": null,
            "doctor": {
                "firstName": "Ethan",
                "lastName": "Wilson",
                "specialization": "Cardiology",
                "clinicLocation": null
            }
        },
        {
            "appointment_patient_id": 6,
            "appointment_doctor_id": 13,
            "appointment_availability_slot": 5,
            "appointment_type": "Followup",
            "appointment_duration": 60,
            "appointment_id": 5,
            "appointment_complaint": "headache",
            "appointment_status": "Pending",
            "created_at": "2024-09-23T10:12:33.849Z",
            "updated_at": "2024-09-23T10:12:33.849Z",
            "appointment_parent_reference": null,
            "appointment_settings_type": null,
            "doctor": {
                "firstName": "Ethan",
                "lastName": "Wilson",
                "specialization": "Cardiology",
                "clinicLocation": null
            }
        }
    ]
    }
    ```
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
    ```
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
    ```
    ---

9. **Patient Appointment Request:** `/patient/appointment/book`
  * **Method:** POST
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

10. **Patient Get Doctors Availability:** `/patient/appointment/Availabilities/:doctorId`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

11. **Patient Get Appointment Details:** `/patient/appointment/appointmentdetails/:appointmentId`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

12. **Patient Home (Dashboard):** `/patient/home`
  * **Method:** GET
  * **Response Body:**
    ```json
    {
      "doctors": ""
    }
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
      "firstName": "",
      "lastName": "",
      "gender": "",   
      "phone": "",
      "birthYear": "1980",
      "languages": [""],
      "residenceCountry": "",
      "sixtyMinPrice": "",
      "thirtyMinPrice": "",
      "specialization": ""
    }
    ```
  * **Response Body:**
    ```json
    {
      "message": "Doctor info updated successfully",
      "doctor": ""

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
      "oldPassword": "",
      "password": "",
      "confirmPassword": ""
    }
    ```
  * **Response Body:**
    ```json
    {
      "message": "Doctor password updated successfully",
      "doctor": ""
    } ```
    ---

18. **Doctor Profile Info:** `/doctor/profile/info`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Response Body:**
    ```json
    {
      "message": "Doctor info retrieved successfully",
      "formattedDoctor": ""
    }
    ```
    ---

19. **Doctor View Appointments:** `/doctor/profile/appointments`
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
        "appointment_id": 8,
        "appointment_complaint": "arm pain",
        "appointment_status": "Approved",
        "created_at": "2024-09-23T10:12:35.903Z",
        "updated_at": "2024-09-23T10:12:35.903Z",
        "appointment_parent_reference": null,
        "appointment_settings_type": null
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
    {
    [
    {
        "appointment_patient_id": 3,
        "appointment_doctor_id": 13,
        "appointment_availability_slot": 2,
        "appointment_type": "Followup",
        "appointment_duration": 60,
        "appointment_id": 2,
        "appointment_complaint": "Fever",
        "appointment_status": "Pending",
        "created_at": "2024-09-23T10:11:35.189Z",
        "updated_at": "2024-09-23T10:11:35.189Z",
        "appointment_parent_reference": null,
        "appointment_settings_type": null
    },
    {
        "appointment_patient_id": 6,
        "appointment_doctor_id": 13,
        "appointment_availability_slot": 5,
        "appointment_type": "Followup",
        "appointment_duration": 60,
        "appointment_id": 5,
        "appointment_complaint": "headache",
        "appointment_status": "Pending",
        "created_at": "2024-09-23T10:12:33.849Z",
        "updated_at": "2024-09-23T10:12:33.849Z",
        "appointment_parent_reference": null,
        "appointment_settings_type": null
    }
    ]
    }
    ```
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
    {
    
    }
    ```
    ---

27. **Doctor Availability Deletion:** `/doctor/availability/delete/{availabilityId}`
  * **Method:** DELETE
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
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
    ```
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