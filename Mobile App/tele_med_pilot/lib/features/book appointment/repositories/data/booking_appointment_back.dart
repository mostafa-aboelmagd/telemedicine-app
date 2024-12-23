import 'package:dio/dio.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/features/book%20appointment/repositories/book_appointment_repo.dart';
import 'package:tele_med_pilot/models/availability_model.dart';

class BookingAppointmentBack extends BookAppointmentRepo {
  final String authToken; // Field to hold the auth token

  BookingAppointmentBack({required this.authToken}); // Constructor with token

  @override
  Future<Availabilities> getAvailability(int doctorId) async {
    try {
      var response = await Dio().get(
        AppConstants.doctorAvailability(doctorId),
        options: Options(
          headers: {
            'Authorization': 'Bearer $authToken',
          },
        ),
      );

      // Check if response data is not null
      if (response.data != null &&
          response.data.containsKey('availabilities')) {
        final availabilitiesData =
            response.data['availabilities'] as Map<String, dynamic>;

        // Convert response to Availabilities model
        return Availabilities.fromJson(availabilitiesData);
      } else {
        throw Exception("No availabilities found for doctor ID $doctorId");
      }
    } catch (e) {
      throw Exception("Failed to load availability: $e");
    }
  }
}
