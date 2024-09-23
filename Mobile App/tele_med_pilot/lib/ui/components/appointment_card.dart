import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/button.dart';

class AppointmentCard extends StatelessWidget {
  const AppointmentCard({super.key});
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
                        "Dr. Yahya",
                        style: AppTextStyles.bodyTextBold,
                      ),
                      Text(
                        "Specialist",
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
                      "Online / Follow Up",
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
            "Stating complaints: I've been experiencing severe chest pain for the past two days.",
            style:
                AppTextStyles.bodyTextMedium.copyWith(color: AppColors.black),
            softWrap: true,
          ),
          SizedBox(height: 12.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text("September 9, 2024"),
                  Text("9:30 PM"),
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
}
