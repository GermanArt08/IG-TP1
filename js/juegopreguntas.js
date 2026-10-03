//VARIABLES GENERALES DEL JUEGO
let puntaje = 0;
let ronda = 1;
let tiempo = 15;

let temporizador;
let temporizadorRuleta;

let respuestaCorrecta = "";

let respondida = false;
let puedeGirar = true;
let juegoTerminado = false;

let categoriaElegida;
let nombreJugadorTrivia = "";

//CATEGORÍAS DE LA RULETA
let categorias = [
    { nombre: "General", id: 9 },
    { nombre: "Cine", id: 11 },
    { nombre: "Música", id: 12 },
    { nombre: "Videojuegos", id: 15 },
    { nombre: "Ciencia", id: 17 },
    { nombre: "Deportes", id: 21 },
    { nombre: "Geografía", id: 22 },
    { nombre: "Historia", id: 23 }
];

//ELEMENTOS DEL HTML
const categoria = document.querySelector("#categoria");
const categoriasRuleta = document.querySelector("#categorias-ruleta");
const pregunta =document.querySelector("#pregunta");
const respuestas =document.querySelector("#respuestas");
const tiempoTexto = document.querySelector("#tiempo");
const puntajeTexto = document.querySelector("#puntaje");
const recordTexto = document.querySelector("#record-trivia");
const rondaTexto = document.querySelector("#ronda");
const resultado = document.querySelector("#resultado");
const botonGirar = document.querySelector("#girar");
const botonSiguiente = document.querySelector("#siguiente");
const botonNuevaPartida = document.querySelector("#nueva-partida-trivia");
const formularioTrivia = document.querySelector("#formulario-trivia");
const nombreTriviaTexto = document.querySelector("#nombre-trivia"); 

//EVENTOS PRINCIPALES
botonGirar.addEventListener("click", girarRuleta);
botonSiguiente.addEventListener("click", siguienteRonda);
botonNuevaPartida.addEventListener("click", nuevaPartida);
formularioTrivia.addEventListener("submit", function(evento){
    evento.preventDefault();
    nombreJugadorTrivia = document.querySelector("#nombre-jugador-trivia").value;
    nombreTriviaTexto.innerText = "Jugador: " + nombreJugadorTrivia;
    formularioTrivia.hidden = true;
}
);

//CREACIÓN DE LA RULETA
function crearRuleta() {
    categoriasRuleta.innerHTML = "";
    for (let i = 0; i < categorias.length; i++){
        const casillero = document.createElement("div");
        casillero.innerText = categorias[i].nombre;
        casillero.classList.add("categoria-ruleta");

        categoriasRuleta.append(casillero);
    }
}

//MARCAR LA CATEGORÍA ACTIVA DE LA RULETA
function marcarCategoria(posicion) {
    const casilleros = document.querySelectorAll(".categoria-ruleta");
    for (let i = 0; i < casilleros.length; i++) {
        casilleros[i].classList.remove("seleccionada");
    }
    casilleros[posicion].classList.add("seleccionada");
}

//FUNCIONAMIENTO DE LA RULETA
function girarRuleta() {
if (nombreJugadorTrivia == "") {
    resultado.innerText = "Primero ingresa tu nombre para empezar a jugar.";
    return;
}

if ( 
    puedeGirar == true
    && juegoTerminado == false 
) {
    puedeGirar = false;
    respondida = false;

    resultado.innerText = "Girando ruleta...";
    
    pregunta.innerText = "Esperando categoría...";
    
    respuestas.innerHTML = "";
    
    clearInterval(temporizador);
    
    let posicionAnimacion = 0;
    let cambios = 0;
   
    temporizadorRuleta = 
    setInterval(function () {
        
        marcarCategoria(
            posicionAnimacion
        );
        
        categoria.innerText = "Categoría: " + categorias[posicionAnimacion].nombre;

        posicionAnimacion++;
        
        if (
            posicionAnimacion 
            >= categorias.length
        ) {
            posicionAnimacion = 0;
        }

        cambios++;
        if (cambios >= 24) {
            clearInterval(
                temporizadorRuleta
            );
            
            let posicionCategoria = 
            Math.floor(
                Math.random()
                * categorias.length
            );

        categoriaElegida = 
            categorias[posicionCategoria];
            
            marcarCategoria(
                posicionCategoria
            );
            
            categoria.innerText = 
            "Categoría: " + categoriaElegida.nombre;
            cargarPregunta();

        }
    }, 100);
        
   } else if (juegoTerminado == true) {
    resultado.innerText = "La partida terminó. Inicia una nueva partida";
   } else {
    resultado.innerText = "Ya giraste la ruleta en esta ronda";
   }
}

//CONSULTA A LA API Y CARGA DE LA PREGUNTA
async function cargarPregunta () {
    const url = 
    "https://opentdb.com/api.php?amount=1&category="
    + categoriaElegida.id
    +"&type=multiple";

    const respuesta = await fetch(url);

    const datos = await respuesta.json();

    if (datos.response_code == 0) {
        const datosPregunta = datos.results[0];

        pregunta.innerHTML = datosPregunta.question;

        respuestaCorrecta = datosPregunta.correct_answer;

        mostrarRespuestas(
            datosPregunta
        );
        resultado.innerText = "";
        iniciarTiempo();
    } else {
        resultado.innerText = "No se pudo cargar la pregunta.";
        puedeGirar = true;
    }
}

//CREACION DE LAS OPCIONES DE RESPUESTA
function mostrarRespuestas(datosPregunta) {
    respuestas.innerHTML = "";
    let opciones =
        datosPregunta.incorrect_answers.slice();

    let posicionCorrecta =
        Math.floor(
            Math.random() * 4
        );

    opciones.splice(
        posicionCorrecta,
        0,
        datosPregunta.correct_answer
    );

    for (
        let i = 0;
        i < opciones.length;
        i++
    ) {

        const boton =
            document.createElement("button");

        boton.type = "button";

        boton.innerHTML =
            opciones[i];

        boton.addEventListener(
            "click",
            function () {

                comprobarRespuesta(
                    opciones[i]
                );
            }
        );

        respuestas.append(boton);
    }
}


//COMPROBACIÓN DE LA RESPUESTA Y PUNTAJE

function comprobarRespuesta(
    respuestaElegida
) {

    if (respondida == false) {

        respondida = true;

        clearInterval(
            temporizador
        );

        if (
            respuestaElegida
            == respuestaCorrecta
        ) {

            puntaje += 100;

            resultado.innerText =
                "¡Respuesta correcta!";

        } else {

            resultado.innerHTML =
                "Respuesta incorrecta. "
                + "La respuesta correcta era: "
                + respuestaCorrecta;
        }

        puntajeTexto.innerText =
            "Puntaje: " + puntaje;
    }
}


//TEMPORIZADOR DE CADA PREGUNTA

function iniciarTiempo() {

    clearInterval(
        temporizador
    );

    tiempo = 15;

    tiempoTexto.innerText =
        "Tiempo: " + tiempo;

    temporizador =
        setInterval(function () {

            tiempo--;

            tiempoTexto.innerText =
                "Tiempo: " + tiempo;

            if (tiempo <= 0) {

                clearInterval(
                    temporizador
                );

                respondida = true;

                resultado.innerHTML =
                    "Se terminó el tiempo. "
                    + "La respuesta correcta era: "
                    + respuestaCorrecta;
            }

        }, 1000);
}


//CONTROL DE LAS RONDAS

function siguienteRonda() {

    if (respondida == true) {

        if (ronda < 10) {

            ronda++;

            rondaTexto.innerText =
                "Ronda: "
                + ronda
                + " de 10";

            categoria.innerText =
                "Categoría: todavía no seleccionada";

            pregunta.innerText =
                "Girá la ruleta para continuar.";

            respuestas.innerHTML = "";

            resultado.innerText = "";

            tiempoTexto.innerText =
                "Tiempo: 15";

            respondida = false;

            puedeGirar = true;

        } else {

            finalizarJuego();
        }

    } else {

        resultado.innerText =
            "Primero tenés que responder la pregunta.";
    }
}


//FINALIZACIÓN DEL JUEGO

function finalizarJuego() {

    juegoTerminado = true;

    puedeGirar = false;

    clearInterval(
        temporizador
    );

    respuestas.innerHTML = "";

    pregunta.innerText =
        "¡Juego finalizado!";

    guardarRecord();
    guardarRankingTrivia();

    resultado.innerText =
        "Puntaje final: "
        + puntaje
        + " puntos.";
}


//GUARDAR Y MOSTRAR EL RÉCORD

function guardarRecord() {

    let recordGuardado =
        localStorage.getItem(
            "recordTrivia"
        );

    if (recordGuardado == null) {

        localStorage.setItem(
            "recordTrivia",
            JSON.stringify(puntaje)
        );

        recordGuardado = puntaje;

    } else {

        recordGuardado =
            JSON.parse(
                recordGuardado
            );

        if (
            puntaje > recordGuardado
        ) {

            localStorage.setItem(
                "recordTrivia",
                JSON.stringify(puntaje)
            );

            recordGuardado = puntaje;
        }
    }

    recordTexto.innerText =
        "Récord: "
        + recordGuardado;
}

//GUARDAR PUNTAJE EN LA TABLA DE POSICIONES
function guardarRankingTrivia() {
    if (nombreJugadorTrivia == "") {
        return;
    }
    let rankingGuardado = localStorage.getItem("rankingTrivia");
    let ranking = [];
    if (rankingGuardado != null) {
        ranking = JSON.parse(rankingGuardado);
    }
    let jugadorEncontrado = false;
    for (
        let i = 0; i < ranking.length; i++
    ) {
        if (
            ranking [i].nombre == nombreJugadorTrivia
        ) {
            jugadorEncontrado = true;
            if (
                puntaje > ranking[i].puntaje
            ) {
                ranking[i].puntaje = puntaje;
            }
        }
    }

    if (jugadorEncontrado == false) {
        let nuevoPuntaje = {
            nombre: nombreJugadorTrivia,
            puntaje: puntaje
        };
        ranking.push(nuevoPuntaje);
    }
    for (
        let i = 0; i < ranking.length; i++
    ) {
        for (
            let j = i + 1; j < ranking.length; j++
        ) {
            if (
                ranking[j].puntaje > ranking[i].puntaje
            ) {
                let auxiliar = ranking[i];
                ranking[i] = ranking[j];
                ranking[j] = auxiliar;
            }
        }
    }

    if (ranking.length > 10) {
        ranking.splice(10, ranking.length - 10);
    }
    localStorage.setItem("rankingTrivia", JSON.stringify(ranking)
  );
}


//MOSTRAR EL RÉCORD GUARDADO

function mostrarRecord() {

    let recordGuardado =
        localStorage.getItem(
            "recordTrivia"
        );

    if (recordGuardado == null) {

        recordTexto.innerText =
            "Récord: 0";

    } else {

        recordGuardado =
            JSON.parse(
                recordGuardado
            );

        recordTexto.innerText =
            "Récord: "
            + recordGuardado;
    }
}


//NUEVA PARTIDA
function nuevaPartida() {

    clearInterval(
        temporizador
    );

    clearInterval(
        temporizadorRuleta
    );

    puntaje = 0;
    ronda = 1;
    tiempo = 15;

    respuestaCorrecta = "";

    respondida = false;
    puedeGirar = true;
    juegoTerminado = false;

    puntajeTexto.innerText =
        "Puntaje: 0";

    rondaTexto.innerText =
        "Ronda: 1 de 10";

    tiempoTexto.innerText =
        "Tiempo: 15";

    categoria.innerText =
        "Categoría: todavía no seleccionada";

    pregunta.innerText =
        "Girá la ruleta para comenzar.";

    respuestas.innerHTML = "";

    resultado.innerText = "";

    const casilleros =
        document.querySelectorAll(
            ".categoria-ruleta"
        );

    for (
        let i = 0;
        i < casilleros.length;
        i++
    ) {

        casilleros[i].classList.remove(
            "seleccionada"
        );
    }
}

//COMIENZO DEL JUEGO
crearRuleta();
mostrarRecord();
nuevaPartida();