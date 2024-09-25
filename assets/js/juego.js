const miModulo = (() => {
  "use strict";

  // Inicializaciones
  let deck = [],
      puntosJugadores = [];

  const pintas = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];

  // Referencias HTML
  const botonPedirCarta = document.querySelector("#boton-card"),
        botonParar = document.querySelector("#boton-stop"),
        botonNuevoJuego = document.querySelector("#boton-newgame");

  const puntosHTML = document.querySelectorAll("small"),
        divCartasJugadores = document.querySelectorAll(".divCartas");

  // Función que inicializa el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach( elem => elem.innerText = 0);
    divCartasJugadores.forEach(elem => elem.innerHTML = '');

    botonPedirCarta.disabled = false;
    botonParar.disabled = false;
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
    return (isNaN(valor)) ?
           (valor === "A" ? 11 : 10) 
           : valor * 1;
  };

  // Turno: 0 = Primer jugador y último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasJugadores[turno].append(imgCarta);
  };

  // Lógica Turno de la computadora
  const turnoComputador = (puntosMinimos) => {
    let puntosComputador = 0;

    do {
      const carta = pedirCarta();
      puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

    } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

    mensajeGanador();
  };

  // Eventos
  botonPedirCarta.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Perdiste");
      botonPedirCarta.disabled = true;
      botonParar.disabled = true;
      turnoComputador(puntosJugador);

    } else if (puntosJugador === 21) {
      console.warn("Sacaste 21");
      botonPedirCarta.disabled = true;
      botonParar.disabled = true;
      turnoComputador(puntosJugador);
    }
  });

  botonParar.addEventListener("click", () => {
    botonPedirCarta.disabled = true;
    botonParar.disabled = true;

    turnoComputador(puntosJugadores[0]);
  });

  const mensajeGanador = () => {
    const [puntosMinimos, puntosComputador] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputador === puntosMinimos) {
        alert("Nadie gana");
      } else if (puntosMinimos > 21) {
        alert("Perdiste");
      } else if (puntosComputador > 21) {
        alert("Ganaste");
      } else {
        alert("Perdiste");
      }
    }, 100);
  }

  return {
    nuevoJuego: inicializarJuego
  };
})();
