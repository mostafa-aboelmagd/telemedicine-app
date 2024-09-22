import 'package:flutter/material.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/theme.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final int identifier;
  const CustomAppBar({super.key, required this.identifier});

  @override
  Widget build(BuildContext context) {
    return AppBar(
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
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
