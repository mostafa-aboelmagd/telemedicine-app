import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/theme.dart';

class OptionItem extends StatelessWidget {
  final String optionLabel;
  final VoidCallback onTap;
  final Icon optionImage;

  const OptionItem({
    required this.optionImage,
    required this.optionLabel,
    required this.onTap,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: EdgeInsets.all(8.r),
        padding: EdgeInsets.all(12.r),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(10.r),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              children: [
                Container(
                  margin: EdgeInsets.only(right: 8.r),
                  padding: EdgeInsets.all(8.r),
                  decoration: BoxDecoration(
                    color: AppColors.blue100.withOpacity(0.25),
                    borderRadius: BorderRadius.circular(10.r),
                  ),
                  child: optionImage,
                ),
                Text(
                  optionLabel,
                  style: AppTextStyles.bodyTextMedium,
                ),
              ],
            ),
            Icon(
              Icons.arrow_forward_ios_sharp,
              size: 16.sp,
            ),
          ],
        ),
      ),
    );
  }
}
