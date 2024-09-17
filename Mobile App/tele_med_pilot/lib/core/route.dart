import 'package:flutter/material.dart';
import 'package:tele_med_pilot/AuthContainer.dart';
import 'package:tele_med_pilot/features/Booking/view/Bookingg_view.dart';
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

  // Navigation bar screen routes
  static const String mainLayoutRoute = "/main_layout_screen";
  static const String homeRoute = "/home_screen";
  static const String doctorsRoute = "/doctors_screen";
  static const String supportRoute = "/support";
  static const String moreRoute = "//more_screen";
  static const String myTherapistsScreen =
      "/main_layout_screen/my_therapists_screen";

  // Application internal screen routes
  static const String profileRoute = "/profile_screen";
  static const String notificationsRoute = "/notification_screen";

  //Registration and athentication routes

  static const String signInRoute = "/sign_in_screen";
  static const String signUpStep1Route = "/sign_up_step1_screen";
  static const String signUpStep2Route = "/sign_up_step2_screen";
  static const String signUpStep3Route = "/sign_up_step3_screen";
  static const String bookSession = "/Booking";

  // Method to generate route with optional transitions and speed
  static Route<dynamic> generateRoute(RouteSettings settings) {
    // Extract arguments (e.g., the transition type and duration)
    final args = settings.arguments as Map<String, dynamic>?;

    Widget page;
    switch (settings.name) {
      case bookSession:
        page = const BookingSession();
        break;

      case homeRoute:
        page = const HomeScreen();
        break;

      case doctorsRoute:
        page = const DoctorsScreen();
        break;

      case supportRoute:
        page = const SupportScreen();
        break;

      case moreRoute:
        page = const MoreScreen();
        break;

      case myTherapistsScreen:
        page = const MySessionsScreen();
        break;

      case profileRoute:
        page = const ProfileScreen();
        break;

      case notificationsRoute:
        page = const NotificationsScreen();
        break;

      //Registration and athentication routes
      case signInRoute:
        page = const SignInScreen();
        break;

      case signUpStep1Route:
        page = const SignUpStep1Screen();
        break;

      case signUpStep2Route:
        page = const SignUpStep2Screen();
        break;

      case signUpStep3Route:
        page = const SignUpStep3Screen();
        break;

      default:
        page = const AuthContainer();
    }

    // Extract the transition and duration from arguments
    if (args != null && args.containsKey('transition')) {
      final String transition = args['transition'];
      final Duration? duration = args['duration'] as Duration?;
      return _buildPageRouteWithTransition(page, transition,
          duration: duration);
    } else {
      return MaterialPageRoute(builder: (_) => page);
    }
  }

  // Method to handle different types of transitions and their speeds
  static PageRoute _buildPageRouteWithTransition(Widget page, String transition,
      {Duration? duration}) {
    final animationDuration = duration ??
        const Duration(milliseconds: 300); // Default duration is 300ms

    switch (transition) {
      case 'fade':
        return PageRouteBuilder(
          pageBuilder: (context, animation, secondaryAnimation) => page,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return FadeTransition(
              opacity: animation,
              child: child,
            );
          },
          transitionDuration: animationDuration,
        );

      case 'slideLeft':
        return PageRouteBuilder(
          pageBuilder: (context, animation, secondaryAnimation) => page,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            var begin = const Offset(1.0, 0.0); // Slide from right
            var end = Offset.zero;
            var tween = Tween(begin: begin, end: end);
            var offsetAnimation = animation.drive(tween);

            return SlideTransition(
              position: offsetAnimation,
              child: child,
            );
          },
          transitionDuration: animationDuration,
        );

      case 'slideUp':
        return PageRouteBuilder(
          pageBuilder: (context, animation, secondaryAnimation) => page,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            var begin = const Offset(0.0, 1.0); // Slide from bottom
            var end = Offset.zero;
            var tween = Tween(begin: begin, end: end);
            var offsetAnimation = animation.drive(tween);

            return SlideTransition(
              position: offsetAnimation,
              child: child,
            );
          },
          transitionDuration: animationDuration,
        );

      default:
        return MaterialPageRoute(builder: (_) => page);
    }
  }
}
