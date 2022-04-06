import 'package:ponto/api/model/address.dart';
import 'package:ponto/api/model/job.dart';

class Employee {
  int? id;
  String name;
  String cpf;
  double salary;
  int? jobId;
  Job? job;
  Address? address;

  Employee({
    this.id,
    required this.name,
    required this.cpf,
    required this.salary,
    this.job,
    required this.address,
    required this.jobId,
  });

  factory Employee.fromJson(Map<String, dynamic> json) {
    return Employee(
      id: json['id'],
      name: json['name'],
      cpf: json['cpf'],
      salary: double.parse(json['salary']),
      job: Job.fromJson(json['job']),
      jobId: Job.fromJson(json['job']).id,
      address: Address.fromJson(json['address']),
    );
  }

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "cpf": cpf,
        "salary": salary,
        "jobId": jobId,
        "job": job,
        "address": address,
      };

  @override
  String toString() {
    return 'Employee{id: $id, name: $name,'
        'cpf: $cpf,salary: $salary,job: $job,jobId:$jobId, address: $address}';
  }
}
