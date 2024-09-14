import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/sign_in/view_models/sign_in_view_model.dart';
import 'package:tele_med_pilot/ui/components/app_bar.dart';
import 'package:tele_med_pilot/ui/components/button.dart';
import 'package:tele_med_pilot/ui/components/text_field.dart';

class SignInScreen extends ConsumerStatefulWidget {
  const SignInScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _SignInScreenState();
}

class _SignInScreenState extends ConsumerState<SignInScreen> {
  bool _passwordVisible = false;
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
    final viewModelNotifier = ref.watch(signInViewModelProvider.notifier);
    final viewModel = ref.watch(signInViewModelProvider);
    return Scaffold(
      backgroundColor: AppColors.gray10,
      appBar: const CustomAppBar(identifier: 0),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
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
                    "Sign In",
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
                  borderRadius: BorderRadius.circular(15.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    RichText(
                      text: TextSpan(
                        text: "Don’t have an account? ",
                        style: AppTextStyles.bodyTextMediumNormal
                            .copyWith(color: AppColors.gray900),
                        children: [
                          TextSpan(
                            text: 'Sign Up',
                            style: AppTextStyles.bodyTextMediumNormal.copyWith(
                              color: AppColors.teal0,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = () => Navigator.pushReplacementNamed(
                                  context, RouteClass.signUpStep1Route),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _emailController,
                      hintText: "",
                      labelText: "Email*",
                      isPassword: false,
                      errorText: viewModel.emailError,
                      onChanged: (value) => viewModelNotifier.setEmail(value),
                    ),
                    SizedBox(height: 16.h),
                    AppTextField(
                      controller: _passwordController,
                      hintText: "",
                      labelText: "Password*",
                      errorText: viewModel.passwordError,
                      isPassword: !_passwordVisible,
                      suffixImage: _passwordVisible
                          ? Icon(
                              Icons.visibility_off_sharp,
                              color: AppColors.gray100,
                              size: 25.spMin,
                            )
                          : Icon(
                              Icons.visibility_sharp,
                              color: AppColors.gray100,
                              size: 25.spMin,
                            ),
                      onSuffixIconPressed: () {
                        setState(() {
                          _passwordVisible = !_passwordVisible;
                        });
                      },
                      onChanged: (value) =>
                          viewModelNotifier.setPassword(value),
                    ),
                    SizedBox(height: 16.h),
                    Button(
                      label: "Sign In",
                      labelColor: AppColors.white,
                      isValid: viewModelNotifier.validateForm(),
                      onTap: () {
                        if (viewModelNotifier.validateFormData()) {
                          Navigator.pushReplacementNamed(
                              context, RouteClass.mainLayoutRoute);
                        }
                        // if (await viewModelNotifier.signIn()) {
                        //       Navigator.pushReplacementNamed(
                        //           mounted ? context : context,
                        //           RouteClass.companiesRoute);
                        //     }
                      },
                    ),
                    SizedBox(height: 16.h),
                    TextButton(
                      onPressed: () {
                        // forgot password
                      },
                      style: TextButton.styleFrom(
                        padding: EdgeInsets.zero,
                        minimumSize: const Size(0, 0),
                        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        alignment: Alignment.center,
                        splashFactory: NoSplash.splashFactory,
                      ),
                      child: Center(
                        child: Text(
                          'Forgot password',
                          style: AppTextStyles.bodyTextMediumNormal.copyWith(
                            color: AppColors.teal0,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ),
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
