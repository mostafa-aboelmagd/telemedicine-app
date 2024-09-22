import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/loader.dart';

class Button extends StatelessWidget {
  final String label;
  final Color labelColor;
  final Color? backgroundColor;
  final bool isValid;
  final VoidCallback onTap;
  final bool? outlinedButton;
  final Color? outlineColor;
  final bool? isLoading;

  const Button({
    required this.label,
    required this.labelColor,
    this.backgroundColor,
    required this.isValid,
    required this.onTap,
    this.outlinedButton,
    this.outlineColor,
    this.isLoading,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 30.h,
      child: Container(
        decoration: BoxDecoration(
          gradient: isValid
              ? LinearGradient(
                  colors: [
                    outlinedButton == true
                        ? Colors.transparent
                        : backgroundColor == null
                            ? AppColors.blue60
                            : backgroundColor!,
                    outlinedButton == true
                        ? Colors.transparent
                        : backgroundColor == null
                            ? AppColors.blue100
                            : backgroundColor!,
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                )
              : null,
          borderRadius: BorderRadius.circular(10.r),
          border: (outlinedButton == true && outlineColor != null)
              ? Border.all(
                  color: outlineColor!,
                  width: 1.5.w,
                )
              : null,
        ),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.transparent,
            shadowColor: Colors.transparent,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.r),
            ),
          ),
          onPressed: isValid ? onTap : null,
          child: isLoading == true
              ? const SizedBox(
                  height: 20,
                  width: 20,
                  child: Loader(
                    loaderColor: AppColors.white,
                    width: 1,
                  ))
              : Text(
                  label,
                  style: AppTextStyles.bodyTextMediumNormal.copyWith(
                    color: labelColor,
                  ),
                ),
        ),
      ),
    );
  }
}
