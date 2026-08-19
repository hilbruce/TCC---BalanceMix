const container = document.getElementById("insumosContainer");
const btnAdicionar = document.getElementById("adicionarInsumo");
const btnRemover = document.getElementById("removerInsumo");
const form = document.getElementById("pearsonFormAvancado");
const resultado = document.getElementById("resultadoPearsonAvancado");
const textoResultado = document.getElementById("resultadoTextoAvancado");
const btnSalvar = document.getElementById("salvarRacaoAvancada");

let contador = 1;

// ➕ Adicionar insumo
btnAdicionar.addEventListener("click", () => {
  contador++;
  const novoInsumo = document.createElement("div");
  novoInsumo.classList.add("insumo-item");
  novoInsumo.innerHTML = `
    <label>Insumo ${contador}:</label>
    <input type="text" name="nomeInsumo[]" placeholder="Nome do insumo" required />
    <input type="number" name="pbInsumo[]" step="0.01" placeholder="% PB" required />
  `;
  container.appendChild(novoInsumo);
});

// ➖ Remover insumo
btnRemover.addEventListener("click", () => {
  if (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
    contador--;
  }
});

// 🧮 Cálculo principal (Método do Quadrado de Pearson adaptado)
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const pbDesejada = parseFloat(document.getElementById("pbDesejada").value);
  const quantidadeTotal = parseFloat(document.getElementById("quantidadeTotal").value);

  const nomes = Array.from(document.getElementsByName("nomeInsumo[]")).map(i => i.value.trim());
  const pbs = Array.from(document.getElementsByName("pbInsumo[]")).map(i => parseFloat(i.value));

  // ⚠️ Validação básica
  if (pbs.some(isNaN) || isNaN(pbDesejada) || isNaN(quantidadeTotal) || nomes.some(n => n === "")) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  // Ordena do menor para o maior PB
  const insumosOrdenados = nomes.map((n, i) => ({ nome: n, pb: pbs[i] }))
    .sort((a, b) => a.pb - b.pb);

  let proporcoes = new Array(insumosOrdenados.length).fill(0);

  // 🧩 Caso clássico de 2 insumos
  if (insumosOrdenados.length === 2) {
    const pbBaixo = insumosOrdenados[0].pb;
    const pbAlto = insumosOrdenados[1].pb;
    const diferencaAlta = Math.abs(pbDesejada - pbBaixo);
    const diferencaBaixa = Math.abs(pbAlto - pbDesejada);
    proporcoes = [diferencaAlta, diferencaBaixa];
  } else {
    // 🧮 Método generalizado: contribuição inversa à distância da PB desejada
    const diferencas = insumosOrdenados.map(i => Math.abs(pbDesejada - i.pb));
    const somaInversa = diferencas.reduce((acc, d) => acc + (1 / (d + 0.01)), 0);
    proporcoes = diferencas.map(d => (1 / (d + 0.01)) / somaInversa);
  }

  // Normalizar proporções
  const soma = proporcoes.reduce((a, b) => a + b, 0);
  proporcoes = proporcoes.map(p => p / soma);

  // Calcular quantidades
  const quantidades = proporcoes.map(p => (p * quantidadeTotal).toFixed(2));

  // 🧾 Construção do relatório
  let relatorio = `<strong>PB desejada:</strong> ${pbDesejada}%<br>`;
  relatorio += `<strong>Quantidade total:</strong> ${quantidadeTotal} kg<br><br>`;
  relatorio += `<strong>Distribuição dos insumos:</strong><br>`;

  insumosOrdenados.forEach((i, idx) => {
    relatorio += `• ${i.nome}: ${quantidades[idx]} kg (${i.pb}% PB)<br>`;
  });

  textoResultado.innerHTML = relatorio;
  resultado.classList.remove("hidden");
});

// 🔙 Função de retorno
function voltarAoSeletor() {
  window.location.href = "calculadoraPearson.html";
}

// 💾 Salvar Ração (com exceção de vazio)
btnSalvar.addEventListener("click", () => {
  const relatorio = textoResultado.innerHTML.trim();

  if (relatorio === "" || !relatorio.includes("Distribuição dos insumos:")) {
    // Usa a tela intermediária de aviso (vinda de racoes.js)
    if (typeof mostrarAviso === "function") {
      mostrarAviso("Aviso", "⚠️ Não é possível salvar uma ração vazia. Realize o cálculo antes de salvar.");
    } else {
      alert("⚠️ Não é possível salvar uma ração vazia. Realize o cálculo antes de salvar."); // fallback
    }
    return;
  }

  // Chama função externa que salva no armazenamento
  salvarRacao("Avançada", { relatorio });
});
