import 'dart:convert';

class DoctorModel {
  String? id;
  String? name;
  DateTime? nearestApp;
  String? title;
  double? rating;
  int? numSessions;
  int? numReviews;
  double? fees60min;
  double? fees30min;
  String? image; // Base64 encoded image
  List<String>? interests;
  String? country;
  List<String>? language;
  String? gender;
  bool? isOnline;

  DoctorModel({
    this.id,
    this.name,
    this.nearestApp,
    this.title,
    this.rating,
    this.numSessions,
    this.numReviews,
    this.fees60min,
    this.fees30min,
    this.image,
    this.interests,
    this.country,
    this.language,
    this.gender,
    this.isOnline,
  });

  DoctorModel.fromJson(Map<String, dynamic> json) {
    id = json['id']?.toString();
    name = json['name'] ?? 'Unknown'; // Default to 'Unknown' if null
    nearestApp = json['nearestApp'] != null
        ? DateTime.tryParse(json['nearestApp'])
        : null;
    title = json['title'] ?? 'No Title'; // Default to 'No Title' if null
    rating = json['rating'] != null
        ? (json['rating'] as num).toDouble()
        : 0.0; // Default to 0.0 if null
    numSessions = json['numSessions'] ?? 0; // Default to 0 if null
    numReviews = json['numReviews'] ?? 0; // Default to 0 if null
    fees60min = json['fees60min'] != null
        ? (json['fees60min'] as num).toDouble()
        : 0.0; // Default to 0.0 if null
    fees30min = json['fees30min'] != null
        ? (json['fees30min'] as num).toDouble()
        : 0.0; // Default to 0.0 if null

    // Handle image field
    if (json['image'] != null && json['image'] is Map) {
      var imageData = json['image'];
      if (imageData is Map && imageData['data'] is List) {
        image = base64Encode(List<int>.from(imageData['data']));
      } else {
        image = null; // Handle unexpected format
      }
    } else {
      image = null; // Handle null image
    }

    // Adjust the interests mapping to exclude null or empty entries
    interests = (json['interests'] as List<dynamic>?)
            ?.map((item) => item.toString())
            .where((item) => item.isNotEmpty) // Filter out empty strings
            .toList() ??
        []; // Default to empty list if null

    country = json['country'] ?? 'Unknown'; // Default to 'Unknown' if null
    language = (json['language'] as List<dynamic>?)
            ?.map((item) => item.toString())
            .toList() ??
        []; // Default to empty list if null

    gender =
        json['gender'] ?? 'Not Specified'; // Default to 'Not Specified' if null
    isOnline =
        json['isOnline'] == 'true'; // Convert 'true'/'false' strings to boolean
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'nearestApp': nearestApp?.toIso8601String(),
      'title': title,
      'rating': rating,
      'numSessions': numSessions,
      'numReviews': numReviews,
      'fees60min': fees60min,
      'fees30min': fees30min,
      'image': image,
      'interests': interests,
      'country': country,
      'language': language,
      'gender': gender,
      'isOnline': isOnline,
    };
  }
}
