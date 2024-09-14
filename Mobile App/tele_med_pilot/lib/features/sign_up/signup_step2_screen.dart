import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/ui/components/button.dart';
import 'package:tele_med_pilot/ui/components/gender_button.dart';
import 'package:tele_med_pilot/ui/components/text_field.dart';

class SignUpStep2Screen extends ConsumerStatefulWidget {
  const SignUpStep2Screen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _SignUpStep2ScreenState();
}

class _SignUpStep2ScreenState extends ConsumerState<SignUpStep2Screen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

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
      resizeToAvoidBottomInset: true,
      backgroundColor: AppColors.gray10,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(height: 12.h),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                mainAxisSize: MainAxisSize.max,
                children: [
                  IconButton(
                    icon:
                        Icon(Icons.arrow_circle_left_outlined, size: 35.spMin),
                    onPressed: () {},
                  ),
                  Text(
                    "Sign Up",
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
                padding: EdgeInsets.all(12.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(15.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        IconButton(
                          padding: const EdgeInsets.all(0),
                          icon: Icon(Icons.arrow_circle_left_outlined,
                              size: 35.spMin),
                          onPressed: () {
                            Navigator.pop(context);
                          },
                        ),
                        Text(
                          "Step 2 of 3",
                          style: AppTextStyles.bodyTextMediumNormal
                              .copyWith(color: AppColors.gray900),
                        ),
                      ],
                    ),
                    SizedBox(height: 16.h),
                    Text(
                      "You are a:",
                      style: AppTextStyles.bodyTextMediumNormal
                          .copyWith(color: AppColors.gray100),
                    ),
                    SizedBox(height: 8.h),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GenderButton(label: "Male", onTap: () {}),
                        GenderButton(label: "Female", onTap: () {}),
                      ],
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _emailController,
                      hintText: "",
                      labelText: "Password*",
                      isPassword: true,
                      suffixImage: const Icon(
                        Icons.remove_red_eye,
                        color: AppColors.gray100,
                      ),
                    ),
                    SizedBox(height: 8.h),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.check,
                          color: AppColors.gray100,
                          size: 30.spMin,
                        ),
                        SizedBox(width: 4.w),
                        Text(
                          "8 or more characters",
                          style: AppTextStyles.bodyTextMediumNormal
                              .copyWith(color: AppColors.gray60),
                        ),
                      ],
                    ),
                    SizedBox(height: 4.h),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.check,
                          color: AppColors.gray100,
                          size: 30.spMin,
                        ),
                        SizedBox(width: 4.w),
                        Text(
                          "Mix of letters",
                          style: AppTextStyles.bodyTextMediumNormal
                              .copyWith(color: AppColors.gray60),
                        ),
                      ],
                    ),
                    SizedBox(height: 4.h),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.check,
                          color: AppColors.gray100,
                          size: 30.spMin,
                        ),
                        SizedBox(width: 4.w),
                        Text(
                          "At least one number",
                          style: AppTextStyles.bodyTextMediumNormal
                              .copyWith(color: AppColors.gray60),
                        ),
                      ],
                    ),
                    SizedBox(height: 8.h),
                    AppTextField(
                      controller: _passwordController,
                      hintText: "",
                      labelText: "Confirm Password*",
                      isPassword: true,
                      suffixImage: const Icon(
                        Icons.remove_red_eye,
                        color: AppColors.gray100,
                      ),
                    ),
                    SizedBox(height: 16.h),
                    Button(
                        label: "Next Stap",
                        labelColor: AppColors.white,
                        isValid: true,
                        onTap: () {
                          Navigator.pushNamed(
                              context, RouteClass.signUpStep3Route);
                        }),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
