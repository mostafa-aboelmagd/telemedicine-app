import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/features/appointments/services/appointments_service.dart';
import 'package:tele_med_pilot/models/appointment_model.dart';

class AppointmentsViewModel extends StateNotifier<AppointmentState> {
  final AppointmentsService _appointmentsService;
  final Ref ref;

  AppointmentsViewModel(this._appointmentsService, this.ref)
      : super(AppointmentState.initial());

  void resetState() {
    state = AppointmentState.initial();
  }

  Future<void> fetchAppointments() async {
    try {
      final appointments = await _appointmentsService.getAppointments();

      if (appointments.isEmpty) {
        state = state.copyWith(appointments: [], isLoading: false);
      } else {
        state = state.copyWith(appointments: appointments, isLoading: false);
      }
    } catch (error) {
      state = state.copyWith(isLoading: false, errorMessage: error.toString());
    }
  }
}

final appointmentsViewModelProvider =
    StateNotifierProvider<AppointmentsViewModel, AppointmentState>((ref) {
  final appointmentsService = ref.read(appointmentsServiceProvider);
  return AppointmentsViewModel(appointmentsService, ref);
});

class AppointmentState {
  final bool isLoading;
  final List<AppointmentModel> appointments;
  final String? errorMessage;

  AppointmentState({
    required this.isLoading,
    required this.appointments,
    this.errorMessage,
  });

  factory AppointmentState.initial() {
    return AppointmentState(
      isLoading: false,
      appointments: [],
      errorMessage: null,
    );
  }

  AppointmentState copyWith({
    bool? isLoading,
    List<AppointmentModel>? appointments,
    String? errorMessage,
  }) {
    return AppointmentState(
      isLoading: isLoading ?? this.isLoading,
      appointments: appointments ?? this.appointments,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}
