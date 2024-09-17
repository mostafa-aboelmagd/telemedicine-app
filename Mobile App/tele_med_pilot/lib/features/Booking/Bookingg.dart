import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/Booking/components/filterAndSort.dart';
import 'package:tele_med_pilot/features/Booking/components/mainBar.dart';
import 'package:tele_med_pilot/features/Booking/components/search.dart';
import 'package:tele_med_pilot/features/home_page/views/home_screen.dart';

class BookingSession extends StatefulWidget {
  const BookingSession({super.key});

  @override
  State<BookingSession> createState() => _BookingSessionState();
}

class _BookingSessionState extends State<BookingSession> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Image.asset(AppConstants.logo),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              "TeleMedPilot",
              style: AppTextStyles.bodyTextLargeBold,
            ),
            Text(
              "You talk.. We help",
              style: AppTextStyles.bodyTextExtraSmallNormal,
            ),
          ],
        ),
      ),
      body: const Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start, // Align content to the start (left)
          children: [
            Mainbar(),
            SearchComponent(),
            Padding(
              padding: EdgeInsets.all(8.0),
              child: FilterAndSortComponent()
              
            ),
          ],
        ),
      ),
    );
  }
}