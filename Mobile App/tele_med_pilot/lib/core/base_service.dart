import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:tele_med_pilot/core/constant.dart';

class BaseService {
  // final Ref _ref;

  BaseService(/*this._ref */);

  Future<Map<String, dynamic>> get(String endpoint) async {
    // final user = _ref.read(userProvider);
    final response = await http.get(
      Uri.parse('${AppConstants.baseURL}$endpoint'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': 'Bearer ${user?.token}',
      },
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get data.');
    }
  }

  Future<Map<String, dynamic>> post(
    String endpoint,
    Map<String, dynamic> body,
  ) async {
    //final user = _ref.read(userProvider);
    final response = await http.post(
      Uri.parse('${AppConstants.baseURL}$endpoint'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //  'Authorization': 'Bearer ${user?.token}',
      },
      body: jsonEncode(body),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to post data.');
    }
  }
}

final baseServiceProvider =
    Provider<BaseService>((ref) => BaseService(/*ref*/));
