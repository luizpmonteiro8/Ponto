import 'package:brasil_fields/brasil_fields.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:get_it/get_it.dart';
import 'package:mobx/mobx.dart';
import 'package:ponto/components/custom_drop_down.dart';
import 'package:ponto/components/custom_input.dart';
import 'package:ponto/components/error_box.dart';
import 'package:ponto/helpers/extensions.dart';
import 'package:ponto/screens/employee/employee_list_screen.dart';
import 'package:ponto/store/employee_store.dart';
import 'package:ponto/store/job_store.dart';

class EmployeeRegistrationScreen extends StatefulWidget {
  const EmployeeRegistrationScreen({Key? key}) : super(key: key);

  @override
  _EmployeeRegistrationScreenState createState() =>
      _EmployeeRegistrationScreenState();
}

class _EmployeeRegistrationScreenState
    extends State<EmployeeRegistrationScreen> {
  EmployeeStore employeeStore = GetIt.I<EmployeeStore>();
  JobStore jobStore = GetIt.I<JobStore>();
  TextEditingController streetController = TextEditingController();
  TextEditingController districtController = TextEditingController();
  TextEditingController cityController = TextEditingController();
  TextEditingController stateController = TextEditingController();
  FocusNode numberFocus = FocusNode();
  late ScrollController _scrollController;

  @override
  void initState() {
    _scrollController = ScrollController();
    super.initState();

    reaction((_) => employeeStore.goTop, (goTop) {
      if (goTop == true) {
        _scrollToTop();
        employeeStore.setGoTop(false);
        print('Entrou fsdfsd ');
      }
    });

    reaction((_) => employeeStore.zipCode, (zipcode) {
      if (zipcode.toString().length == 10) {
        employeeStore.getAddress();
        numberFocus.requestFocus();
      }
    });

    reaction((_) => employeeStore.sucess, (sucess) {
      if (sucess = true) {
        String message = 'Sucesso';

        if (employeeStore.id == null) {
          message = 'Criado com sucesso!';
        } else {
          message = 'Alterado com sucesso!';
        }
        var snack = SnackBar(
          content: Text(message),
          duration: const Duration(seconds: 5),
        );
        ScaffoldMessenger.of(context).showSnackBar(snack);
        jobStore.reset();

        Navigator.of(context)
            .push(MaterialPageRoute(builder: (_) => EmployeeListScreen()));
      }
    });
  }

  @override
  void dispose() {
    numberFocus.dispose();
    streetController.dispose();
    districtController.dispose();
    cityController.dispose();
    stateController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Cadastro de funcionário'),
          centerTitle: true,
        ),
        body: Scrollbar(
          child: SingleChildScrollView(
            controller: _scrollController,
            child: Card(
              margin: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16)),
              elevation: 8,
              child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      Observer(builder: (_) {
                        return CustomInput(
                          enabled: false,
                          label: 'Id',
                          initialValue: employeeStore.id != null
                              ? employeeStore.id.toString()
                              : '',
                          error: '',
                          keyboardType: TextInputType.none,
                        );
                      }),
                      Observer(builder: (_) {
                        return CustomInput(
                          onChanged: employeeStore.setName,
                          label: 'Nome',
                          initialValue: employeeStore.name,
                          error: employeeStore.nameError,
                        );
                      }),
                      Observer(builder: (_) {
                        return CustomInput(
                          onChanged: employeeStore.setCpf,
                          label: 'Cpf',
                          initialValue: employeeStore.cpf,
                          error: employeeStore.cpfError,
                          keyboardType: TextInputType.number,
                          inputFormatter: CpfInputFormatter(),
                        );
                      }),
                      Observer(builder: (_) {
                        return CustomDropDown(
                          label: 'Cargo',
                          error: employeeStore.jobError,
                          listItemReceived: jobStore.listJobs,
                          selectedValue: employeeStore.job != null
                              ? employeeStore.jobId
                              : null,
                          onChanged: (var value) {
                            employeeStore.setJobId(value as int);
                          },
                        );
                      }),
                      Observer(builder: (_) {
                        return CustomInput(
                          onChanged: employeeStore.setSalary,
                          label: 'Salário',
                          initialValue: employeeStore.salary.formattedMoney(),
                          error: employeeStore.salaryError,
                          keyboardType: TextInputType.number,
                          inputFormatter: CentavosInputFormatter(
                            moeda: true,
                            casasDecimais: 2,
                          ),
                        );
                      }),
                      Container(
                        alignment: Alignment.topLeft,
                        child: const Text(
                          'Endereço:',
                          style: TextStyle(fontSize: 16),
                        ),
                      ),
                      Observer(builder: (_) {
                        if (employeeStore.addressId != null) {
                          return CustomInput(
                            enabled: false,
                            label: 'Id endereço',
                            initialValue: employeeStore.id != null
                                ? employeeStore.addressId.toString()
                                : '',
                          );
                        } else {
                          return Container();
                        }
                      }),
                      const SizedBox(
                        height: 20,
                      ),
                      Observer(builder: (_) {
                        return CustomInput(
                          onChanged: employeeStore.setZipCode,
                          label: 'Cep',
                          initialValue: employeeStore.zipCode,
                          error: employeeStore.zipCodeError,
                          keyboardType: TextInputType.number,
                          inputFormatter: CepInputFormatter(),
                        );
                      }),
                      Observer(builder: (_) {
                        return CustomInput(
                          onChanged: employeeStore.setStreet,
                          label: 'Rua',
                          controller: streetController
                            ..text = employeeStore.street,
                          error: employeeStore.streetError,
                        );
                      }),
                      Observer(builder: (_) {
                        return CustomInput(
                          onChanged: employeeStore.setNumber,
                          label: 'Número',
                          initialValue: employeeStore.number,
                          error: employeeStore.numberError,
                          focusNode: numberFocus,
                          keyboardType: TextInputType.text,
                        );
                      }),
                      Observer(builder: (_) {
                        return CustomInput(
                          onChanged: employeeStore.setDistrict,
                          label: 'Bairro',
                          controller: districtController
                            ..text = employeeStore.district,
                          error: employeeStore.districtError,
                        );
                      }),
                      Observer(builder: (_) {
                        return CustomInput(
                          onChanged: employeeStore.setCity,
                          label: 'Cidade',
                          controller: cityController..text = employeeStore.city,
                          error: employeeStore.cityError,
                        );
                      }),
                      Observer(builder: (_) {
                        return CustomInput(
                          onChanged: employeeStore.setState,
                          label: 'Estado',
                          controller: stateController
                            ..text = employeeStore.state,
                          error: employeeStore.stateError,
                        );
                      }),
                      Container(
                        alignment: Alignment.center,
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Observer(builder: (_) {
                              return ElevatedButton(
                                  onPressed: employeeStore.sendPressed,
                                  child: const Text('Enviar'));
                            }),
                            const SizedBox(width: 10),
                            ElevatedButton(
                                onPressed: () {
                                  employeeStore.reset();
                                  Navigator.of(context).pop();
                                },
                                child: const Text('Cancelar')),
                          ],
                        ),
                      ),
                      Observer(builder: (_) {
                        return ErrorBox(message: employeeStore.error);
                      })
                    ],
                  )),
            ),
          ),
        ));
  }

  void _scrollToTop() {
    print(_scrollController);
    if (_scrollController.hasClients) {
      _scrollController.animateTo(0,
          duration: const Duration(seconds: 2), curve: Curves.linear);
    }
  }
}
