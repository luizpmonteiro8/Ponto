import 'package:brasil_fields/brasil_fields.dart';
import 'package:mobx/mobx.dart';
import 'package:ponto/api/model/address.dart';
import 'package:ponto/api/model/employee.dart';
import 'package:ponto/api/model/job.dart';
import 'package:ponto/api/services/cep_services.dart';
import 'package:ponto/api/services/employee_service.dart';

part 'employee_store.g.dart';

class EmployeeStore = _EmployeeStore with _$EmployeeStore;

abstract class _EmployeeStore with Store {
  @observable
  bool showErrors = false;

  @observable
  String? error;

  @observable
  String? errorZipCode;

  @observable
  bool goTop = false;

  @action
  void setGoTop(bool value) => goTop = value;

  @action
  void _invalidSendPressed() {
    showErrors = true;
    goTop = true;
  }

  @observable
  bool sucess = false;

  @observable
  bool loading = false;

  @observable
  List<Employee>? listEmployees;

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
  String cpf = '';

  @action
  void setCpf(String value) => cpf = value;

  @computed
  bool get cpfValid =>
      cpf != '' && cpf.length == 14 ? CPFValidator.isValid(cpf) : false;
  String get cpfError => !showErrors || cpfValid ? '' : 'Cpf inválido';

  @observable
  double salary = 0.0;

  @action
  void setSalary(String value) {
    salary = UtilBrasilFields.converterMoedaParaDouble(value);
  }

  @computed
  bool get salaryValid => salary > 0;
  String get salaryError =>
      !showErrors || salaryValid ? '' : 'Salário inválido';

  @observable
  int? addressId;

  @observable
  String street = '';

  @action
  void setStreet(String value) => street = value;

  @computed
  bool get streetValid => street != '' && street.length > 1;
  String get streetError => !showErrors || streetValid ? '' : 'Rua inválida';

  @observable
  String number = '';

  @action
  void setNumber(String value) => number = value;

  @computed
  bool get numberValid => number != '' && number.length > 1;
  String get numberError => !showErrors || numberValid ? '' : 'Número inválido';

  @observable
  String district = '';

  @action
  void setDistrict(String value) => district = value;

  @computed
  bool get districtValid => district != '' && district.length > 1;
  String get districtError =>
      !showErrors || districtValid ? '' : 'Bairro inválido';

  @observable
  String city = '';

  @action
  void setCity(String value) => city = value;

  @computed
  bool get cityValid => city != '' && city.length > 1;
  String get cityError => !showErrors || cityValid ? '' : 'Cidade inválido';

  @observable
  String state = '';

  @action
  void setState(String value) => state = value;

  @computed
  bool get stateValid => state != '' && state.length > 1;
  String get stateError => !showErrors || stateValid ? '' : 'Estado inválido';

  @observable
  String zipCode = '';

  @action
  void setZipCode(String value) => zipCode = value;

  @computed
  bool get zipCodeValid =>
      zipCode != '' && zipCode.length == 10 || zipCode.length == 8;
  String get zipCodeError => !showErrors || zipCodeValid ? '' : 'Cep inválido';

  @observable
  Job? job;

  @observable
  int? jobId;

  @action
  void setJobId(int value) => jobId = value;

  @computed
  bool get jobValid => jobId! > 0;
  String get jobError => !showErrors || jobValid ? '' : 'Selecione um cargo';

  @computed
  bool get formValid =>
      nameValid &&
      cpfValid &&
      salaryValid &&
      streetValid &&
      numberValid &&
      districtValid &&
      cityValid &&
      stateValid &&
      zipCodeValid &&
      jobValid;

  @computed
  get sendPressed => formValid ? _send : _invalidSendPressed;

  @action
  Future<void> getEmployees() async {
    loading = true;
    try {
      listEmployees = await EmployeeServices().getEmployees();
      error = null;
      loading = false;
    } catch (e) {
      error = e.toString();
      loading = false;
    }
  }

  @action
  Future<void> sendFormToRegistration(Employee employee) async {
    id = employee.id;
    name = employee.name;
    cpf = UtilBrasilFields.obterCpf(employee.cpf);
    salary = employee.salary;
    jobId = employee.job?.id;
    job = employee.job;
    addressId = employee.address!.id;
    zipCode = UtilBrasilFields.obterCep(employee.address!.zipCode);
    street = employee.address!.street;
    number = employee.address!.number!;
    district = employee.address!.district;
    city = employee.address!.city;
    state = employee.address!.state;
    error = null;
    sucess = false;
    showErrors = false;
    loading = false;
  }

  @action
  Future<void> getAddress() async {
    errorZipCode = '';
    try {
      String cleanZipCode = zipCode.replaceAll('.', '').replaceAll('-', '');

      Address address = await CepServices().getAddress(cleanZipCode);
      setStreet(address.street);
      setDistrict(address.district);
      setCity(address.city);
      setState(address.state);
    } catch (e) {
      errorZipCode = e.toString();
    }
  }

  @action
  Future<void> _send() async {
    loading = true;
    Address address = Address(
        id: addressId,
        street: street,
        number: number,
        district: district,
        city: city,
        state: state,
        zipCode: zipCode.replaceAll('.', '').replaceAll('-', ''));

    Employee employee = Employee(
      id: id,
      name: name,
      cpf: cpf.replaceAll('.', '').replaceAll('-', ''),
      salary: salary,
      jobId: jobId,
      address: address,
    );

    try {
      if (id != null) {
        var response = await EmployeeServices().update(employee);
        sucess = true;
        listEmployees![listEmployees!
            .indexWhere((element) => element.id == employee.id)] = employee;
      } else {
        var response = await EmployeeServices().insert(employee);
        sucess = true;
        employee.id = response;
        listEmployees!.add(employee);
      }
      loading = false;
    } catch (e) {
      loading = false;
      error = e.toString();
    }
  }

  @action
  Future<void> delete(Employee employee) async {
    loading = true;
    try {
      var response = await EmployeeServices().delete(employee);
      listEmployees?.remove(employee);
      List<Employee>? newListEmployee = listEmployees?.map((e) => e).toList();
      listEmployees = newListEmployee;
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
    cpf = '';
    salary = 0;
    jobId = null;
    job = null;
    addressId = null;
    zipCode = '';
    street = '';
    number = '';
    district = '';
    city = '';
    state = '';
    error = null;
    sucess = false;
    showErrors = false;
    loading = false;
  }
}
