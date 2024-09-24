import 'package:flutter_dotenv/flutter_dotenv.dart';

class AppConstants {
  // Load from .env
  static final String baseURL = dotenv.env['BASE_URL'] ?? '';
  static final String accessTokenSecretKey =
      dotenv.env['ACCESS_TOKEN_SECRET_KEY'] ?? '';

  // Images
  static const String logo = 'assets/logo.png';
  static const String emptyProfile = 'assets/pp.png';

  // Endpoints URLs
  static String get loginEndpoint => '$baseURL/login';
  static String get logoutEndpoint => '$baseURL/logout';
  static String get patientRegisterEndpoint => '$baseURL/patient/register';
  static String get patientProfileEndpoint => '$baseURL/patient/profile/info';
  static String get patientAppointmentsEndpoint =>
      '$baseURL/patient/profile/appointments';
  static String get patientEditEndpoint => '$baseURL/patient/edit';
  static String get patientAppointmentBookEndpoint =>
      '$baseURL/patient/appointment/book';
  static String get patientHomeEndpoint => '$baseURL/patient/home';
  static String get patientAddPrescriptionEndpoint =>
      '$baseURL/patient/prescription/add';
  static String get patientViewPrescriptionEndpoint =>
      '$baseURL/patient/prescription/view';
  static String get patientDeletePrescriptionEndpoint =>
      '$baseURL/patient/prescription/delete';
  static String get patientUploadMedicalDocumentEndpoint =>
      '$baseURL/patient/medical-document/upload';
  static String get patientViewMedicalDocumentEndpoint =>
      '$baseURL/patient/medical-document/view';
  static String get patientDeleteMedicalDocumentEndpoint =>
      '$baseURL/patient/medical-document/delete';
  static String get doctorEditEndpoint => '$baseURL/doctor/edit';
  static String get doctorProfileEndpoint => '$baseURL/doctor/profile';
  static String get doctorAddAvailabilityEndpoint =>
      '$baseURL/doctor/availability/add';
  static String get doctorDeleteAvailabilityEndpoint =>
      '$baseURL/doctor/availability/delete';
  static String get doctorProfilePictureUploadEndpoint =>
      '$baseURL/doctor/profile-picture/upload';
  static String doctorAvailability(int doctorId) =>
      '$baseURL/patient/appointment/Availabilities/$doctorId';
}
