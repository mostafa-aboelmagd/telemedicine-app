class AvailabilityModel {
  final String time;
  final int id;

  AvailabilityModel({required this.time, required this.id});

  // Update the factory constructor to handle individual availability items
  factory AvailabilityModel.fromJson(Map<String, dynamic> json) {
    return AvailabilityModel(
      time: json['time'],
      id: json['id'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'time': time,
      'id': id,
    };
  }
}
class Availabilities {
  final Map<String, List<AvailabilityModel>> availabilities;

  Availabilities({required this.availabilities});

  factory Availabilities.fromJson(Map<String, dynamic> json) {
    Map<String, List<AvailabilityModel>> availMap = {};

    // Parse the availability map
    json.forEach((date, availList) {
      List<AvailabilityModel> availabilities = (availList as List)
          .map((item) => AvailabilityModel.fromJson(item as Map<String, dynamic>))
          .toList();
      availMap[date] = availabilities;
    });

    return Availabilities(availabilities: availMap);
  }

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    availabilities.forEach((date, availList) {
      json[date] = availList.map((avail) => avail.toJson()).toList();
    });
    return json;
  }
}
