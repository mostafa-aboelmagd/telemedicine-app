import 'package:tele_med_pilot/models/doctor_model.dart';

class DoctorCardViewModel {
  DoctorModel? doctorModel;
  DoctorCardViewModel({this.doctorModel});

  get id => doctorModel?.id;
  get name => doctorModel?.name;
  get title => doctorModel?.title?.toUpperCase();
  get nearestApp => doctorModel?.nearestApp;
  get rating => doctorModel?.rating;
  get numSessions => doctorModel?.numSessions;
  get numReviews => doctorModel?.numReviews;
  get fees60min => doctorModel?.fees60min;
  get fees30min => doctorModel?.fees30min;
  get image => doctorModel?.image;
  get interests => doctorModel?.interests;
  get country => doctorModel?.country;
  get language => doctorModel?.language;
  get gender => doctorModel?.gender;
  get isOnline => doctorModel?.isOnline;
}
