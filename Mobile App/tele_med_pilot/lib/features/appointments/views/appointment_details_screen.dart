import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/theme.dart';

class AppointmentDetailsScreen extends StatelessWidget {
  const AppointmentDetailsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                    icon:
                        Icon(Icons.arrow_circle_left_outlined, size: 35.spMin),
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
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Dr. Yahya",
                                  style: AppTextStyles.bodyTextLargeBold,
                                ),
                                Text(
                                  "Specialist",
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
                    SizedBox(height: 12.h),
                    Text(
                      "Stating complaints: ",
                      style: AppTextStyles.bodyTextBold,
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "I've been experiencing severe chest pain for the past two days.",
                      style: AppTextStyles.bodyTextMedium
                          .copyWith(color: AppColors.black),
                      softWrap: true,
                    ),
                    SizedBox(height: 12.h),
                    Text(
                      "Diagnosis:",
                      style: AppTextStyles.bodyTextBold,
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "Pneumonia",
                      style: AppTextStyles.bodyTextMedium
                          .copyWith(color: AppColors.black),
                    ),
                    SizedBox(height: 12.h),
                    Text(
                      "Treatment Plan:",
                      style: AppTextStyles.bodyTextBold,
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "1. Get plenty of rest.",
                      style: AppTextStyles.bodyTextMedium
                          .copyWith(color: AppColors.black),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "2. Take antibiotics as prescribed.",
                      style: AppTextStyles.bodyTextMedium
                          .copyWith(color: AppColors.black),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "3. Drink plenty of fluids.",
                      style: AppTextStyles.bodyTextMedium
                          .copyWith(color: AppColors.black),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "4. Avoid smoking and secondhand smoke.",
                      style: AppTextStyles.bodyTextMedium
                          .copyWith(color: AppColors.black),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "5. Follow up with your doctor as instructed.",
                      style: AppTextStyles.bodyTextMedium
                          .copyWith(color: AppColors.black),
                    ),
                    SizedBox(height: 12.h),
                    Row(
                      children: [
                        Text(
                          "Duration: ",
                          style: AppTextStyles.bodyTextBold,
                        ),
                        Text(
                          "2 hours",
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
                          "September 9, 2024",
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
                          "9:30 PM",
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
}
