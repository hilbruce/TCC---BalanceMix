document.addEventListener('DOMContentLoaded', function(){
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu-superior');
    const overlay = document.getElementById('overlay');
    const main = document.getElementById('conteudo');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('ativo');
        toggle.classList.toggle('ativo'); // Ativa animação do icone
        overlay.classList.toggle('ativo');
        main.classList.toggle('deslocado');
    });

    // Fecha o menu ao clicar fora (na overlay)
    overlay.addEventListener('click', () => {
        menu.classList.remove('ativo');
        toggle.classList.remove('ativo');
        overlay.classList.remove('ativo');
        main.classList.remove('deslocado')    
    });
});

// Dectetar página/tela atual
document.addEventListener('DOMContentLoaded', () => {
    const caminhoAtual = window.location.pathname;
    const nomePagina = caminhoAtual.substring(caminhoAtual.lastIndexOf('/') + 1);

    document.querySelectorAll('.menu-superior a').forEach(link => {
        if (link.getAttribute('href') === nomePagina) {
            link.classList.add('ativo');
        }
    });
});
