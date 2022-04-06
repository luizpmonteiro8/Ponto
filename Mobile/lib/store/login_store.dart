import 'package:mobx/mobx.dart';
import 'package:ponto/api/model/login.dart';
import 'package:ponto/api/services/login_service.dart';
import 'package:ponto/helpers/extensions.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'login_store.g.dart';

class LoginStore = _LoginStore with _$LoginStore;

abstract class _LoginStore with Store {
  @observable
  bool showErrors = false;

  @observable
  String? error;

  @action
  void invalidSendPressed() => showErrors = true;

  @observable
  String email = 'teste@teste.com.br';

  @action
  void setEmail(String value) => email = value;

  @computed
  bool get emailValid => email != '' && email.isEmailValid();
  String get emailError => !showErrors || emailValid ? '' : 'E-mail inválido';

  @observable
  String password = '12345678';

  @action
  void setPassword(String value) => password = value;

  @computed
  bool get passwordValid => password != '' && password.length >= 4;
  String get passwordError =>
      !showErrors || passwordValid ? '' : 'Senha inválida';

  @observable
  bool passwordVisible = false;

  @action
  void togglePasswordVisibility() => passwordVisible = !passwordVisible;

  @computed
  bool get formValid => passwordValid && emailValid;

  @computed
  get sendPressed => formValid ? _send : null;

  @observable
  bool isLogged = false;

  @action
  void setIsLogged(bool value) => isLogged = value;

  @action
  Future<void> _send() async {
    invalidSendPressed();
    Login login = Login();
    login.email = email;
    login.password = password;
    try {
      isLogged = await LoginServices().getLogin(login);
      error = null;
    } catch (e) {
      error = e.toString();
    }
  }

  @action
  Future<void> logout() async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    sharedPreferences.remove('authorization');
  }
}
