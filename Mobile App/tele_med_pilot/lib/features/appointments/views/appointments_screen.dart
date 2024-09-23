import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/appointment_card.dart';

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
    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: 16.h, horizontal: 16.w),
        child: Column(
          children: [
            Text(
              "Upcoming Appointments",
              style: AppTextStyles.bodyTextLargeBold
                  .copyWith(color: AppColors.blue100),
            ),
            const AppointmentCard(),
            const AppointmentCard(),
            const AppointmentCard(),
            const AppointmentCard(),
            const AppointmentCard(),
          ],
        ),
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
    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: 16.h, horizontal: 16.w),
        child: Column(
          children: [
            Text(
              "Past Appointments",
              style: AppTextStyles.bodyTextLargeBold
                  .copyWith(color: AppColors.blue100),
            ),
            const AppointmentCard(),
            const AppointmentCard(),
            const AppointmentCard(),
            const AppointmentCard(),
            const AppointmentCard(),
          ],
        ),
      ),
    );
  }
}
