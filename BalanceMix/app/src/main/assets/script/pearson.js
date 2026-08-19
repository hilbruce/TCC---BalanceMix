const animalPBs = {
  galinha: { nome: "Galinha", PB: 21.7, imagem: "images/animais/chicken.png" },
  suino: { nome: "Suíno", PB: 18.0, imagem: "images/animais/pig.png" },
  bovino: { nome: "Bovino", PB: 12.0, imagem: "images/animais/cow.png" },
  ovino: { nome: "Ovino", PB: 14.5, imagem: "images/animais/goat.png" }
};

// Ao carregar a página, preenche o campo PB automaticamente
window.addEventListener("DOMContentLoaded", () => {
  const pb = localStorage.getItem("PB");
  if (pb) {
    document.getElementById("nutrienteDesejado").value = pb;
  }
});

// Cálculo do Quadrado de Pearson
document.getElementById("pearsonForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pbDesejada = parseFloat(document.getElementById("nutrienteDesejado").value);
  const nome1 = document.getElementById("ingrediente1").value;
  const valor1 = parseFloat(document.getElementById("valor1").value);
  const nome2 = document.getElementById("ingrediente2").value;
  const valor2 = parseFloat(document.getElementById("valor2").value);
  const quantidadeTotal = parseFloat(document.getElementById("quantidadeTotal").value);

  const parte1 = Math.abs(pbDesejada - valor2);
  const parte2 = Math.abs(pbDesejada - valor1);
  const somaPartes = parte1 + parte2;

  const proporcao1 = (parte1 / somaPartes) * quantidadeTotal;
  const proporcao2 = (parte2 / somaPartes) * quantidadeTotal;

  const resultado = `
    Para ${quantidadeTotal} kg de ração com ${pbDesejada}% de PB:<br>
    - ${nome1}: ${proporcao1.toFixed(2)} kg<br>
    - ${nome2}: ${proporcao2.toFixed(2)} kg
  `;

  document.getElementById("resultadoTexto").innerHTML = resultado;
  document.getElementById("resultadoPearson").classList.remove("hidden");
});

// Voltar ao seletor de animal
function voltarAoSeletor() {
  window.location.href = "calculadoraPearson.html"; // ajuste se necessário
}

document.getElementById("salvarRacaoSimples").addEventListener("click", () => {
  const relatorio = document.getElementById("resultadoTexto").innerHTML;
  salvarRacao("Simples", relatorio);
});

document.getElementById("salvarRacaoSimples").addEventListener("click", () => {
  const relatorio = document.getElementById("resultadoTexto").innerHTML.trim();

  // Chama a função de salvar, passando o tipo e os dados
  salvarRacao("Simples", { relatorio });
});


