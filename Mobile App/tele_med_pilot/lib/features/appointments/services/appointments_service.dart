import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/core/base_service.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/models/appointment_model.dart';

class AppointmentsService {
  final BaseService _baseService;

  AppointmentsService(this._baseService);

  Future<List<AppointmentModel>> getAppointments() async {
    try {
      final response =
          await _baseService.get(AppConstants.patientAppointmentsEndpoint);
      if (response['appointments'] == null ||
          response['appointments'] is! List) {
        return [];
      }

      return (response['appointments'] as List)
          .map((appointmentJson) => AppointmentModel.fromJson(appointmentJson))
          .toList();
    } catch (error) {
      rethrow;
    }
  }

  Future<List<AppointmentModel>> getHistoryAppointments() async {
    try {
      final response = await _baseService
          .get(AppConstants.patientAppointmentsHistoryEndpoint);

      if (response['appointments'] == null ||
          response['appointments'] is! List) {
        return [];
      }

      return (response['appointments'] as List)
          .map((appointmentJson) => AppointmentModel.fromJson(appointmentJson))
          .toList();
    } catch (error) {
      rethrow;
    }
  }

  Future<AppointmentModel?> getAppointmentDetails(String id) async {
    try {
      final response = await _baseService
          .get("${AppConstants.patientAppointmentDetailsEndpoint}/$id");
      if (response['appointment'] == null) {
        return null;
      }

      return (AppointmentModel.fromJson(response['appointment']));
    } catch (error) {
      rethrow;
    }
  }
}

final appointmentsServiceProvider = Provider<AppointmentsService>((ref) {
  final baseService = ref.read(baseServiceProvider);
  return AppointmentsService(baseService);
});
