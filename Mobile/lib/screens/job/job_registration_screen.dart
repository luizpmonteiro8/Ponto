import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:get_it/get_it.dart';
import 'package:ponto/components/custom_input.dart';
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
                        enabled: true,
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
                          ElevatedButton(
                              onPressed: jobStore.sendPressed,
                              child: const Text('Enviar')),
                          const SizedBox(width: 10),
                          ElevatedButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: const Text('Cancelar')),
                        ],
                      ),
                    )
                  ],
                )),
          ),
        ));
  }
}
