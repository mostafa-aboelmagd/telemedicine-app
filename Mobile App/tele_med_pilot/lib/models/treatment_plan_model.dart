class TreatmentPlan {
  final String? operations;
  final String? specialityReferral;
  final String? referralNotes;
  final int treatmentPlanId;

  TreatmentPlan({
    this.operations,
    this.specialityReferral,
    this.referralNotes,
    required this.treatmentPlanId,
  });

  factory TreatmentPlan.fromJson(Map<String, dynamic> json) {
    return TreatmentPlan(
      operations: json['treatment_plan_operations'],
      specialityReferral: json['treatment_plan_speciality_referral'],
      referralNotes: json['treatment_plan_referral_notes'],
      treatmentPlanId: json['treatment_plan_id'],
    );
  }
}
