//variables generales del juego
let puntaje = 0;
let ronda = 1;
let tiempo = 15;
let temporizador;
let respuestaCorrecta = "";
let respondida = false;

//elementos del html
const categoría = document.querySelector("#categoría");
const pregunta = document.querySelector("#pregunta");
const respuestas = document.querySelector("#respuestas");
const tiempoTexto = document.querySelector("#tiempo");
const puntajeTexto = document.querySelector("#puntaje");
const rondaTexto = document.querySelector("#ronda");
const resultado = document.querySelector("#resultado");

const botonGirar = document.querySelector("#girar")
const botonSiguiente = document.querySelector("#siguiente");

//eventos principales
botonGirar.addEventListener("click, girarRuleta");
botonSiguiente.addEventListener("click, siguienteRonda");

//consulta a la API y la carga de la pregunta
async function girarRuleta() {
    respondida = false;
    resultado.innerText = "";

    const url = "https://opentdb.com/api.php?amount=1&type=multiple";
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.response_code == 0) {
        const datosPregunta = datos.results[0];

        categoria.innerText = "Categoría: " + datosPregunta.category;
        pregunta.innerHTML = datosPregunta.question;
        respuestaCorrecta = datosPregunta.correct_answer;
        mostrarRespuestas(datosPregunta);
        iniciarTiempo();
    } else {
        resultado.innerText = "No se pudo cargar la pregunta.";
    }
    
}

//creación de las opciones de respuesta
function mostrarRespuestas(datosPregunta) {
    respuestas.innerHTML = "";
    let opciones = datosPregunta.incorrect_answers;
    let posicionesCorrecta = Math.floor(Math.random() * 4);
    opciones.splice(
        posicionCorrecta,
        0,
        datosPregunta.correct_answer
    );

    for (let i = 0; i < opciones.length; i++) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.innerHTML = opciones[i];
        boton.addEventListener("click", function () {
            comprobarRespuesta(opciones[i]);
        });
        
        respuestas.append(boton);
    }
}

//comprobación de la respuesta y puntaje
function comprobarRespuesta(respuestaElegida) {
    if (respondida == false) {
        respondida = true;
        clearInterval(temporizador);
        if (respuestaElegida == respuestaCorrecta) {
            puntaje += 100;
            resultado.innerText = "¡Respuesta correcta!";
        } else {
            resultado.innerHTML = 
                "Respuesta incorrecta. La respuesta correcta era: " 
                + respuestaCorrecta;
        }
        puntajeTexto.innerText = "Puntaje: " + puntaje;       
    }
}

//temporizador de cada pregunta
function iniciarTiempo(){
    clearInterval(temporizador);
    tiempo = 15;
    tiempoTexto.innerText = "Tiempo: " + tiempo;
    temporizador = setInterval(function () {
        tiempo--;
        tiempoTexto.innertext = "Tiempo: " + tiempo;
        if (tiempo <= 0) {
            clearInterval(temporizador);
            respondida = true;
            resultado.innerText = "Se terminó el tiempo.";
        }
    }, 1000);
}

//control de las rondas y finalización del juego
function siguienteRonda() {
    if (respondida == true) {
        if (ronda < 10) {
            ronda ++;
            rondaTexto.innerText = "Ronda: " + ronda + "de 10";
            categoría.innerText = "Categoría aún no seleccionada";
            pregunta.innerText = "Gira la ruleta para continuar.";
            respuestas.innerHTML = "";
            resultado.innerText = "";
        } else {
            respuestas.innerHTML = "";
            pregunta.innerText = "¡Juego finalizado!";
            resultado.innerText = "Puntaje final: " + puntaje + "puntos."
        }
    } else {
        resultado.innerText = "Primero debes de responder la pregunta.";
    }
}