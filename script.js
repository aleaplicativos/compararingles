function converterUnidadeParaMaior(quantidade, unidade) {
  switch (unidade) {
    case 'unit':
      return quantidade; // Keep in units
    case 'ml':
      return quantidade / 1000; // Convert milliliters to liters
    case 'liters':
      return quantidade; // Keep in liters
    case 'grams':
      return quantidade / 1000; // Convert grams to kilograms
    case 'kilograms':
      return quantidade; // Keep in kilograms
    case 'centimeters':
      return quantidade / 100; // Convert centimeters to meters
    case 'meters':
      return quantidade; // Keep in meters
    default:
      return 0; // Invalid case
  }
}

function obterUnidadeMaior(unidade) {
  switch (unidade) {
    case 'unit':
      return 'unit';
    case 'ml':
    case 'liters':
      return 'liters';
    case 'grams':
    case 'kilograms':
      return 'kilograms';
    case 'centimeters':
    case 'meters':
      return 'meters';
    default:
      return '';
  }
}

function calcularCustoPorUnidade(preco, quantidade) {
  if (quantidade === 0) {
    return 0;
  }
  return preco / quantidade;
}

function atualizarUnidades(id) {
  const unidade1 = document.getElementById('unidade1').value;
  const unidade2 = document.getElementById('unidade2').value;

  if (id === 'unidade1' && unidade1 === 'unit') {
    document.getElementById('unidade2').value = 'unit';
    document.getElementById('unidade2').disabled = true;
  } else if (id === 'unidade2' && unidade2 === 'unit') {
    document.getElementById('unidade1').value = 'unit';
    document.getElementById('unidade1').disabled = true;
  } else {
    document.getElementById('unidade1').disabled = false;
    document.getElementById('unidade2').disabled = false;
  }
}

function compararPrecos() {
  let quantidade1 = parseFloat(document.getElementById('quantidade1').value);
  let unidade1 = document.getElementById('unidade1').value;
  let preco1 = parseFloat(document.getElementById('preco1').value);

  let quantidade2 = parseFloat(document.getElementById('quantidade2').value);
  let unidade2 = document.getElementById('unidade2').value;
  let preco2 = parseFloat(document.getElementById('preco2').value);

  if (isNaN(quantidade1) || isNaN(preco1) || isNaN(quantidade2) || isNaN(preco2)) {
    document.getElementById('mensagem').innerText = "Please enter the required data.";
    return;
  }

  if (unidade1 === '' || unidade2 === '') {
    document.getElementById('mensagem').innerText = "Please choose the type of measure for both products.";
    return;
  }

  if (unidade1 === 'unit') {
    document.getElementById('unidade2').value = 'unit';
    document.getElementById('unidade2').disabled = true;
  }

  let unidadeMaior1 = obterUnidadeMaior(unidade1);
  let unidadeMaior2 = obterUnidadeMaior(unidade2);

  let quantidadeConvertida1 = converterUnidadeParaMaior(quantidade1, unidade1);
  let quantidadeConvertida2 = converterUnidadeParaMaior(quantidade2, unidade2);

  let custoPorUnidade1 = calcularCustoPorUnidade(preco1, quantidadeConvertida1);
  let custoPorUnidade2 = calcularCustoPorUnidade(preco2, quantidadeConvertida2);

  let produto1 = document.getElementById('produto1');
  let produto2 = document.getElementById('produto2');

  document.getElementById('custo1').innerText = `Cost per ${unidadeMaior1}: $${custoPorUnidade1.toFixed(2)}`;
  document.getElementById('custo2').innerText = `Cost per ${unidadeMaior2}: $${custoPorUnidade2.toFixed(2)}`;

  if (custoPorUnidade1 < custoPorUnidade2) {
    produto1.classList.add('green');
    produto1.classList.remove('red');
    produto2.classList.add('red');
    produto2.classList.remove('green');
    document.getElementById('custo1').innerText += " - This is the most advantageous!🤑";
  } else {
    produto1.classList.add('red');
    produto1.classList.remove('green');
    produto2.classList.add('green');
    produto2.classList.remove('red');
    document.getElementById('custo2').innerText += " - This is the most advantageous!🤑";
  }

  document.getElementById('mensagem').innerText = "";
}

function limparCampos() {
  document.getElementById('quantidade1').value = '';
  document.getElementById('unidade1').value = '';
  document.getElementById('preco1').value = '';
  document.getElementById('quantidade2').value = '';
  document.getElementById('unidade2').value = '';
  document.getElementById('preco2').value = '';
  document.getElementById('custo1').innerText = '';
  document.getElementById('custo2').innerText = '';
  document.getElementById('mensagem').innerText = '';

  let produto1 = document.getElementById('produto1');
  let produto2 = document.getElementById('produto2');

  produto1.classList.remove('green', 'red');
  produto2.classList.remove('green', 'red');

  document.getElementById('unidade1').disabled = false;
  document.getElementById('unidade2').disabled = false;
}
