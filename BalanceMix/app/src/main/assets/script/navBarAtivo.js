document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".bottom-nav a");

  // Marca o link ativo com base na URL
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }

    // Adiciona foco ao ícone correspondente ao passar o dedo ou clicar
    link.addEventListener("touchstart", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });

    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
