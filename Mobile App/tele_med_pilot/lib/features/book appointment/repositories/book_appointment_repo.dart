import 'package:tele_med_pilot/models/availability_model.dart';

abstract class BookAppointmentRepo {
  Future<Availabilities> getAvailability(int doctorId);
}
