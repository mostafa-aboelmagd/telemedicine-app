import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/features/profile/services/profile_service.dart';
import 'package:tele_med_pilot/models/user_model.dart';

class ProfileViewModel extends StateNotifier<ProfileState> {
  final ProfileService _profileService;
  final Ref ref;

  ProfileViewModel(this._profileService, this.ref)
      : super(ProfileState.initial());

  Future<bool> getProfile() async {
    try {
      UserModel user = await _profileService.getProfile();
      print(user.firstName);

      state = state.copyWith(user: user, isLoading: false);
      return true;
    } catch (error) {
      state = state.copyWith(isLoading: false);
      return false;
    }
  }
}

final profileViewModelProvider =
    StateNotifierProvider<ProfileViewModel, ProfileState>((ref) {
  final profileService = ref.read(profileServiceProvider);
  return ProfileViewModel(profileService, ref);
});

class ProfileState {
  final UserModel? user;
  final bool isLoading;

  ProfileState({
    this.user,
    required this.isLoading,
  });

  factory ProfileState.initial() {
    return ProfileState(
      isLoading: false,
      user: null,
    );
  }

  ProfileState copyWith({
    bool? isLoading,
    UserModel? user,
  }) {
    return ProfileState(
      isLoading: isLoading ?? this.isLoading,
      user: user ?? this.user,
    );
  }
}
