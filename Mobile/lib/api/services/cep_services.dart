import 'package:dio/dio.dart';
import 'package:ponto/api/model/address.dart';

class CepServices {
  Future<Address> getAddress(String zipCode) async {
    final endpoint = 'https://viacep.com.br/ws/$zipCode/json';
    try {
      final response = await Dio().get(endpoint);
      return Address(
          street: response.data['logradouro'],
          district: response.data['bairro'],
          city: response.data['localidade'],
          state: response.data['uf'],
          zipCode: zipCode);
    } on DioError catch (e) {
      return Future.error(e.response!.data["message"]);
    }
  }
}
