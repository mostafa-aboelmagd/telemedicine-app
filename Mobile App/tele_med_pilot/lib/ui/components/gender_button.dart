import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/theme.dart';

class GenderButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;

  const GenderButton({
    required this.label,
    required this.onTap,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 154.w,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.all(0),
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.r),
            side: BorderSide(color: AppColors.gray100, width: 1.5.w),
          ),
        ),
        onPressed: onTap,
        child: Padding(
          padding: EdgeInsets.only(left: 2.w),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image.asset(
                AppConstants.logo,
                height: 50.h,
                width: 50.w,
              ),
              Text(
                label,
                style: AppTextStyles.bodyTextMediumNormal.copyWith(
                  color: AppColors.gray100,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
