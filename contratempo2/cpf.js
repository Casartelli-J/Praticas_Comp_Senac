function validarCPF(cpf) {

  // Calcula primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(cpf[i]) * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  if (resto !== Number(cpf[9])) {
    return false;
  }

  // Calcula segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(cpf[i]) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  return resto === Number(cpf[10]);
}

console.log(validarCPF('600.374.100-75')); // true
console.log(validarCPF('111.111.111-11')); // false
console.log(validarCPF('123.456.789-00')); // false

