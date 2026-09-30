//datos generales de las cartas
let palos = [
    "clubs",
    "diamonds",
    "hearts",
    "spades"
];

let valoresCartas = [
    {nombre: "A", puntos: 11, archivo: "ace"},
    {nombre: "2", puntos: 2, archivo: "2"},
    { nombre: "3", puntos: 3, archivo: "3" },
    { nombre: "4", puntos: 4, archivo: "4" },
    { nombre: "5", puntos: 5, archivo: "5" },
    { nombre: "6", puntos: 6, archivo: "6" },
    { nombre: "7", puntos: 7, archivo: "7" },
    { nombre: "8", puntos: 8, archivo: "8" },
    { nombre: "9", puntos: 9, archivo: "9" },
    { nombre: "10", puntos: 10, archivo: "10" },
    { nombre: "J", puntos: 10, archivo: "jack" },
    { nombre: "Q", puntos: 10, archivo: "queen" },
    { nombre: "K", puntos: 10, archivo: "king" }   
];

//variables de la partida
let mazo = [];

let cartasJugador = [];
let cartasCrupier = [];

let partidaTerminada = false;

//elementos del html
const contenedorJugador = document.querySelector("#cartas-jugador");
const contenedorCrupier = document.querySelector("#cartas-crupier");
const puntajeJugadorTexto = document.querySelector("#puntaje-jugador");
const puntajeCrupierTexto = document.querySelector("#puntaje-crupier");
const resultado = document.querySelector("#resultado-blackjack");
const botonPedir = document.querySelector("#pedir");
const botonPlantarse = document.querySelector("#plantarse");
const botonNuevaPartida = document.querySelector("#nueva-partida");

//eventos principales
botonPedir.addEventListener("click", pedirCarta);
botonPlantarse.addEventListener("click", plantarse);
botonNuevaPartida.addEventListener("click", nuevaPartida);

//creación del mazo
function crearMazo() {
    mazo = [];
    
    for (let i = 0; i < palos.length; i++) {
        for (let j = 0; j < valoresCartas.length; j++) {
            let carta = {
                nombre: valoresCartas[j].nombre,

                puntos: valoresCartas[j].puntos,

                palo: palos[i],

                imagen: "img/blackjack/" + valoresCartas[j].archivo + " of " + palos[i] + ".png"
            };

            mazo.push(carta);
        }
    }
}

//sacar una carta aleatoria del mazo
function sacarCarta() {
    let posicion = math.floor(math.random() * mazo.length);
    let carta = mazo[posicion];
    mazo.splice(posicion, 1);
    return carta;
}

//calcular el puntaje de una mano
function calcularPuntaje(mano) {
    let puntaje = 0;
    let cantidades = 0;

    for (let i = 0; i < mano.length; i++) {
        puntaje += mano[i].puntos;
        if (mano[i].nombre == "A") {
            cantidadAses++;
        }
    }

    //SI EL TOTAL ES MAYOR A 21, 
    //UN AS PUEDE PASAR A VALER 1.
    for (let i = 0; i < cantidadAses; i++) {
        if (puntaje > 21) {
            puntaje -= 10;
        }
    }

    return puntaje;
}

//MOSTRAR LAS CARTAS CON IMÁGENES
function mostrarMano(
    mano,
    contenedor,
    ocultarSegunda
) {
    contenedor.innerHTML = "";
    for (let i = 0; i < mano.length; i++) {
        const imagenCarta = document.createElement("img");

        if (ocultarSegunda == true 
            && i == 1
        ) {
            imagenCarta.src = "img/blackjack/card back blue.png";
            imagenCarta.alt = "Carta oculta del crupier";
        } else {
            imagenCarta.src = mano[i].imagen;
            imagenCarta.alt = mano[i].nombre + "de" + mano[i].palo;
        }

        contenedor.append(imagenCarta);
    }
}

//ACTUALIZAR LA MESA
function actualizarMesa() {

    mostrarMano(
        cartasJugador,
        contenedorJugador,
        false
    );
    mostrarMano(
        cartasCrupier,
        contenedorCrupier,
        partidaTerminada == false
    );

    puntajeJugadorTexto.innerText = "Puntaje del jugador: " + calcularPuntaje(cartasJugador);

    if (partidaTerminada == true) {
        puntajeCrupierTexto.innerText = "Puntaje del crupier: " + calcularPuntaje(cartasCrupier);
    } else {
        puntajeCrupierTexto.innerText = "Puntaje del crupier: ?";
    }   
}

//PEDIR CARTA
function pedirCarta() {
    if (partidaTerminada == false) {
        cartasJugador.push(
            sacarCarta()
        );
        actualizarMesa();
        let puntajeJugador = calcularPuntaje(cartasJugador);
 
        if (puntajeJugador > 21) {
            finalizarPartida("Te pasaste de 21. Gana el crupier.");
        } else if (puntajeJugador == 21) {
            turnoCrupier();
        }
    }
}

//PLANTARSE
function plantarse() {
    if (partidaTerminada == false) {
        turnoCrupier();
        
    }
}

//TURNO DEL CRUPIER
function turnoCrupier() {
    let puntajeCrupier = calcularPuntaje(cartasCrupier);
    
    //El crupier pide cartas
    //mientras tenga menos de 17.
    
    while (puntajeCrupier < 17) {
        cartasCrupier.push(
            sacarCarta()
        );
        puntajeCrupier = calcularPuntaje(cartasCrupier);
    }

    let puntajeJugador = calcularPuntaje(cartasJugador);

    //COMPARAR RESULTADOS
    if (puntajeCrupier > 21) {
        finalizarPartida("El crupier se pasó de 21. ¡Ganaste!.");
    } else if (puntajeJugador > PuntajeCrupier) {
        finalizarPartida("¡Ganaste la partida!");
    } else if (puntajeJugador < puntajeCrupier) {
        finalizarPartida("Gana el crupier.");
    } else {
        finalizarPartida("Empate.");
    }
}

//FINALIZAR PARTIDA
function finalizarPartida(mensaje) {
    partidaTerminada = true;
    resultado.innerText = mensaje;
    actualizarMesa();
}

//NUEVA PARTIDA
function NuevaPartida() {
    crearMazo();

    cartasJugador = [];
    cartasCrupier = [];
    partidaTerminada= false;
    resultado.innerText="";

    //DOS CARTAS PARA EL JUGADOR
    cartasJugador.push(
        sacarCarta()
    );

    cartasJugador.push(
        sacarCarta()
    );

    //DOS CARTAS PARA EL CRUPIER
    cartasCrupier.push(
        sacarCarta()
    );

    cartasCrupier.push(
        sacarCarta()
    );

    actualizarMesa();
    
    //SI EL JUGADOR EMPIEZA CON 21
    if ( calcularPuntaje(cartasJugador) == 21) {
        turnoCrupier();
    }
}

//COMENZAR EL JUEGO
nuevaPartida();