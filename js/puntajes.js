//MOSTRAR UNA TABLA DE POSICIONES
function mostrarRanking(
    clave,
    selector,
    tipoPuntaje
) {
    let rankingGuardado = localStorage.getItem(clave);
    const contenedor = document.querySelector(selector);

    contenedor.innerHTML = "";

    if (rankingGuardado == null) {
        const mensaje = document.createElement("p");
        mensaje.innerText = "Todavía no hay puntajes guardados.";

        contenedor.append(mensaje);
    } else {
        let ranking = JSON.parse(rankingGuardado);
        for (
            let i = 0; i < ranking.length; i++
        ) {
            const posicion = document.createElement("p");
            posicion.innerText = (i + 1) + ". " + ranking[i].nombre + " - " + ranking[i].puntaje + " " + tipoPuntaje;

            contenedor.append(
                posicion
            );
        }
    }
}

//MOSTRAR RANKING DE BLACKJACK
mostrarRanking(
    "rankingBlackjack",
    "#ranking-blackjack",
    "Victorias consecutivas"
);

//MOSTRAR RANKING DE DADOS POKER
mostrarRanking(
    "rankingDados",
    "#ranking-dados",
    "Puntos"
);

//MOSTRAR RANKING DE TRIVIA
mostrarRanking(
    "rankingTrivia",
    "#ranking-trivia",
    "Puntos"
);