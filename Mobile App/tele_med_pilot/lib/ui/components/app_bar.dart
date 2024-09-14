import 'package:flutter/material.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
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
      actions: [
        Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
          if (identifier == 1 || identifier == 2)
            IconButton(
              padding: const EdgeInsets.all(0),
              icon: const Icon(Icons.notifications),
              onPressed: () {
                Navigator.pushNamed(context, RouteClass.notificationsRoute);
              },
            ),
          if (identifier == 1)
            IconButton(
              padding: const EdgeInsets.all(0),
              icon: const Icon(Icons.person),
              onPressed: () {
                Navigator.pushNamed(context, RouteClass.profileRoute);
              },
            ),
        ])
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
