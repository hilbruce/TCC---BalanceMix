// Dados de exigências nutricionais por animal
const animalData = {
  galinha: {
    nome: "Galinha",
    imagem: "images/animais/chicken.png",
    nutrientes: {
      PB: "16% Proteína Bruta",
      EM: "2800 kcal/kg Energia Metabolizável"
    }
  },
  suino: {
    nome: "Suíno",
    imagem: "images/animais/pig.png",
    nutrientes: {
      PB: "18% Proteína Bruta",
      EM: "3200 kcal/kg Energia Metabolizável"
    }
  },
  bovino: {
    nome: "Bovino",
    imagem: "images/animais/cow.png",
    nutrientes: {
      PB: "12% Proteína Bruta",
      EM: "2500 kcal/kg Energia Metabolizável"
    }
  },
  caprino: {
    nome: "Caprino",
    imagem: "images/animais/goat.png",
    nutrientes: {
      PB: "14% Proteína Bruta",
      EM: "2600 kcal/kg Energia Metabolizável"
    }
  },
  ovino: {
    nome: "Ovino",
    imagem: "images/animais/sheep.png",
    nutrientes: {
      PB: "13% Proteína Bruta",
      EM: "2400 kcal/kg Energia Metabolizável"
    }
  }
};

// Função chamada ao clicar em um card
function selecionarAnimal(tipo) {
  const animal = animalData[tipo];
  if (!animal) return;

  // Preenche os dados
  document.getElementById("animalTitle").innerText = animal.nome;
  document.getElementById("animalImage").src = animal.imagem;

  const ul = document.getElementById("animalNutrients");
  ul.innerHTML = "";
  Object.values(animal.nutrientes).forEach(nut => {
    const li = document.createElement("li");
    li.innerText = nut;
    ul.appendChild(li);
  });

  // Guarda o animal selecionado em memória temporária
  window.selectedAnimal = animal;

  // Alterna telas
  document.getElementById("animalSelection").classList.add("hidden");
  document.getElementById("animalInfo").classList.remove("hidden");
}

// Botão de voltar
function voltarAnimalSelection() {
  document.getElementById("animalInfo").classList.add("hidden");
  document.getElementById("animalSelection").classList.remove("hidden");
}

// Botão avançar para cálculo → envia dados pela URL
function irParaModoCalculo() {
  if (!window.selectedAnimal) return;

  const animal = window.selectedAnimal;
  const params = new URLSearchParams();
  params.append("nome", animal.nome);
  params.append("PB", animal.nutrientes.PB);
  params.append("EM", animal.nutrientes.EM);
  params.append("Ca", animal.nutrientes.Ca);

  window.location.href = "pearsonSimples.html?" + params.toString();
}
