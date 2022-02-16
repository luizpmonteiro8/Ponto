export function formatNumberOnWrite(v) {
  v = v.replace(/\D/g, ''); // permite digitar apenas numero
  v = v.replace(/(\d{1})(\d{18})$/, '$1.$2'); // coloca ponto antes dos ultimos digitos
  v = v.replace(/(\d{1})(\d{15})$/, '$1.$2'); // coloca ponto antes dos ultimos digitos
  v = v.replace(/(\d{1})(\d{11})$/, '$1.$2'); // coloca ponto antes dos ultimos 13 digitos
  v = v.replace(/(\d{1})(\d{8})$/, '$1.$2'); // coloca ponto antes dos ultimos 10 digitos
  v = v.replace(/(\d{1})(\d{5})$/, '$1.$2'); // coloca ponto antes dos ultimos 7 digitos
  v = v.replace(/(\d{1})(\d{1,2})$/, '$1,$2'); // coloca virgula antes dos ultimos 4 digitos
  return v;
}
