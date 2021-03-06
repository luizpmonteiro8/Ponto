import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:ponto/api/model/job.dart';
import 'package:ponto/api/model/user.dart';
import 'package:ponto/environments.dart';

class JobServices {
  final endpoint = '/job';
  final User user = GetIt.I<User>();
  Dio dio = Dio();

  JobServices() {
    dio.options.connectTimeout = 5000;
    dio.options.receiveTimeout = 15000;
    dio.options.sendTimeout = 15000;
    dio.options.baseUrl = EnvironmentConfig.urlsConfig();
    dio.options.headers = {
      "authorization": user.token,
    };
  }

  Future<List<Job>> getJobs() async {
    try {
      final response = await dio.get<List>(endpoint);
      List<Job> listJob;
      try {
        listJob = response.data!.map((j) => Job.fromJson(j)).toList();
      } catch (e) {
        return Future.error('Ocorreu um erro inesperado!');
      }

      return listJob;
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future<int> insert(Job job) async {
    try {
      final response = await dio.post(
        endpoint,
        data: job,
      );
      return response.data['id'];
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future<Object> update(Job job) async {
    try {
      final response = await dio.put(
        endpoint + '/' + job.id.toString(),
        data: job,
      );
      return response;
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future<Object> delete(Job job) async {
    try {
      final response = await dio.delete(
        endpoint + '/' + job.id.toString(),
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
