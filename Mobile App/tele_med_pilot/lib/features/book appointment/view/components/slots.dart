import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';

class Slots extends StatefulWidget {
  final String? authToken;
  final int doctorId;

  const Slots({super.key, required this.authToken, required this.doctorId});

  @override
  State<Slots> createState() => _SlotsState();
}

class _SlotsState extends State<Slots> {
  DateTime currentDate = DateTime.now();
  DateTime startOfDisplayedWeek = DateTime.now();
  DateTime? selectedDay;
  Map<String, List<Map<String, dynamic>>> slotsByDay = {};
  int? selectedSlotIndex;
  late String url;
  final TextEditingController _textFieldController = TextEditingController();
  int selectedDuration = 60; // Default session duration is 30 mins

  @override
  void initState() {
    super.initState();
    selectedDay = currentDate;
    url = AppConstants.doctorAvailability(widget.doctorId);
    _calculateDisplayedWeek();
    _populateSlots();
  }

  void _calculateDisplayedWeek() {
    setState(() {
      startOfDisplayedWeek =
          currentDate.subtract(Duration(days: currentDate.weekday - 1));
    });
  }

  Future<Map<String, List<Map<String, dynamic>>>> getAvailability() async {
    try {
      final response = await Dio().get(
        url,
        options: Options(
          headers: {
            'Authorization': 'Bearer ${widget.authToken}',
          },
        ),
      );

      if (response.statusCode == 200) {
        final availabilities =
            response.data['availabilities'] as Map<String, dynamic>;
        return {
          for (var entry in availabilities.entries)
            entry.key: List<Map<String, dynamic>>.from(entry.value)
        };
      } else {
        throw Exception('Failed to load availability: ${response.statusCode}');
      }
    } catch (e) {
      return {};
    }
  }

  Future<void> _populateSlots() async {
    final availabilityData = await getAvailability();
    setState(() {
      slotsByDay = availabilityData;
    });
  }

  List<Widget> _buildSlotsForDay(DateTime day) {
    String formattedDate = DateFormat('E MMM d yyyy').format(day);
    List<Map<String, dynamic>>? slots = slotsByDay[formattedDate];

    if (slots == null || slots.isEmpty) {
      return [const Center(child: Text('No slots available'))];
    }

    // Filter the slots based on the selected duration
    return slots.where((slot) {
      String time = slot['time'];
      DateTime slotTime = DateFormat('HH:mm:ss').parse(time);
      if (selectedDuration == 30) {
        return slotTime.minute % 30 == 0; // 30-minute intervals
      } else {
        return slotTime.minute == 0; // Hourly slots
      }
    }).map((slot) {
      int index = slots.indexOf(slot);
      String timeWithoutSeconds =
          slot['time'].substring(0, 5); // Remove seconds
      return GestureDetector(
        onTap: () {
          setState(() {
            selectedSlotIndex = index;
          });
        },
        child: Container(
          margin: const EdgeInsets.all(4),
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
          decoration: BoxDecoration(
            color: selectedSlotIndex == index
                ? Colors.blue[100]
                : Colors.grey.shade200,
            border: Border.all(
              color: selectedSlotIndex == index
                  ? Colors.blue
                  : Colors.grey.shade300,
            ),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(
            timeWithoutSeconds,
            style: TextStyle(
              color: selectedSlotIndex == index ? Colors.blue : Colors.black,
            ),
          ),
        ),
      );
    }).toList();
  }

  void _goToPreviousWeek() {
    setState(() {
      currentDate = currentDate.subtract(const Duration(days: 7));
      _calculateDisplayedWeek();
      _populateSlots();
    });
  }

  void _goToNextWeek() {
    setState(() {
      currentDate = currentDate.add(const Duration(days: 7));
      _calculateDisplayedWeek();
      _populateSlots();
    });
  }

  List<Widget> _buildWeekDays() {
    return List<Widget>.generate(7, (index) {
      DateTime day = startOfDisplayedWeek.add(Duration(days: index));
      String dayLabel = DateFormat('E dd').format(day);
      bool isSelected = selectedDay?.isAtSameMomentAs(day) ?? false;

      return GestureDetector(
        onTap: () {
          setState(() {
            selectedDay = day;
          });
        },
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isSelected ? Colors.blue : Colors.grey.shade200,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                dayLabel,
                style: TextStyle(
                  color: isSelected ? Colors.white : Colors.black,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
            const SizedBox(
              width: 5,
            )
          ],
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        color: Colors.white,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SessionTime(
              selectedDuration: selectedDuration,
              onDurationChanged: (newValue) {
                setState(() {
                  selectedDuration = newValue!;
                });
                _populateSlots(); // Refresh slots when duration changes
              },
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  onPressed: _goToPreviousWeek,
                  icon: const Icon(Icons.arrow_left, size: 20),
                ),
                Text(
                  "${DateFormat('MMM dd').format(startOfDisplayedWeek)} - "
                  "${DateFormat('MMM dd').format(startOfDisplayedWeek.add(const Duration(days: 6)))}",
                  style: const TextStyle(
                      fontSize: 16, fontWeight: FontWeight.bold),
                ),
                IconButton(
                  onPressed: _goToNextWeek,
                  icon: const Icon(Icons.arrow_right, size: 20),
                ),
              ],
            ),
            const SizedBox(height: 10),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: _buildWeekDays(),
              ),
            ),
            const SizedBox(height: 20),

            // Slot selection area
            if (selectedDay != null && slotsByDay.isNotEmpty)
              Wrap(
                children: _buildSlotsForDay(selectedDay!),
              ),
            const SizedBox(height: 20),

            // Text Field
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: TextField(
                controller: _textFieldController,
                decoration: const InputDecoration(
                  labelText: "Enter additional notes",
                  border: OutlineInputBorder(),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Book Now Button
            Center(
              child: SizedBox(
                width: MediaQuery.of(context).size.width * 0.5,
                child: ElevatedButton(
                  onPressed: selectedSlotIndex != null &&
                          _textFieldController.text.isNotEmpty
                      ? () async {
                          Navigator.pushReplacementNamed(
                              context, RouteClass.mainLayoutRoute);
                        }
                      : null,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    backgroundColor: selectedSlotIndex != null &&
                            _textFieldController.text.isNotEmpty
                        ? AppColors.blue60
                        : Colors.grey.shade300,
                  ),
                  child: selectedSlotIndex == null &&
                          _textFieldController.text.isEmpty
                      ? const Text(
                          "Fill data first",
                          style: TextStyle(fontSize: 16, color: Colors.white),
                        )
                      : const Text(
                          "Request Appointment",
                          style: TextStyle(fontSize: 16, color: Colors.white),
                        ),
                ),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}

class SessionTime extends StatelessWidget {
  final int selectedDuration;
  final ValueChanged<int?> onDurationChanged;

  const SessionTime(
      {super.key,
      required this.selectedDuration,
      required this.onDurationChanged});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Column(
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
      ),
    );
  }

  // Build Radio Option for session duration
  Widget buildRadioOption(int value, String text) {
    return Flexible(
      child: RadioListTile<int>(
        value: value,
        groupValue: selectedDuration,
        onChanged: onDurationChanged,
        title: Text(text),
      ),
    );
  }
}
