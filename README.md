# Roll & Deal

Universidad Nacional de las Artes  
Licenciatura en Artes Multimediales  
Informática General, turno mañana, 2026  
Trabajo Práctico 1 — Cátedra Drelichman

## Integrantes

- Juan Carol Lugones
- Fernando Germán Zariz Lüchter

## Sobre el proyecto

Roll & Deal es un sitio web con temática de casino en el que se puede jugar a Dados Póker, Blackjack y una ruleta de preguntas. La idea fue reunir juegos distintos en un mismo sitio y darles una identidad visual común. No se realizan apuestas ni se utiliza dinero real.

Se comenzó con una breve investigación sobre juegos de dados simples en internet. Encontramos Poker Dice y decidimos adaptarlo. Para el juego de cartas elegimos Blackjack, y para el juego de preguntas propusimos una ruleta que selecciona una categoría.

La estructura inicial de las carpetas y de los HTML fue realizada por Germán, al igual que el juego de dados. Juan agregó contenido a los HTML y desarrolló los juegos de cartas y de preguntas.

## Juegos y reglas

### Dados Póker

Es una adaptación de Poker Dice, también parecida a la Generala. Se juega con cinco dados cuyas caras muestran A, K, Q, J, 10 y 9. Participan dos jugadores y cada uno juega diez rondas.

En cada turno se pueden tirar los dados hasta tres veces. Después de una tirada, el jugador puede hacer clic en uno o varios dados para conservarlos; esos dados mantienen su valor mientras se vuelven a tirar los demás. Luego debe elegir una de las combinaciones iluminadas para registrarla. Elegir una combinación suma una aparición en esa categoría y termina el turno. Si usa las tres tiradas y hace otro clic para pasar, termina el turno sin sumar puntos.

Las combinaciones y sus valores son:

- Cinco iguales: 50 puntos.
- Cuatro iguales: 35 puntos.
- Full House: 30 puntos.
- Escalera: 40 puntos.
- Tres iguales: 15 puntos.
- Dos pares: 10 puntos.
- Un par: 5 puntos.
- Sin combinación: 20 puntos.

El sistema detecta las combinaciones después de cada tirada y las ilumina en la tabla. Al final de las diez rondas de cada jugador, se muestran los puntajes y el resultado. Se puede jugar la revancha con los mismos nombres o cambiar los jugadores.

El juego también guarda el récord de puntaje y el ranking en el almacenamiento local del navegador.

### Blackjack

En Blackjack, el jugador compite contra el crupier y busca acercarse lo más posible a 21 puntos sin pasarse. Antes de jugar, se ingresa el nombre del jugador.

El jugador y el crupier comienzan con dos cartas. Una de las cartas del crupier queda oculta durante el turno del jugador. El jugador puede pedir una carta o plantarse.

Reglas:

- Las cartas del 2 al 10 valen su número.
- J, Q y K valen 10 puntos.
- El As vale 11, pero puede pasar a valer 1 para evitar superar 21.
- Si el jugador supera 21, pierde.
- Cuando el jugador se planta, el crupier pide cartas mientras tenga menos de 17 puntos.
- Si el crupier supera 21, gana el jugador.
- Si ninguno supera 21, gana quien tenga el puntaje más alto. Si empatan, la partida termina en empate.
- Al terminar se puede empezar una nueva partida.

Las cartas se eligen al azar de un mazo de 52 cartas. Cada carta que sale se elimina del mazo para que no vuelva a aparecer en esa partida. Se utilizan imágenes de cartas de dominio público. El juego guarda la racha y el ranking en el almacenamiento local del navegador.

### Ruleta de Trivia

La Ruleta de Trivia es un juego de preguntas de opción múltiple. El jugador ingresa su nombre, gira la ruleta y responde una pregunta de la categoría elegida.

La partida tiene diez rondas. Cada pregunta ofrece cuatro respuestas y hay 15 segundos para responder. Una respuesta correcta suma 100 puntos; las respuestas incorrectas y las preguntas sin responder no suman. Al terminar las diez rondas se muestra el puntaje final y se puede iniciar otra partida.

Las categorías son General, Cine, Música, Videojuegos, Ciencia, Deportes, Geografía e Historia. El récord y el ranking se guardan en el almacenamiento local del navegador.

## Organización de archivos y carpetas

```text
IG TP1/
├── index.html
├── integrantes.html
├── juegocartas.html
├── juegodados.html
├── juegopreguntas.html
├── puntajes.html
├── README.md
├── css/
│   └── estilos.css
├── js/
│   ├── juegocartas.js
│   ├── juegodados.js
│   ├── juegopreguntas.js
│   ├── puntajes.js
│   └── script.js
└── img/
    ├── blackjack/
    │   └── Imágenes de las cartas y del dorso del mazo
    └── dados-poker/
        └── Imágenes de las seis caras de los dados
```

Cada juego tiene su propio HTML y archivo JavaScript. `estilos.css` se comparte entre las páginas. `puntajes.html` y `puntajes.js` muestran los rankings de los juegos. `script.js` está dentro de la carpeta, aunque actualmente no está vinculado desde las páginas HTML.

## Tecnologías utilizadas y principales funcionalidades

El sitio está desarrollado con HTML, CSS y JavaScript. No utiliza un framework. JavaScript se encarga de las reglas, los turnos, los temporizadores, la interacción con los elementos HTML y las consultas a la API.

Entre sus funcionalidades se encuentran:

- Navegación entre las páginas del sitio.
- Tiradas aleatorias y detección de combinaciones en Dados Póker.
- Creación y administración de un mazo de cartas en Blackjack.
- Ruleta animada, preguntas de opción múltiple y temporizador en Trivia.
- Actualización de puntajes y rankings.
- Guardado de récords y rankings con `localStorage`, para que se conserven en el navegador entre visitas.
- Organización visual común mediante una hoja de estilos compartida.

Para probar el sitio, se puede iniciar desde `index.html` usando un servidor local, como Live Server en Visual Studio Code. Esto permite probar la consulta a la API desde el navegador.

## API utilizada

Para las preguntas se utiliza la API pública [Open Trivia Database](https://opentdb.com/api_config.php). La consulta se realiza desde `juegopreguntas.js` con `fetch()` y `async/await`. Para el uso realizado en este proyecto no se requiere una API key.

La ruleta selecciona una categoría y el juego usa su identificador para solicitar una pregunta de opción múltiple. Las categorías y sus identificadores son:

- General: 9
- Cine: 11
- Música: 12
- Videojuegos: 15
- Ciencia: 17
- Deportes: 21
- Geografía: 22
- Historia: 23

La API devuelve los datos en formato JSON. El juego utiliza principalmente `category`, `question`, `correct_answer` e `incorrect_answers`. JavaScript mezcla la respuesta correcta con las tres incorrectas y crea los botones de respuesta. Si la consulta no devuelve una pregunta, el juego muestra un mensaje para indicarlo.

## Principales decisiones técnicas

Se eligió separar los juegos en distintos archivos HTML y JavaScript para que cada uno tuviera su propia estructura y lógica. La hoja CSS compartida mantiene una identidad visual de casino en todo el sitio.

En Dados Póker, las combinaciones se representan con elementos `div` y se iluminan desde JavaScript cuando son posibles. Los puntajes se calculan a partir de la cantidad de veces que cada jugador logra una combinación y del valor asignado a esa categoría.

En Blackjack, el mazo se crea con los cuatro palos y trece valores. Al repartir una carta, esta se elimina del arreglo del mazo para no repetirla durante esa partida.

En Trivia, la API recibe un identificador de categoría, de modo que la pregunta corresponda a lo que salió en la ruleta. Los rankings y récords de cada juego se guardan por separado en `localStorage`.

## Declaración de uso de IA

### Germán

Se utilizaron ChatGPT, OpenAI Codex, SeaArt y GitHub Copilot durante distintas etapas del desarrollo. También se probaron Grok y ChatGPT para crear las imágenes de los dados, pero los resultados no fueron los esperados.

ChatGPT y Codex se usaron para consultar las reglas de Dados Póker, pensar la lógica del juego, explicar partes del JavaScript y buscar errores. Entre los problemas que se consultaron estuvieron el error que producía dado-undefined.png, el congelamiento de la página al tirar los dados y el error al actualizar los puntajes. También se consultó cómo guardar récords en localStorage, mostrar el récord en el HTML y permitir cambiar los nombres de los jugadores al terminar la partida.

Las sugerencias recibidas se revisaron y ajustaron para que el código fuera comprensible para el grupo. Por ejemplo, algunas propuestas utilizaban métodos que no se habían visto en clase, como indexOf, Object.keys, dataset y contains. Se decidió usar alternativas más simples con ciclos y comparaciones directas. También se eligieron elementos div para mostrar las combinaciones, en lugar de la tabla que se había sugerido.

La IA propuso una primera versión del CSS y una paleta de colores. Luego se ajustaron manualmente los estilos para acercarlos a la temática de casino y distribuir la página en columnas. También se decidió usar rem y porcentajes para las medidas, y evitar algunas propiedades que no se querían utilizar, como gap, cursor y las consultas de pantalla. Se consultó cómo mantener las instrucciones a la derecha y cómo ordenar la mesa de Blackjack y las respuestas de Trivia para que los controles quedaran más accesibles.

También se consultó cómo simplificar el cartel final del juego de dados. Se decidió quitar algunos atributos de accesibilidad del HTML del cartel para mantener el marcado más sencillo.

Para crear las imágenes de los dados se utilizó SeaArt. En algunos commits se usó GitHub Copilot para ayudar a redactar sus descripciones.

### Juan

Se utilizó principalmente como asistencia para desarrollar los juegos de BlackJack y Ruleta de Trivia, adjunte las clases dadas para poder realizar consultas sobre los contenidos vistos durante la cursada y detectar errores en el código. Para el BlackJack se utilizó IA para organizar la lógica del juego, y se le pidieron fuentes para el mazo de cartas. Se decidió utilizar un mazo de cartas de dominio público. También se realizaron modificaciones y correcciones al código propuesto después de probar el funcionamiento del juego.

Para el juego de preguntas se utilizó IA para trabajar con la API Open Trivia Database y entender cómo procesar la información recibida. La primera versión hecha obtenía preguntas aleatorias y posteriormente decidí modificar la mecánica para incorporar la ruleta de categorías y reforzar la estética de casino del sitio.

También se utilizó ChatGPT para encontrar errores de tipeo y explicar parte del funcionamiento del código.

Las propuestas fueron revisadas teniendo en cuenta los contenidos vistos en las clases.