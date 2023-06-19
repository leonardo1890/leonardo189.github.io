window.addEventListener("load", iniciarJuego);

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let rondaGanada = 0;
let rondaPerdida = 0;
let rondaEmpatada = 0;

function iniciarJuego() {
  let sectionSeleccionarAtaque = document.getElementById("ataques");
  sectionSeleccionarAtaque.style.display = "none";
  
  let sectionInfoPartida = document.getElementById("infoPartida");
  sectionInfoPartida.style.display = "none";
  let resultadoParcial = document.getElementById("resultadoParcial-reiniciar");
  resultadoParcial.style.display = "none";
  let rondaGanada = document.getElementById("rondaGanada");
  rondaGanada.style.display = "none";
  let rondaPerdida = document.getElementById("rondaPerdida");
  rondaPerdida.style.display = "none";
  let rondaEmpatada = document.getElementById("rondaEmpatada");
  rondaEmpatada.style.display = "none";
  let finPartida = document.getElementById("finPartidaReiniciar");
    finPartida.style.display = "none";


  let botonMascota = document.getElementById("boton-seleccionMascota");
  botonMascota.addEventListener("click", seleccionMascotaJugador);

  let botonAtaqueFuego = document.getElementById("boton-fuego");
  botonAtaqueFuego.addEventListener("click", ataqueFuego);
  let botonAtaqueAgua = document.getElementById("boton-agua");
  botonAtaqueAgua.addEventListener("click", ataqueAgua);
  let botonAtaqueTierra = document.getElementById("boton-tierra");
  botonAtaqueTierra.addEventListener("click", ataqueTierra);

  let botonReiniciar = document.getElementById("botonReiniciar");
  botonReiniciar.addEventListener("click", reiniciarJuego);

  let imgMenuMobile = document.getElementById("imgMenuMobile");
  let navMainMenu = document.getElementById("navMainMenu");

  imgMenuMobile.addEventListener("click", () => {
    navMainMenu.classList.toggle("navMainMenu--show");
  });
}

function seleccionMascotaJugador() {
  let buttonBalto = document.getElementById("balto");
  let buttonKyra = document.getElementById("kyra");
  let buttonToby = document.getElementById("toby");
  // let buttonLuna = document.getElementById('luna');
  // let buttonLucy = document.getElementById('lucy');
  // let buttonKaty = document.getElementById('katy');

  let spanMascotaJugador = document.getElementById("mascotaJugador");

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

  let sectionSeleccionarAtaque = document.getElementById("ataques");
  sectionSeleccionarAtaque.style.display = "flex";
  let sectionInfoPartida = document.getElementById("infoPartida");
  sectionInfoPartida.style.display = "grid";
  let sectionSelecionMascota = document.getElementById("seleccionMascota");
  sectionSelecionMascota.style.display = "none";

  seleccionMascotaEnemigo();
}

function seleccionMascotaEnemigo() {
  let mascotaEnemigoAleatorio = aleatorio(1, 6);

  let spanMascotaEnemigo = document.getElementById("mascotaEnemigo");

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
  let ataqueEnemigoAleatorio = aleatorio(1, 3);

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
  let resultadoParcial = document.getElementById("resultadoParcial-reiniciar");
  resultadoParcial.style.display = "flex";

  let mensajeResultadoParcial = document.getElementById("resultadoParcial");
  let textAtaqueJugador = document.getElementById("ataqueJugador");
  let textAtaqueEnemigo = document.getElementById("ataqueEnemigo");

  let nuevoAtaqueJugador = document.createElement("p");
  let nuevoAtaqueEnemigo = document.createElement("p");

  mensajeResultadoParcial.innerHTML = resultado;
  nuevoAtaqueJugador.innerHTML = ataqueJugador;
  nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

  textAtaqueJugador.appendChild(nuevoAtaqueJugador);
  textAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function resultadoCombate() {
  let spanVidasJugador = document.getElementById("vidaJugador");
  let spanVidasEnemigo = document.getElementById("vidaEnemigo");
  let spanRondaGanada = document.getElementById("rondaGanada");
  let spanRondaPerdida = document.getElementById("rondaPerdida");
  let spanRondaEmpatada = document.getElementById("rondaEmpatada");

  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("Empataste");
    rondaEmpatada++;
    spanRondaEmpatada.innerHTML = "Rondas Empatadas: " + rondaEmpatada;
  } else if (
    (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") ||
    (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") ||
    (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua")
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
    spanRondaPerdida.innerHTML = "Rondas Perdidas: " +  rondaPerdida;
  }

  mensajeFinPartida();
}

function mensajeFinPartida() {

  let resultadosJuego = document.getElementById("resultados");

  let mensajeResultados = document.createElement("p");
  resultadosJuego.appendChild(mensajeResultados);

  if (vidasJugador == 0) {
    mensajeResultados.innerHTML = "PARTIDA PERDIDA";

    let botonAtaqueFuego = document.getElementById("boton-fuego");
    botonAtaqueFuego.disabled = true;
    let botonAtaqueAgua = document.getElementById("boton-agua");
    botonAtaqueAgua.disabled = true;
    let botonAtaqueTierra = document.getElementById("boton-tierra");
    botonAtaqueTierra.disabled = true;
    
    let sectionSeleccionarAtaque = document.getElementById("ataques");
    sectionSeleccionarAtaque.style.display = "none";
    let finPartida = document.getElementById("finPartidaReiniciar");
    finPartida.style.display = "block";

  } else if (vidasEnemigo == 0) {
    mensajeResultados.innerHTML = "PARTIDA GANADA";

    let sectionSeleccionarAtaque = document.getElementById("ataques");
    sectionSeleccionarAtaque.style.display = "none";
    let finPartida = document.getElementById("finPartidaReiniciar");
    finPartida.style.display = "block";
  }
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
