// ==============================
// VARIABLES DEL JUEGO
// ==============================

//caras posibles de los dados
let caras = ["9", "10", "J", "Q", "K", "A"];

//valores default de los dados
let dados = ["9","9","9","9","9"];

let dadosGuardados = [false,false,false,false,false];

let jugadorActual = 1;
let ronda = 1;
//cantidad de tiradas del jugador actual
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
//valores de cada combinación
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
            dado.classList.add("guardado");
        }
        else {
            dado.classList.remove("guardado");
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
    let posicion = Math.floor(Math.random() * caras.lenght);

    dados[i] = caras[posicion];

    elementosDados[i].src = 
    "img/dados-poker/dado-" + dados[i] + ".png";
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
        combinaciones.push("Cuatro Iguales");
    }

    if (hayTres && cantidadPares === 1) {
        combinaciones.push("Full house");
    }

    if (hayTres) {
        combinaciones.push("Tres iguales");
    }

    if (cantidadPares === 2) {
        combinaciones.push("Dos pares");
    }

    if (cantidadPares === 1) {
        combinaciones.push("Un par");
    }
    if (esEscalera()) {
    combinaciones.push("Escalera");
    }

    if (combinaciones.length === 0) {
        combinaciones.push("Sin combinación");
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
        return orden.indexOf(dado); //OJO index0f
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
    limpiarCombinaciones();

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
function limpiarCombinaciones() {
    let filas = document.querySelectorAll(".combinacion") //OJO HTML
    filas.forEach(fila => {
        fila.classList.remove("disponible");
    });
}
// ==============================
// SELECCIONAR UNA COMBINACIÓN
// ==============================

//cada fila de la tabla puede ser seleccionada
let filasCombinaciones = 
document.querySelectorAll(".combinacion"); //OJO HTML

filasCombinaciones.forEach(fila => {
    fila.addEventListener("click", () => {
        //solamente se puede elegir una fila iluminada
        if (!fila.classList.contains("disponible")) { //OJO .CONTAINS
            return;
        }
        let combinacion = fila.dataset.combinacion; //OJO DATASET

        seleccionarCombinacion(combinacion);
    });
});

// ==============================
// REGISTRAR COMBINACIÓN
// ==============================

//suma 1 a a combinavion del jugador actual
function seleccionarCombinacion(combinacion) {
    if(jugadorActual === 1) {
        puntajes.jugador1[combinacion]++;
    } else {
        puntajes.jugador2[combinacion]++;
    }

    //actualiza el numero de la tabla
    actualizarTabla();

    textoResultado.innerText =
    "El Jugador " + jugadorActual + " consiguió " + combinacion;

    //despues de elegir una combinacion termina el turno
    pasarTurno();
}

// ==============================
// ACTUALIZAR TABLA
// ==============================

//actualiza las cantidades de combinaciones de cada jugador
function actualizarTabla() {
    document.querySelector("#j1-cinco").innerText =
    puntajes.jugador1["Cinco iguales"];
        document.querySelector("#j2-cinco").innerText =
        puntajes.jugador2["Cinco iguales"];


    document.querySelector("#j1-cuatro").innerText =
        puntajes.jugador1["Cuatro iguales"];

    document.querySelector("#j2-cuatro").innerText =
        puntajes.jugador2["Cuatro iguales"];


    document.querySelector("#j1-full").innerText =
        puntajes.jugador1["Full House"];

    document.querySelector("#j2-full").innerText =
        puntajes.jugador2["Full House"];


    document.querySelector("#j1-escalera").innerText =
        puntajes.jugador1["Escalera"];

    document.querySelector("#j2-escalera").innerText =
        puntajes.jugador2["Escalera"];


    document.querySelector("#j1-tres").innerText =
        puntajes.jugador1["Tres iguales"];

    document.querySelector("#j2-tres").innerText =
        puntajes.jugador2["Tres iguales"];


    document.querySelector("#j1-dos").innerText =
        puntajes.jugador1["Dos pares"];

    document.querySelector("#j2-dos").innerText =
        puntajes.jugador2["Dos pares"];


    document.querySelector("#j1-par").innerText =
        puntajes.jugador1["Un par"];

    document.querySelector("#j2-par").innerText =
        puntajes.jugador2["Un par"];


    document.querySelector("#j1-bust").innerText =
        puntajes.jugador1["Sin combinación"];

    document.querySelector("#j2-bust").innerText =
        puntajes.jugador2["Sin combinación"];


    // Actualiza los puntajes totales
    document.querySelector("#total-j1").innerText =
        calcularTotal(1);

    document.querySelector("#total-j2").innerText =
        calcularTotal(2);
}

// ==============================
// CALCULAR PUNTAJE TOTAL
// ==============================

//multiplica la cantidad de veces que consiguió cada combinación
//por el valor correspondiente de esa combiancion
function calcularTotal(jugador) {
    let datos;

    if (jugador === 1) {
        datos = puntajes.jugador1;
    } else {
        datos = puntajes.jugador2;
    }
    let total = 0;
    Object.keys(datos).forEach(combinacion => { //OJO DATOS
        total +=
            datos[combinacion] *
            valoresCombinaciones[combinacion];
    });
    return total;
}
// ==============================
// PASAR AL SIGUIENTE TURNO
// ==============================

function pasarTurno() {
    //cambia de jugador
    if(jugadorActual===1) {
        jugadorActual = 2;
    } else {
        //cuando termina el jugador 2, aumenta la ronda
        jugadorActual = 1;
        ronda++;
    }
    //si ya terminaron las 10 rondas
    if (ronda > 10) {
        terminarJuego();
        return;
    }
    iniciarTurno();
}
// ==============================
// INICIAR TURNO
// ==============================

function iniciarTurno() {
tiradas = 0;
dados = ["9", "9", "9", "9", "9"];

dadosGuardados = [false, false, false, false, false];

//reinicia las imagenes de los dados
elementosDados.forEach((dado,i)=> {
    dado.src="img/dados-poker/dado-9.png";
    dado.classList.remove("guardado");
});

//quita la iluminacion de las combinaciones
limpiarCombinaciones();

//habilita nuevamente el boton de tirar
btnTirar.disabled = false;
textoTiradas.innerText =
"Tiradas: 0 / 3";

textoTurno.innerText =
"Turno del Jugador " + jugadorActual + " - Ronda " + " / 10";
}
// ==============================
// TERMINAR JUEGO
// ==============================

function terminarJuego() {
    //desactiva las tiradas
    btnTirar.disabled = true;

    //quita las combinaciones seleccionables
    limpiarCombinaciones();

    let totalJugador1 = calcularTotal(1);
    let totalJugador2 = calcularTotal(2);

    let mensaje;

    if (totalJugador1 > totalJugador2) {
        mensaje =
        "¡Ganó el Jugador 1! " +
            totalJugador1 +
            " puntos contra " +
            totalJugador2;
    } else if (totalJugador2 > totalJugador1) {
        mensaje =
            "¡Ganó el Jugador 2! " +
            totalJugador2 +
            " puntos contra " +
            totalJugador1;
    } else {
        mensaje =
            "¡Empate! Ambos jugadores obtuvieron " +
            totalJugador1 +
            " puntos.";
    }
    textoTurno.innerText = "Juego terminado";

    document.querySelector("#resultadoFinal").innerText = mensaje;

    //Muestra el botón para jugar nuevamente
    btnReiniciar.style.display = "inline-block";
}
// ==============================
// REINICIAR
// ==============================

btnReiniciar.addEventListener("click", () => {
    //reinicia todos los puntajes
    puntajes = {
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
    jugadorActual = 1;
    ronda = 1;
    tiradas = 0;

    actualizarTabla();

    textoResultado.innerText = "";

    btnReiniciar.style.display = "none";

    iniciarTurno();
});
// ==============================
// INICIAR EL JUEGO
// ==============================
btnReiniciar.style.display = "none";
iniciarTurno();