class AppointmentResult {
  final String? diagnosis;
  final String? report;
  final DateTime? updatedAt;

  AppointmentResult({
    this.diagnosis,
    this.report,
    this.updatedAt,
  });

  factory AppointmentResult.fromJson(Map<String, dynamic> json) {
    return AppointmentResult(
      diagnosis: json['appointment_diagnosis'],
      report: json['appointment_report'],
      updatedAt: json['updated_at'] != null
          ? DateTime.parse(json['updated_at'])
          : null,
    );
  }
}
