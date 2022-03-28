import 'package:flutter/material.dart';

class CustomInput extends StatelessWidget {
  const CustomInput(
      {this.error,
      required this.label,
      this.onChanged,
      this.obscure = false,
      this.password = false,
      this.onTap,
      required this.enabled,
      this.keyboardType = TextInputType.text,
      this.initialValue});

  final String? error;
  final String label;
  final String? initialValue;
  final Function(String)? onChanged;
  final VoidCallback? onTap;
  final bool password;
  final bool obscure;
  final bool enabled;
  final TextInputType keyboardType;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      initialValue: initialValue,
      enabled: enabled,
      decoration: InputDecoration(
        border: const OutlineInputBorder(),
        isDense: true,
        labelText: label,
        errorText: error,
        suffixIcon:
            password ? CustomIconPassword(onTap, obscure, password) : null,
      ),
      obscureText: obscure,
      onChanged: onChanged,
      keyboardType: keyboardType,
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
