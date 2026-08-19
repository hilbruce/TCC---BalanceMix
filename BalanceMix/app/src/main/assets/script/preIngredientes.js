// Dados dos ingredientes
const ingredientes = {
    milho: {
      nome: "Milho",
      pb: 8.5,
      icone: "images/ingredientes/corn.png"
    },
    farelo_soja: {
      nome: "Farelo de Soja",
      pb: 46.0,
      icone: "images/ingredientes/soybean.png"
    },
    trigo: {
      nome: "Farelo de Trigo",
      pb: 15.0,
      icone: "images/ingredientes/grain.png"
    },
    algodao: {
      nome: "Farelo de Algodão",
      pb: 25.0,
      icone: "images/ingredientes/cotton.png"
    }
  };
  
  // Função para atualizar os ingredientes
  function atualizarIngrediente(selectId, nomeId, valorId, iconeId) {
    const select = document.getElementById(selectId);
    const nome = document.getElementById(nomeId);
    const valor = document.getElementById(valorId);
    const icone = document.getElementById(iconeId);
  
    select.addEventListener("change", () => {
      const valorSelecionado = select.value;
      if (ingredientes[valorSelecionado]) {
        nome.value = ingredientes[valorSelecionado].nome;
        valor.value = ingredientes[valorSelecionado].pb;
        icone.src = ingredientes[valorSelecionado].icone;
      }
    });
  }
  
  atualizarIngrediente("selectIngrediente1", "ingrediente1", "valor1", "icone1");
  atualizarIngrediente("selectIngrediente2", "ingrediente2", "valor2", "icone2");
  