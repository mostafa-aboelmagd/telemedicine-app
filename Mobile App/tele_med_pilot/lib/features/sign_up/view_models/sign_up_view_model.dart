import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tele_med_pilot/features/sign_up/services/sign_up_service.dart';

class SignUpViewModel extends StateNotifier<SignInState> {
  final SignUpService _signUpService;
  final Ref ref;

  SignUpViewModel(this._signUpService, this.ref) : super(SignInState.initial());

  void setFirstName(String firstName) {
    state = state.copyWith(firstName: firstName);
    validateForm();
  }

  void setLastName(String lastName) {
    state = state.copyWith(lastName: lastName);
    validateForm();
  }

  void setEmail(String email) {
    state = state.copyWith(email: email);
    validateForm();
  }

  void setPhone(String phone) {
    state = state.copyWith(phone: phone);
    validateForm();
  }

  void setPassword(String password) {
    state = state.copyWith(password: password);
    validateForm();
  }

  void setConfirmPassword(String confirmPassword) {
    state = state.copyWith(confirmPassword: confirmPassword);
    validateForm();
  }

  void setBirthYear(String birthYear) {
    state = state.copyWith(birthYear: birthYear);
    validateForm();
  }

  void setGender(String gender) {
    state = state.copyWith(gender: gender);
    validateForm();
  }

  bool validateForm() {
    return state.firstName.isNotEmpty &&
        state.lastName.isNotEmpty &&
        state.email.isNotEmpty &&
        state.phone.isNotEmpty &&
        state.password.isNotEmpty &&
        state.confirmPassword.isNotEmpty &&
        state.birthYear.isNotEmpty &&
        state.gender.isNotEmpty;
  }

  bool validateFormData() {
    final emailError = _validateEmail(state.email);
    final passwordError = _validatePassword(state.password);
    final confirmPasswordError =
        _validateConfirmPassword(state.confirmPassword);

    state = state.copyWith(
      emailError: emailError,
      passwordError: passwordError,
      confirmPasswordError: confirmPasswordError,
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
    final numberRegExp = RegExp(r'[0-9]');
    final alphabetRegExp = RegExp(r'[A-Za-z]');
    final specialCharRegExp = RegExp(r'[!@#$%^&*(),.?":{}|<>]');

    if (password.length < 8) {
      return "Password must contain at least 8 characters";
    } else if (!numberRegExp.hasMatch(password)) {
      return "Password must contain at least one number";
    } else if (!alphabetRegExp.hasMatch(password)) {
      return "Password must contain at least one alphabet";
    } else if (!specialCharRegExp.hasMatch(password)) {
      return "Password must contain at least one special character";
    }

    return null;
  }

  String? _validateConfirmPassword(String confirmPassword) {
    if (confirmPassword != state.password) {
      return "Passwords Don't Match";
    }

    return null;
  }

  Future<bool> signUp() async {
    if (!state.isFormValid) return false;
    state = state.copyWith(isLoading: true);
    try {
      await _signUpService.signUp(
        state.firstName,
        state.lastName,
        state.email,
        state.phone,
        state.gender,
        state.birthYear,
        state.password,
      );

      state = state.copyWith(errorMessage: null, isLoading: false);
      return true;
    } catch (error) {
      state = state.copyWith(errorMessage: error.toString(), isLoading: false);
      return false;
    }
  }
}

final signUpViewModelProvider =
    StateNotifierProvider<SignUpViewModel, SignInState>((ref) {
  final authService = ref.read(signUpServiceProvider);
  return SignUpViewModel(authService, ref);
});

class SignInState {
  final String firstName;
  final String lastName;
  final String email;
  final String password;
  final String confirmPassword;
  final String phone;
  final String birthYear;
  final String gender;
  final String? emailError;
  final String? passwordError;
  final String? confirmPasswordError;
  final String? errorMessage;
  final bool isFormValid;
  final bool isLoading;

  SignInState({
    required this.email,
    required this.password,
    required this.birthYear,
    required this.confirmPassword,
    required this.firstName,
    required this.lastName,
    required this.gender,
    required this.phone,
    this.emailError,
    this.passwordError,
    this.confirmPasswordError,
    this.errorMessage,
    required this.isFormValid,
    required this.isLoading,
  });

  factory SignInState.initial() {
    return SignInState(
      email: '',
      password: '',
      confirmPassword: '',
      birthYear: '',
      firstName: '',
      lastName: '',
      gender: '',
      phone: '',
      confirmPasswordError: null,
      emailError: null,
      passwordError: null,
      errorMessage: null,
      isFormValid: false,
      isLoading: false,
    );
  }

  SignInState copyWith({
    String? email,
    String? firstName,
    String? lastName,
    String? phone,
    String? confirmPassword,
    String? gender,
    String? birthYear,
    String? password,
    String? emailError,
    String? passwordError,
    String? confirmPasswordError,
    String? errorMessage,
    bool? isFormValid,
    bool? isLoading,
  }) {
    return SignInState(
      email: email ?? this.email,
      password: password ?? this.password,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      birthYear: birthYear ?? this.birthYear,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      gender: gender ?? this.gender,
      phone: phone ?? this.phone,
      emailError: emailError,
      passwordError: passwordError,
      confirmPasswordError: confirmPasswordError,
      errorMessage: errorMessage,
      isFormValid: isFormValid ?? this.isFormValid,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}
