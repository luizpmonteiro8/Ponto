import 'package:mobx/mobx.dart';
import 'package:ponto/api/model/job.dart';
import 'package:ponto/api/services/job_service.dart';

part 'job_store.g.dart';

class JobStore = _JobStore with _$JobStore;

abstract class _JobStore with Store {
  @observable
  bool showErrors = false;

  @observable
  String? error;

  @action
  void invalidSendPressed() => showErrors = true;

  @observable
  int? id;

  @observable
  String name = '';

  @action
  void setName(String value) => name = value;

  @computed
  bool get nameValid => name != '' && name.length > 1;
  String get nameError =>
      !showErrors || nameValid ? '' : 'Nome deve ser maior que 1 caracter.';

  @observable
  List<Job>? listJobs;

  @computed
  bool get formValid => nameValid;

  @computed
  get sendPressed => formValid ? _send : _send;

  @action
  Future<void> getJobs() async {
    try {
      listJobs = await JobServices().getJobs();
      error = null;
    } catch (e) {
      error = e.toString();
    }
  }

  @action
  Future<void> sendFormToRegistration(Job job) async {
    id = job.id;
    name = job.name;
  }

  @action
  Future<void> _send() async {
    invalidSendPressed();
    print('entrou');
    Job job = Job(id: id, name: name);

    try {
      if (id != null) {
        print('update');
      } else {
        var response = await JobServices().insert(job);
        print('insert');
        print(response);
      }
    } catch (e) {
      error = e.toString();
      print(error);
    }
  }
}
