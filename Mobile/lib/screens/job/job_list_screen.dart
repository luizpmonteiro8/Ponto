import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:get_it/get_it.dart';
import 'package:ponto/api/model/job.dart';
import 'package:ponto/components/custom_drawer.dart';
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
    if (jobStore.listJobs == null) {
      jobStore.getJobs();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Lista de cargos'),
          centerTitle: true,
          actions: [
            IconButton(
              icon: const Icon(
                Icons.refresh,
                color: Colors.white,
              ),
              onPressed: () {
                jobStore.getJobs();
              },
            ),
            IconButton(
              icon: const Icon(
                Icons.add,
                color: Colors.white,
              ),
              onPressed: () {
                jobStore.reset();
                Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => JobRegistrationScreen()));
              },
            )
          ],
        ),
        drawer: const CustomDrawer(),
        body: Padding(
          padding:
              const EdgeInsets.only(top: 15, left: 5, right: 5, bottom: 15),
          child: Observer(builder: (_) {
            if (jobStore.listJobs != null && jobStore.listJobs!.isNotEmpty) {
              return Scrollbar(
                  child: ListView.separated(
                itemCount: jobStore.listJobs!.length,
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
                                    Navigator.of(context).push(
                                        MaterialPageRoute(
                                            builder: (_) =>
                                                JobRegistrationScreen()));
                                  },
                                  child: const Text('Alterar')),
                              const SizedBox(width: 10),
                              ElevatedButton(
                                  onPressed: () => _deleteJobs(
                                      jobStore.listJobs![index],
                                      context,
                                      jobStore),
                                  child: const Text('Deletar')),
                            ],
                          ),
                        ]),
                  );
                },
                separatorBuilder: (BuildContext context, int index) =>
                    const Divider(
                        height: 5, thickness: 1, color: Color(0xffff6e4a)),
              ));
            } else if (jobStore.listJobs != null &&
                jobStore.listJobs!.isEmpty) {
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

_deleteJobs(Job job, BuildContext context, JobStore jobStore) {
  String message = 'Falha de comunica????o!';
  showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("Deletar cargo ${job.name}?"),
          content: const Text("Confirme abaixo"),
          actions: <Widget>[
            Observer(builder: (_) {
              if (jobStore.loading == false) {
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
                          await jobStore.delete(job);
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
