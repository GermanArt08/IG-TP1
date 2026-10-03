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
let juegoIniciado = false;
let jugadores = ["Jugador 1", "Jugador 2"];
let combinacionesDisponibles = [];

let nombresCombinaciones = [
    "Cinco iguales", "Cuatro iguales", "Full House", "Escalera",
    "Tres iguales", "Dos pares", "Un par", "Sin combinación"
];

let puntajes = {
    jugador1: {
        "Cinco iguales": 0, "Cuatro iguales": 0, "Full House": 0,
        "Escalera": 0, "Tres iguales": 0, "Dos pares": 0,
        "Un par": 0, "Sin combinación": 0
    },
    jugador2: {
        "Cinco iguales": 0, "Cuatro iguales": 0, "Full House": 0,
        "Escalera": 0, "Tres iguales": 0, "Dos pares": 0,
        "Un par": 0, "Sin combinación": 0
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
const elementosDados = document.querySelectorAll(".dado");
const btnEnviar = document.querySelector("#enviarNombres");
const btnComenzar = document.querySelector("#comenzar");
const btnTirar = document.querySelector("#tirar");
const btnReiniciar = document.querySelector("#reiniciar");

let textoTurno = document.querySelector("#turno");
let textoTiradas = document.querySelector("#tiradas");
let textoResultado = document.querySelector("#resultado");
let formularioNombres = document.querySelector("#formularioNombres");
let textoRecord = document.querySelector("#record-dados")

//el botón Enviar se habilita cuando los dos nombres tienen texto
formularioNombres.addEventListener("input", () => {
    let nombre1 = document.querySelector("#nombre1").value.trim(); //OJO .trim
    let nombre2 = document.querySelector("#nombre2").value.trim();
    btnEnviar.disabled = nombre1.length === 0 || nombre2.length === 0;
});

formularioNombres.addEventListener("submit", (evento) => {
    evento.preventDefault();
    jugadores[0] = document.querySelector("#nombre1").value.trim();
    jugadores[1] = document.querySelector("#nombre2").value.trim();
    document.querySelector("#encabezadoJ1").innerText = jugadores[0];
    document.querySelector("#encabezadoJ2").innerText = jugadores[1];
    formularioNombres.hidden = true;
    btnComenzar.disabled = false;
    document.querySelector("#mensajeJuego").innerText = "Nombres guardados. Ya pueden comenzar.";
});

//el mismo botón empieza la partida y después sirve para tirar
btnComenzar.addEventListener("click", () => {
    if (juegoIniciado) {
        tirarDados();
        return;
    }
    juegoIniciado = true;
    btnComenzar.innerText = "Tirar dados";
    btnReiniciar.hidden = false;
    document.querySelector("#mensajeJuego").innerText = "Turno de " + jugadores[0] + ".";
    iniciarTurno();
});

// ==============================
// HACER CLIC EN LOS DADOS
// ==============================

// al hacer click en un dado, se guarda o se vuelve a liberar

elementosDados.forEach((dado, i) => {
    dado.addEventListener("click", () => {
        //no se pueden guardar dados antes de realizar una tirada
        if (!juegoIniciado || tiradas === 0 || tiradas >= 3) {
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


//funcion que tira todos los dados que NO estén guardados
function tirarDados() {
    if (!juegoIniciado) {
        return;
    }
//no deja superar las 3 tiradas y si hace un 4to termina el turno sin combinacion
if (tiradas === 3) {
    textoResultado.innerText = jugadores [jugadorActual - 1] + "terminó el turno sin sumar puntos.";
    pasarTurno();
    return;
}

//recorre los cinco dados
for (let i = 0 ; i < dados.length; i++) {
        if (!dadosGuardados[i]) {
            let posicion = Math.floor(Math.random() * caras.length);
            dados[i] = caras[posicion];
            elementosDados[i].src = "img/dados-poker/dado-" + dados[i] + ".png";
            elementosDados[i].alt = "Dado " + dados[i];
        }
    }
tiradas++;

textoTiradas.innerText = "Tiradas: " + tiradas + " /3";

//después de cada tirada se comprueban las combinaciones
mostrarCombinaciones();

//al llegar a la tercera tirada ya no se pueden tirar más dados
if (tiradas === 3) {
    btnComenzar.innerText = "Pasar sin puntos";
    document.querySelector("#mensajeJuego").innerText = "Elegí una combinación iluminada o pasá sin puntos.";
    }
}

// ==============================
// CONTAR LAS CARAS
// ==============================
//cuenta cuantas veces aparece cada cara en los dados
function contarDados() {
    let cantidades = [0,0,0,0,0,0];

    for (let i=0; i < dados.length; i++) {
        for(let j=0; j< caras.length; j++) {
            if (dados[i] === caras[j]) {
                cantidades[j]++;
            }
        }
    }
    return cantidades;
}
function esEscalera(cantidades) {
    let primera = cantidades[0] === 1 && cantidades[1] === 1 &&
    cantidades[2] === 1 && cantidades[3] === 1 && cantidades[4] === 1;
    let segunda = cantidades[1] === 1 && cantidades[2] === 1 &&
        cantidades[3] === 1 && cantidades[4] === 1 && cantidades[5] === 1;
    return primera || segunda;
}
// ==============================
// DETECTAR COMBINACIONES
// ==============================

//devuelve todas las combinaciones que el jugador puede seleccionar
function detectarCombinaciones() {

    let cantidades = contarDados();
    let combinaciones = [];
    let hayCinco = false;
    let hayCuatro = false;
    let hayTres = false;
    let cantidadPares = 0;

    for (let i = 0; i < cantidades.length; i++) {

        if (cantidades[i] === 5) hayCinco = true;
        if (cantidades[i] === 4) hayCuatro = true;
        if (cantidades[i] === 3) hayTres = true;
        if (cantidades[i] === 2) cantidadPares++;
    }

    if (hayCinco) combinaciones.push("Cinco iguales");
    if (hayCuatro) combinaciones.push("Cuatro iguales");
    if (hayTres && cantidadPares === 1) combinaciones.push("Full House");
    if (hayTres) combinaciones.push("Tres iguales");
    if (cantidadPares === 2) combinaciones.push("Dos pares");
    if (cantidadPares === 1) combinaciones.push("Un par");
    if (esEscalera(cantidades)) combinaciones.push("Escalera");
    if (combinaciones.length === 0) combinaciones.push("Sin combinación");

    return combinaciones;
}
//devuelve el nombre asociado al identificador de la fila
function nombreDeFila(idFila) {
    if (idFila === "cincoIguales") return "Cinco iguales";
    if (idFila === "cuatroIguales") return "Cuatro iguales";
    if (idFila === "fullHouse") return "Full House";
    if (idFila === "escalera") return "Escalera";
    if (idFila === "tresIguales") return "Tres iguales";
    if (idFila === "dosPares") return "Dos pares";
    if (idFila === "unPar") return "Un par";
    return "Sin combinación";
}

function idDeCombinacion(nombre) {
    if (nombre === "Cinco iguales") return "cincoIguales";
    if (nombre === "Cuatro iguales") return "cuatroIguales";
    if (nombre === "Full House") return "fullHouse";
    if (nombre === "Escalera") return "escalera";
    if (nombre === "Tres iguales") return "tresIguales";
    if (nombre === "Dos pares") return "dosPares";
    if (nombre === "Un par") return "unPar";
    return "sinCombinacion";
}
// ==============================
// MOSTRAR COMBINACIONES
// ==============================

//ilumina las filas de la tabla que el jugador puede elegir
function mostrarCombinaciones() {
    limpiarCombinaciones();
    combinacionesDisponibles = detectarCombinaciones();
    for (let i = 0; i < combinacionesDisponibles.length; i++) {
        let idFila = idDeCombinacion(combinacionesDisponibles[i]);
        document.querySelector("#" + idFila).classList.add("disponible");
    }
}

// ==============================
// LIMPIAR ILUMINACIÓN
// ==============================

//saca la clase de las filas que estaban disponibles
function limpiarCombinaciones() {
    let filas = document.querySelectorAll(".combinacion")
    filas.forEach((fila) => 
    fila.classList.remove("disponible"));   
    combinacionesDisponibles = [];
}
// ==============================
// SELECCIONAR UNA COMBINACIÓN
// ==============================

//cada fila revisa si está entre las combinaciones que salieron en los dados
let filasCombinaciones = 
document.querySelectorAll(".combinacion"); //OJO HTML

filasCombinaciones.forEach((fila) => {
    fila.addEventListener("click", () => {
        let nombre = nombreDeFila(fila.id);
        let estaDisponible = false;
        for (let i =0; i<combinacionesDisponibles.length; i++) {
            if (combinacionesDisponibles[i] === nombre) estaDisponible = true
        }
        if (!juegoIniciado || !estaDisponible)
        return;
        seleccionarCombinacion(nombre);
    });
});

// ==============================
// REGISTRAR COMBINACIÓN
// ==============================

//suma 1 a a combinavion del jugador actual
function seleccionarCombinacion(combinacion) {
    let nombreJugador = "jugador" + jugadorActual;
    puntajes[nombreJugador][combinacion]++;
    actualizarTabla();
    textoResultado.innerText = jugadores[jugadorActual - 1] + " consiguió " + combinacion + ".";

    //despues de elegir una combinacion termina el turno
    pasarTurno();
}

// ==============================
// ACTUALIZAR TABLA
// ==============================

//actualiza las cantidades de combinaciones de cada jugador
function actualizarTabla() {
    let idsJugador1 = ["j1-cinco", "j1-cuatro", "j1-full", "j1-escalera", "j1-tres", "j1-dos", "j1-par", "j1-bust"];
    let idsJugador2 = ["j2-cinco", "j2-cuatro", "j2-full", "j2-escalera", "j2-tres", "j2-dos", "j2-par", "j2-bust"];

    for (let i = 0; i < nombresCombinaciones.length; i++) {
        document.querySelector("#" + idsJugador1[i]).innerText = puntajes.jugador1[nombresCombinaciones[i]];
        document.querySelector("#" + idsJugador2[i]).innerText = puntajes.jugador2[nombresCombinaciones[i]];
    }
    document.querySelector("#total-j1").innerText = calcularTotal(1);
    document.querySelector("#total-j2").innerText = calcularTotal(2);
}

// ==============================
// CALCULAR PUNTAJE TOTAL
// ==============================

//multiplica la cantidad de veces que consiguió cada combinación
//por el valor correspondiente de esa combiancion
function calcularTotal(jugador) {
    let datos = puntajes["jugador"+jugador];
    let total = 0;
    for (let i = 0; i < nombresCombinaciones.length; i++) {
        let nombre = nombresCombinaciones[i];
        total = total + datos[nombre] * valoresCombinaciones[nombre];
    }
    return total;
}
function iluminarTurno() {
    let columnasJ1 = document.querySelectorAll(".columnaJ1");
    let columnasJ2 = document.querySelectorAll(".columnaJ2");
    columnasJ1.forEach((columna) => columna.classList.remove("turnoActivo"));
    columnasJ2.forEach((columna) => columna.classList.remove("turnoActivo"));

    if (jugadorActual === 1) {
        columnasJ1.forEach((columna) => columna.classList.add("turnoActivo"));
    } else {
        columnasJ2.forEach((columna) => columna.classList.add("turnoActivo"));
    }
}
// ==============================
// PASAR AL SIGUIENTE TURNO
// ==============================

function pasarTurno() {
    limpiarCombinaciones();
    tiradas = 0;
    dados = ["9", "9", "9", "9", "9"];
    dadosGuardados = [false, false, false, false, false];
    elementosDados.forEach((dado) => {
        dado.src = "img/dados-poker/dado-9.png";
        dado.alt = "Dado 9";
        dado.classList.remove("guardado");
    });
    textoTiradas.innerText = "Tiradas: 0 / 3";
    btnComenzar.innerText = "Tirar dados";
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
    } else {
        iniciarTurno();
    }
}
// ==============================
// INICIAR TURNO
// ==============================

function iniciarTurno() {
    textoTurno.innerText = "Turno de " + jugadores[jugadorActual - 1] + " · Ronda " + ronda + " / 10";
    document.querySelector("#mensajeJuego").innerText = "Tirá los dados para comenzar tu turno.";
    iluminarTurno();
}
// ==============================
// TERMINAR JUEGO
// ==============================

function terminarJuego() {
    juegoIniciado = false;
    btnComenzar.hidden = true;
    btnReiniciar.hidden = true;

    //quita las combinaciones seleccionables
    limpiarCombinaciones();

    let totalJugador1 = calcularTotal(1);
    let totalJugador2 = calcularTotal(2);
    guardarRecord(totalJugador1, totalJugador2);
    let mensaje;

    if (totalJugador1 > totalJugador2) {
        mensaje = "Ganó " + jugadores[0] + " con " + totalJugador1 + " puntos. " + jugadores[1] + " obtuvo " + totalJugador2 + ".";
    } else if (totalJugador2 > totalJugador1) {
        mensaje = "Ganó " + jugadores[1] + " con " + totalJugador2 + " puntos. " + jugadores[0] + " obtuvo " + totalJugador1 + ".";
    } else {
        mensaje = "Empate: " + jugadores[0] + " y " + jugadores[1] + " obtuvieron " + totalJugador1 + " puntos.";
    }
    textoTurno.innerText = "Juego terminado";

    document.querySelector("#resultadoFinal").innerText = mensaje;
    document.querySelector("#cartelFinal").hidden = false;
}
// ==============================
// REINICIAR
// ==============================

function reiniciarPuntajes() {
    for (let i = 0; i < nombresCombinaciones.length; i++) {
        puntajes.jugador1[nombresCombinaciones[i]] = 0;
        puntajes.jugador2[nombresCombinaciones[i]] = 0;
    }
    actualizarTabla();
    jugadorActual = 1;
    ronda = 1;
    tiradas = 0;
    dados = ["9", "9", "9", "9", "9"];
    dadosGuardados = [false, false, false, false, false];
    elementosDados.forEach((dado) => {
        dado.src = "img/dados-poker/dado-9.png";
        dado.alt = "Dado 9";
        dado.classList.remove("guardado");
    });
    btnComenzar.innerText = "Tirar dados";
    textoTiradas.innerText = "Tiradas: 0 / 3";
    textoResultado.innerText = "";
    limpiarCombinaciones();
}

//Reiniciar y Revancha conservan los nombres y empiezan otra partida
btnReiniciar.addEventListener("click", () => {
    reiniciarPuntajes();
    iniciarTurno();
});

document.querySelector("#revancha").addEventListener("click", () => {
    reiniciarPuntajes();
    document.querySelector("#cartelFinal").hidden = true;
    juegoIniciado = true;
    btnComenzar.hidden = false;
    btnComenzar.innerText = "Tirar dados";
    btnReiniciar.hidden = false;
    iniciarTurno();
});

document.querySelector("#salir").addEventListener("click", () => {
    reiniciarPuntajes();
    document.querySelector("#cartelFinal").hidden = true;
    juegoIniciado = false;
    btnComenzar.hidden = false;
    btnComenzar.innerText = "Comenzar a jugar";
    btnReiniciar.hidden = true;
    btnComenzar.hidden = false;
    btnComenzar.disabled = false;
    document.querySelector("#mensajeJuego").innerText = "Nombres guardados. Presionen Comenzar a jugar cuando estén listos.";
    textoTurno.innerText = "Nombres: " + jugadores[0] + " y " + jugadores[1];  
});

//Guardar y mostrar record PROVISORIO
function guardarRecord(totalJugador1, totalJugador2) {
    let nuevoRecord;

    if(totalJugador1>=totalJugador2) {
        nuevoRecord = {
            nombre: jugadores[0],
            puntos: totalJugador1
        };
    } else {
        nuevoRecord = {
            nombre: jugadores[1],
            puntos: totalJugador2
        };
    }

    let recordGuardado =
        localStorage.getItem(
            "recordDados"
        );
    if (recordGuardado !== null) {
        recordGuardado = JSON.parse(recordGuardado);

        if (recordGuardado.puntos > nuevoRecord.puntos) {
            nuevoRecord = recordGuardado;
        }
    }
    localStorage.setItem("recordDados", JSON.stringify(nuevoRecord));
    mostrarRecord();
}
//Mostrar récord guardado
function mostrarRecord() {

    let recordGuardado =
        localStorage.getItem("recordDados");
    if (recordGuardado == null) {
        textoRecord.innerText =
            "Récord: todavía no hay partidas";
    } else {
        recordGuardado =
            JSON.parse(recordGuardado);

        textoRecord.innerText =
            "Récord: "
            + recordGuardado.nombre + " - " + recordGuardado.puntos + "puntos";
    }
}
//estado inicial: se ingresan nombres antes de iniciar el primer turno
btnComenzar.disabled = true;
actualizarTabla();
mostrarRecord();