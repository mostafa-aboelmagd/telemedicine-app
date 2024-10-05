import 'package:flutter/material.dart';

class SessionTime extends StatefulWidget {
  const SessionTime({super.key});

  @override
  State<SessionTime> createState() => _SessionTimeState();
}

class _SessionTimeState extends State<SessionTime> {
  int selectedDuration = 30; // Default session duration is 30 mins

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 120,
          color: Colors.white,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text("Select session duration:",
                    style: TextStyle(fontSize: 16)),
              ),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  buildRadioOption(30, "30 Mins"),
                  buildRadioOption(60, "60 Mins"),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
      ],
    );
  }

  // Build Radio Option for session duration
  Widget buildRadioOption(int value, String text) {
    return Flexible(
      child: RadioListTile<int>(
        value: value,
        groupValue: selectedDuration,
        onChanged: (newValue) {
          setState(() {
            selectedDuration = newValue!;
          });
        },
        title: Text(text),
      ),
    );
  }
}
