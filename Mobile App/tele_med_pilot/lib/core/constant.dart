class AppConstants {
  //Images
  static const String logo = 'assets/logo.png';
  static const String emptyProfile = 'assets/pp.png';

  //Base server URL
  static const String baseURL = 'https://telemedicine-pilot-d2anbuaxedbfdba9.southafricanorth-01.azurewebsites.net';
  // Endpoints URLs
  static const String  loginEndpoint = '/login';
  static const String  LogoutEndpoint='/logout';
  static const String  patientRegisterEndpoint='/patient/register';
  static const String  patientProfileEndpoint='/patient/profile';
  static const String  patientEditEndpoint='/patient/edit';
  static const String  patientAppointmentBookEndpoint='/patient/appointment/book';
  static const String  patientHomeEndpoint='/patient/home';
  static const String  patientAddPrescriptionEndpoint='/patient/prescription/add';
  static const String  patientViewPrescriptionEndpoint='/patient/prescription/view';
  static const String  patientDeletePrescriptionEndpoint='/patient/prescription/delete';
  static const String  patientUploadMedicalDocumentEndpoint='/patient/medical-document/upload';
  static const String  patientViewMedicalDocumentEndpoint='/patient/medical-document/view';
  static const String  patientDeleteMedicalDocumentEndpoint='/patient/medical-document/delete';
  static const String  doctorEditEndpoint='/doctor/edit';
  static const String  doctorProfileEndpoint='/doctor/profile';
  static const String  doctorAddAvailabilityEndpoint='/doctor/availability/add';
  static const String  doctorDeleteAvailabilityEndpoint='/doctor/availability/delete';
  static const String  doctorProfilePictureUploadEndpoint='/doctor/profile-picture/upload';
}
