const TOTAL_PAGINAS = 5;
let paginaAtual = 1;

const containerNumeros = document.getElementById("numeros");
const paginacao = document.getElementById("paginacao");
const setas = paginacao.querySelectorAll(".seta");

// Desenha os botões numéricos e marca o ativo
function renderizar() {
  containerNumeros.innerHTML = "";

  for (let i = 1; i <= TOTAL_PAGINAS; i++) {
    const botao = document.createElement("button");
    botao.className = "btn numero";
    botao.textContent = i;
    if (i === paginaAtual) botao.classList.add("ativo");

    botao.addEventListener("click", function () {
      paginaAtual = i;
      renderizar();
    });

    containerNumeros.appendChild(botao);
  }

  atualizarSetas();
}

// Habilita/desabilita as setas conforme a página
function atualizarSetas() {
  setas.forEach(function (seta) {
    const acao = seta.dataset.acao;
    if (acao === "primeira" || acao === "anterior") {
      seta.disabled = paginaAtual === 1;
    } else {
      seta.disabled = paginaAtual === TOTAL_PAGINAS;
    }
  });
}

// Cliques nas setas
setas.forEach(function (seta) {
  seta.addEventListener("click", function () {
    switch (seta.dataset.acao) {
      case "primeira": paginaAtual = 1; break;
      case "anterior": paginaAtual = Math.max(1, paginaAtual - 1); break;
      case "proxima":  paginaAtual = Math.min(TOTAL_PAGINAS, paginaAtual + 1); break;
      case "ultima":   paginaAtual = TOTAL_PAGINAS; break;
    }
    renderizar();
  });
});

renderizar();
