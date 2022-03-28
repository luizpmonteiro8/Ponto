import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:ponto/api/model/job.dart';
import 'package:ponto/api/model/user.dart';

class JobServices {
  final endpoint = 'http://192.168.1.10:8080/job';
  final User user = GetIt.I<User>();

  Future<List<Job>> getJobs() async {
    try {
      final response = await Dio().get<List>(
        endpoint,
        options: Options(
          headers: {
            "authorization": user.token,
          },
        ),
      );

      List<Job> listJob = response.data!.map((j) => Job.fromJson(j)).toList();
      return listJob;
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }

  Future<Object> insert(Job job) async {
    try {
      final response = await Dio().post(
        endpoint,
        data: job,
        options: Options(
          headers: {
            "authorization": user.token,
          },
        ),
      );
      return response;
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }
}
