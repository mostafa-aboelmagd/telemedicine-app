import 'package:flutter/material.dart';

class Loader extends StatelessWidget {
  final Color loaderColor;
  final double width;
  const Loader({
    super.key,
    required this.loaderColor,
    required this.width,
  });

  @override
  Widget build(BuildContext context) {
    return CircularProgressIndicator(
      strokeWidth: width,
      color: loaderColor,
    );
  }
}
