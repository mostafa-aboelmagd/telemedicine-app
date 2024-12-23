import 'package:tele_med_pilot/features/Booking/repositories/Doctors_repo.dart';
import 'package:tele_med_pilot/features/Booking/view_models/doctor_card_view_model.dart';
import 'package:tele_med_pilot/models/doctor_model.dart';

class BookingSessionViewModel {
  DoctorsRepo? doctorsRepo;

  BookingSessionViewModel({this.doctorsRepo});

  Future<List<DoctorCardViewModel>> fetchDoctorList() async {
    List<DoctorModel> list = await doctorsRepo!.getDoctorsList();
    return list
        .map((doctor) => DoctorCardViewModel(doctorModel: doctor))
        .toList();
  }
}
