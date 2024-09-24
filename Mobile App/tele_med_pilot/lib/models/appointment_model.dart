class AppointmentModel {
  final int patientId;
  final int doctorId;
  final int availabilitySlot;
  final String? appointmentType;
  final int appointmentDuration;
  final String? appointmentComplaint;
  final int? appointmentParentReference;
  final String? appointmentSettingsType;
  final String patientFirstName;
  final String patientLastName;
  final String doctorFirstName;
  final String doctorLastName;
  final String? doctorSpecialization;
  final DateTime appointmentDate;

  AppointmentModel({
    required this.patientId,
    required this.doctorId,
    required this.availabilitySlot,
    required this.appointmentType,
    required this.appointmentDuration,
    this.appointmentComplaint,
    this.appointmentParentReference,
    required this.appointmentSettingsType,
    required this.patientFirstName,
    required this.patientLastName,
    required this.doctorFirstName,
    required this.doctorLastName,
    this.doctorSpecialization,
    required this.appointmentDate,
  });

  // Factory to parse JSON response
  factory AppointmentModel.fromJson(Map<String, dynamic> json) {
    return AppointmentModel(
      patientId: json['appointment_patient_id'],
      doctorId: json['appointment_doctor_id'],
      availabilitySlot: json['appointment_availability_slot'],
      appointmentType: json['appointment_type'],
      appointmentDuration: json['appointment_duration'],
      appointmentComplaint: json['appointment_complaint'],
      appointmentParentReference: json['appointment_parent_reference'],
      appointmentSettingsType: json['appointment_settings_type'],
      patientFirstName: json['patient_first_name'],
      patientLastName: json['patient_last_name'],
      doctorFirstName: json['doctor_first_name'],
      doctorLastName: json['doctor_last_name'],
      doctorSpecialization: json['doctor_specialization'],
      appointmentDate: DateTime.parse(json['doctor_availability_day_hour']),
    );
  }
}
