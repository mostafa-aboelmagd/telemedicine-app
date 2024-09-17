import 'package:flutter/material.dart';

class EditInfo extends StatelessWidget {
  const EditInfo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Centered Text'),
      ),
      body: const Center(
        child: Text(
          'Edit info',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
