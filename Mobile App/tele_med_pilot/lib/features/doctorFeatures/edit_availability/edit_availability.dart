import 'package:flutter/material.dart';

class EditAvailability extends StatelessWidget {
  const EditAvailability({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Centered Text'),
      ),
      body: const Center(
        child: Text(
          'Edit availability',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
