import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/home_page/views/home_screen.dart';

class Mainbar extends StatefulWidget {
  const Mainbar({super.key});

  @override
  State<Mainbar> createState() => _MainbarState();
}

class _MainbarState extends State<Mainbar> {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      mainAxisSize: MainAxisSize.max,
      children: [
        IconButton(
          icon: Icon(Icons.arrow_circle_left_outlined, size: 35.spMin),
          onPressed: () {
            Navigator.pop(context);
            Navigator.push(
              context,
              PageRouteBuilder(
                pageBuilder: (context, animation, secondaryAnimation) =>
                    HomeScreen(),
                transitionsBuilder:
                    (context, animation, secondaryAnimation, child) {
                  var begin = Offset(-1.0, 0.0);
                  var end = Offset.zero;
                  var tween = Tween(begin: begin, end: end);
                  var offsetAnimation = animation.drive(tween);

                  return SlideTransition(
                    position: offsetAnimation,
                    child: child,
                  );
                },
              ),
            );
          },
        ),
        Text(
          "Sign Up",
          style: AppTextStyles.bodyTextLargeBold
              .copyWith(color: AppColors.blue100),
        ),
        SizedBox(width: 48.w),
      ],
    );
  }
}
