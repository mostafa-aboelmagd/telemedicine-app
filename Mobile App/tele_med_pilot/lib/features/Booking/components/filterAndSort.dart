import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class FilterAndSortComponent extends StatefulWidget {
  const FilterAndSortComponent({super.key});

  @override
  State<FilterAndSortComponent> createState() => _FilterAndSortComponentState();
}

class _FilterAndSortComponentState extends State<FilterAndSortComponent> {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          height: 30,
          width: MediaQuery.of(context).size.width * 0.45,
          child: ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              side: const BorderSide(color: Colors.green, width: 1.5),
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
                  style: TextStyle(color: Colors.green, fontSize: 10),
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
              side: const BorderSide(color: Colors.green, width: 1.5),
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
                  style: TextStyle(color: Color(0xFF4CAF50), fontSize: 10),
                ),
              ],
            ),
          ),
        )
      ],
    );
  }
}
