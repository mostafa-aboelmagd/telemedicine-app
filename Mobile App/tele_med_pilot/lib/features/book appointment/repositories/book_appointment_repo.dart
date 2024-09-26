import 'package:tele_med_pilot/models/Availability_model.dart';

abstract class BookAppointmentRepo {
  Future<Availabilities> getAvailability(int doctorId);
}
