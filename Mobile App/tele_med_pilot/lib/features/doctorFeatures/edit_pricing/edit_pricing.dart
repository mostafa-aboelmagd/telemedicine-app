import 'package:flutter/material.dart';

class EditPricing extends StatelessWidget {
  const EditPricing({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Centered Text'),
      ),
      body: const Center(
        child: Text(
          'Edit pricingd',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
