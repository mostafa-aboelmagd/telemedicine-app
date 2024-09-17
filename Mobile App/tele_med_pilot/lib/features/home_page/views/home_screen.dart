import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/app_bar.dart';
import 'package:tele_med_pilot/ui/components/button.dart';
import 'package:tele_med_pilot/ui/components/option_item.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
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
                    child: Text("Our Services",
                        style: AppTextStyles.bodyTextAboveMeduimNormal),
                  ),
                  OptionItem(
                    optionImage: const Icon(Icons.calendar_month),
                    optionLabel: "Book a Scheduled Session",
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        RouteClass.bookSession,
                        arguments: {'transition': 'slideLeft',},
                      );
                    },
                  ),
                  OptionItem(
                    optionImage: const Icon(Icons.video_call),
                    optionLabel: "Start a Session in 15 mins",
                    onTap: () {},
                  ),
                  OptionItem(
                    optionImage: const Icon(Icons.play_arrow),
                    optionLabel: "My Sessions",
                    onTap: () {},
                  ),
                  SizedBox(height: 20.h),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text("Get Help",
                        style: AppTextStyles.bodyTextAboveMeduimNormal),
                  ),
                  OptionItem(
                    optionImage: const Icon(
                      Icons.support_agent,
                      color: AppColors.blue100,
                    ),
                    optionLabel: "Talk to Support",
                    onTap: () {},
                  ),
                  OptionItem(
                    optionImage: const Icon(
                      Icons.thumb_up,
                      color: AppColors.blue100,
                    ),
                    optionLabel: "Get Matched to a Doctor",
                    onTap: () {},
                  ),
                  OptionItem(
                    optionImage: const Icon(
                      Icons.share,
                      color: AppColors.blue100,
                    ),
                    optionLabel: "Talk to a doctor matching advisor",
                    onTap: () {},
                  ),
                  SizedBox(height: 20.h),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text("Specialists Lists",
                        style: AppTextStyles.bodyTextAboveMeduimNormal),
                  ),
                  OptionItem(
                    optionImage: const Icon(
                      Icons.family_restroom,
                      color: AppColors.red100,
                    ),
                    optionLabel: "Relationships",
                    onTap: () {},
                  ),
                  OptionItem(
                    optionImage: const Icon(
                      Icons.medical_information,
                      color: AppColors.red100,
                    ),
                    optionLabel: "Addiction",
                    onTap: () {},
                  ),
                  OptionItem(
                    optionImage: const Icon(
                      Icons.pregnant_woman,
                      color: AppColors.red100,
                    ),
                    optionLabel: "Pre/Postpartem",
                    onTap: () {},
                  ),
                  OptionItem(
                    optionImage: const Icon(
                      Icons.man,
                      color: AppColors.red100,
                    ),
                    optionLabel: "Parenting",
                    onTap: () {},
                  ),
                  OptionItem(
                    optionImage: const Icon(
                      Icons.health_and_safety_rounded,
                      color: AppColors.red100,
                    ),
                    optionLabel: "Cancer",
                    onTap: () {},
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
