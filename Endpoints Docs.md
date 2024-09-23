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
6. **Patient Requests:** `/patient/profile/requests`
7. **Patient Profile Edit:** `/patient/edit/info`
8. **Patient Change Password:** `/patient/edit/password`
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
20. **Doctor View Availability:** `/doctor/profile/availabilities`
21. **Doctor View Experience:** `/doctor/profile/experience`
22. **Doctor View Education:** `/doctor/profile/education`
23. **Doctor View reviews:** `/doctor/profile/reviews`
24. **Doctor View interests:** `/doctor/profile/interests`
25. **Doctor Availability Addition:** `/doctor/availability/add`
26. **Doctor Availability Deletion:** `/doctor/availability/delete`
27. **Doctor Profile Picture Upload:** `/doctor/profile-picture/upload`
28. **Doctor Patient Prescription Addition:** `/doctor/patient-prescription/add`
29. **Doctor Appointment Confirm/Decline:** `/doctor/AppointmentResponse/:appointmentId/:response`
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
      "birthYear": "",
      "languages": ["French"]
    }
    ```
  * **Response Body:**
    ```json
    {
      "message": "Patient info updated successfully",
      "patient": ""
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
      "oldPassword": "",
      "password": "",
      "confirmPassword": ""
    }
    ```
  * **Response Body:**
    ```json
    {
      "message": "Patient password updated successfully",
      "patient": ""
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
    {
      "appoointments": ""
    }
    ```
    ---

20. **Doctor View Availability:** `/doctor/profile/availabilities`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

21. **Doctor View Experience:** `/doctor/profile/experience`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

22. **Doctor View Education:** `/doctor/profile/education`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

23. **Doctor View Reviews:** `/doctor/profile/reviews`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

24. **Doctor View Interests:** `/doctor/profile/interests`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

25. **Doctor Availability Addition:** `/doctor/availability/add`
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

26. **Doctor Availability Deletion:** `/doctor/availability/delete/{availabilityId}`
  * **Method:** DELETE
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
    ---

27. **Doctor Profile Picture Upload:** `/doctor/profile-picture/upload`
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

28. **Doctor Patient Prescription Addition:** `/doctor/patient-prescription/add/:appointmentId`
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

29. **Doctor Appointment Confirm/Decline:** `/doctor/AppointmentResponse/:appointmentId/:response`
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    * `Content-Type: application/json`
  * **Parameters:**
    * [`appointmentId`]("Go to definition"): The ID of the appointment
    * [`response`]("Go to definition"): "accept" or "decline"
    ---