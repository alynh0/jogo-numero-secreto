let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

mensagemInicial();

function exibirCampo(campo, texto) {
  let elemento = document.querySelector(campo);
  elemento.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", {
    rate: 1.2,
    pitch: 0.7,
  });
}

function mensagemInicial() {
  exibirCampo("h1", "Jogo do número secreto");
  exibirCampo("p", "Tente adivinhar o número secreto entre 1 e 10");
}

function numeroAleatorio() {
  let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
  let qtdDeNumerosNaLista = listaDeNumerosSorteados.length;

  if (qtdDeNumerosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroSorteado)) {
    return numeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroSorteado);
    return numeroSorteado;
  }
}

function verificarChute() {
  let chute = parseInt(document.querySelector("input").value);

  if (chute == numeroSecreto) {
    let palavraTentativa = tentativas == 1 ? "tentativa" : "tentativas";
    let mensagemTentativas = `Você acertou em ${tentativas} ${palavraTentativa}!`;
    exibirCampo("p", `Parabéns! ${mensagemTentativas}!`);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else if (chute > 10 || chute < 1) {
    exibirCampo("p", "Você deve digitar um número entre 1 e 10");
  } else {
    if (chute > numeroSecreto) {
      exibirCampo("p", "Você errou! O número secreto é menor");
      tentativas++;
      limparInput();
    } else {
      exibirCampo("p", "Você errou! O número secreto é maior");
      tentativas++;
      limparInput();
    }
  }
}

function limparInput() {
  document.querySelector("input").value = "";
}

function reiniciarJogo() {
  numeroSecreto = numeroAleatorio();
  limparInput();
  tentativas = 1;
  mensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
