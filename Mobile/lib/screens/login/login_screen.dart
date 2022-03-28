import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:get_it/get_it.dart';
import 'package:mobx/mobx.dart';
import 'package:ponto/api/model/user.dart';
import 'package:ponto/components/custom_input.dart';
import 'package:ponto/components/error_box.dart';
import 'package:ponto/screens/job/job_registration_screen.dart';
import 'package:ponto/store/login_store.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final LoginStore loginStore = LoginStore();

  @override
  void initState() {
    super.initState();

    User user = GetIt.I<User>();

    SharedPreferences.getInstance().then((value) => {
          if (value.getString('authorization') != null)
            {
              user.token = value.getString('authorization'),
              Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => JobRegistrationScreen()))
            }
        });

    reaction((_) => loginStore.isLogged, (isLogged) {
      if (isLogged = true) {
        SharedPreferences.getInstance().then((value) => {
              if (value.getString('authorization') != null)
                {
                  user.token = value.getString('authorization'),
                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (_) => JobRegistrationScreen())),
                }
            });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ponto'),
        centerTitle: true,
      ),
      body: Container(
        alignment: Alignment.center,
        child: SingleChildScrollView(
            child: Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: Card(
            margin: const EdgeInsets.symmetric(horizontal: 32),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            elevation: 8,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Observer(builder: (_) {
                      return CustomInput(
                        onChanged: loginStore.setEmail,
                        enabled: true,
                        label: 'Email',
                        initialValue: loginStore.email,
                        error: loginStore.emailError,
                        keyboardType: TextInputType.emailAddress,
                      );
                    }),
                    Observer(builder: (_) {
                      return CustomInput(
                        label: 'Senha',
                        initialValue: loginStore.password,
                        password: true,
                        onChanged: loginStore.setPassword,
                        enabled: true,
                        error: loginStore.passwordError,
                        obscure: !loginStore.passwordVisible,
                        onTap: loginStore.togglePasswordVisibility,
                      );
                    }),
                    Observer(builder: (_) {
                      return ElevatedButton(
                        child: const Text("Entrar"),
                        onPressed: loginStore.sendPressed,
                      );
                    }),
                    Observer(builder: (_) {
                      return ErrorBox(message: loginStore.error);
                    })
                  ]),
            ),
          ),
        )),
      ),
    );
  }
}
