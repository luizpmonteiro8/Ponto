import 'package:dio/dio.dart';
import 'package:ponto/api/model/login.dart';
import 'package:ponto/environments.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginServices {
  final endpoint = EnvironmentConfig.urlsConfig() + '/signin';

  Future<bool> getLogin(Login login) async {
    try {
      final response = await Dio().post(endpoint, data: login.toJson());
      SharedPreferences sharedPreferences =
          await SharedPreferences.getInstance();
      sharedPreferences.setString(
          'authorization', response.headers.value('authorization') ?? '');
      return true;
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }
}
