import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/core/device_id.dart';
import 'package:tele_med_pilot/core/providers.dart';
import 'package:tele_med_pilot/features/sign_in/services/sign_in_service.dart';
import 'package:tele_med_pilot/models/user_model.dart';

class SignInViewModel extends StateNotifier<SignInState> {
  final SignInService _signInService;
  final DeviceInfoService _deviceInfoService;
  final Ref ref;

  SignInViewModel(this._signInService, this._deviceInfoService, this.ref)
      : super(SignInState.initial());

  void setEmail(String email) {
    state = state.copyWith(email: email);
    validateForm();
  }

  void setPassword(String password) {
    state = state.copyWith(password: password);
    validateForm();
  }

  bool validateForm() {
    return state.email.isNotEmpty && state.password.isNotEmpty;
  }

  bool validateFormData() {
    final emailError = _validateEmail(state.email);
    final passwordError = _validatePassword(state.password);

    state = state.copyWith(
      emailError: emailError,
      passwordError: passwordError,
      isFormValid: emailError == null && passwordError == null,
    );

    return emailError == null && passwordError == null;
  }

  String? _validateEmail(String email) {
    if (email.isEmpty) return "Email cannot be empty";
    if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(email)) {
      return "Invalid Email Address";
    }
    return null;
  }

  String? _validatePassword(String password) {
    if (password.isEmpty) return "Password cannot be empty";

    return null;
  }

  Future<bool> signIn() async {
    if (!state.isFormValid) return false;
    state = state.copyWith(isLoading: true);
    try {
      final deviceId = await _deviceInfoService.getDeviceId();
      if (deviceId == null) {
        throw Exception('Unable to retrieve device ID');
      }
      UserModel user = await _signInService.signIn(
        state.email,
        state.password,
        deviceId,
      );

      state = state.copyWith(user: user, errorMessage: null, isLoading: false);
      ref.read(userProvider.notifier).state = user;

      return true;
    } catch (error) {
      state = state.copyWith(errorMessage: error.toString(), isLoading: false);
      return false;
    }
  }
}

final signInViewModelProvider =
    StateNotifierProvider<SignInViewModel, SignInState>((ref) {
  final authService = ref.read(signInServiceProvider);
  final deviceInfoService = ref.read(deviceInfoServiceProvider);
  return SignInViewModel(authService, deviceInfoService, ref);
});

class SignInState {
  final String email;
  final String password;
  final String? emailError;
  final String? passwordError;
  final String? errorMessage;
  final bool isFormValid;
  final bool isLoading;
  final UserModel? user;

  SignInState({
    required this.email,
    required this.password,
    this.emailError,
    this.passwordError,
    this.errorMessage,
    required this.isFormValid,
    required this.isLoading,
    this.user,
  });

  factory SignInState.initial() {
    return SignInState(
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
      errorMessage: null,
      isFormValid: false,
      isLoading: false,
      user: null,
    );
  }

  SignInState copyWith({
    String? email,
    String? password,
    String? emailError,
    String? passwordError,
    String? errorMessage,
    bool? isFormValid,
    bool? isLoading,
    UserModel? user,
  }) {
    return SignInState(
      email: email ?? this.email,
      password: password ?? this.password,
      emailError: emailError,
      passwordError: passwordError,
      errorMessage: errorMessage,
      isFormValid: isFormValid ?? this.isFormValid,
      isLoading: isLoading ?? this.isLoading,
      user: user ?? this.user,
    );
  }
}
