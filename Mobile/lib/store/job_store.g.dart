// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'job_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$JobStore on _JobStore, Store {
  Computed<bool>? _$nameValidComputed;

  @override
  bool get nameValid => (_$nameValidComputed ??=
          Computed<bool>(() => super.nameValid, name: '_JobStore.nameValid'))
      .value;
  Computed<bool>? _$formValidComputed;

  @override
  bool get formValid => (_$formValidComputed ??=
          Computed<bool>(() => super.formValid, name: '_JobStore.formValid'))
      .value;
  Computed<dynamic>? _$sendPressedComputed;

  @override
  dynamic get sendPressed =>
      (_$sendPressedComputed ??= Computed<dynamic>(() => super.sendPressed,
              name: '_JobStore.sendPressed'))
          .value;

  final _$showErrorsAtom = Atom(name: '_JobStore.showErrors');

  @override
  bool get showErrors {
    _$showErrorsAtom.reportRead();
    return super.showErrors;
  }

  @override
  set showErrors(bool value) {
    _$showErrorsAtom.reportWrite(value, super.showErrors, () {
      super.showErrors = value;
    });
  }

  final _$errorAtom = Atom(name: '_JobStore.error');

  @override
  String? get error {
    _$errorAtom.reportRead();
    return super.error;
  }

  @override
  set error(String? value) {
    _$errorAtom.reportWrite(value, super.error, () {
      super.error = value;
    });
  }

  final _$idAtom = Atom(name: '_JobStore.id');

  @override
  int? get id {
    _$idAtom.reportRead();
    return super.id;
  }

  @override
  set id(int? value) {
    _$idAtom.reportWrite(value, super.id, () {
      super.id = value;
    });
  }

  final _$nameAtom = Atom(name: '_JobStore.name');

  @override
  String get name {
    _$nameAtom.reportRead();
    return super.name;
  }

  @override
  set name(String value) {
    _$nameAtom.reportWrite(value, super.name, () {
      super.name = value;
    });
  }

  final _$listJobsAtom = Atom(name: '_JobStore.listJobs');

  @override
  List<Job>? get listJobs {
    _$listJobsAtom.reportRead();
    return super.listJobs;
  }

  @override
  set listJobs(List<Job>? value) {
    _$listJobsAtom.reportWrite(value, super.listJobs, () {
      super.listJobs = value;
    });
  }

  final _$getJobsAsyncAction = AsyncAction('_JobStore.getJobs');

  @override
  Future<void> getJobs() {
    return _$getJobsAsyncAction.run(() => super.getJobs());
  }

  final _$sendFormToRegistrationAsyncAction =
      AsyncAction('_JobStore.sendFormToRegistration');

  @override
  Future<void> sendFormToRegistration(Job job) {
    return _$sendFormToRegistrationAsyncAction
        .run(() => super.sendFormToRegistration(job));
  }

  final _$_sendAsyncAction = AsyncAction('_JobStore._send');

  @override
  Future<void> _send() {
    return _$_sendAsyncAction.run(() => super._send());
  }

  final _$_JobStoreActionController = ActionController(name: '_JobStore');

  @override
  void invalidSendPressed() {
    final _$actionInfo = _$_JobStoreActionController.startAction(
        name: '_JobStore.invalidSendPressed');
    try {
      return super.invalidSendPressed();
    } finally {
      _$_JobStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setName(String value) {
    final _$actionInfo =
        _$_JobStoreActionController.startAction(name: '_JobStore.setName');
    try {
      return super.setName(value);
    } finally {
      _$_JobStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
showErrors: ${showErrors},
error: ${error},
id: ${id},
name: ${name},
listJobs: ${listJobs},
nameValid: ${nameValid},
formValid: ${formValid},
sendPressed: ${sendPressed}
    ''';
  }
}
