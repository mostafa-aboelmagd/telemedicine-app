class UserModel {
  final String firstName;
  final String lastName;
  final String email;
  final String gender;
  final String phone;
  final int birthYear;
  final List<String?> languages;

  UserModel({
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.gender,
    required this.phone,
    required this.birthYear,
    required this.languages,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      firstName: json['firstName'] ?? '',
      lastName: json['lastName'] ?? '',
      email: json['email'] ?? '',
      gender: json['gender'] ?? '',
      phone: json['phone'] ?? '',
      birthYear: json['birthYear'] ?? 0,
      languages: List<String?>.from(json['languages'] ?? []),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'gender': gender,
      'phone': phone,
      'birthYear': birthYear,
      'languages': languages,
    };
  }

  UserModel copyWith({
    String? firstName,
    String? lastName,
    String? email,
    String? gender,
    String? phone,
    int? birthYear,
    List<String?>? languages,
  }) {
    return UserModel(
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      gender: gender ?? this.gender,
      phone: phone ?? this.phone,
      birthYear: birthYear ?? this.birthYear,
      languages: languages ?? this.languages,
    );
  }
}
