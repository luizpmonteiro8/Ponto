class Address {
  int? id;
  String street;
  String? number;
  String district;
  String city;
  String state;
  String zipCode;

  Address(
      {this.id,
      required this.street,
      this.number,
      required this.district,
      required this.city,
      required this.state,
      required this.zipCode});

  factory Address.fromJson(Map<String, dynamic> json) => Address(
        id: json['id'],
        street: json['street'],
        number: json['number'],
        district: json['district'],
        city: json['city'],
        state: json['state'],
        zipCode: json['zipcode'],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "street": street,
        "number": number,
        "district": district,
        "city": city,
        "state": state,
        "zipcode": zipCode,
      };

  @override
  String toString() {
    return 'Address{id: $id, street: $street, number: $number, district: $district, '
        'city: $city, state:$state, zipCode:$zipCode,}';
  }
}
