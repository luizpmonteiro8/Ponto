import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:get_it/get_it.dart';
import 'package:ponto/screens/job/job_registration_screen.dart';
import 'package:ponto/store/job_store.dart';

class JobListScreen extends StatefulWidget {
  @override
  _JobListScreenState createState() => _JobListScreenState();
}

class _JobListScreenState extends State<JobListScreen> {
  JobStore jobStore = GetIt.I<JobStore>();

  @override
  void initState() {
    super.initState();
    jobStore.getJobs();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Cargos'),
          centerTitle: true,
        ),
        body: Padding(
          padding:
              const EdgeInsets.only(top: 15, left: 5, right: 5, bottom: 15),
          child: Observer(builder: (_) {
            if (jobStore.listJobs != null) {
              return ListView.separated(
                itemCount: jobStore.listJobs!.length,
                itemBuilder: (_, index) {
                  return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('id: ' +
                                jobStore.listJobs![index].id.toString()),
                            Text('nome: ' + jobStore.listJobs![index].name),
                          ],
                        ),
                        Row(
                          children: [
                            ElevatedButton(
                                onPressed: () {
                                  jobStore.sendFormToRegistration(
                                      jobStore.listJobs![index]);
                                  Navigator.of(context).push(MaterialPageRoute(
                                      builder: (_) => JobRegistrationScreen()));
                                },
                                child: const Text('Alterar')),
                            const SizedBox(width: 10),
                            ElevatedButton(
                                onPressed: () {}, child: const Text('Deletar')),
                          ],
                        )
                      ]);
                },
                separatorBuilder: (BuildContext context, int index) =>
                    const Divider(
                  color: Color(0xffff6e4a),
                ),
              );
            } else {
              return const Text('Carregando...');
            }
          }),
        ));
  }
}
