import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/main_bar.dart';

class AddAppointmentView extends StatefulWidget {
  final dynamic card;
  const AddAppointmentView({
    super.key,
    required this.card,
  });

  @override
  State<AddAppointmentView> createState() => _AddAppointmentViewState();
}

class _AddAppointmentViewState extends State<AddAppointmentView> {
  @override
  Widget build(BuildContext context) {
    double rating = widget.card.rating ?? 0.0;
    String? image = widget.card.image; // Access the image field
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
      imageProvider = const AssetImage('assets/pp.png');
    }
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
        padding: const EdgeInsets.all(8),
        child: Column(
          children: [
            const Mainbar(
                isLeading: true,
                title: "Session Request",
                page: RouteClass.doctorCards,
                transition: 'slideRight',
                pop: true),
            Container(
              height: 70.h,
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    CircleAvatar(
                      radius: 25,
                      backgroundColor: Colors.transparent,
                      backgroundImage: imageProvider,
                    ),
                    const SizedBox(width: 10),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(widget.card.name,
                            style: AppTextStyles.bodyTextBold),
                        const SizedBox(
                          height: 5,
                        ),
                        Text(
                          widget.card.title,
                          style: AppTextStyles.textMidBlue,
                        ),
                      ],
                    ),
                    const Spacer(),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Row(
                            children: List.generate(5, (index) {
                          return Icon(
                            index < rating ? Icons.star : Icons.star_border,
                            color: Colors.amber,
                            size: 20,
                          );
                        })),
                        const SizedBox(
                          height: 5,
                        ),
                        Text(
                          "${widget.card.rating}(${widget.card.numReviews} reviews)",
                          style: AppTextStyles.bodyTextSmallNormal,
                        ),
                      ],
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
