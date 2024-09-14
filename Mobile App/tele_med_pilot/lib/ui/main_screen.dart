import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/button.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: AppColors.gray10,
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 8.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Image.asset(
                AppConstants.logo,
                height: 160.h,
                width: 160.h,
              ),
              Text(
                "TeleMedPilot",
                style: AppTextStyles.bodyTextExtraLargeBold,
              ),
              Text(
                "You Talk.. We Help",
                style: AppTextStyles.bodyTextSmallNormal
                    .copyWith(color: AppColors.black),
              ),
              SizedBox(height: 16.h),
              Text(
                "BEGIN YOUR JOURNEY",
                style: AppTextStyles.bodyTextExtraLargeBold
                    .copyWith(color: AppColors.black),
              ),
              SizedBox(height: 32.h),
              Button(
                label: "Sign in",
                labelColor: AppColors.white,
                isValid: true,
                onTap: () {
                  Navigator.pushReplacementNamed(
                      context, RouteClass.signInRoute);
                },
              ),
              SizedBox(height: 8.h),
              Button(
                label: "Register",
                labelColor: AppColors.black,
                isValid: true,
                outlinedButton: true,
                outlineColor: AppColors.black,
                onTap: () {
                  Navigator.pushReplacementNamed(
                      context, RouteClass.signUpStep1Route);
                },
              ),
              SizedBox(height: 8.h),
              TextButton(
                  onPressed: () {
                    Navigator.pushReplacementNamed(
                        context, RouteClass.homeRoute);
                  },
                  child: Text(
                    "Continue as Guest",
                    style: AppTextStyles.bodyTextLargeBold
                        .copyWith(color: AppColors.black),
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
