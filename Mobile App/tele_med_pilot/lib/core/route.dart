import 'package:flutter/material.dart';
import 'package:tele_med_pilot/AuthContainer.dart';
import 'package:tele_med_pilot/features/Booking/view/Bookingg_view.dart';
import 'package:tele_med_pilot/features/appointments/views/appointment_details_screen.dart';
import 'package:tele_med_pilot/features/appointments/views/appointments_screen.dart';
import 'package:tele_med_pilot/features/book%20appointment/view/add_appointment_view.dart';
import 'package:tele_med_pilot/features/home_page/views/home_screen.dart';
import 'package:tele_med_pilot/features/notification/views/notifications_screen.dart';
import 'package:tele_med_pilot/features/profile/views/profile_screen.dart';
import 'package:tele_med_pilot/features/sign_in/views/signin_screen.dart';
import 'package:tele_med_pilot/features/sign_up/views/sign_up_screen.dart';
import 'package:tele_med_pilot/features/support/views/support_screen.dart';
import 'package:tele_med_pilot/ui/main_screen_layout.dart';

class RouteClass {
  static const String initRoute = "/";

  // Navigation bar screen routes
  static const String mainLayoutRoute = "/main_layout_screen";
  static const String homeRoute = "/home_screen";
  static const String supportRoute = "/support";
  static const String appointmentsRoute = "/appointments";
  static const String profileRoute = "/profile_screen";

  // Application internal screen routes
  static const String notificationsRoute = "/notification_screen";
  static const String appointmentDetailsRoute = "/appointment_details_screen";

  //Registration and athentication routes
  static const String signInRoute = "/sign_in_screen";
  static const String signUpStepRoute = "/sign_up_screen";

  static const String doctorCards = "/Booking";
  static const String addAppointment = "/add_appointment_view";
  static const String requestPage = "/request_page";
  static const String chatPage = "/chat_page";

  // Method to generate route with optional transitions and speed
  static Route<dynamic> generateRoute(RouteSettings settings) {
    // Extract arguments (e.g., the transition type and duration)
    final args = settings.arguments as Map<String, dynamic>?;

    Widget page;
    switch (settings.name) {
      case doctorCards:
        page = const BookingSession();
        break;

      case mainLayoutRoute:
        page = const MainScreenLayout();
        break;

      case addAppointment:
        page = AddAppointmentView(card: args!['card']);
        break;

      case homeRoute:
        page = const HomeScreen();
        break;

      case supportRoute:
        page = const SupportScreen();
        break;

      case appointmentsRoute:
        page = const AppointmentsScreen();
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

      case signUpStepRoute:
        page = const SignUpStep1Screen();
        break;

      case appointmentDetailsRoute:
        page = const AppointmentDetailsScreen();
        break;

      default:
        page = const AuthContainer();
    }

    // Extract the transition and duration from arguments
    if (args != null) {
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

      case 'slideRight':
        return PageRouteBuilder(
          pageBuilder: (context, animation, secondaryAnimation) => page,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            var begin = const Offset(-1.0, 0.0); // Slide from right
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