import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:ponto/api/model/employee.dart';
import 'package:ponto/api/model/user.dart';
import 'package:ponto/environments.dart';

class EmployeeServices {
  final endpoint = '/employee';
  final User user = GetIt.I<User>();
  Dio dio = Dio();

  EmployeeServices() {
    dio.options.connectTimeout = 5000;
    dio.options.receiveTimeout = 15000;
    dio.options.sendTimeout = 15000;
    dio.options.baseUrl = EnvironmentConfig.urlsConfig();
    dio.options.headers = {
      "authorization": user.token,
    };
  }

  Future<List<Employee>> getEmployees() async {
    try {
      final response = await dio.get<List>(endpoint);
      List<Employee> listEmployee;
      try {
        listEmployee = response.data!.map((j) => Employee.fromJson(j)).toList();
      } catch (e) {
        return Future.error('Ocorreu um erro inesperado!');
      }
      return listEmployee;
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future<int> insert(Employee employee) async {
    try {
      final response = await dio.post(
        endpoint,
        data: employee,
      );
      return response.data['id'];
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future<Object> update(Employee employee) async {
    try {
      final response = await dio.put(
        endpoint + '/' + employee.id.toString(),
        data: employee,
      );
      return response;
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future<Object> delete(Employee employee) async {
    try {
      final response = await dio.delete(
        endpoint + '/' + employee.id.toString(),
      );

      return response;
    } on DioError catch (e) {
      if (e.type == DioErrorType.connectTimeout) {
        return Future.error('Falha de comunicação com servidor!');
      }
      return Future.error(e.response!.data["message"]);
    }
  }
}
