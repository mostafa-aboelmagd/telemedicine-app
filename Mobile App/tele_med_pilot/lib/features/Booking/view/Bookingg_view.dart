import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/Booking/repositories/data/doctors_list_back.dart';
import 'package:tele_med_pilot/features/Booking/view/card_view.dart';
import 'package:tele_med_pilot/features/Booking/view_models/Booking_view_model.dart';
import 'package:tele_med_pilot/ui/components/mainBar.dart';
import 'dart:io' show Platform;

class BookingSession extends StatefulWidget {
  const BookingSession({super.key});

  @override
  State<BookingSession> createState() => _BookingSessionState();
}

class _BookingSessionState extends State<BookingSession> {
  var bookingSessionViewModel =
      BookingSessionViewModel(doctorsRepo: DoctorsListBack());
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
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Mainbar(
              title: "Our Doctors",
              isLeading: true,
              pop: true,
              page: RouteClass.mainLayoutRoute,
              transition: 'slideLeft',
            ),
            Column(
              children: [
                Text(
                  "Search for your desired therapist",
                  style: AppTextStyles.bodyTextSmallBold,
                ),
                SizedBox(height: 3.h),
                SizedBox(
                  height: 40.h,
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: "Therapist Name or interest",
                      hintStyle:
                          const TextStyle(color: Colors.grey, fontSize: 14),
                      prefixIcon: const Icon(Icons.search, color: Colors.grey),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8.r),
                        borderSide: const BorderSide(
                          color: Colors.grey,
                        ),
                      ),
                      filled: true,
                      fillColor: Colors.white,
                    ),
                  ),
                )
              ],
            ),
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    SizedBox(
                      height: 30,
                      width: MediaQuery.of(context).size.width * 0.45,
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          side:
                              const BorderSide(color: Colors.green, width: 1.5),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8.r),
                          ),
                          elevation: 0,
                          padding: EdgeInsets.zero,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Image.asset('assets/icons/filter.png',
                                height: 15.h, width: 15.w),
                            SizedBox(width: 4.w),
                            const Text(
                              "Filter by",
                              style:
                                  TextStyle(color: Colors.green, fontSize: 10),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(
                      width: 8,
                    ),
                    SizedBox(
                      height: 30,
                      width: MediaQuery.of(context).size.width * 0.45,
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          side:
                              const BorderSide(color: Colors.green, width: 1.5),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8.r),
                          ),
                          elevation: 0,
                          padding: EdgeInsets.zero,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Image.asset('assets/icons/sorting.png',
                                height: 15.h, width: 15.w),
                            SizedBox(width: 4.w),
                            const Text(
                              "Sort by",
                              style: TextStyle(
                                  color: Color(0xFF4CAF50), fontSize: 10),
                            ),
                          ],
                        ),
                      ),
                    )
                  ],
                )),
            FutureBuilder(
              future: bookingSessionViewModel.fetchDoctorList(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                    child: Platform.isAndroid
                        ? const CircularProgressIndicator()
                        : const CupertinoActivityIndicator(),
                  );
                } else if (snapshot.hasError) {
                  return Center(
                    child: Text('An error occurred: ${snapshot.error}'),
                  );
                } else if (!snapshot.hasData || snapshot.data == null) {
                  return const Center(
                    child: Text('No data available'),
                  );
                } else {
                  var cards = snapshot.data;
                  return Expanded(
                    child: ListView.builder(
                      itemCount: cards?.length,
                      itemBuilder: (context, index) =>
                          CardView(card: cards![index]),
                    ),
                  );
                }
              },
            )
          ],
        ),
      ),
    );
  }
}
