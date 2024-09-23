## **TeleMedPilot End points documentation**

### **General Notes**
##### **- This is a primary documentation for each endpoint in the the application just for development in integration tests.**
##### **- If you face any issues with integration don't hesitate to contact any of our APIs developers**
##### **- Add this root URL before each endpoint to access the deployed server**
**(https://telemedicine-pilot-d2anbuaxedbfdba9.southafricanorth-01.azurewebsites.net)**

---
#### Endpoints listed are:
1. **User Login:** `/login`
2. **User Logout:** `/logout`
3. **Patient Registration:** `/patient/register`
4. **Patient Profile info:** `/patient/profile/info`
5. **Patient appointments:** `/patient/profile/appointments`
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

2. **User Logout:** `/logout`
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

3. **Patient Registration:** `/patient/register`
  * **Method:** POST
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

4. **Patient Profile Info:** `/patient/profile/info`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

5. **Patient Appointments:** `/patient/profile/appointments`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
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

8. **Patient Change Password:** `/patient/edit/password`
  * **Method:** PUT
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

9. **Patient Appointment Request:** `/patient/appointment/book`
  * **Method:** POST
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
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

13. **Patient Medical Document Upload:** `/patient/medical-document/upload`
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Request Body:** (Multipart form data)
    * `file`: The medical document file
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
  * **Request Body:**
    ```json
    {

    }
    ```
    ---

17. **Doctor Password Change:** `/doctor/edit/password`
  * **Method:** PUT
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Request Body:**
    ```json
    {
      

    }
    ```
    ---

18. **Doctor Profile Info:** `/doctor/profile/info`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
    ---

19. **Doctor View Appointments:** `/doctor/profile/appointments`
  * **Method:** GET
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
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
    ---

27. **Doctor Profile Picture Upload:** `/doctor/profile-picture/upload`
  * **Method:** PUT
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
  * **Request Body:** (Multipart form data)
    * `file`: The profile picture file
    ---

28. **Doctor Patient Prescription Addition:** `/doctor/patient-prescription/add/:appointmentId`
  * **Method:** POST
  * **Request Headers:**
    * `Authorization: Bearer your_access_token`
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
  * **Parameters:**
    * `appointmentId`: The ID of the appointment
    * `response`: "accept" or "decline"
    ---


