import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/theme.dart';


class DoctorInfo extends StatefulWidget {
  final dynamic card;
  const DoctorInfo({super.key, required this.card});

  @override
  State<DoctorInfo> createState() => _DoctorInfoState();
}

class _DoctorInfoState extends State<DoctorInfo> {
  @override
  Widget build(BuildContext context) {
  double rating = widget.card.rating ?? 0.0;
    String? image = widget.card.image;
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
    return Container(
              height: 70.h,
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
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
                        Text(widget.card.name, style: AppTextStyles.bodyTextBold),
                        const SizedBox(height: 5),
                        Text(widget.card.title, style: AppTextStyles.textMidBlue),
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
                          }),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          "${widget.card.rating}(${widget.card.numReviews} reviews)",
                          style: AppTextStyles.bodyTextSmallNormal,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
  }
}