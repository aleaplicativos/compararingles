function converterUnidadeParaMaior(quantidade, unidade) {
  switch (unidade) {
      case 'unidade':
          return quantidade; // Mantém em unidades
      case 'ml':
          return quantidade / 1000; // Converte mililitros para litros
      case 'litros':
          return quantidade; // Mantém em litros
      case 'gramas':
          return quantidade / 1000; // Converte gramas para quilos
      case 'quilos':
          return quantidade; // Mantém em quilos
      case 'centimetros':
          return quantidade / 100; // Converte centímetros para metros
      case 'metros':
          return quantidade; // Mantém em metros
      default:
          return 0; // Caso inválido
  }
}

function obterUnidadeMaior(unidade) {
  switch (unidade) {
      case 'unidade':
          return 'unidade';
      case 'ml':
      case 'litros':
          return 'litros';
      case 'gramas':
      case 'quilos':
          return 'quilos';
      case 'centimetros':
      case 'metros':
          return 'metros';
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
  
  if (id === 'unidade1' && unidade1 === 'unidade') {
      document.getElementById('unidade2').value = 'unidade';
      document.getElementById('unidade2').disabled = true;
  } else if (id === 'unidade2' && unidade2 === 'unidade') {
      document.getElementById('unidade1').value = 'unidade';
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
      document.getElementById('mensagem').innerText = "Favor inserir os dados obrigatórios.";
      return;
  }
  
  if (unidade1 === '' || unidade2 === '') {
      document.getElementById('mensagem').innerText = "Por favor, escolha o tipo de medida para ambos os produtos.";
      return;
  }
  
  if (unidade1 === 'unidade') {
      document.getElementById('unidade2').value = 'unidade';
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
  
  document.getElementById('custo1').innerText = `Custo por ${unidadeMaior1}: R$${custoPorUnidade1.toFixed(2)}`;
  document.getElementById('custo2').innerText = `Custo por ${unidadeMaior2}: R$${custoPorUnidade2.toFixed(2)}`;
  
  if (custoPorUnidade1 < custoPorUnidade2) {
      produto1.classList.add('verde');
      produto1.classList.remove('vermelho');
      produto2.classList.add('vermelho');
      produto2.classList.remove('verde');
      document.getElementById('custo1').innerText += " - Este é o mais vantajoso!🤑";
  } else {
      produto1.classList.add('vermelho');
      produto1.classList.remove('verde');
      produto2.classList.add('verde');
      produto2.classList.remove('vermelho');
      document.getElementById('custo2').innerText += " - Este é o mais vantajoso!🤑";
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
  
  produto1.classList.remove('verde', 'vermelho');
  produto2.classList.remove('verde', 'vermelho');

  document.getElementById('unidade1').disabled = false;
  document.getElementById('unidade2').disabled = false;
}
