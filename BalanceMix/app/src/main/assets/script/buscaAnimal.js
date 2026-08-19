document.addEventListener("DOMContentLoaded", () => {
  const buscaInput = document.getElementById("buscaAnimal");
  const animais = document.querySelectorAll(".cartao-animal");
  const mensagemAviso = document.getElementById("mensagemAviso");

  if (buscaInput) {
    buscaInput.addEventListener("input", function () {
      const termo = this.value.toLowerCase();
      let encontrado = false;

      animais.forEach(card => {
        const nome = card.dataset.nome.toLowerCase();
        if (nome.includes(termo)) {
          card.style.display = "block";
          encontrado = true;
        } else {
          card.style.display = "none";
        }
      });

      // Exibe ou esconde a mensagem
      if (!encontrado && termo.trim() !== "") {
        mensagemAviso.textContent = "⚠️ Animal não encontrado.";
        mensagemAviso.style.display = "block";
      } else {
        mensagemAviso.style.display = "none";
      }
    });
  }
});