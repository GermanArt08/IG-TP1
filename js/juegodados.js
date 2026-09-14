// caras de los dados
let caras = ["9", "10", "J", "Q", "K", "A"];

// valores default de los dados
let dados = ["9","9","9","9","9"];

let dadosGuardados = [false,false,false,false,false];

let jugadorActual = 1;
let ronda = 1;
// cantidad de tiradas del jugador actual
let tiradas = 0;

const elementosDados = document.querySelectorAll(".dado");

let puntajes = {
    jugador1: {
        "Cinco iguales": 0,
        "Cuatro iguales": 0,
        "Full House": 0,
        "Escalera": 0,
        "Tres iguales": 0,
        "Dos pares": 0,
        "Un par": 0,
        "Sin combinación": 0
    },

    jugador2: {
        "Cinco iguales": 0,
        "Cuatro iguales": 0,
        "Full House": 0,
        "Escalera": 0,
        "Tres iguales": 0,
        "Dos pares": 0,
        "Un par": 0,
        "Sin combinación": 0
    }
};
// Valores de cada combinación
let valoresCombinaciones = {
    "Cinco iguales": 50,
    "Cuatro iguales": 35,
    "Full House": 30,
    "Escalera": 40,
    "Tres iguales": 15,
    "Dos pares": 10,
    "Un par": 5,
    "Sin combinación": 20
};

// Elementos HTML
const btnTirar = document.querySelector("#tirar");
const btnReiniciar = document.querySelector("#reiniciar");

let textoTurno = document.querySelector("#turno");
let textoTiradas = document.querySelector("#tiradas");
let textoResultado = document.querySelector("#resultado");

// al hacer click en un dado, se guarda o se vuelve a liberar

elementosDados.forEach((dado, i) => {
    dado.addEventListener("click", () => {
        //no se pueden guardar dados antes de realizar una tirada
        if (tiradas === 0) {
            return;
        }

        //no se pueden modificar los dados después de la tercera tirada
        if (tiradas >= 3) {
            return;
        }

        // cambia entre guardado y no guardado
        dadosGuardados[i] = !dadosGuardados[i];

        if (dadosGuardados[i]) {
            dado.classList.add("#guardado");
        }
        else {
            dado.classList.remove("#guardado");
        }
    });
});

// tirar los dados