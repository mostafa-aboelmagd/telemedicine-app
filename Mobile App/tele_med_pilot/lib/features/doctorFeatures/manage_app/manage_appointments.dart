import 'package:flutter/material.dart';

class ManageAppointments extends StatelessWidget {
  const ManageAppointments({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Centered Text'),
      ),
      body: const Center(
        child: Text(
          'Manage appointments',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
