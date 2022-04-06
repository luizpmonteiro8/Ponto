// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'employee_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$EmployeeStore on _EmployeeStore, Store {
  Computed<bool>? _$nameValidComputed;

  @override
  bool get nameValid =>
      (_$nameValidComputed ??= Computed<bool>(() => super.nameValid,
              name: '_EmployeeStore.nameValid'))
          .value;
  Computed<bool>? _$cpfValidComputed;

  @override
  bool get cpfValid => (_$cpfValidComputed ??=
          Computed<bool>(() => super.cpfValid, name: '_EmployeeStore.cpfValid'))
      .value;
  Computed<bool>? _$salaryValidComputed;

  @override
  bool get salaryValid =>
      (_$salaryValidComputed ??= Computed<bool>(() => super.salaryValid,
              name: '_EmployeeStore.salaryValid'))
          .value;
  Computed<bool>? _$streetValidComputed;

  @override
  bool get streetValid =>
      (_$streetValidComputed ??= Computed<bool>(() => super.streetValid,
              name: '_EmployeeStore.streetValid'))
          .value;
  Computed<bool>? _$numberValidComputed;

  @override
  bool get numberValid =>
      (_$numberValidComputed ??= Computed<bool>(() => super.numberValid,
              name: '_EmployeeStore.numberValid'))
          .value;
  Computed<bool>? _$districtValidComputed;

  @override
  bool get districtValid =>
      (_$districtValidComputed ??= Computed<bool>(() => super.districtValid,
              name: '_EmployeeStore.districtValid'))
          .value;
  Computed<bool>? _$cityValidComputed;

  @override
  bool get cityValid =>
      (_$cityValidComputed ??= Computed<bool>(() => super.cityValid,
              name: '_EmployeeStore.cityValid'))
          .value;
  Computed<bool>? _$stateValidComputed;

  @override
  bool get stateValid =>
      (_$stateValidComputed ??= Computed<bool>(() => super.stateValid,
              name: '_EmployeeStore.stateValid'))
          .value;
  Computed<bool>? _$zipCodeValidComputed;

  @override
  bool get zipCodeValid =>
      (_$zipCodeValidComputed ??= Computed<bool>(() => super.zipCodeValid,
              name: '_EmployeeStore.zipCodeValid'))
          .value;
  Computed<bool>? _$jobValidComputed;

  @override
  bool get jobValid => (_$jobValidComputed ??=
          Computed<bool>(() => super.jobValid, name: '_EmployeeStore.jobValid'))
      .value;
  Computed<bool>? _$formValidComputed;

  @override
  bool get formValid =>
      (_$formValidComputed ??= Computed<bool>(() => super.formValid,
              name: '_EmployeeStore.formValid'))
          .value;
  Computed<dynamic>? _$sendPressedComputed;

  @override
  dynamic get sendPressed =>
      (_$sendPressedComputed ??= Computed<dynamic>(() => super.sendPressed,
              name: '_EmployeeStore.sendPressed'))
          .value;

  final _$showErrorsAtom = Atom(name: '_EmployeeStore.showErrors');

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

  final _$errorAtom = Atom(name: '_EmployeeStore.error');

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

  final _$errorZipCodeAtom = Atom(name: '_EmployeeStore.errorZipCode');

  @override
  String? get errorZipCode {
    _$errorZipCodeAtom.reportRead();
    return super.errorZipCode;
  }

  @override
  set errorZipCode(String? value) {
    _$errorZipCodeAtom.reportWrite(value, super.errorZipCode, () {
      super.errorZipCode = value;
    });
  }

  final _$goTopAtom = Atom(name: '_EmployeeStore.goTop');

  @override
  bool get goTop {
    _$goTopAtom.reportRead();
    return super.goTop;
  }

  @override
  set goTop(bool value) {
    _$goTopAtom.reportWrite(value, super.goTop, () {
      super.goTop = value;
    });
  }

  final _$sucessAtom = Atom(name: '_EmployeeStore.sucess');

  @override
  bool get sucess {
    _$sucessAtom.reportRead();
    return super.sucess;
  }

  @override
  set sucess(bool value) {
    _$sucessAtom.reportWrite(value, super.sucess, () {
      super.sucess = value;
    });
  }

  final _$loadingAtom = Atom(name: '_EmployeeStore.loading');

  @override
  bool get loading {
    _$loadingAtom.reportRead();
    return super.loading;
  }

  @override
  set loading(bool value) {
    _$loadingAtom.reportWrite(value, super.loading, () {
      super.loading = value;
    });
  }

  final _$listEmployeesAtom = Atom(name: '_EmployeeStore.listEmployees');

  @override
  List<Employee>? get listEmployees {
    _$listEmployeesAtom.reportRead();
    return super.listEmployees;
  }

  @override
  set listEmployees(List<Employee>? value) {
    _$listEmployeesAtom.reportWrite(value, super.listEmployees, () {
      super.listEmployees = value;
    });
  }

  final _$idAtom = Atom(name: '_EmployeeStore.id');

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

  final _$nameAtom = Atom(name: '_EmployeeStore.name');

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

  final _$cpfAtom = Atom(name: '_EmployeeStore.cpf');

  @override
  String get cpf {
    _$cpfAtom.reportRead();
    return super.cpf;
  }

  @override
  set cpf(String value) {
    _$cpfAtom.reportWrite(value, super.cpf, () {
      super.cpf = value;
    });
  }

  final _$salaryAtom = Atom(name: '_EmployeeStore.salary');

  @override
  double get salary {
    _$salaryAtom.reportRead();
    return super.salary;
  }

  @override
  set salary(double value) {
    _$salaryAtom.reportWrite(value, super.salary, () {
      super.salary = value;
    });
  }

  final _$addressIdAtom = Atom(name: '_EmployeeStore.addressId');

  @override
  int? get addressId {
    _$addressIdAtom.reportRead();
    return super.addressId;
  }

  @override
  set addressId(int? value) {
    _$addressIdAtom.reportWrite(value, super.addressId, () {
      super.addressId = value;
    });
  }

  final _$streetAtom = Atom(name: '_EmployeeStore.street');

  @override
  String get street {
    _$streetAtom.reportRead();
    return super.street;
  }

  @override
  set street(String value) {
    _$streetAtom.reportWrite(value, super.street, () {
      super.street = value;
    });
  }

  final _$numberAtom = Atom(name: '_EmployeeStore.number');

  @override
  String get number {
    _$numberAtom.reportRead();
    return super.number;
  }

  @override
  set number(String value) {
    _$numberAtom.reportWrite(value, super.number, () {
      super.number = value;
    });
  }

  final _$districtAtom = Atom(name: '_EmployeeStore.district');

  @override
  String get district {
    _$districtAtom.reportRead();
    return super.district;
  }

  @override
  set district(String value) {
    _$districtAtom.reportWrite(value, super.district, () {
      super.district = value;
    });
  }

  final _$cityAtom = Atom(name: '_EmployeeStore.city');

  @override
  String get city {
    _$cityAtom.reportRead();
    return super.city;
  }

  @override
  set city(String value) {
    _$cityAtom.reportWrite(value, super.city, () {
      super.city = value;
    });
  }

  final _$stateAtom = Atom(name: '_EmployeeStore.state');

  @override
  String get state {
    _$stateAtom.reportRead();
    return super.state;
  }

  @override
  set state(String value) {
    _$stateAtom.reportWrite(value, super.state, () {
      super.state = value;
    });
  }

  final _$zipCodeAtom = Atom(name: '_EmployeeStore.zipCode');

  @override
  String get zipCode {
    _$zipCodeAtom.reportRead();
    return super.zipCode;
  }

  @override
  set zipCode(String value) {
    _$zipCodeAtom.reportWrite(value, super.zipCode, () {
      super.zipCode = value;
    });
  }

  final _$jobAtom = Atom(name: '_EmployeeStore.job');

  @override
  Job? get job {
    _$jobAtom.reportRead();
    return super.job;
  }

  @override
  set job(Job? value) {
    _$jobAtom.reportWrite(value, super.job, () {
      super.job = value;
    });
  }

  final _$jobIdAtom = Atom(name: '_EmployeeStore.jobId');

  @override
  int? get jobId {
    _$jobIdAtom.reportRead();
    return super.jobId;
  }

  @override
  set jobId(int? value) {
    _$jobIdAtom.reportWrite(value, super.jobId, () {
      super.jobId = value;
    });
  }

  final _$getEmployeesAsyncAction = AsyncAction('_EmployeeStore.getEmployees');

  @override
  Future<void> getEmployees() {
    return _$getEmployeesAsyncAction.run(() => super.getEmployees());
  }

  final _$sendFormToRegistrationAsyncAction =
      AsyncAction('_EmployeeStore.sendFormToRegistration');

  @override
  Future<void> sendFormToRegistration(Employee employee) {
    return _$sendFormToRegistrationAsyncAction
        .run(() => super.sendFormToRegistration(employee));
  }

  final _$getAddressAsyncAction = AsyncAction('_EmployeeStore.getAddress');

  @override
  Future<void> getAddress() {
    return _$getAddressAsyncAction.run(() => super.getAddress());
  }

  final _$_sendAsyncAction = AsyncAction('_EmployeeStore._send');

  @override
  Future<void> _send() {
    return _$_sendAsyncAction.run(() => super._send());
  }

  final _$deleteAsyncAction = AsyncAction('_EmployeeStore.delete');

  @override
  Future<void> delete(Employee employee) {
    return _$deleteAsyncAction.run(() => super.delete(employee));
  }

  final _$_EmployeeStoreActionController =
      ActionController(name: '_EmployeeStore');

  @override
  void setGoTop(bool value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setGoTop');
    try {
      return super.setGoTop(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void _invalidSendPressed() {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore._invalidSendPressed');
    try {
      return super._invalidSendPressed();
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setName(String value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setName');
    try {
      return super.setName(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setCpf(String value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setCpf');
    try {
      return super.setCpf(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setSalary(String value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setSalary');
    try {
      return super.setSalary(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setStreet(String value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setStreet');
    try {
      return super.setStreet(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setNumber(String value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setNumber');
    try {
      return super.setNumber(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setDistrict(String value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setDistrict');
    try {
      return super.setDistrict(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setCity(String value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setCity');
    try {
      return super.setCity(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setState(String value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setState');
    try {
      return super.setState(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setZipCode(String value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setZipCode');
    try {
      return super.setZipCode(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setJobId(int value) {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.setJobId');
    try {
      return super.setJobId(value);
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  dynamic reset() {
    final _$actionInfo = _$_EmployeeStoreActionController.startAction(
        name: '_EmployeeStore.reset');
    try {
      return super.reset();
    } finally {
      _$_EmployeeStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
showErrors: ${showErrors},
error: ${error},
errorZipCode: ${errorZipCode},
goTop: ${goTop},
sucess: ${sucess},
loading: ${loading},
listEmployees: ${listEmployees},
id: ${id},
name: ${name},
cpf: ${cpf},
salary: ${salary},
addressId: ${addressId},
street: ${street},
number: ${number},
district: ${district},
city: ${city},
state: ${state},
zipCode: ${zipCode},
job: ${job},
jobId: ${jobId},
nameValid: ${nameValid},
cpfValid: ${cpfValid},
salaryValid: ${salaryValid},
streetValid: ${streetValid},
numberValid: ${numberValid},
districtValid: ${districtValid},
cityValid: ${cityValid},
stateValid: ${stateValid},
zipCodeValid: ${zipCodeValid},
jobValid: ${jobValid},
formValid: ${formValid},
sendPressed: ${sendPressed}
    ''';
  }
}
