import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:http/http.dart' as http;
import 'package:tele_med_pilot/features/sign_up/view_models/sign_up_view_model.dart';

class SignUpService {
  final Ref _ref;
  SignUpService(this._ref);
  Future<void> signUp(String firstName, String lastName, String email,
      String phone, String gender, String birthYear, String password) async {
    print(AppConstants.patientRegisterEndpoint);

    final viewModel = _ref.read(signUpViewModelProvider.notifier);

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
      viewModel.setErrorMessage("Email already exist");
      throw ('Email already exist');
    } else {
      viewModel.setErrorMessage("Error occurred while creating your account");
      throw ('Error occurred while creating your account');
    }
  }
}

final signUpServiceProvider =
    Provider<SignUpService>((ref) => SignUpService(ref));
