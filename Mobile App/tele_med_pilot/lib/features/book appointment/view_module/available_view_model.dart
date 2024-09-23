
import 'package:tele_med_pilot/models/Availability_model.dart';

class AvailableViewModel {
  AvailabilityModel? availabilityModel;
  AvailableViewModel({this.availabilityModel});

  get time => availabilityModel?.time;
  get id => availabilityModel?.id;
}