import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';  // Import flutter_dotenv
import 'package:tele_med_pilot/core/global_keys.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    await dotenv.load(fileName: "assets/.env");
  } catch (e) {
    print("Failed to load .env file: $e");
  }
  runApp(const ProviderScope(child: App()));
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<StatefulWidget> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(360, 690),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return GestureDetector(
          onTap: () {
            final currentFocus = FocusManager.instance.primaryFocus;
            if (currentFocus != null) {
              currentFocus.unfocus();
            }
          },
          child: MaterialApp(
            navigatorKey: navigatorKey,
            initialRoute: RouteClass.initRoute,
            onGenerateRoute: RouteClass.generateRoute,
            debugShowCheckedModeBanner: false,
            theme: buildAppTheme(),
          ),
        );
      },
    );
  }
}
