class Job {
  int? id;
  String name;

  Job({this.id, required this.name});

  factory Job.fromJson(Map<String, dynamic> json) => Job(
        id: json['id'],
        name: json['name'],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
      };

  @override
  String toString() {
    return 'Job{id: $id, name: $name}';
  }
}
