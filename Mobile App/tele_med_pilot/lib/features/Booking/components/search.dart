import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/theme.dart';

class SearchComponent extends StatefulWidget {
  const SearchComponent({super.key});

  @override
  State<SearchComponent> createState() => _SearchComponentState();
}

class _SearchComponentState extends State<SearchComponent> {
  @override
  Widget build(BuildContext context) {
    return Column(
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
                  hintStyle: const TextStyle(color: Colors.grey, fontSize: 14),
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
    );
  }
}