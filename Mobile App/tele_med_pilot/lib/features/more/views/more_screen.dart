import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/app_bar.dart';

class MoreScreen extends ConsumerStatefulWidget {
  const MoreScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _MoreScreenState();
}

class _MoreScreenState extends ConsumerState<MoreScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.gray10,
      appBar: const CustomAppBar(identifier: 1),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(height: 12.h),
                Text(
                  "More",
                  style: AppTextStyles.bodyTextExtraLargeBold
                      .copyWith(color: AppColors.blue100),
                ),
                const Divider(),
                Row(
                  children: [
                    Icon(
                      Icons.question_mark_rounded,
                      size: 20.sp,
                    ),
                    SizedBox(width: 4.w),
                    Text(
                      "Tests",
                      style: AppTextStyles.bodyTextAboveMeduimNormal,
                    )
                  ],
                ),
                const Divider(),
                Row(
                  children: [
                    Icon(
                      Icons.text_snippet_rounded,
                      size: 20.sp,
                    ),
                    SizedBox(width: 4.w),
                    Text(
                      "Blog",
                      style: AppTextStyles.bodyTextAboveMeduimNormal,
                    )
                  ],
                ),
                const Divider(),
                Row(
                  children: [
                    Icon(
                      Icons.language,
                      size: 20.sp,
                    ),
                    SizedBox(width: 4.w),
                    Text(
                      "Language",
                      style: AppTextStyles.bodyTextAboveMeduimNormal,
                    )
                  ],
                ),
                const Divider(),
                SizedBox(height: 16.h),
                GestureDetector(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Transform(
                        alignment: Alignment.center,
                        transform: Matrix4.identity()..scale(-1.0, 1.0),
                        child: Icon(
                          Icons.logout,
                          color: AppColors.red100,
                          size: 25.sp,
                        ),
                      ),
                      SizedBox(width: 4.w),
                      Text(
                        "Sign Out",
                        style: AppTextStyles.bodyTextMediumNormal
                            .copyWith(color: AppColors.red100),
                      ),
                    ],
                  ),
                  onTap: () {
                    Navigator.pushNamedAndRemoveUntil(context,
                        RouteClass.initRoute, (Route<dynamic> route) => false);
                  },
                ),
                SizedBox(height: 8.h),
                Text(
                  "App Version 1.4.3",
                  style: AppTextStyles.bodyTextMedium
                      .copyWith(color: AppColors.gray100),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
