import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/app_bar.dart';
import 'package:tele_med_pilot/ui/components/button.dart';
import 'package:tele_med_pilot/ui/components/option_item.dart';

class SupportScreen extends ConsumerStatefulWidget {
  const SupportScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _SupportScreenState();
}

class _SupportScreenState extends ConsumerState<SupportScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.gray10,
      appBar: const CustomAppBar(identifier: 1),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: 12.h),
                  Text(
                    "Support",
                    style: AppTextStyles.bodyTextExtraLargeBold
                        .copyWith(color: AppColors.blue100),
                  ),
                  SizedBox(height: 12.h),
                  Text(
                    "Choose how you'd like to get help",
                    style: AppTextStyles.bodyTextMedium,
                  ),
                  Container(
                    width: double.infinity,
                    margin: EdgeInsets.all(8.r),
                    padding: EdgeInsets.all(16.r),
                    decoration: BoxDecoration(
                      color: AppColors.blue100,
                      borderRadius: BorderRadius.circular(10.r),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Talk to a live agent on the app usually replies within 30s",
                          style: AppTextStyles.bodyTextLargeNormal
                              .copyWith(color: AppColors.white),
                        ),
                        SizedBox(height: 20.h),
                        SizedBox(
                          child: Button(
                            label: "Get help",
                            labelColor: AppColors.blue100,
                            isValid: true,
                            backgroundColor: AppColors.white,
                            onTap: () {},
                          ),
                        )
                      ],
                    ),
                  ),
                  SizedBox(height: 20.h),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text("More Support Options",
                        style: AppTextStyles.bodyTextAboveMeduimNormal),
                  ),
                  OptionItem(
                    optionImage: const Icon(Icons.support_agent),
                    optionLabel: "Talk to Support",
                    onTap: () {},
                  ),
                  OptionItem(
                    optionImage: const Icon(Icons.share),
                    optionLabel: "Talk to a doctor matching advisor",
                    onTap: () {},
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
