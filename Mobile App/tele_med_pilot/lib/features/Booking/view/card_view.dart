import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:intl/intl.dart'; // Add this import for date formatting
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/Booking/view_models/doctor_card_view_model.dart';
import 'package:tele_med_pilot/ui/components/button.dart';

class CardView extends StatefulWidget {
  final DoctorCardViewModel card;
  const CardView({super.key, required this.card});

  @override
  State<CardView> createState() => _CardViewState();
}

class _CardViewState extends State<CardView> {
  late DoctorCardViewModel card = widget.card;

  @override
  Widget build(BuildContext context) {
    String? image = card.image;
    ImageProvider imageProvider;

    if (image != null) {
      try {
        imageProvider = MemoryImage(base64Decode(image));
      } catch (e) {
        imageProvider = NetworkImage(image);
      }
    } else {
      imageProvider = const AssetImage('assets/pp.png');
    }

    String nearestAppFormatted = card.nearestApp != null
        ? DateFormat('yyyy-MM-dd').format(card.nearestApp!)
        : 'Not available';

    double rating = card.rating ?? 0.0;

    return Container(
      padding: EdgeInsets.all(16.r),
      margin: EdgeInsets.symmetric(vertical: 8.h, horizontal: 16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: const [
          BoxShadow(
            color: Colors.black12,
            spreadRadius: 1,
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 30.r,
                backgroundColor: Colors.transparent,
                backgroundImage: imageProvider,
              ),
              SizedBox(width: 10.w),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    card.name ?? "Unknown Doctor",
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 14.sp),
                  ),
                  Text(
                    card.title ?? "Specialty not available",
                    style: TextStyle(color: Colors.grey[600]),
                  ),
                  SizedBox(height: 5.h),
                  Row(
                    children: List.generate(5, (index) {
                      return Icon(
                        index < rating ? Icons.star : Icons.star_border,
                        color: Colors.amber,
                        size: 15.sp,
                      );
                    }),
                  ),
                ],
              ),
              const Spacer(),
            ],
          ),
          SizedBox(height: 10.h),
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    radius: 8.r,
                    backgroundColor: Colors.transparent,
                    child: Image.asset('assets/icons/team.png'),
                  ),
                  SizedBox(width: 8.w),
                  Text(
                    card.numSessions.toString(),
                    style: const TextStyle(color: AppColors.blue100),
                  ),
                  const Text(
                    ' sessions',
                    style: TextStyle(color: AppColors.blue100),
                  ),
                ],
              ),
              Row(
                children: [
                  CircleAvatar(
                      radius: 8.r,
                      backgroundColor: Colors.transparent,
                      child: Image.asset('assets/icons/star.png')),
                  SizedBox(width: 8.w),
                  Text(
                    card.rating != null ? "${card.rating.toString()} (" : "0",
                    style: const TextStyle(color: AppColors.blue100),
                  ),
                  const Text('Reviews)',
                      style: TextStyle(color: AppColors.blue100)),
                ],
              )
            ],
          ),
          SizedBox(height: 10.h),
          SizedBox(
            height: 40.h,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: (card.interests ?? []).map<Widget>((interest) {
                  interest ??= 'No interest specified';
                  return Container(
                    margin: EdgeInsets.only(right: 8.w),
                    padding:
                        EdgeInsets.symmetric(horizontal: 12.w, vertical: 6.h),
                    decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.circular(8.r),
                    ),
                    child: Text(
                      interest ?? "",
                      style: TextStyle(fontSize: 14.sp),
                    ),
                  );
                }).toList(),
              ),
            ),
          ),
          SizedBox(height: 10.h),
          Row(
            children: [
              CircleAvatar(
                radius: 8.r,
                child: Image.asset('assets/icons/clock.png'),
              ),
              SizedBox(width: 4.w),
              const Text('Next available: '),
              Text(
                nearestAppFormatted,
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ],
          ),
          SizedBox(height: 10.h),
          Row(
            children: [
              CircleAvatar(
                radius: 8.r,
                child: Image.asset('assets/icons/money.png'),
              ),
              SizedBox(width: 4.w),
              const Text('Fees: '),
              Text(
                'EGP ${card.fees60min ?? 'N/A'}/ 60 min, EGP ${card.fees30min ?? 'N/A'}/ 30 min',
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ],
          ),
          SizedBox(height: 10.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              SizedBox(
                height: 40.h,
                width: MediaQuery.of(context).size.width * 0.375,
                child: ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.r),
                    ),
                    elevation: 0,
                    padding: EdgeInsets.zero,
                  ),
                  child: Text(
                    "View Profile",
                    style: TextStyle(
                        color: const Color(0xFF4CAF50), fontSize: 16.sp),
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.all(10.r),
                  child: Button(
                    label: 'Book Now',
                    labelColor: Colors.white,
                    isValid: true,
                    onTap: () async {
                      Navigator.pushNamed(
                        context,
                        RouteClass.addAppointment,
                        arguments: {'transition': 'slideLeft', 'card': card},
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
