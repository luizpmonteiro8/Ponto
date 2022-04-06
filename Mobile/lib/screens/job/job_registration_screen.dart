import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:get_it/get_it.dart';
import 'package:mobx/mobx.dart';
import 'package:ponto/components/custom_input.dart';
import 'package:ponto/components/error_box.dart';
import 'package:ponto/screens/job/job_list_screen.dart';
import 'package:ponto/store/job_store.dart';

class JobRegistrationScreen extends StatefulWidget {
  @override
  _JobRegistrationScreenState createState() => _JobRegistrationScreenState();
}

class _JobRegistrationScreenState extends State<JobRegistrationScreen> {
  JobStore jobStore = GetIt.I<JobStore>();

  @override
  void initState() {
    super.initState();

    reaction((_) => jobStore.sucess, (sucess) {
      if (sucess = true) {
        String message = 'Sucesso';

        if (jobStore.id == null) {
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
            .push(MaterialPageRoute(builder: (_) => JobListScreen()));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Cadastro de cargos'),
          centerTitle: true,
        ),
        body: SingleChildScrollView(
          child: Card(
            margin: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            elevation: 8,
            child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Observer(builder: (_) {
                      return CustomInput(
                        enabled: false,
                        label: 'Id',
                        initialValue:
                            jobStore.id != null ? jobStore.id.toString() : '',
                        error: '',
                        keyboardType: TextInputType.emailAddress,
                      );
                    }),
                    Observer(builder: (_) {
                      return CustomInput(
                        onChanged: jobStore.setName,
                        label: 'Nome',
                        initialValue: jobStore.name,
                        error: jobStore.nameError,
                        keyboardType: TextInputType.emailAddress,
                      );
                    }),
                    Container(
                      alignment: Alignment.center,
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Observer(builder: (_) {
                            return ElevatedButton(
                                onPressed: jobStore.sendPressed,
                                child: const Text('Enviar'));
                          }),
                          const SizedBox(width: 10),
                          ElevatedButton(
                              onPressed: () {
                                jobStore.reset();
                                Navigator.of(context).pop();
                              },
                              child: const Text('Cancelar')),
                        ],
                      ),
                    ),
                    Observer(builder: (_) {
                      return ErrorBox(message: jobStore.error);
                    })
                  ],
                )),
          ),
        ));
  }
}
