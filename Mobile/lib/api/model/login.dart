class Login {
  late String email;
  late String password;

  Login();

  Map<String, dynamic> toJson() => {
        "email": email,
        "password": password,
      };
}
