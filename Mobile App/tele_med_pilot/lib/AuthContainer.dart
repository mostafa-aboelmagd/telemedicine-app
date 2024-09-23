import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:tele_med_pilot/ui/main_screen.dart';
import 'package:tele_med_pilot/ui/main_screen_layout.dart';

/// A StatefulWidget that determines the authentication state and navigates accordingly.
class AuthContainer extends StatefulWidget {
  /// Constructor for the AuthContainer widget.
  final String? role;
  const AuthContainer({
    super.key,
    this.role,
  });

  @override
  State<AuthContainer> createState() => _AuthContainerState();
}

/// The state for the AuthContainer widget.
class _AuthContainerState extends State<AuthContainer> {
  // ignore: non_constant_identifier_names
  String? access_token; // Variable to store the access token

  @override
  void initState() {
    super.initState();
    Permission.storage.request();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('token');
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    if (access_token == null) {
      return const MainScreen();
    } else {
      return const MainScreenLayout();
    }
  }
}
