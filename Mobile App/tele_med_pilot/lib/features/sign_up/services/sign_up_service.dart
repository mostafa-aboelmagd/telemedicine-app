import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:http/http.dart' as http;

class SignUpService {
  Future<void> signUp(String firstName, String lastName, String email,
      String phone, String gender, String birthYear, String password) async {
    print(AppConstants.patientRegisterEndpoint);
    final response = await http.post(
      Uri.parse(AppConstants.patientRegisterEndpoint),
      body: jsonEncode(
        {
          'fName': firstName,
          'lName': lastName,
          'email': email,
          'phone': phone,
          'gender': gender,
          'password': password,
          'birthYear': birthYear,
        },
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    );
    print(response.body);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return;
    } else if (response.statusCode == 400) {
      throw ('Email already exist');
    } else {
      throw ('Error occurred while creating your account');
    }
  }
}

final signUpServiceProvider = Provider<SignUpService>((ref) => SignUpService());
