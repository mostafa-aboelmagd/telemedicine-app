import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/app_bar.dart';
import 'package:tele_med_pilot/ui/components/button.dart';

class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.gray10,
      appBar: const CustomAppBar(identifier: 2),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(height: 12.h),
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
                    "My Profile",
                    style: AppTextStyles.bodyTextExtraLargeBold
                        .copyWith(color: AppColors.blue100),
                  ),
                  SizedBox(width: 48.w),
                ],
              ),
              SizedBox(height: 10.h),
              Container(
                width: double.infinity,
                margin: EdgeInsets.all(8.r),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Image.asset(
                      AppConstants.emptyProfile,
                      height: 80.h,
                      width: 80.w,
                    ),
                    SizedBox(width: 12.w),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                "Username",
                                style: AppTextStyles.bodyTextBold,
                              ),
                              Align(
                                alignment: Alignment.centerRight,
                                child: SizedBox(
                                  width: 105.w,
                                  height: 25.h,
                                  child: Button(
                                    label: "Edit Info",
                                    labelColor: AppColors.blue100,
                                    isValid: true,
                                    onTap: () {},
                                    outlineColor: AppColors.blue100,
                                    outlinedButton: true,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 4.h),
                          Row(
                            children: [
                              const Icon(Icons.email),
                              SizedBox(width: 4.w),
                              Text(
                                "email@gmail.com",
                                style: AppTextStyles.bodyTextMediumNormal,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                margin: EdgeInsets.all(8.r),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Your Wallet Credit",
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "0 EGP",
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 10.h),
                    Button(
                      label: "Add Fund",
                      labelColor: AppColors.white,
                      isValid: true,
                      onTap: () {},
                    ),
                    SizedBox(height: 10.h),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Icon(
                          Icons.info_outline,
                          color: AppColors.gray900,
                        ),
                        SizedBox(width: 4.h),
                        Expanded(
                          child: RichText(
                            text: TextSpan(
                              text:
                                  "If you want to withdraw from you wallet, contact ",
                              style: AppTextStyles.bodyTextMedium
                                  .copyWith(color: AppColors.gray900),
                              children: [
                                TextSpan(
                                  text: 'Customer Support',
                                  style: AppTextStyles.bodyTextMedium.copyWith(
                                    color: AppColors.blue100,
                                  ),
                                  recognizer: TapGestureRecognizer()
                                    ..onTap = () => {},
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                margin: EdgeInsets.all(8.r),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Password",
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 8.h),
                    Center(
                      child: Text(
                        "Change Password",
                        style: AppTextStyles.bodyTextMediumNormal
                            .copyWith(color: AppColors.teal0),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 8.h),
              GestureDetector(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Transform(
                      alignment: Alignment.center,
                      transform: Matrix4.identity()..scale(-1.0, 1.0),
                      child: Icon(
                        Icons.logout,
                        color: AppColors.red100,
                        size: 25.sp,
                      ),
                    ),
                    SizedBox(width: 4.w),
                    Text(
                      "Sign Out",
                      style: AppTextStyles.bodyTextMediumNormal
                          .copyWith(color: AppColors.red100),
                    ),
                  ],
                ),
                onTap: () async {
                  final SharedPreferences prefs =
                      await SharedPreferences.getInstance();
                      await prefs.remove('token');
                  Navigator.pushNamed(
                        context,
                        RouteClass.initRoute,
                      );
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
