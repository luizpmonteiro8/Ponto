import 'package:flutter/material.dart';

class CustomDropDown extends StatelessWidget {
  const CustomDropDown({
    Key? key,
    required this.listItemReceived,
    required this.onChanged,
    this.selectedValue,
    required this.label,
    this.error,
  }) : super(key: key);

  final Object? selectedValue;
  final List? listItemReceived;
  final String label;
  final String? error;

  final void Function(Object?)? onChanged;

  @override
  Widget build(BuildContext context) {
    List<DropdownMenuItem<int>>? listItem = createList();

    return Container(
        margin: const EdgeInsets.only(top: 5),
        child: DropdownButtonFormField(
            decoration: InputDecoration(
              border: const OutlineInputBorder(),
              isDense: true,
              labelText: label,
              errorText: error,
            ),
            isExpanded: true,
            value: selectedValue,
            items: listItem,
            onChanged: onChanged));
  }

  createList() {
    return listItemReceived?.map((item) {
      return DropdownMenuItem<int>(
        child: Text(item.name),
        value: item.id,
      );
    }).toList();
  }
}
