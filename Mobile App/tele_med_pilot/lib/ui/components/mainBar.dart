import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';

class Mainbar extends StatefulWidget {
  final bool pop;
  final bool isLeading;
  final String title;
  final dynamic page;
  final String? transition;
  final int? duration;

  const Mainbar({
    super.key,
    required this.isLeading,
    required this.title,
    this.page,
    this.pop = false,
    this.transition,
    this.duration,
  });

  @override
  State<Mainbar> createState() => _MainbarState();
}

class _MainbarState extends State<Mainbar> {
  late bool isLeading = widget.isLeading;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      mainAxisSize: MainAxisSize.max,
      children: [
        isLeading
            ? IconButton(
                icon: Icon(Icons.arrow_circle_left_outlined, size: 35.spMin),
                onPressed: () {

                  // Ensure the duration is not null
                  final transitionDuration = widget.duration != null
                      ? Duration(milliseconds: widget.duration!)
                      : const Duration(milliseconds: 300); // Default duration
                  widget.pop
                  ?Navigator.pushReplacementNamed(
                    context,
                    widget.page,
                    arguments: {
                      'transition': widget.transition ?? 'slideLeft', // Default transition if null
                      'duration': transitionDuration,
                    },
                  )
                  :Navigator.pushNamed(
                    context,
                    widget.page,
                    arguments: {
                      'transition': widget.transition ?? 'slideLeft', // Default transition if null
                      'duration': transitionDuration,
                    },
                  );
                },
              )
            : Container(),
        Text(
          widget.title,
          style: AppTextStyles.bodyTextLargeBold
              .copyWith(color: AppColors.blue100),
        ),
        SizedBox(width: 48.w),
      ],
    );
  }
}
