// Medication Class
class Medication {
  final String? note;
  final DateTime? startDate;
  final DateTime? endDate;
  final int medicationId;
  final String name;
  final String dosage;

  Medication({
    this.note,
    this.startDate,
    this.endDate,
    required this.medicationId,
    required this.name,
    required this.dosage,
  });

  factory Medication.fromJson(Map<String, dynamic> json) {
    return Medication(
      note: json['medication_note'],
      startDate: json['medication_start_date'] != null
          ? DateTime.parse(json['medication_start_date'])
          : null,
      endDate: json['medication_end_date'] != null
          ? DateTime.parse(json['medication_end_date'])
          : null,
      medicationId: json['medication_id'],
      name: json['medication_name'],
      dosage: json['medication_dosage'],
    );
  }
}
