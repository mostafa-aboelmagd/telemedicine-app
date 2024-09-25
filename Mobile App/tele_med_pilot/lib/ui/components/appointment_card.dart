import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/models/appointment_model.dart';
import 'package:tele_med_pilot/ui/components/button.dart';
import 'package:tele_med_pilot/core/route.dart';

class AppointmentCard extends StatelessWidget {
  final AppointmentModel appointment;

  const AppointmentCard({required this.appointment, super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.symmetric(vertical: 8.h),
      padding: EdgeInsets.all(16.r),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(10.r),
      ),
      child: Column(
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
                    height: 40.h,
                    width: 40.h,
                  ),
                  SizedBox(width: 12.w),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "${appointment.doctorFirstName} ${appointment.doctorLastName}",
                        style: AppTextStyles.bodyTextBold,
                      ),
                      Text(
                        appointment.doctorSpecialization ?? "",
                        style: AppTextStyles.bodyTextSmallNormal,
                      )
                    ],
                  ),
                ],
              ),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    padding:
                        EdgeInsets.symmetric(vertical: 2.h, horizontal: 12.w),
                    decoration: BoxDecoration(
                      color: AppColors.gray60,
                      borderRadius: BorderRadius.circular(10.r),
                    ),
                    child: Text(
                      "${appointment.appointmentSettingsType} / ${appointment.appointmentType}",
                      style: AppTextStyles.bodyTextSmallBold
                          .copyWith(color: AppColors.black),
                    ),
                  ),
                  SizedBox(width: 18.w),
                  const Icon(Icons.more_horiz),
                ],
              )
            ],
          ),
          SizedBox(height: 12.h),
          Text(
            "Complaint: ${appointment.appointmentComplaint}",
            style:
                AppTextStyles.bodyTextMedium.copyWith(color: AppColors.black),
            softWrap: true,
          ),
          SizedBox(height: 12.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    _formatDate(appointment.appointmentDate),
                  ),
                  Text(
                    _formatTime(appointment.appointmentDate),
                  ),
                ],
              ),
              SizedBox(
                width: 140.h,
                child: Button(
                  label: "View Details",
                  labelColor: AppColors.white,
                  isValid: true,
                  onTap: () {
                    Navigator.pushNamed(
                        context, RouteClass.appointmentDetailsRoute);
                  },
                ),
              )
            ],
          )
        ],
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
