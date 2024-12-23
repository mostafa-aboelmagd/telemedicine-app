import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class AppColors {
  static const Color black = Color(0xFF000000);
  static const Color gray900 = Color.fromARGB(255, 27, 27, 27);
  static const Color white = Color(0xFFFFFFFF);
  static const Color teal0 = Color(0xFF009C95);
  static const Color gray5 = Color(0xFFFBFBFB);
  static const Color gray10 = Color(0xFFF0F0F0);
  static const Color gray60 = Color(0xFFB0AFAE);
  static const Color gray100 = Color(0xFF7C7A78);
  static const Color red100 = Color(0xFFD41F1C);
  static const Color blue100 = Color(0xFF035FE9);
  static const Color blue60 = Color(0xFF5D91E1);
  static const Color green100 = Color(0xFF00B527);
}

class AppTextStyles {
  static TextStyle headline = TextStyle(
    fontSize: 32.sp,
    fontWeight: FontWeight.normal,
  );
  static TextStyle bodyTextExtraLargeBold = TextStyle(
    fontSize: 24.sp,
    fontWeight: FontWeight.bold,
  );

  static TextStyle bodyTextLargeNormal = TextStyle(
    fontSize: 20.sp,
    fontWeight: FontWeight.w500,
  );
  static TextStyle bodyTextLargeBold = TextStyle(
    fontSize: 20.sp,
    fontWeight: FontWeight.bold,
  );
  static TextStyle bodyTextAboveMeduimNormal = TextStyle(
    fontSize: 18.sp,
    fontWeight: FontWeight.bold,
  );
  static TextStyle bodyTextMediumNormal = TextStyle(
    fontSize: 16.sp,
    fontWeight: FontWeight.normal,
  );
  static TextStyle bodyTextMedium = TextStyle(
    fontSize: 14.sp,
    fontWeight: FontWeight.normal,
  );
  static TextStyle bodyTextBold = TextStyle(
    fontSize: 14.sp,
    fontWeight: FontWeight.bold,
  );
  static TextStyle bodyTextSmallNormal = TextStyle(
    fontSize: 12.sp,
    fontWeight: FontWeight.normal,
    color: AppColors.gray60,
  );
  static TextStyle bodyTextSmallBold = TextStyle(
    fontSize: 12.sp,
    fontWeight: FontWeight.bold,
    color: AppColors.black,
  );
  static TextStyle bodyTextExtraSmallNormal = TextStyle(
    fontSize: 10.sp,
    fontWeight: FontWeight.normal,
    color: AppColors.gray60,
  );
  static TextStyle bodyTextExtraSmallBold = TextStyle(
    fontSize: 10.sp,
    fontWeight: FontWeight.bold,
    color: AppColors.gray60,
  );
  static TextStyle textMidBlue = TextStyle(
    fontSize: 13.sp,
    fontWeight: FontWeight.normal,
    color: AppColors.blue100,
  );
}

ThemeData buildAppTheme() {
  return ThemeData(
    scaffoldBackgroundColor: AppColors.gray10,
    buttonTheme: const ButtonThemeData(
      textTheme: ButtonTextTheme.primary,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.gray10,
      shadowColor: AppColors.gray10,
      surfaceTintColor: AppColors.gray10,
    ),
  );
}
