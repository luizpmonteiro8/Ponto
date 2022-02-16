//dont use comma
export function formatNumberWithDot(v) {
  v = v.replace(/\D/g, ''); // permite digitar apenas numero
  v = v.replace(/(\d{1})(\d{1,2})$/, '$1.$2'); // coloca virgula antes dos ultimos 4 digitos
  console.log(v);
  return v;
}
