// ignore_for_file: unused_local_variable

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/appointments/view_models/appointments_view_model.dart';
import 'package:tele_med_pilot/ui/components/loading_screen.dart';

class AppointmentDetailsScreen extends ConsumerStatefulWidget {
  const AppointmentDetailsScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _AppointmentDetailsScreenState();
}

class _AppointmentDetailsScreenState
    extends ConsumerState<AppointmentDetailsScreen> {
  bool isLoading = false;

  void _getData() async {
    setState(() {
      isLoading = true;
    });
    await ref
        .read(appointmentsViewModelProvider.notifier)
        .fetchAppointmentDetails();
    setState(() {
      isLoading = false;
    });
  }

  @override
  void initState() {
    _getData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final appointmentState = ref.watch(appointmentsViewModelProvider);
    final appointmentViewModel =
        ref.watch(appointmentsViewModelProvider.notifier);
    return isLoading
        ? const LoadingScreen()
        : Scaffold(
            appBar: AppBar(
              leading: Image.asset(AppConstants.logo),
              title: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    "TeleMedPilot",
                    style: AppTextStyles.bodyTextLargeBold,
                  ),
                  Text(
                    "You talk.. We help",
                    style: AppTextStyles.bodyTextExtraSmallNormal,
                  ),
                ],
              ),
            ),
            body: SingleChildScrollView(
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: 16.h, horizontal: 16.w),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        IconButton(
                          icon: Icon(Icons.arrow_circle_left_outlined,
                              size: 35.spMin),
                          onPressed: () {
                            Navigator.pop(context);
                          },
                        ),
                        Text(
                          "Appointments Details",
                          style: AppTextStyles.bodyTextLargeBold
                              .copyWith(color: AppColors.blue100),
                        ),
                        SizedBox(width: 48.w),
                      ],
                    ),
                    Container(
                      width: double.infinity,
                      margin: EdgeInsets.symmetric(vertical: 8.h),
                      padding: EdgeInsets.all(16.r),
                      decoration: BoxDecoration(
                        color: AppColors.white,
                        borderRadius: BorderRadius.circular(10.r),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Image.asset(
                                    AppConstants.emptyProfile,
                                    height: 60.h,
                                    width: 60.h,
                                  ),
                                  SizedBox(width: 12.w),
                                  Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        "${appointmentState.appointmentDetails?.doctorFirstName}",
                                        style: AppTextStyles.bodyTextLargeBold,
                                      ),
                                      Text(
                                        "${appointmentState.appointmentDetails?.doctorSpecialization}",
                                        style: AppTextStyles.bodyTextMedium,
                                      )
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                          SizedBox(height: 12.h),
                          Container(
                            padding: EdgeInsets.symmetric(
                                vertical: 2.h, horizontal: 12.w),
                            decoration: BoxDecoration(
                              color: AppColors.gray60,
                              borderRadius: BorderRadius.circular(10.r),
                            ),
                            child: Text(
                              "${appointmentState.appointmentDetails?.appointmentSettingsType} / ${appointmentState.appointmentDetails?.appointmentType}",
                              style: AppTextStyles.bodyTextSmallBold
                                  .copyWith(color: AppColors.black),
                            ),
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            "Stating complaints: ",
                            style: AppTextStyles.bodyTextAboveMeduimNormal,
                          ),
                          SizedBox(height: 4.h),
                          Text(
                            "${appointmentState.appointmentDetails?.appointmentComplaint}",
                            style: AppTextStyles.bodyTextMedium
                                .copyWith(color: AppColors.black),
                            softWrap: true,
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            "Diagnosis:",
                            style: AppTextStyles.bodyTextAboveMeduimNormal,
                          ),
                          SizedBox(height: 4.h),
                          Text(
                            "${appointmentState.appointmentDetails?.appointmentResults?.first.diagnosis}",
                            style: AppTextStyles.bodyTextMedium
                                .copyWith(color: AppColors.black),
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            "Report:",
                            style: AppTextStyles.bodyTextAboveMeduimNormal,
                          ),
                          SizedBox(height: 4.h),
                          Text(
                            "${appointmentState.appointmentDetails?.appointmentResults?.first.report}",
                            style: AppTextStyles.bodyTextMedium
                                .copyWith(color: AppColors.black),
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            "Treatment Plan:",
                            style: AppTextStyles.bodyTextAboveMeduimNormal,
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            "Operations:",
                            style: AppTextStyles.bodyTextBold,
                          ),
                          SizedBox(height: 4.h),
                          Text(
                            "${appointmentState.appointmentDetails?.treatmentPlan?.operations}",
                            style: AppTextStyles.bodyTextMedium
                                .copyWith(color: AppColors.black),
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            "Referral Notes:",
                            style: AppTextStyles.bodyTextBold,
                          ),
                          SizedBox(height: 4.h),
                          Text(
                            "${appointmentState.appointmentDetails?.treatmentPlan?.referralNotes}",
                            style: AppTextStyles.bodyTextMedium
                                .copyWith(color: AppColors.black),
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            "Speciality Referral:",
                            style: AppTextStyles.bodyTextBold,
                          ),
                          SizedBox(height: 4.h),
                          Text(
                            "${appointmentState.appointmentDetails?.treatmentPlan?.specialityReferral}",
                            style: AppTextStyles.bodyTextMedium
                                .copyWith(color: AppColors.black),
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            "Medications:",
                            style: AppTextStyles.bodyTextAboveMeduimNormal,
                          ),
                          SizedBox(height: 12.h),
                          ...appointmentState.appointmentDetails!.medications
                                  ?.map((e) {
                                return Column(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      "Name:",
                                      style: AppTextStyles.bodyTextBold,
                                    ),
                                    SizedBox(height: 4.h),
                                    Text(
                                      e.name,
                                      style: AppTextStyles.bodyTextMedium
                                          .copyWith(color: AppColors.black),
                                    ),
                                    Text(
                                      "Dosage:",
                                      style: AppTextStyles.bodyTextBold,
                                    ),
                                    SizedBox(height: 4.h),
                                    Text(
                                      e.dosage,
                                      style: AppTextStyles.bodyTextMedium
                                          .copyWith(color: AppColors.black),
                                    ),
                                    Text(
                                      "Start Date:",
                                      style: AppTextStyles.bodyTextBold,
                                    ),
                                    SizedBox(height: 4.h),
                                    Text(
                                      _formatDate(
                                          e.startDate ?? DateTime.now()),
                                      style: AppTextStyles.bodyTextMedium
                                          .copyWith(color: AppColors.black),
                                    ),
                                    Text(
                                      "End Date:",
                                      style: AppTextStyles.bodyTextBold,
                                    ),
                                    SizedBox(height: 4.h),
                                    Text(
                                      _formatDate(e.endDate ?? DateTime.now()),
                                      style: AppTextStyles.bodyTextMedium
                                          .copyWith(color: AppColors.black),
                                    ),
                                    Text(
                                      "Note:",
                                      style: AppTextStyles.bodyTextBold,
                                    ),
                                    SizedBox(height: 4.h),
                                    Text(
                                      e.note ?? "",
                                      style: AppTextStyles.bodyTextMedium
                                          .copyWith(color: AppColors.black),
                                    ),
                                    SizedBox(height: 12.h),
                                  ],
                                );
                              }).toList() ??
                              [],
                          SizedBox(height: 12.h),
                          Row(
                            children: [
                              Text(
                                "Duration: ",
                                style: AppTextStyles.bodyTextBold,
                              ),
                              Text(
                                "${appointmentState.appointmentDetails?.appointmentDuration}",
                                style: AppTextStyles.bodyTextMedium,
                              ),
                            ],
                          ),
                          SizedBox(height: 4.h),
                          Row(
                            children: [
                              Text(
                                "Date: ",
                                style: AppTextStyles.bodyTextBold,
                              ),
                              Text(
                                _formatDate(appointmentState
                                    .appointmentDetails!.appointmentDate),
                                style: AppTextStyles.bodyTextMedium,
                              ),
                            ],
                          ),
                          SizedBox(height: 4.h),
                          Row(
                            children: [
                              Text(
                                "Time: ",
                                style: AppTextStyles.bodyTextBold,
                              ),
                              Text(
                                _formatTime(appointmentState
                                    .appointmentDetails!.appointmentDate),
                                style: AppTextStyles.bodyTextMedium,
                              ),
                            ],
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
          );
  }

  String _formatDate(DateTime date) {
    return "${date.day} ${_getMonthName(date.month)} ${date.year}";
  }

  String _formatTime(DateTime date) {
    return "${date.hour}:${date.minute.toString().padLeft(2, '0')} ${date.hour >= 12 ? 'PM' : 'AM'}";
  }

  String _getMonthName(int month) {
    const List<String> monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return monthNames[month - 1];
  }
}
