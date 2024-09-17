import 'package:flutter/material.dart';

class EditExperience extends StatelessWidget {
  const EditExperience({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Centered Text'),
      ),
      body: const Center(
        child: Text(
          'Edit experiece',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
