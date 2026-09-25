// ==============================
// VARIABLES DEL JUEGO
// ==============================

// caras posibles de los dados
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
// ==============================
// ELEMENTOS HTML
// ==============================

const btnTirar = document.querySelector("#tirar");
const btnReiniciar = document.querySelector("#reiniciar");

let textoTurno = document.querySelector("#turno");
let textoTiradas = document.querySelector("#tiradas");
let textoResultado = document.querySelector("#resultado");

// ==============================
// HACER CLIC EN LOS DADOS
// ==============================

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

// ==============================
// TIRAR LOS DADOS
// ==============================

btnTirar.addEventListener ("click", () => {
    tirarDados();
});

//funcion que tira todos los dados que NO estén guardados
function tirarDados() {

//no deja superar las 3 tiradas
if (tiradas >= 3) {
    return;
}

//recorre los cinco dados
dados.forEach((dado, i) => {

//solo se vuelve a tirar los dados que no están guardados
if (!dadosGuardados[i]) {
    let posicion = Math.floor(Math.random()* caras.lenght);

    dados[i] = caras[posicion];

    elementosDados[i].src = 
    "img/poker/dado-" + dados[i] + ".png";
    }
});
tiradas++;

textoTiradas.innerText =
"Tiradas: " + tiradas + " /3";

//después de cada tirada se comprueban las combinaciones
mostrarCombinaciones();

//al llegar a la tercera tirada ya no se pueden tirar más dados
if (tiradas === 3) {
    btnTirar.disabled = true;
    }
}

// ==============================
// CONTAR LAS CARAS
// ==============================
//cuenta cuantas veces aparece cada cara en los dados
function contarDados() {
    let cantidades = [];

    dados.forEach(function(dado) {
        let repetido = false;

        for (let i = 0; i < cantidades.length; i++) {
            if (cantidades[i][0] === dado) {
                cantidades[i][1]++;
                repetido = true;
            }
        }

        if (repetido === false) {
            cantidades.push([dado, 1]);
        }
    });

    let valores = [];

    for (let i = 0; i < cantidades.length; i++) {
        valores.push(cantidades[i][1]);
    }

    return valores;
}

// ==============================
// DETECTAR COMBINACIONES
// ==============================

//devuelve todas las combinaciones que el jugador puede seleccionar
function detectarCombinaciones() {

    let valores = contarDados();

    let combinaciones = [];

    let hayCinco = false;
    let hayCuatro = false;
    let hayTres = false;
    let cantidadPares = 0;

    for (let i = 0; i < valores.length; i++) {

        if (valores[i] === 5) {
            hayCinco = true;
        }

        if (valores[i] === 4) {
            hayCuatro = true;
        }

        if (valores[i] === 3) {
            hayTres = true;
        }

        if (valores[i] === 2) {
            cantidadPares++;
        }
    }

    if (hayCinco) {
        combinaciones.push("Cinco iguales");
    }

    if (hayCuatro) {
        combinaciones.push("Póker");
    }

    if (hayTres && cantidadPares === 1) {
        combinaciones.push("Full house");
    }

    if (hayTres) {
        combinaciones.push("Trío");
    }

    if (cantidadPares === 2) {
        combinaciones.push("Dos pares");
    }

    if (cantidadPares === 1) {
        combinaciones.push("Un par");
    }

    return combinaciones;
}
// ==============================
// DETECTAR ESCALERA
// ==============================

// Las dos escaleras posibles son:
// 9 - 10 - J - Q - K
// 10 - J - Q - K - A

function esEscalera() {
    let orden = ["9","10","J","Q","K","A"];

    let posiciones = dados.map(dado => {
        //return orden.indexOf(dado);
    });
    posiciones.sort((a,b) => a-b);

    let primeraEscalera = [0,1,2,3,4];
    let segundaEscalera = [1,2,3,4,5];

    if (
        JSON.stringify(posiciones) ===
        JSON.stringify(primeraEscalera)
    ) {
        return true;
    }
    if (
        JSON.stringify(posiciones) ===
        JSON.stringify(segundaEscalera)
    ) {
        return true;
    }

    return false;
}
// ==============================
// MOSTRAR COMBINACIONES
// ==============================

//ilumina las filas de la tabla que el jugador puede elegir
function mostrarCombinaciones() {
    limpairCombinaciones();

    let combinaciones = detectarCombinaciones();

    combinaciones.forEach(combinacion => {
        
        if (combinacion === "Cinco iguales") {
            document.querySelector("#cincoIguales")
            .classList.add("disponible")
        }
        if (combinacion === "Cuatro iguales") {
            document.querySelector("#cuatroIguales")
                .classList.add("disponible");
        }

        if (combinacion === "Full House") {
            document.querySelector("#fullHouse")
                .classList.add("disponible");
        }

        if (combinacion === "Escalera") {
            document.querySelector("#escalera")
                .classList.add("disponible");
        }

        if (combinacion === "Tres iguales") {
            document.querySelector("#tresIguales")
                .classList.add("disponible");
        }

        if (combinacion === "Dos pares") {
            document.querySelector("#dosPares")
                .classList.add("disponible");
        }

        if (combinacion === "Un par") {
            document.querySelector("#unPar")
                .classList.add("disponible");
        }

        if (combinacion === "Sin combinación") {
            document.querySelector("#sinCombinacion")
                .classList.add("disponible");
        }
    });
}

// ==============================
// LIMPIAR ILUMINACIÓN
// ==============================

//saca la clase de las filas que estaban disponibles
function limpairCombinaciones() {
    //let filas = document.querySelectorAll("#combinaciones")
    filas.forEach(fila => {
        fila.classList.remove("disponible");
    });
}