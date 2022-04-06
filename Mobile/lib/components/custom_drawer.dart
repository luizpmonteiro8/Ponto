import 'package:flutter/material.dart';
import 'package:ponto/screens/employee/employee_list_screen.dart';
import 'package:ponto/screens/job/job_list_screen.dart';
import 'package:ponto/screens/login/login_screen.dart';
import 'package:ponto/store/login_store.dart';

class CustomDrawer extends StatelessWidget {
  const CustomDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SafeArea(
          child: Column(
        children: [
          InkWell(
              onTap: () => Navigator.of(context)
                  .push(MaterialPageRoute(builder: (_) => JobListScreen())),
              child: const Text(
                'Cargos',
                style: TextStyle(fontSize: 18),
              )),
          InkWell(
              onTap: () => Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => EmployeeListScreen())),
              child: const Text(
                'Funcionários',
                style: TextStyle(fontSize: 18),
              )),
          InkWell(
              onTap: () => _logout(context),
              child: const Text(
                'Logout',
                style: TextStyle(fontSize: 18),
              ))
        ],
      )),
    );
  }
}

_logout(BuildContext context) {
  final LoginStore loginStore = LoginStore();
  loginStore.logout();
  Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => LoginScreen()),
      (Route<dynamic> route) => false);
}
