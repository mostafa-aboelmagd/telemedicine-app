import 'package:dio/dio.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/features/Booking/repositories/Doctors_repo.dart';
import 'package:tele_med_pilot/models/doctor_model.dart';

class DoctorsListBack extends DoctorsRepo {
  @override
  Future<List<DoctorModel>> getDoctorsList() async {
    List<DoctorModel> doctors = [];
    try {
      var response = await Dio().get(AppConstants.patientHomeEndpoint);

      // Assuming response.data is a List<dynamic> or List<Map<String, dynamic>>
      if (response.data is List) {
        List<dynamic> data = response.data;

        // Parse the JSON list into a list of DoctorModel
        doctors = data.map((doctorJson) {
          // Print each doctor JSON for inspection
          return DoctorModel.fromJson(doctorJson);
        }).toList();
      } else {
        throw Exception("Expected a list of doctors");
      }
    } catch (e) {
      throw Exception("Failed to load doctors");
    }

    return doctors;
  }
}
