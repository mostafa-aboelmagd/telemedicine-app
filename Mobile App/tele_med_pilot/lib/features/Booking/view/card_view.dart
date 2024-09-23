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
    String? image = card.image; // Access the image field
    ImageProvider imageProvider;

    if (image != null) {
      // Check if the image is a base64 string
      try {
        // Try decoding it as base64
        imageProvider = MemoryImage(base64Decode(image));
      } catch (e) {
        // If decoding fails, treat it as an image URL
        imageProvider = NetworkImage(image);
      }
    } else {
      // If no image is available, use a placeholder
      imageProvider = AssetImage('assets/pp.png');
    }

    String nearestAppFormatted = card.nearestApp != null
        ? DateFormat('yyyy-MM-dd')
            .format(card.nearestApp!) // Format DateTime to string
        : 'Not available';

    // Convert rating to integer value if necessary
    double rating = card.rating ?? 0.0; // Replace with the actual rating value

    return Container(
      padding: EdgeInsets.all(16),
      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
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
                radius: 30,
                backgroundColor: Colors.transparent,
                backgroundImage: imageProvider,
              ),
              SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    card.name ?? "Unknown Doctor",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  Text(
                    card.title ?? "Specialty not available",
                    style: TextStyle(color: Colors.grey[600]),
                  ),
                  SizedBox(height: 5),
                  Row(
                    children: List.generate(5, (index) {
                      return Icon(
                        index < rating ? Icons.star : Icons.star_border,
                        color: Colors.amber,
                        size: 20,
                      );
                    }),
                  ),
                ],
              ),
              Spacer(),
              Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      CircleAvatar(
                          radius: 8,
                          backgroundColor: Colors.transparent,
                          child: Image.asset('assets/icons/team.png')),
                      SizedBox(width: 8),
                      Text(
                        card.numSessions.toString() ?? "0",
                        style: TextStyle(color: AppColors.blue100),
                      ),
                      Text(' sessions',
                          style: TextStyle(color: AppColors.blue100)),
                    ],
                  ),
                  Row(
                    children: [
                      CircleAvatar(
                          radius: 8,
                          backgroundColor: Colors.transparent,
                          child: Image.asset('assets/icons/star.png')),
                      SizedBox(width: 8),
                      Text(
                        card.rating != null
                            ? "${card.rating.toString()} ("
                            : "0",
                        style: TextStyle(color: AppColors.blue100),
                      ),
                      const Text('Reviews)',
                          style: TextStyle(color: AppColors.blue100)),
                    ],
                  )
                ],
              )
            ],
          ),
          SizedBox(height: 10),
          SizedBox(
            height: 40, // Adjust height as needed
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: (card.interests ?? []).map<Widget>((interest) {
                  // Safeguard for null or empty interest
                  if (interest == null) {
                    interest = 'No interest specified';
                  }
                  return Container(
                    margin:
                        EdgeInsets.only(right: 8), // Spacing between interests
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      interest,
                      style: TextStyle(fontSize: 14),
                    ),
                  );
                }).toList(),
              ),
            ),
          ),
          SizedBox(height: 10),
          Row(
            children: [
              CircleAvatar(
                radius: 8,
                child: Image.asset('assets/icons/clock.png'),
              ),
              SizedBox(width: 4),
              Text('Next available: '),
              Text(
                nearestAppFormatted,
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ],
          ),
          SizedBox(height: 10),
          Row(
            children: [
              CircleAvatar(
                radius: 8,
                child: Image.asset('assets/icons/money.png'),
              ),
              SizedBox(width: 4),
              Text('Fees: '),
              Text(
                'EGP ${card.fees60min ?? 'N/A'}/ 60 min, EGP ${card.fees30min ?? 'N/A'}/ 30 min',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ],
          ),
          SizedBox(height: 10),
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
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    elevation: 0,
                    padding: EdgeInsets.zero,
                  ),
                  child: const Text(
                    "View Profile",
                    style: TextStyle(color: Color(0xFF4CAF50), fontSize: 16),
                  ),
                ),
              ),
              SizedBox(width: 10),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.all(10.0), // add some padding
                  child: Button(
                    label: 'Book Now',
                    labelColor: Colors.white,
                    isValid: true,
                    onTap: () async {
                      print('DoctorId: ${card.id}');
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
