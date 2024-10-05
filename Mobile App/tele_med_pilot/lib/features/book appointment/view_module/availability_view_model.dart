import 'package:tele_med_pilot/features/book%20appointment/repositories/book_appointment_repo.dart';
import 'package:tele_med_pilot/features/book%20appointment/view_module/available_view_model.dart';
import 'package:tele_med_pilot/models/availability_model.dart';

class AvailabilityViewModel {
  BookAppointmentRepo? bookAppointmentRepo;

  AvailabilityViewModel({this.bookAppointmentRepo});

  Future<List<AvailableViewModel>> fetchDoctorAvailability(int doctorId) async {
    Availabilities availabilities =
        await bookAppointmentRepo!.getAvailability(doctorId);

    // Flatten the nested map of availability dates
    List<AvailableViewModel> availableViewModels = [];
    availabilities.availabilities.forEach((date, availabilityList) {
      availableViewModels.addAll(
        availabilityList
            .map((availability) =>
                AvailableViewModel(availabilityModel: availability))
            .toList(),
      );
    });

    return availableViewModels;
  }
}
