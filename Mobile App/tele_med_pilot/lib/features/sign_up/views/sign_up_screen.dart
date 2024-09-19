import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/features/sign_up/view_models/sign_up_view_model.dart';
import 'package:tele_med_pilot/ui/components/button.dart';
import 'package:tele_med_pilot/ui/components/text_field.dart';

class SignUpStep1Screen extends ConsumerStatefulWidget {
  const SignUpStep1Screen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _SignUpStep1ScreenState();
}

class _SignUpStep1ScreenState extends ConsumerState<SignUpStep1Screen> {
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _birthYearController = TextEditingController();
  String? _selectedGender;

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _birthYearController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final viewModelNotifier = ref.watch(signUpViewModelProvider.notifier);
    final viewModel = ref.watch(signUpViewModelProvider);
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
                    onPressed: () {
                      Navigator.pop(context);
                    },
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
                    AppTextField(
                      controller: _firstNameController,
                      hintText: "Enter your First Name",
                      labelText: "First Name*",
                      isPassword: false,
                      onChanged: (value) =>
                          viewModelNotifier.setFirstName(value),
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _lastNameController,
                      hintText: "Enter your Last Name",
                      labelText: "Last Name*",
                      isPassword: false,
                      onChanged: (value) =>
                          viewModelNotifier.setLastName(value),
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _emailController,
                      hintText: "Enter your Email Address",
                      labelText: "Email*",
                      isPassword: false,
                      errorText: viewModel.emailError,
                      onChanged: (value) => viewModelNotifier.setEmail(value),
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _phoneController,
                      hintText: "+20 xxxx xxxx xxx",
                      labelText: "Phone*",
                      isPassword: false,
                      onChanged: (value) => viewModelNotifier.setPhone(value),
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _passwordController,
                      hintText: "Enter Password",
                      labelText: "Password*",
                      isPassword: true,
                      errorText: viewModel.passwordError,
                      onChanged: (value) =>
                          viewModelNotifier.setPassword(value),
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _confirmPasswordController,
                      hintText: "Enter Confirm Password",
                      labelText: "Confirm Password*",
                      isPassword: true,
                      errorText: viewModel.confirmPasswordError,
                      onChanged: (value) =>
                          viewModelNotifier.setConfirmPassword(value),
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _birthYearController,
                      hintText: "Enter your Birth Year",
                      labelText: "Birth Year*",
                      isPassword: false,
                      onChanged: (value) =>
                          viewModelNotifier.setBirthYear(value),
                    ),
                    SizedBox(height: 16.h),
                    Text(
                      "Gender*",
                      style: AppTextStyles.bodyTextMediumNormal
                          .copyWith(color: AppColors.gray100),
                    ),
                    Row(
                      children: [
                        Expanded(
                          child: Row(
                            children: [
                              Radio<String>(
                                value: 'Male',
                                groupValue: _selectedGender,
                                onChanged: (value) {
                                  setState(() {
                                    _selectedGender = value;
                                    viewModelNotifier
                                        .setGender(_selectedGender!);
                                  });
                                },
                              ),
                              Text("Male",
                                  style: AppTextStyles.bodyTextMediumNormal),
                            ],
                          ),
                        ),
                        Expanded(
                          child: Row(
                            children: [
                              Radio<String>(
                                value: 'Female',
                                groupValue: _selectedGender,
                                onChanged: (value) {
                                  setState(() {
                                    _selectedGender = value;
                                    viewModelNotifier
                                        .setGender(_selectedGender!);
                                  });
                                },
                              ),
                              Text("Female",
                                  style: AppTextStyles.bodyTextMediumNormal),
                            ],
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8.h),
                    RichText(
                      text: TextSpan(
                        text: "Already have an account? ",
                        style: AppTextStyles.bodyTextMediumNormal
                            .copyWith(color: AppColors.gray900),
                        children: [
                          TextSpan(
                            text: 'Sign In',
                            style: AppTextStyles.bodyTextMediumNormal.copyWith(
                              color: AppColors.teal0,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = () => Navigator.pushReplacementNamed(
                                  context, RouteClass.signInRoute),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 16.h),
                    Button(
                      label: "Register",
                      labelColor: AppColors.white,
                      isValid: viewModelNotifier.validateForm(),
                      isLoading: viewModel.isLoading,
                      onTap: () async {
                        viewModelNotifier.validateFormData();
                        if (await viewModelNotifier.signUp()) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Account created succefully'),
                              backgroundColor: AppColors.green100,
                            ),
                          );
                        } else {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("${viewModel.errorMessage}"),
                              backgroundColor: AppColors.red100,
                            ),
                          );
                        }
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
