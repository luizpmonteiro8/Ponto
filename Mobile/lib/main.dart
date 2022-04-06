import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:get_it/get_it.dart';
import 'package:ponto/api/model/user.dart';
import 'package:ponto/environments.dart';
import 'package:ponto/screens/login/login_screen.dart';
import 'package:ponto/store/employee_store.dart';
import 'package:ponto/store/job_store.dart';

void main() {
  EnvironmentConfig.environmentBuild = Environments.DEVELOPER;

  setupLocators();
  runApp(MyApp());
}

void setupLocators() {
  GetIt.I.registerSingleton(EmployeeStore());
  GetIt.I.registerSingleton(JobStore());
  GetIt.I.registerSingleton(User());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ponto',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color(0xffeddbc4),
        visualDensity: VisualDensity.adaptivePlatformDensity,
        scaffoldBackgroundColor: const Color(0xffeddbc4),
        appBarTheme: const AppBarTheme(elevation: 0, color: Color(0xffff6e4a)),
        elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(primary: const Color(0xff5c5259))),
        textSelectionTheme:
            const TextSelectionThemeData(cursorColor: Colors.orange),
        scrollbarTheme: ScrollbarThemeData(
            thumbColor: MaterialStateProperty.all(const Color(0xffff6e4a))),
      ),
      supportedLocales: const [
        Locale('pt', 'BR'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      home: LoginScreen(),
    );
  }
}
