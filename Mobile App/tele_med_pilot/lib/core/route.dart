import 'package:flutter/material.dart';
import 'package:tele_med_pilot/features/doctors/views/doctors_screen.dart';
import 'package:tele_med_pilot/features/home_page/views/home_screen.dart';
import 'package:tele_med_pilot/features/more/views/more_screen.dart';
import 'package:tele_med_pilot/features/my_sessions/views/my_sessions_screen.dart';
import 'package:tele_med_pilot/features/notification/views/notifications_screen.dart';
import 'package:tele_med_pilot/features/profile/views/profile_screen.dart';
import 'package:tele_med_pilot/features/sign_in/views/signin_screen.dart';
import 'package:tele_med_pilot/features/sign_up/signup_step2_screen.dart';
import 'package:tele_med_pilot/features/sign_up/signup_step1_screen.dart';
import 'package:tele_med_pilot/features/sign_up/signup_step3_screen.dart';
import 'package:tele_med_pilot/features/support/views/support_screen.dart';
import 'package:tele_med_pilot/ui/main_screen.dart';
import 'package:tele_med_pilot/ui/main_screen_layout.dart';

class RouteClass {
  static const String initRoute = "/";

  //Navigation bar screen routes
  static const String mainLayoutRoute = "/main_layout_screen";
  static const String homeRoute = "/home_screen";
  static const String doctorsRoute = "/doctors_screen";
  static const String supportRoute = "/support";
  static const String moreRoute = "//more_screen";
  static const String myTherapistsScreen =
      "/main_layout_screen/my_therapists_screen";

  //Application internal screen routes
  static const String profileRoute = "/profile_screen";
  static const String notificationsRoute = "/notification_screen";

  //Registration and athentication routes
  static const String signInRoute = "/sign_in_screen";
  static const String signUpStep1Route = "/sign_up_step1_screen";
  static const String signUpStep2Route = "/sign_up_step2_screen";
  static const String signUpStep3Route = "/sign_up_step3_screen";

  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case initRoute:
        return MaterialPageRoute(builder: (_) => const MainScreen());

      //Navigation bar screen routes
      case mainLayoutRoute:
        return MaterialPageRoute(builder: (_) => const MainScreenLayout());
      case homeRoute:
        return MaterialPageRoute(builder: (_) => const HomeScreen());
      case doctorsRoute:
        return MaterialPageRoute(builder: (_) => const DoctorsScreen());
      case supportRoute:
        return MaterialPageRoute(builder: (_) => const SupportScreen());
      case moreRoute:
        return MaterialPageRoute(builder: (_) => const MoreScreen());
      case myTherapistsScreen:
        return MaterialPageRoute(builder: (_) => const MySessionsScreen());

      //Application internal screen routes
      case profileRoute:
        return MaterialPageRoute(builder: (_) => const ProfileScreen());
      case notificationsRoute:
        return MaterialPageRoute(builder: (_) => const NotificationsScreen());

      //Registration and athentication routes
      case signInRoute:
        return MaterialPageRoute(builder: (_) => const SignInScreen());
      case signUpStep1Route:
        return MaterialPageRoute(builder: (_) => const SignUpStep1Screen());
      case signUpStep2Route:
        return MaterialPageRoute(builder: (_) => const SignUpStep2Screen());
      case signUpStep3Route:
        return MaterialPageRoute(builder: (_) => const SignUpStep3Screen());

      default:
        return MaterialPageRoute(builder: (_) => const MainScreen());
    }
  }
}
