window.addEventListener("load", iniciarJuego);

const botonMascota = document.getElementById("boton-seleccionMascota");
const botonReiniciar = document.getElementById("botonReiniciar");

const sectionSeleccionarAtaque = document.getElementById("ataques");
const sectionInfoPartida = document.getElementById("infoPartida");
const resultadoParcial = document.getElementById("resultadoParcial-reiniciar");
const containerRondas = document.getElementById("containerRondas");
const finPartida = document.getElementById("finPartidaReiniciar");
const sectionSelecionMascota = document.getElementById("seleccionMascota");

const spanMascotaJugador = document.getElementById("mascotaJugador");
const spanMascotaEnemigo = document.getElementById("mascotaEnemigo");

const mensajeResultadoParcial = document.getElementById("resultadoParcial");
const textAtaqueJugador = document.getElementById("ataqueJugador");
const textAtaqueEnemigo = document.getElementById("ataqueEnemigo");

const contenedorMascotas = document.getElementById("contenedorMascotas");

const contenedorBotonesAtaques = document.getElementById(
  "contenedorBotonesAtaques"
);

const sectionVerMapa = document.getElementById("verMapa");
const mapa = document.getElementById("mapa");

const alertSeleccion = document.getElementById("containerModal");

let jugadorId = null;

let pokemones = [];
let opcionPokemones;
let inputBalto;
let inputKyra;
let inputToby;
let pokemonJugador;
let ataquesPokemon;
let botonAtaqueMordida;
let botonAtaqueLadrido;
let botonAtaqueGolpe;
let botones = [];
let ataquesPokemonEnemigo;

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let rondaGanada = 0;
let rondaPerdida = 0;
let rondaEmpatada = 0;

let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
let mascotaJugadorObjeto;
let alturaBuscada;
let anchoMapa = window.innerWidth - 20;
const anchoMaximoMapa = 800;

if (anchoMapa > anchoMaximoMapa) {
  anchoMapa = anchoMaximoMapa - 20;
}

alturaBuscada = (anchoMapa * 600) / 800;

mapa.width = anchoMapa;
mapa.height = alturaBuscada;

mapaBackground.src = "/assets/mapaPokemon.png";

class Pokemon {
  constructor(nombre, foto, vida, fotoMapa) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 80;
    this.alto = 80;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarPokemon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let balto = new Pokemon(
  "Balto",
  "/assets/balto.png",
  5,
  "/assets/Icon-balto.png"
);
let kyra = new Pokemon("Kyra", "/assets/kyra.png", 4, "/assets/Icon-kyra.png");
let toby = new Pokemon("Toby", "/assets/tob.png", 3, "/assets/Icon-tob.png");

let baltoEnemigo = new Pokemon(
  "Balto",
  "/assets/balto.png",
  5,
  "/assets/Icon-balto.png"
);
let kyraEnemigo = new Pokemon(
  "Kyra",
  "/assets/kyra.png",
  4,
  "/assets/Icon-kyra.png"
);
let tobyEnemigo = new Pokemon(
  "Toby",
  "/assets/tob.png",
  3,
  "/assets/Icon-tob.png"
);

balto.ataques.push(
  { nombre: "mordida", id: "boton-mordida" },
  { nombre: "ladrido", id: "boton-ladrido" },
  { nombre: "golpe", id: "boton-golpe" }
);

kyra.ataques.push(
  { nombre: "golpe", id: "boton-golpe" },
  { nombre: "ladrido", id: "boton-ladrido" },
  { nombre: "mordida", id: "boton-mordida" }
);

toby.ataques.push(
  { nombre: "ladrido", id: "boton-ladrido" },
  { nombre: "mordida", id: "boton-mordida" },
  { nombre: "golpe", id: "boton-golpe" }
);

baltoEnemigo.ataques.push(
  { nombre: "mordida", id: "boton-mordida" },
  { nombre: "ladrido", id: "boton-ladrido" },
  { nombre: "golpe", id: "boton-golpe" }
);

kyraEnemigo.ataques.push(
  { nombre: "golpe", id: "boton-golpe" },
  { nombre: "ladrido", id: "boton-ladrido" },
  { nombre: "mordida", id: "boton-mordida" }
);

tobyEnemigo.ataques.push(
  { nombre: "ladrido", id: "boton-ladrido" },
  { nombre: "mordida", id: "boton-mordida" },
  { nombre: "golpe", id: "boton-golpe" }
);

pokemones.push(balto, kyra, toby);

function iniciarJuego() {
  sectionVerMapa.style.display = "none";

  sectionSeleccionarAtaque.style.display = "none";

  pokemones.forEach((pokemon) => {
    opcionPokemones = `
    <input type="radio" name="mascota" id=${pokemon.nombre} />
    <label class="inputLabelMascota" for=${pokemon.nombre}>
      <img src=${pokemon.foto} alt=${pokemon.nombre} />
      <p class="name">${pokemon.nombre}</p>
    </label>
    `;

    contenedorMascotas.innerHTML += opcionPokemones;

    inputBalto = document.getElementById("Balto");
    inputKyra = document.getElementById("Kyra");
    inputToby = document.getElementById("Toby");
  });

  sectionInfoPartida.style.display = "none";
  resultadoParcial.style.display = "none";
  containerRondas.style.display = "none";
  finPartida.style.display = "none";

  botonMascota.addEventListener("click", seleccionMascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);

  const imgMenuMobile = document.getElementById("imgMenuMobile");
  const navMainMenu = document.getElementById("navMainMenu");

  imgMenuMobile.addEventListener("click", () => {
    navMainMenu.classList.toggle("navMainMenu--show");
  });

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionMascotaJugador() {
  if (inputBalto.checked == true) {
    spanMascotaJugador.innerHTML = inputBalto.id;
    pokemonJugador = inputBalto.id;
  } else if (inputKyra.checked == true) {
    spanMascotaJugador.innerHTML = inputKyra.id;
    pokemonJugador = inputKyra.id;
  } else if (inputToby.checked == true) {
    spanMascotaJugador.innerHTML = inputToby.id;
    pokemonJugador = inputToby.id;
  } else {
    alert("Selecciona una mascota");
  }

  sectionVerMapa.style.display = "flex";

  containerRondas.style.display = "flex";
  sectionInfoPartida.style.display = "grid";
  sectionSelecionMascota.style.display = "none";

  extraerAtaques(pokemonJugador);
  iniciarMapa();
  seleccionarPokemon(pokemonJugador);
}

function seleccionarPokemon(pokemonJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pokemon: pokemonJugador,
    }),
  });
}

function extraerAtaques(pokemonJugador) {
  let ataques;
  for (let i = 0; i < pokemones.length; i++) {
    if (pokemonJugador == pokemones[i].nombre) {
      ataques = pokemones[i].ataques;
    }
  }

  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesPokemon = `
    <button class="botonAtaque btnAtaque" id=${ataque.id}>${ataque.nombre}</button>
    `;
    contenedorBotonesAtaques.innerHTML += ataquesPokemon;
  });

  botonAtaqueMordida = document.getElementById("boton-mordida");
  botonAtaqueLadrido = document.getElementById("boton-ladrido");
  botonAtaqueGolpe = document.getElementById("boton-golpe");
  botones = document.querySelectorAll(".btnAtaque");

  botonAtaqueMordida.addEventListener("click", ataqueMordida);
  botonAtaqueLadrido.addEventListener("click", ataqueLadrido);
  botonAtaqueGolpe.addEventListener("click", ataqueGolpe);
}

function secuenciaAtaque() {}

function seleccionMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesPokemonEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  let ataqueEnemigoAleatorio = aleatorio(0, ataquesPokemonEnemigo.length - 1);

  if (ataqueEnemigoAleatorio == 0) {
    ataqueEnemigo = "Mordida";
  } else if (ataqueEnemigoAleatorio == 1) {
    ataqueEnemigo = "Ladrido";
  } else if (ataqueEnemigoAleatorio == 2) {
    ataqueEnemigo = "Golpe";
  }

  resultadoCombate();
}

function ataqueMordida() {
  ataqueJugador = "Mordida";
  ataqueAleatorioEnemigo();
}
textAtaqueEnemigo;

function ataqueLadrido() {
  ataqueJugador = "Ladrido";
  ataqueAleatorioEnemigo();
}

function ataqueGolpe() {
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

    spanRondaPerdida.innerHTML = "Rondas Perdidas: " + rondaPerdida;
  }

  if (vidasEnemigo == 3) {
    spanVidasEnemigo.innerHTML = "❤️❤️❤️";
  } else if (vidasEnemigo == 2) {
    spanVidasEnemigo.innerHTML = "❤️❤️";
  } else if (vidasEnemigo == 1) {
    spanVidasEnemigo.innerHTML = "❤️";
  }

  if (vidasJugador == 3) {
    spanVidasJugador.innerHTML = "❤️❤️❤️";
  } else if (vidasJugador == 2) {
    spanVidasJugador.innerHTML = "❤️❤️";
  } else if (vidasJugador == 1) {
    spanVidasJugador.innerHTML = "❤️";
  }

  mensajeFinPartida();
}

function mensajeFinPartida() {
  const resultadosJuego = document.getElementById("resultados");

  const mensajeResultados = document.createElement("p");
  resultadosJuego.appendChild(mensajeResultados);

  if (vidasJugador == 0) {
    mensajeResultados.innerHTML = "PARTIDA PERDIDA";

    botonAtaqueMordida.disabled = true;
    botonAtaqueLadrido.disabled = true;
    botonAtaqueGolpe.disabled = true;

    sectionSeleccionarAtaque.style.display = "none";
    finPartida.style.display = "block";
  } else if (vidasEnemigo == 0) {
    mensajeResultados.innerHTML = "PARTIDA GANADA";

    sectionSeleccionarAtaque.style.display = "none";
    finPartida.style.display = "block";
  }
}

function pintarCanvas() {
  mascotaJugadorObjeto.x =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y =
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarPokemon();
  baltoEnemigo.pintarPokemon();
  kyraEnemigo.pintarPokemon();
  tobyEnemigo.pintarPokemon();
  if (
    mascotaJugadorObjeto.velocidadX !== 0 ||
    mascotaJugadorObjeto.velocidadY !== 0
  ) {
    revisarColision(baltoEnemigo);
    revisarColision(kyraEnemigo);
    revisarColision(tobyEnemigo);
  }
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = +5;
  pintarCanvas();
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
  pintarCanvas();
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
  pintarCanvas();
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = +5;
  pintarCanvas();
}

function detenerMoviemiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function interaccionTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;

    case "ArrowLeft":
      moverIzquierda();
      break;

    case "ArrowRight":
      moverDerecha();
      break;

    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(pokemonJugador);
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener("keydown", interaccionTecla);
  window.addEventListener("keyup", detenerMoviemiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < pokemones.length; i++) {
    if (pokemonJugador == pokemones[i].nombre) {
      return pokemones[i];
    }
  }
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function revisarColision(enemigo) {
  const enemigoArriba = enemigo.y;
  const enemigoAbajo = enemigo.y + enemigo.alto;
  const enemigoDerecha = enemigo.x + enemigo.ancho;
  const enemigoIzquierda = enemigo.x;

  const mascotaArriba = mascotaJugadorObjeto.y;
  const mascotaAbajo = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const mascotaDerecha = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const mascotaIzquierda = mascotaJugadorObjeto.x;

  if (
    mascotaAbajo < enemigoArriba ||
    mascotaArriba > enemigoAbajo ||
    mascotaDerecha < enemigoIzquierda ||
    mascotaIzquierda > enemigoDerecha
  ) {
    return;
  }
  console.log("prueba");
  detenerMoviemiento();
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionMascotaEnemigo(enemigo);
}
