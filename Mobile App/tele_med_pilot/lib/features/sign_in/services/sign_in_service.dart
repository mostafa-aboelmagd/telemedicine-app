import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/models/user_model.dart';
import 'package:http/http.dart' as http;

class SignInService {
  Future<UserModel> signIn(
      String email, String password, String deviceId) async {
    final response = await http.post(
      Uri.parse('${AppConstants.baseURL}${AppConstants.loginEndpoint}'),
      body: jsonEncode({
        'email': email,
        'password': password,
        'device_id': deviceId,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body)["data"];
      final user = UserModel.fromJson(data);
      return user;
    } else if (response.statusCode == 422) {
      throw ('The given data was invalid.');
    } else {
      throw ('Error happened. Try again later.');
    }
  }
}

final signInServiceProvider = Provider<SignInService>((ref) => SignInService());
