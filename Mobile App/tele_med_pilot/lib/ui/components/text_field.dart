import 'package:flutter/material.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class AppTextField extends StatefulWidget {
  final String hintText;
  final String labelText;
  final bool isPassword;
  final Icon? suffixImage;
  final TextEditingController controller;
  final VoidCallback? onSuffixIconPressed;
  final String? errorText;
  final ValueChanged<String>? onChanged;
  final TextInputType? textInputType;

  const AppTextField({
    super.key,
    required this.controller,
    required this.hintText,
    required this.labelText,
    required this.isPassword,
    this.suffixImage,
    this.onSuffixIconPressed,
    this.textInputType,
    this.errorText,
    this.onChanged,
  });

  @override
  State<StatefulWidget> createState() => _AppTextFieldState();
}

class _AppTextFieldState extends State<AppTextField> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.labelText,
          style: AppTextStyles.bodyTextMediumNormal.copyWith(
            color: AppColors.gray100,
          ),
        ),
        SizedBox(height: 4.h),
        TextField(
          keyboardType: widget.textInputType,
          cursorColor: AppColors.gray100,
          controller: widget.controller,
          obscureText: widget.isPassword,
          onChanged: widget.onChanged,
          decoration: InputDecoration(
            hintText: widget.hintText,
            hintStyle: AppTextStyles.bodyTextSmallNormal,
            filled: true,
            fillColor: AppColors.gray5,
            suffixIcon: widget.suffixImage != null
                ? GestureDetector(
                    onTap: widget.onSuffixIconPressed,
                    child: widget.suffixImage,
                  )
                : null,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
              borderSide: BorderSide(
                color: AppColors.gray100,
                width: 1.w,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
              borderSide: BorderSide(
                color: AppColors.gray100,
                width: 1.w,
              ),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
              borderSide: BorderSide(
                color: AppColors.gray100,
                width: 1.w,
              ),
            ),
            contentPadding: EdgeInsets.symmetric(
              horizontal: 12.w,
              vertical: 8.h,
            ),
            errorText: widget.errorText,
          ),
        ),
      ],
    );
  }
}
