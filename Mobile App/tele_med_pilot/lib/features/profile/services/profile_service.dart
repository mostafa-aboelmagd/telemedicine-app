import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/core/base_service.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/models/user_model.dart';

class ProfileService {
  final BaseService _baseService;

  ProfileService(this._baseService);

  Future<UserModel> getProfile() async {
    final response =
        await _baseService.get(AppConstants.patientProfileEndpoint);
    print(response);
    return UserModel.fromJson(response["formattedPatient"]);
  }
}

final profileServiceProvider = Provider<ProfileService>((ref) {
  final baseService = ref.read(baseServiceProvider);
  return ProfileService(baseService);
});
