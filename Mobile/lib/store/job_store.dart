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
  bool sucess = false;

  @observable
  bool loading = false;

  @observable
  int? id;

  @observable
  String name = '';

  @action
  void setName(String value) => name = value;

  @computed
  bool get nameValid => name != '' && name.isNotEmpty;
  String get nameError =>
      !showErrors || nameValid ? '' : 'Nome deve ser maior que 1 caracter.';

  @observable
  List<Job>? listJobs;

  @computed
  bool get formValid => nameValid;

  @computed
  get sendPressed => formValid ? _send : invalidSendPressed;

  @action
  Future<void> getJobs() async {
    loading = true;
    try {
      listJobs = await JobServices().getJobs();
      error = null;
      loading = false;
    } catch (e) {
      error = e.toString();
      loading = false;
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
    loading = true;
    Job job = Job(id: id, name: name);

    try {
      if (id != null) {
        var response = await JobServices().update(job);
        sucess = true;
        listJobs![listJobs!.indexWhere((element) => element.id == job.id)] =
            job;
      } else {
        var response = await JobServices().insert(job);
        sucess = true;
        job.id = response;
        listJobs!.add(job);
      }
    } catch (e) {
      loading = false;
      error = e.toString();
    }
  }

  @action
  Future<void> delete(Job job) async {
    loading = true;
    try {
      var response = await JobServices().delete(job);
      listJobs?.remove(job);
      List<Job>? newListJob = listJobs?.map((e) => e).toList();
      listJobs = newListJob;
      sucess = false;
      loading = false;
    } catch (e) {
      sucess = false;
      loading = false;
      throw (e.toString());
    }
  }

  @action
  reset() {
    id = null;
    name = '';
    error = null;
    sucess = false;
    showErrors = false;
    loading = false;
  }
}
