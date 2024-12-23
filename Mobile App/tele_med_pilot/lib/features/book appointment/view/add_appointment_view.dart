import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:tele_med_pilot/utility/token_service.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/features/book%20appointment/view/components/doctor_info.dart';
import 'package:tele_med_pilot/features/book%20appointment/view/components/slots.dart';
import 'package:tele_med_pilot/ui/components/main_bar.dart';

class AddAppointmentView extends StatefulWidget {
  final dynamic card;
  const AddAppointmentView({
    super.key,
    required this.card,
  });

  @override
  State<AddAppointmentView> createState() => _AddAppointmentViewState();
}

class _AddAppointmentViewState extends State<AddAppointmentView> {
  String? token;

  @override
  void initState() {
    super.initState();
    _requestPermissions();
    _loadToken();
  }

  void _requestPermissions() async {
    await Permission.storage.request();
  }

  void _loadToken() async {
    String? retrievedToken = await TokenService.getToken();
    setState(() {
      token = retrievedToken;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Image.asset(AppConstants.logo),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text("TeleMedPilot", style: AppTextStyles.bodyTextLargeBold),
            Text("You talk.. We help",
                style: AppTextStyles.bodyTextExtraSmallNormal),
          ],
        ),
      ),
      body: SingleChildScrollView(
        // Wrap in SingleChildScrollView
        padding: const EdgeInsets.all(8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Mainbar(
              isLeading: true,
              title: "Session Request",
              page: RouteClass.doctorCards,
              transition: 'slideRight',
              pop: true,
            ),
            // Doctor Info Section
            DoctorInfo(card: widget.card),
            const SizedBox(height: 20),

            token == null
                ? const Center(
                    child: CircularProgressIndicator()) // Center the loader
                : Slots(
                    doctorId: int.parse(widget.card.id),
                    authToken: token,
                  ),
          ],
        ),
      ),
    );
  }
}
