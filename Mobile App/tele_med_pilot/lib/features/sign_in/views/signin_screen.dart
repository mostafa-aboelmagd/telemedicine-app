import 'dart:convert'; // For jsonEncode, jsonDecode
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:http/http.dart' as http; // For HTTP requests
import 'package:shared_preferences/shared_preferences.dart'; // For storing token
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/sign_in/view_models/sign_in_view_model.dart';
import 'package:tele_med_pilot/ui/components/app_bar.dart';
import 'package:tele_med_pilot/ui/components/text_field.dart';
import 'package:tele_med_pilot/core/constant.dart';

class SignInScreen extends ConsumerStatefulWidget {
  const SignInScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _SignInScreenState();
}

class _SignInScreenState extends ConsumerState<SignInScreen> {
  bool _passwordVisible = false;
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  // The login function to authenticate the user
  Future<void> login() async {
    String email = _emailController.text.toString();
    String password = _passwordController.text.toString();
    final url = Uri.parse(AppConstants.loginEndpoint);

    final headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };
    final body = jsonEncode({
      'email': email,
      'password': password,
    });

    setState(() {
      _isLoading = true; // Set loading to true when starting login
    });

    try {
      final response = await http.post(url, headers: headers, body: body);
      print(response.statusCode);
      if (response.statusCode == 200) {
        // Successful login
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        final token = data['token'];

        if (token != null) {
          final SharedPreferences prefs = await SharedPreferences.getInstance();
          await prefs.setString('token', token);

          // Clear the text controllers
          _emailController.clear();
          _passwordController.clear();

          // Navigate to HomeScreen
          Navigator.pushReplacementNamed(context, RouteClass.mainLayoutRoute);
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Failed to retrieve token.'),
              backgroundColor: Colors.red,
            ),
          );
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Invalid email or password. Please try again.'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } catch (e) {
      print('Exception occurred during login: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('An error occurred. Please try again.'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() {
        _isLoading = false; // Set loading to false when login process ends
      });
    }
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
                    icon: Icon(Icons.arrow_circle_left_outlined, size: 35.spMin),
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
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        foregroundColor: AppColors.white, backgroundColor: AppColors.blue100, // Text color
                        minimumSize: Size(double.infinity, 48.h), // Full width and height
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15.r),
                        ),
                        padding: EdgeInsets.symmetric(vertical: 12.h),
                      ),
                      onPressed: viewModelNotifier.validateForm() && !_isLoading
                          ? () async {
                              await login();
                            }
                          : null,
                      child: _isLoading
                          ? SizedBox(
                              width: 24.sp,
                              height: 24.sp,
                              child: CircularProgressIndicator(
                                valueColor: AlwaysStoppedAnimation<Color>(AppColors.white),
                              ),
                            )
                          : Text(
                              'Sign In',
                              style: AppTextStyles.bodyTextLargeBold.copyWith(
                                color: AppColors.white,
                              ),
                            ),
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
