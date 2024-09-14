import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/ui/components/button.dart';
import 'package:tele_med_pilot/ui/components/text_field.dart';

class SignUpStep3Screen extends ConsumerStatefulWidget {
  const SignUpStep3Screen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _SignUpStep3ScreenState();
}

class _SignUpStep3ScreenState extends ConsumerState<SignUpStep3Screen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  var check = true;

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
                          "Step 3 of 3",
                          style: AppTextStyles.bodyTextMediumNormal
                              .copyWith(color: AppColors.gray900),
                        ),
                      ],
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _emailController,
                      hintText: "0100 123 4567",
                      labelText: "Phone*",
                      isPassword: false,
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _passwordController,
                      hintText: "Select here",
                      labelText: "Birth Year*",
                      isPassword: false,
                    ),
                    SizedBox(height: 16.h),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Checkbox(
                          activeColor: AppColors.blue100,
                          value: check,
                          onChanged: (value) {
                            setState(() {
                              check = value ?? false;
                            });
                          },
                        ),
                        RichText(
                          text: TextSpan(
                            text: "I agree with the ",
                            style: AppTextStyles.bodyTextMediumNormal
                                .copyWith(color: AppColors.gray100),
                            children: [
                              TextSpan(
                                text: 'Privacy Policy',
                                style:
                                    AppTextStyles.bodyTextMediumNormal.copyWith(
                                  color: AppColors.blue100,
                                  decoration: TextDecoration.underline,
                                ),
                                recognizer: TapGestureRecognizer()
                                  ..onTap = () =>
                                      Navigator.pushReplacementNamed(
                                          context, RouteClass.signInRoute),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 16.h),
                    Button(
                      label: "Register",
                      isValid: true,
                      labelColor: AppColors.white,
                      onTap: () {
                        Navigator.pushReplacementNamed(
                            context, RouteClass.homeRoute);
                      },
                    ),
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
