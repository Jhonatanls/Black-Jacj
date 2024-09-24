/**
 * 2C = Two of clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const pintas = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// Esta función crea una baraja en desorden
const crearDeck = () => {
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
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;


}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

crearDeck();

// Esta función me permite pedir una carta

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    console.log(carta);
    console.log(deck);

    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1;
}

const valor = valorCarta( pedirCarta() );
console.log({ valor })