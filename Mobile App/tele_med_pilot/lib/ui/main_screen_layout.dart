import 'package:flutter/material.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/appointments/views/appointments_screen.dart';
import 'package:tele_med_pilot/features/home_page/views/home_screen.dart';
import 'package:tele_med_pilot/features/profile/views/profile_screen.dart';
import 'package:tele_med_pilot/features/requests/views/request_screen.dart';
import 'package:tele_med_pilot/features/support/views/support_screen.dart';

class MainScreenLayout extends StatefulWidget {
  const MainScreenLayout({super.key});

  @override
  State<StatefulWidget> createState() => _MainScreenLayoutState();
}

class _MainScreenLayoutState extends State<MainScreenLayout> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const AppointmentsScreen(),
    const ProfileScreen(),
    const RequestScreen(),
    const SupportScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.domain_verification_rounded),
            label: 'Appointments',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_to_queue),
            label: 'Requests',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.support_agent),
            label: 'Support',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: AppColors.blue100,
        onTap: _onItemTapped,
        showSelectedLabels: true,
        showUnselectedLabels: true,
      ),
    );
  }
}
