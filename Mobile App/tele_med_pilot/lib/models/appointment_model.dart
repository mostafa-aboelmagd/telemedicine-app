import 'package:tele_med_pilot/models/appointment_result_model.dart';
import 'package:tele_med_pilot/models/medical_documents_model.dart';
import 'package:tele_med_pilot/models/medication_model.dart';
import 'package:tele_med_pilot/models/treatment_plan_model.dart';

class AppointmentModel {
  final int? appointmentId;

  ///
  final int? patientId;
  final int? doctorId;
  final int? availabilitySlot;
  final String? appointmentType;
  final int? appointmentDuration;
  final String? appointmentComplaint;
  final String? appointmentStatus;
  final int? appointmentParentReference;
  final String? appointmentSettingsType;
  final String? patientFirstName;
  final String? patientLastName;
  final String? doctorFirstName;
  final String? doctorLastName;
  final String? doctorSpecialization;
  final String? doctorClinicLocation;
  final DateTime appointmentDate;
  final List<AppointmentResult>? appointmentResults;
  final TreatmentPlan? treatmentPlan;
  final List<Medication>? medications;
  final List<MedicalDocument>? medicalDocuments;

  AppointmentModel({
    required this.appointmentId,
    required this.patientId,
    required this.doctorId,
    required this.availabilitySlot,
    this.appointmentType,
    required this.appointmentDuration,
    this.appointmentComplaint,
    this.appointmentStatus,
    this.appointmentParentReference,
    this.appointmentSettingsType,
    required this.patientFirstName,
    required this.patientLastName,
    required this.doctorFirstName,
    required this.doctorLastName,
    this.doctorSpecialization,
    this.doctorClinicLocation,
    required this.appointmentDate,
    this.appointmentResults,
    this.treatmentPlan,
    this.medications,
    this.medicalDocuments,
  });

  // Factory method to parse JSON response
  factory AppointmentModel.fromJson(Map<String, dynamic> json) {
    return AppointmentModel(
      appointmentId: json['appointment_id'],
      patientId: json['appointment_patient_id'],
      doctorId: json['appointment_doctor_id'],
      availabilitySlot: json['appointment_availability_slot'],
      appointmentType: json['appointment_type'],
      appointmentDuration: json['appointment_duration'],
      appointmentComplaint: json['appointment_complaint'],
      appointmentStatus: json['appointment_status'], // New
      appointmentParentReference: json['appointment_parent_reference'],
      appointmentSettingsType: json['appointment_settings_type'],
      patientFirstName: json['patient_first_name'],
      patientLastName: json['patient_last_name'],
      doctorFirstName: json['doctor_first_name'],
      doctorLastName: json['doctor_last_name'],
      doctorSpecialization: json['doctor_specialization'],
      doctorClinicLocation: json['doctor_clinic_location'], // New
      appointmentDate: DateTime.parse(json['doctor_availability_day_hour']),
      appointmentResults: (json['appointmentResults'] as List?)
          ?.map((e) => AppointmentResult.fromJson(e))
          .toList(),
      treatmentPlan: json['treatmentPlan'] != null
          ? TreatmentPlan.fromJson(json['treatmentPlan'])
          : null,
      medications: (json['medications'] as List?)
          ?.map((e) => Medication.fromJson(e))
          .toList(),
      medicalDocuments: (json['medicalDocuments'] as List?)
          ?.map((e) => MedicalDocument.fromJson(e))
          .toList(),
    );
  }
}
