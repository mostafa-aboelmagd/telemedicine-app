
import 'package:tele_med_pilot/models/doctor_model.dart';

abstract class DoctorsRepo {
  Future<List<DoctorModel>> getDoctorsList();
}