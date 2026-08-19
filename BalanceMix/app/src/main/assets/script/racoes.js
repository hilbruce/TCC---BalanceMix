// ===== Gerenciamento e Visualização de Rações =====
let modoSelecaoAtivo = false;

document.addEventListener("DOMContentLoaded", () => {
  atualizarLista();

  const btnDeletarSelecionadas = document.getElementById("btnDeletarSelecionadas");
  const btnLimparTodas = document.getElementById("btnLimparTodas");
  const btnCancelarSelecao = document.getElementById("btnCancelarSelecao");

  if (btnDeletarSelecionadas) btnDeletarSelecionadas.classList.add("hidden");
  if (btnLimparTodas) btnLimparTodas.classList.add("hidden");
  if (btnCancelarSelecao) btnCancelarSelecao.classList.add("hidden");

  if (btnDeletarSelecionadas)
    btnDeletarSelecionadas.addEventListener("click", deletarSelecionadas);
  if (btnLimparTodas)
    btnLimparTodas.addEventListener("click", limparRacoes);
  if (btnCancelarSelecao)
    btnCancelarSelecao.addEventListener("click", desativarModoSelecao);

  // Eventos da tela de confirmação
  const btnVerRacoes = document.getElementById("btnVerRacoes");
  const btnNovaRacao = document.getElementById("btnNovaRacao");

  if (btnVerRacoes)
    btnVerRacoes.addEventListener("click", () => {
      document.getElementById("telaConfirmacao").classList.add("hidden");
      window.location.href = "racoesMontadas.html";
    });

  if (btnNovaRacao)
    btnNovaRacao.addEventListener("click", () => {
      document.getElementById("telaConfirmacao").classList.add("hidden");
      window.location.href = "calculadoraPearson.html";
    });
});

// ===== Salvar Ração =====
window.salvarRacao = function (tipo, dadosRacao) {
  if (
    !dadosRacao ||
    typeof dadosRacao !== "object" ||
    Object.keys(dadosRacao).length === 0 ||
    !dadosRacao.relatorio ||
    dadosRacao.relatorio.trim() === ""
  ) {
    mostrarAviso(
      "Aviso",
      "⚠️ Nenhuma ração válida para salvar. Insira valores antes de continuar."
    );
    return;
  }

  // Solicitar título antes de salvar
  mostrarAviso(
    "Novo Registro",
    "Digite um título para esta ração:",
    (tituloInserido) => {
      const racoesSalvas = listarRacoes();
      const novaRacao = {
        id: Date.now(),
        titulo: tituloInserido || "Ração sem título",
        tipo,
        dados: dadosRacao,
        data: new Date().toLocaleString("pt-BR"),
      };

      racoesSalvas.push(novaRacao);
      localStorage.setItem("racoesSalvas", JSON.stringify(racoesSalvas));

      mostrarTelaConfirmacao();
      atualizarLista();
    },
    null,
    true
  );
};

// ===== Tela Intermediária de Confirmação =====
function mostrarTelaConfirmacao() {
  const telaConfirmacao = document.getElementById("telaConfirmacao");
  if (telaConfirmacao) {
    telaConfirmacao.classList.remove("hidden");
  }
}

// ===== Listar Rações =====
window.listarRacoes = function () {
  return JSON.parse(localStorage.getItem("racoesSalvas")) || [];
};

// ===== Atualizar Lista =====
function atualizarLista() {
  const lista = document.getElementById("listaRacoes");
  if (!lista) return;

  const racoes = listarRacoes();
  lista.innerHTML = "";

  if (racoes.length === 0) {
    lista.innerHTML = `<p class="nenhuma-racao">Nenhuma ração salva ainda.</p>`;
    return;
  }

  racoes.slice().reverse().forEach((r) => {
    const div = document.createElement("div");
    div.classList.add("racao-card");

    div.innerHTML = `
      <input type="checkbox" class="chkRacao hidden" data-id="${r.id}">
      <div class="racao-conteudo">
        <h3>${r.titulo} — ${r.tipo} — ${r.data}</h3>
        <div class="racao-detalhes">
          ${r.dados.relatorio || "<em>Sem dados disponíveis.</em>"}
        </div>
      </div>
    `;

    // ---- SUPORTE PARA LONG PRESS NO NAVEGADOR E NO WEBVIEW ----
    let pressTimer;

    const iniciarPress = () => {
      pressTimer = setTimeout(() => ativarModoSelecao(), 500);
    };

    const cancelarPress = () => {
      clearTimeout(pressTimer);
    };

    // Mouse (PC)
    div.addEventListener("mousedown", iniciarPress);
    div.addEventListener("mouseup", cancelarPress);
    div.addEventListener("mouseleave", cancelarPress);

    // Touch (celular / WebView Android)
    div.addEventListener("touchstart", iniciarPress);
    div.addEventListener("touchend", cancelarPress);
    div.addEventListener("touchmove", cancelarPress);

    lista.appendChild(div);
  });
}

// ===== Ativar Modo Seleção =====
function ativarModoSelecao() {
  modoSelecaoAtivo = true;

  document.querySelectorAll(".chkRacao").forEach(chk => {
    chk.classList.remove("hidden");
  });

  document.getElementById("btnDeletarSelecionadas")?.classList.remove("hidden");
  document.getElementById("btnLimparTodas")?.classList.remove("hidden");
  document.getElementById("btnCancelarSelecao")?.classList.remove("hidden");
}

// ===== Desativar Modo Seleção =====
function desativarModoSelecao() {
  modoSelecaoAtivo = false;

  document.querySelectorAll(".chkRacao").forEach(chk => {
    chk.classList.add("hidden");
    chk.checked = false;
  });

  document.getElementById("btnDeletarSelecionadas")?.classList.add("hidden");
  document.getElementById("btnLimparTodas")?.classList.add("hidden");
  document.getElementById("btnCancelarSelecao")?.classList.add("hidden");
}

// ===== Deletar Rações Selecionadas =====
function deletarSelecionadas() {
  const selecionadas = Array.from(document.querySelectorAll(".chkRacao:checked"))
    .map(chk => parseInt(chk.dataset.id));

  if (selecionadas.length === 0) {
    mostrarAviso("Aviso", "⚠️ Nenhuma ração selecionada para apagar.");
    return;
  }

  mostrarAviso(
    "Confirmação",
    "Deseja realmente apagar as rações selecionadas?",
    () => {
      let racoes = listarRacoes();
      racoes = racoes.filter(r => !selecionadas.includes(r.id));
      localStorage.setItem("racoesSalvas", JSON.stringify(racoes));

      mostrarAviso("Sucesso", "🧹 Apagada(s) com sucesso.");
      atualizarLista();
      desativarModoSelecao();
    }
  );
}

// ===== Limpar Todas =====
function limparRacoes() {
  mostrarAviso(
    "Confirmação",
    "Tem certeza que deseja apagar todas as rações?",
    () => {
      localStorage.removeItem("racoesSalvas");
      mostrarAviso("Sucesso", "🧹 Todas as rações foram apagadas.");
      atualizarLista();
      desativarModoSelecao();
    }
  );
}

// ===== Tela de Aviso =====
function mostrarAviso(titulo, mensagem, confirmarAcao = null, cancelarAcao = null, inputAtivo = false) {
  const tela = document.getElementById("telaAviso");
  const tituloEl = document.getElementById("tituloAviso");
  const mensagemEl = document.getElementById("mensagemAviso");
  const btnConfirmar = document.getElementById("btnConfirmarAviso");
  const btnCancelar = document.getElementById("btnCancelarAviso");

  if (!tela) return;

  tela.classList.remove("hidden");
  tituloEl.textContent = titulo;

  mensagemEl.innerHTML = inputAtivo
    ? `${mensagem}<br><input type="text" id="inputTitulo" placeholder="Título da ração">`
    : mensagem;

  // Ocultar botão Cancelar em avisos simples
  const avisoSimples =
    mensagem.includes("Nenhuma ração válida") ||
    mensagem.includes("nenhuma ração válida") ||
    mensagem.includes("dados válidos") ||
    !confirmarAcao;

  if (avisoSimples) {
    btnCancelar.style.display = "none";
    btnConfirmar.onclick = () => tela.classList.add("hidden");
    return;
  }

  // Exibir Cancelar quando houver ação real
  btnCancelar.style.display = "inline-block";

  btnConfirmar.onclick = () => {
    const tituloInserido = inputAtivo
      ? document.getElementById("inputTitulo").value.trim()
      : null;

    tela.classList.add("hidden");
    if (confirmarAcao) confirmarAcao(tituloInserido);
  };

  btnCancelar.onclick = () => {
    tela.classList.add("hidden");
    if (cancelarAcao) cancelarAcao();
  };
}
