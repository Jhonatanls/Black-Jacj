(() => {
  "use strict";

  // Inicializaciones
  let deck = [],
    puntosJugadores = [];

  const pintas = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  // Referencias HTML
  const botonPedirCarta = document.querySelector("#boton-card"),
    botonParar = document.querySelector("#boton-stop"),
    botonNuevoJuego = document.querySelector("#boton-newgame"),
    playersPoints = document.querySelectorAll("small"),
    divCartasJugador = document.querySelector("#jugador-cartas"),
    divCartasComputador = document.querySelector("#computador-cartas");

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
  };

  // Esta función crea una baraja en desorden
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let pinta of pintas) {
        deck.push(i + pinta);
      }
    }

    for (let pinta of pintas) {
      for (let especial of especiales) {
        deck.push(especial + pinta);
      }
    }
    return _.shuffle(deck);
  };

  // Esta función me permite pedir una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  const acumularPuntos = ( turno ) => {
    puntosComputador += valorCarta(carta);
    playersPoints[1].innerText = puntosComputador;
  };

  // Lógica Turno de la computadora
  const turnoComputador = (puntosMinimos) => {
    do {
      const carta = pedirCarta();
      const imgCarta = document.createElement("img");

      puntosComputador += valorCarta(carta);
      playersPoints[1].innerText = puntosComputador;
      divCartasComputador.append();

      imgCarta.classList.add("carta");
      imgCarta.src = `assets/cartas/${carta}.png`;
      divCartasComputador.append(imgCarta);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputador < puntosMinimos && puntosComputador <= 21);
    setTimeout(() => {
      mensajeGanador(puntosComputador, puntosMinimos);
    }, 100);
  };

  // Eventos
  botonPedirCarta.addEventListener("click", () => {
    const carta = pedirCarta();
    const imgCarta = document.createElement("img");

    puntosJugador += valorCarta(carta);
    playersPoints[0].innerText = puntosJugador;
    divCartasJugador.append();

    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
      console.warn("Perdiste");
      botonPedirCarta.disabled = true;
      botonParar.disabled = true;
      turnoComputador(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21");
      botonPedirCarta.disabled = true;
      turnoComputador(puntosJugador);
      botonParar.disabled = true;
    }
  });

  botonParar.addEventListener("click", () => {
    botonPedirCarta.disabled = true;
    botonParar.disabled = true;

    turnoComputador(puntosJugador);
  });

  botonNuevoJuego.addEventListener("click", () => {
    //deck = [];
    //deck = crearDeck();
    inicializarJuego();
    puntosComputador = 0;
    puntosJugador = 0;

    playersPoints[0].innerText = 0;
    playersPoints[1].innerText = 0;

    divCartasComputador.innerHTML = "";
    divCartasJugador.innerHTML = "";

    botonPedirCarta.disabled = false;
    botonParar.disabled = false;
    console.clear();
  });

  const mensajeGanador = (puntosComputador, puntosJugador) => {
    if (puntosComputador === puntosJugador) {
      alert("Nadie gana");
    } else if (puntosJugador > 21) {
      alert("Perdiste");
    } else if (puntosComputador > 21) {
      alert("Ganaste");
    } else if (puntosJugador <= puntosComputador) {
      alert("Perdiste");
    } else {
      alert("Ganaste");
    }
  };
})();
