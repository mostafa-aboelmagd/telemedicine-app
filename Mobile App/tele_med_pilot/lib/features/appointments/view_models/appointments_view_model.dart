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

  void setAppointment(String id) {
    state = state.copyWith(appointmentID: id);
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

  Future<void> fetchHistoryAppointments() async {
    try {
      final appointments = await _appointmentsService.getHistoryAppointments();

      if (appointments.isEmpty) {
        state = state.copyWith(appointments: [], isLoading: false);
      } else {
        state = state.copyWith(appointments: appointments, isLoading: false);
      }
    } catch (error) {
      state = state.copyWith(isLoading: false, errorMessage: error.toString());
    }
  }

  Future<void> fetchAppointmentDetails() async {
    final id = state.appointmentID;
    try {
      final appointment = await _appointmentsService.getAppointmentDetails(id!);
      if (appointment == null) {
        state = state.copyWith(
            errorMessage: "Cannot Fetch Details, Try again later",
            isLoading: false);
      } else {
        state =
            state.copyWith(appointmentDetails: appointment, isLoading: false);
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
  final String? appointmentID;
  final AppointmentModel? appointmentDetails;
  final List<AppointmentModel> appointments;
  final String? errorMessage;

  AppointmentState({
    required this.isLoading,
    required this.appointmentDetails,
    required this.appointmentID,
    required this.appointments,
    this.errorMessage,
  });

  factory AppointmentState.initial() {
    return AppointmentState(
      isLoading: false,
      appointmentDetails: null,
      appointmentID: null,
      appointments: [],
      errorMessage: null,
    );
  }
  AppointmentState copyWith({
    bool? isLoading,
    String? appointmentID,
    AppointmentModel? appointmentDetails,
    List<AppointmentModel>? appointments,
    String? errorMessage,
  }) {
    return AppointmentState(
      isLoading: isLoading ?? this.isLoading,
      appointmentDetails: appointmentDetails ?? this.appointmentDetails,
      appointmentID: appointmentID ?? this.appointmentID,
      appointments: appointments ?? this.appointments,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}
