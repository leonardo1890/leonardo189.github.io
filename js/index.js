window.addEventListener("load", iniciarJuego);

const botonMascota = document.getElementById("boton-seleccionMascota");
const botonAtaqueFuego = document.getElementById("boton-fuego");
const botonAtaqueAgua = document.getElementById("boton-agua");
const botonAtaqueTierra = document.getElementById("boton-tierra");
const botonReiniciar = document.getElementById("botonReiniciar");

const sectionSeleccionarAtaque = document.getElementById("ataques");
const sectionInfoPartida = document.getElementById("infoPartida");
const resultadoParcial = document.getElementById("resultadoParcial-reiniciar");
const containerRondas = document.getElementById("containerRondas");
const finPartida = document.getElementById("finPartidaReiniciar");
const sectionSelecionMascota = document.getElementById("seleccionMascota");


const buttonBalto = document.getElementById("balto");
const buttonKyra = document.getElementById("kyra");
const buttonToby = document.getElementById("toby");
// const buttonLuna = document.getElementById('luna');
// const buttonLucy = document.getElementById('lucy');
// const buttonKaty = document.getElementById('katy');

const spanMascotaJugador = document.getElementById("mascotaJugador");
const spanMascotaEnemigo = document.getElementById("mascotaEnemigo");

const mensajeResultadoParcial = document.getElementById("resultadoParcial");
const textAtaqueJugador = document.getElementById("ataqueJugador");
const textAtaqueEnemigo = document.getElementById("ataqueEnemigo");

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let rondaGanada = 0;
let rondaPerdida = 0;
let rondaEmpatada = 0;

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";

  sectionInfoPartida.style.display = "none";
  resultadoParcial.style.display = "none";
  containerRondas.style.display = "none";
  finPartida.style.display = "none";

  botonMascota.addEventListener("click", seleccionMascotaJugador);

  botonAtaqueFuego.addEventListener("click", ataqueFuego);
  botonAtaqueAgua.addEventListener("click", ataqueAgua);
  botonAtaqueTierra.addEventListener("click", ataqueTierra);

  botonReiniciar.addEventListener("click", reiniciarJuego);

  const imgMenuMobile = document.getElementById("imgMenuMobile");
  const navMainMenu = document.getElementById("navMainMenu");
  
  imgMenuMobile.addEventListener("click", () => {
    navMainMenu.classList.toggle("navMainMenu--show");
  });
}

function seleccionMascotaJugador() {

  if (buttonBalto.checked == true) {
    spanMascotaJugador.innerHTML = "Balto";
  } else if (buttonKyra.checked == true) {
    spanMascotaJugador.innerHTML = "Kyra";
  } else if (buttonToby.checked == true) {
    spanMascotaJugador.innerHTML = "Toby";
  }
  //  else if (buttonLuna.checked == true) {
  //   spanMascotaJugador.innerHTML = 'Luna';
  // } else if (buttonLucy.checked == true) {
  //   spanMascotaJugador.innerHTML = 'Lucy';
  // } else if (buttonKaty.checked == true) {
  //   spanMascotaJugador.innerHTML = 'Katy';
  // }
  else {
    alert("Selecciona un Pokemon");
  }

  sectionSeleccionarAtaque.style.display = "flex";
  containerRondas.style.display = "flex";
  
  sectionInfoPartida.style.display = "grid";
  
  sectionSelecionMascota.style.display = "none";

  seleccionMascotaEnemigo();
}

function seleccionMascotaEnemigo() {
  const mascotaEnemigoAleatorio = aleatorio(1, 6);

  if (mascotaEnemigoAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = "Balto";
  } else if (mascotaEnemigoAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = "Kyra";
  } else if (mascotaEnemigoAleatorio == 3) {
    spanMascotaEnemigo.innerHTML = "Toby";
  } else if (mascotaEnemigoAleatorio == 4) {
    spanMascotaEnemigo.innerHTML = "Luna";
  } else if (mascotaEnemigoAleatorio == 5) {
    spanMascotaEnemigo.innerHTML = "Lucy";
  } else if (mascotaEnemigoAleatorio == 6) {
    spanMascotaEnemigo.innerHTML = "Katy";
  }
}

function ataqueAleatorioEnemigo() {
  const ataqueEnemigoAleatorio = aleatorio(1, 3);

  if (ataqueEnemigoAleatorio == 1) {
    ataqueEnemigo = "Mordida";
  } else if (ataqueEnemigoAleatorio == 2) {
    ataqueEnemigo = "Ladrido";
  } else if (ataqueEnemigoAleatorio == 3) {
    ataqueEnemigo = "Golpe";
  }

  resultadoCombate();
}

function ataqueFuego() {
  ataqueJugador = "Mordida";
  ataqueAleatorioEnemigo();
}

function ataqueAgua() {
  ataqueJugador = "Ladrido";
  ataqueAleatorioEnemigo();
}

function ataqueTierra() {
  ataqueJugador = "Golpe";
  ataqueAleatorioEnemigo();
}

function crearMensaje(resultado) {
  resultadoParcial.style.display = "flex";

  const nuevoAtaqueJugador = document.createElement("p");
  const nuevoAtaqueEnemigo = document.createElement("p");

  mensajeResultadoParcial.innerHTML = resultado;
  nuevoAtaqueJugador.innerHTML = ataqueJugador;
  nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

  textAtaqueJugador.appendChild(nuevoAtaqueJugador);
  textAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function resultadoCombate() {
  const spanVidasJugador = document.getElementById("vidaJugador");
  const spanVidasEnemigo = document.getElementById("vidaEnemigo");
  const spanRondaGanada = document.getElementById("rondaGanada");
  const spanRondaPerdida = document.getElementById("rondaPerdida");
  const spanRondaEmpatada = document.getElementById("rondaEmpatada");

  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("Empataste");
    rondaEmpatada++;
    spanRondaEmpatada.innerHTML = "Rondas Empatadas: " + rondaEmpatada;
  } else if (
    (ataqueJugador == "Mordida" && ataqueEnemigo == "Ladrido") ||
    (ataqueJugador == "Golpe" && ataqueEnemigo == "Mordida") ||
    (ataqueJugador == "Ladrido" && ataqueEnemigo == "Golpe")
  ) {
    crearMensaje("Ganaste");
    vidasEnemigo--;
    rondaGanada++;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    spanRondaGanada.innerHTML = "Rondas Ganadas: " + rondaGanada;
  } else {
    crearMensaje("Perdiste");
    vidasJugador--;
    rondaPerdida++;
    spanVidasJugador.innerHTML = vidasJugador;
    spanRondaPerdida.innerHTML = "Rondas Perdidas: " + rondaPerdida;
  }

  mensajeFinPartida();
}

function mensajeFinPartida() {
  const resultadosJuego = document.getElementById("resultados");

  const mensajeResultados = document.createElement("p");
  resultadosJuego.appendChild(mensajeResultados);

  if (vidasJugador == 0) {
    mensajeResultados.innerHTML = "PARTIDA PERDIDA";

    botonAtaqueFuego.disabled = true;
    botonAtaqueAgua.disabled = true;
    botonAtaqueTierra.disabled = true;

    sectionSeleccionarAtaque.style.display = "none";
    finPartida.style.display = "block";
  } else if (vidasEnemigo == 0) {
    mensajeResultados.innerHTML = "PARTIDA GANADA";

    sectionSeleccionarAtaque.style.display = "none";
    finPartida.style.display = "block";
  }
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
