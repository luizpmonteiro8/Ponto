import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:get_it/get_it.dart';
import 'package:ponto/api/model/employee.dart';
import 'package:ponto/components/custom_drawer.dart';
import 'package:ponto/screens/employee/employee_registration_screen.dart';
import 'package:ponto/store/employee_store.dart';

class EmployeeListScreen extends StatefulWidget {
  @override
  _EmployeeListScreenState createState() => _EmployeeListScreenState();
}

class _EmployeeListScreenState extends State<EmployeeListScreen> {
  EmployeeStore employeeStore = GetIt.I<EmployeeStore>();

  @override
  void initState() {
    super.initState();
    if (employeeStore.listEmployees == null) {
      employeeStore.getEmployees();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Lista de funcionário'),
          centerTitle: true,
          actions: [
            IconButton(
              icon: const Icon(
                Icons.refresh,
                color: Colors.white,
              ),
              onPressed: () {
                employeeStore.getEmployees();
              },
            ),
            IconButton(
              icon: const Icon(
                Icons.add,
                color: Colors.white,
              ),
              onPressed: () {
                employeeStore.reset();
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (_) => const EmployeeRegistrationScreen()));
              },
            )
          ],
        ),
        drawer: const CustomDrawer(),
        body: Padding(
          padding:
              const EdgeInsets.only(top: 15, left: 5, right: 5, bottom: 15),
          child: Observer(builder: (_) {
            if (employeeStore.listEmployees != null &&
                employeeStore.listEmployees!.isNotEmpty) {
              return ListView.separated(
                itemCount: employeeStore.listEmployees!.length,
                itemBuilder: (_, index) {
                  return Container(
                    color: (index % 2 == 0)
                        ? const Color.fromARGB(255, 233, 212, 185)
                        : Colors.transparent,
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('id: ' +
                                  employeeStore.listEmployees![index].id
                                      .toString()),
                              Text('nome: ' +
                                  employeeStore.listEmployees![index].name),
                            ],
                          ),
                          Row(
                            children: [
                              ElevatedButton(
                                  onPressed: () {
                                    employeeStore.sendFormToRegistration(
                                        employeeStore.listEmployees![index]);
                                    Navigator.of(context).push(MaterialPageRoute(
                                        builder: (_) =>
                                            const EmployeeRegistrationScreen()));
                                  },
                                  child: const Text('Alterar')),
                              const SizedBox(width: 10),
                              ElevatedButton(
                                  onPressed: () => _deleteEmployees(
                                      employeeStore.listEmployees![index],
                                      context,
                                      employeeStore),
                                  child: const Text('Deletar')),
                            ],
                          ),
                        ]),
                  );
                },
                separatorBuilder: (BuildContext context, int index) =>
                    const Divider(
                        height: 5, thickness: 1, color: Color(0xffff6e4a)),
              );
            } else if (employeeStore.listEmployees != null &&
                employeeStore.listEmployees!.isEmpty) {
              return Center(
                  child: Column(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  Icon(
                    Icons.assignment_late,
                    size: 90.0,
                    color: Color(0xff5c5259),
                  ),
                  Text(
                    'Nenhum cadastro encontrado!',
                    style: TextStyle(fontSize: 25, color: Color(0xff5c5259)),
                  )
                ],
              ));
            } else {
              return Container(
                alignment: Alignment.center,
                child: const CircularProgressIndicator(
                  strokeWidth: 10,
                  valueColor: AlwaysStoppedAnimation<Color>(Color(0xff5c5259)),
                ),
              );
            }
          }),
        ));
  }
}

_deleteEmployees(
    Employee employee, BuildContext context, EmployeeStore employeeStore) {
  String message = 'Falha de comunicação!';
  showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("Deletar cargo ${employee.name}?"),
          content: const Text("Confirme abaixo"),
          actions: <Widget>[
            Observer(builder: (_) {
              if (employeeStore.loading == false) {
                return Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    ElevatedButton(
                      child: const Text("Cancelar"),
                      onPressed: () {
                        Navigator.pop(context);
                      },
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    ElevatedButton(
                      child: const Text("Confirmar"),
                      onPressed: () async {
                        try {
                          await employeeStore.delete(employee);
                          message = 'Deletado com sucesso!';
                        } catch (e) {
                          message = e.toString();
                        }

                        var snack = SnackBar(
                          content: Text(message),
                          duration: const Duration(seconds: 5),
                        );

                        ScaffoldMessenger.of(context).removeCurrentSnackBar();
                        ScaffoldMessenger.of(context).showSnackBar(snack);
                        Navigator.pop(context);
                      },
                    ),
                  ],
                );
              } else {
                return Container(
                  alignment: Alignment.center,
                  child: const CircularProgressIndicator(
                    strokeWidth: 10,
                    valueColor:
                        AlwaysStoppedAnimation<Color>(Color(0xff5c5259)),
                  ),
                );
              }
            }),
          ],
        );
      });
}
