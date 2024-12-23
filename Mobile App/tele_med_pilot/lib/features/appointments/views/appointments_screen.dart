import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/appointments/view_models/appointments_view_model.dart';
import 'package:tele_med_pilot/ui/components/appointment_card.dart';
import 'package:tele_med_pilot/ui/components/loading_screen.dart';

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
    extends ConsumerState<OngoingAppointmentsView> {
  bool isLoading = false;

  void _getData() async {
    setState(() {
      isLoading = true;
    });
    await ref.read(appointmentsViewModelProvider.notifier).fetchAppointments();
    setState(() {
      isLoading = false;
    });
  }

  @override
  void initState() {
    _getData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final appointmentState = ref.watch(appointmentsViewModelProvider);
    final appointmentViewModel =
        ref.watch(appointmentsViewModelProvider.notifier);

    if (appointmentState.errorMessage != null) {
      return Center(child: Text('Error: ${appointmentState.errorMessage}'));
    }

    if (appointmentState.appointments.isEmpty && !isLoading) {
      return const Center(child: Text('No upcoming appointments.'));
    }

    return isLoading
        ? const LoadingScreen()
        : PopScope(
            onPopInvokedWithResult: (didPop, _) =>
                appointmentViewModel.resetState(),
            child: SingleChildScrollView(
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: 16.h, horizontal: 16.w),
                child: Column(
                  children: [
                    Text(
                      "Upcoming Appointments",
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    ...appointmentState.appointments.map((appointment) {
                      return AppointmentCard(
                          appointment: appointment, identifier: 0);
                    }),
                  ],
                ),
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

class _PastAppointmentsViewState extends ConsumerState<PastAppointmentsView> {
  bool isLoading = false;

  void _getData() async {
    setState(() {
      isLoading = true;
    });
    await ref
        .read(appointmentsViewModelProvider.notifier)
        .fetchHistoryAppointments();
    setState(() {
      isLoading = false;
    });
  }

  @override
  void initState() {
    _getData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final appointmentState = ref.watch(appointmentsViewModelProvider);
    final appointmentViewModel =
        ref.watch(appointmentsViewModelProvider.notifier);

    if (appointmentState.errorMessage != null) {
      return Center(child: Text('Error: ${appointmentState.errorMessage}'));
    }

    if (appointmentState.appointments.isEmpty && !isLoading) {
      return const Center(child: Text('No upcoming appointments.'));
    }

    return isLoading
        ? const LoadingScreen()
        : PopScope(
            onPopInvokedWithResult: (didPop, _) =>
                appointmentViewModel.resetState(),
            child: SingleChildScrollView(
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: 16.h, horizontal: 16.w),
                child: Column(
                  children: [
                    Text(
                      "Past Appointments",
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    ...appointmentState.appointments.map((appointment) {
                      return AppointmentCard(
                        appointment: appointment,
                        identifier: 1,
                      );
                    }),
                  ],
                ),
              ),
            ),
          );
  }
}
