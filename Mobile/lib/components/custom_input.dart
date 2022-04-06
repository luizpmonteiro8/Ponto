import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CustomInput extends StatelessWidget {
  const CustomInput({
    Key? key,
    this.error,
    required this.label,
    this.onChanged,
    this.obscure = false,
    this.password = false,
    this.onTap,
    this.enabled = true,
    this.keyboardType = TextInputType.text,
    this.initialValue,
    this.focusNode,
    this.controller,
    this.inputFormatter,
  }) : super(key: key);

  final String? error;
  final String label;
  final String? initialValue;
  final Function(String)? onChanged;
  final VoidCallback? onTap;
  final bool password;
  final bool obscure;
  final bool? enabled;
  final TextEditingController? controller;
  final TextInputFormatter? inputFormatter;

  final TextInputType keyboardType;
  final FocusNode? focusNode;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 5),
      child: TextFormField(
        initialValue: initialValue,
        enabled: enabled,
        decoration: InputDecoration(
          border: const OutlineInputBorder(),
          isDense: true,
          labelText: label,
          errorText: error != null && error!.isNotEmpty
              ? '*** ' + error! + ' ***'
              : '',
          errorStyle: const TextStyle(
            fontSize: 16.0,
          ),
          suffixIcon:
              password ? CustomIconPassword(onTap, obscure, password) : null,
        ),
        obscureText: obscure,
        onChanged: onChanged,
        keyboardType: keyboardType,
        focusNode: focusNode,
        controller: controller,
        inputFormatters: inputFormatter != null
            ? [
                FilteringTextInputFormatter.digitsOnly,
                inputFormatter as TextInputFormatter,
              ]
            : null,
      ),
    );
  }
}

class CustomIconPassword extends StatelessWidget {
  const CustomIconPassword(this.onTap, this.obscure, this.password);

  final VoidCallback? onTap;
  final bool obscure;
  final bool password;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(23),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          child: password
              ? Icon(
                  !obscure ? Icons.visibility_off : Icons.visibility,
                  color: Colors.red,
                )
              : null,
          onTap: onTap,
        ),
      ),
    );
  }
}
