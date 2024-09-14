import 'package:flutter/material.dart';
import 'package:tele_med_pilot/core/theme.dart';

class Loader extends StatelessWidget {
  const Loader({super.key});

  @override
  Widget build(BuildContext context) {
    return const CircularProgressIndicator(
      color: AppColors.teal0,
    );
  }
}
