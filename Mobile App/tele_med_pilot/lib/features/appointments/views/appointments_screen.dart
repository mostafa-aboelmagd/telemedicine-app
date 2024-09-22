import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/button.dart';

class AppointmentsScreen extends ConsumerStatefulWidget {
  const AppointmentsScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _AppointmentsScreenState();
}

class _AppointmentsScreenState extends ConsumerState<AppointmentsScreen> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          leading: Image.asset(AppConstants.logo),
          title: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "TeleMedPilot",
                style: AppTextStyles.bodyTextLargeBold,
              ),
              Text(
                "You talk.. We help",
                style: AppTextStyles.bodyTextExtraSmallNormal,
              ),
            ],
          ),
          bottom: TabBar(
            indicatorColor: AppColors.blue100,
            labelColor: AppColors.blue100,
            indicatorSize: TabBarIndicatorSize.tab,
            overlayColor: const WidgetStatePropertyAll(Colors.transparent),
            labelStyle: AppTextStyles.bodyTextBold,
            tabs: const [
              Tab(text: 'Upcoming'),
              Tab(text: 'Past'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            OngoingAppointmentsView(),
            PastAppointmentsView(),
          ],
        ),
      ),
    );
  }
}

class OngoingAppointmentsView extends ConsumerStatefulWidget {
  const OngoingAppointmentsView({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _OngoingAppointmentsViewState();
}

class _OngoingAppointmentsViewState
    extends ConsumerState<ConsumerStatefulWidget> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 16.h, horizontal: 16.w),
      child: Column(
        children: [
          Text(
            "Upcoming Appointments",
            style: AppTextStyles.bodyTextLargeBold
                .copyWith(color: AppColors.blue100),
          ),
          Stack(
            children: [
              Container(
                width: double.infinity,
                margin: EdgeInsets.symmetric(vertical: 8.h),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Image.asset(
                              AppConstants.emptyProfile,
                              height: 40.h,
                              width: 40.h,
                            ),
                            SizedBox(width: 12.w),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Dr. Yahya",
                                  style: AppTextStyles.bodyTextBold,
                                ),
                                Text(
                                  "Specialist",
                                  style: AppTextStyles.bodyTextSmallNormal,
                                )
                              ],
                            ),
                          ],
                        ),
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              padding: EdgeInsets.symmetric(
                                  vertical: 2.h, horizontal: 12.w),
                              decoration: BoxDecoration(
                                color: AppColors.gray60,
                                borderRadius: BorderRadius.circular(10.r),
                              ),
                              child: Text(
                                "Online",
                                style: AppTextStyles.bodyTextSmallBold
                                    .copyWith(color: AppColors.black),
                              ),
                            ),
                            SizedBox(width: 18.w),
                            const Icon(Icons.more_horiz),
                          ],
                        )
                      ],
                    ),
                    SizedBox(height: 12.h),
                    Text(
                      "Stating complaints: I've been experiencing severe chest pain for the past two days.",
                      style: AppTextStyles.bodyTextMedium
                          .copyWith(color: AppColors.black),
                      softWrap: true,
                    ),
                    SizedBox(height: 12.h),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text("September 9, 2024"),
                        SizedBox(
                          width: 140.h,
                          child: Button(
                            label: "View Details",
                            labelColor: AppColors.white,
                            isValid: true,
                            onTap: () {},
                          ),
                        )
                      ],
                    )
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class PastAppointmentsView extends ConsumerStatefulWidget {
  const PastAppointmentsView({super.key});
  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _PastAppointmentsViewState();
}

class _PastAppointmentsViewState extends ConsumerState<ConsumerStatefulWidget> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 16.h, horizontal: 16.w),
      child: Column(
        children: [
          Text(
            "Past Appointments",
            style: AppTextStyles.bodyTextLargeBold
                .copyWith(color: AppColors.blue100),
          ),
        ],
      ),
    );
  }
}
