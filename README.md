# Roll & Deal
Universidad Nacional de las Artes
Lic. Artes Multimediales
Informática General TM 2026 Cátedra Drelichman

# Integrantes:
Juan Carol Lugones
Fernando Germán Zariz Lüchter

Roll & Deal es un sitio web que simula una casa de apuestas donde los visitantes pueden jugar a los Dados Póker, BlackJack o un juego de preguntas de cultura general.

# Proceso
Se comenzó este proyecto con una breve investigación buscando juegos de dados simples en internet. Nos topamos con uno llamado Poker Dice ("Dados Póker"en inglés) y quisimos replicarlo. Para el juego de cartas escojimos el BlackJack pensando en una temática de casino. Siguiendo esa temática, se decidió que el juego de preguntas sea una ruleta que elije una categoría para responder.
La estructura base de carpetas y los HTML fue realizada por Germán al igual que el juego de dados. Juan agregó más contenido a los HTML y se encargó del juego de preguntas y cartas

# Juegos y reglas
-🎲Dados Póker-
Este proyecto es una adaptación del clásico juego de Póker con dados (aunque también muy similar a la Generala). El objetivo es obtener diferentes combinaciones utilizando cinco dados, cuyas caras contienen las letras y números A, K, Q, J, 10 y 9.

El juego está diseñado para dos jugadores, que se turnan para realizar sus tiradas. En cada ronda, el jugador tira los cinco dados y el sistema analiza automáticamente los resultados para determinar qué combinaciones consiguió.

-Reglas del juego-
-Participan dos jugadores.
-Se utilizan cinco dados.
-Los jugadores se turnan para realizar las tiradas.
-En cada turno, los cinco dados se lanzan y el sistema detecta automáticamente las combinaciones obtenidas.
-Cuando se obtiene una combinación, esta se habilita para que el jugador pueda seleccionarla.
-Al seleccionar una combinación, el jugador obtiene 1 punto en esa categoría. También tiene la opción de bloquear los dados a los que les haga click para que cuando vuelva a tirar, estos se conserven.
-Una vez seleccionada una combinación, el turno termina y pasa al siguiente jugador.
-Cada jugador dispone de 10 rondas.
-Una combinación seleccionada queda registrada y puede volver a aparecer en rondas posteriores, sumando otro punto a esa categoría.
-Al finalizar las 10 rondas, se muestran los resultados y el puntaje acumulado de cada jugador.
-Finalmente, los jugadores pueden elegir comenzar una nueva partida.

-Combinaciones-
Las combinaciones que puede reconocer el juego son:

Cinco iguales
Cuatro iguales
Full house:	Tres dados muestran un valor y los otros dos muestran otro valor.
Tres iguales
Dos pares
Un par

El sistema detecta las combinaciones automáticamente después de cada tirada y las muestra como opciones disponibles para el jugador.

-🃏BlackJack-

El BlackJack es un juego de cartas en el que el jugador compite contra el crupier. El objetivo es conseguir un puntaje lo más cercano posible a 21 sin superarlo.

Al comenzar la partida, el jugador y el crupier reciben dos cartas. Una de las cartas del crupier permanece oculta durante el turno del jugador. El jugador puede decidir pedir nuevas cartas o plantarse con el puntaje que tenga.

-Reglas del juego-
-El jugador y el crupier comienzan con dos cartas.
-Las cartas del 2 al 10 valen su número correspondiente.
-Las cartas J, Q y K valen 10 puntos.
-El As vale 11 puntos, pero puede pasar a valer 1 si de esa manera se evita superar los 21 puntos.
-Una de las cartas del crupier permanece oculta mientras juega el usuario.
-El jugador puede elegir entre pedir una nueva carta o plantarse.
-Si el jugador supera los 21 puntos pierde automáticamente la partida.
-Cuando el jugador se planta, el crupier pide cartas automáticamente mientras tenga menos de 17 puntos.
-Si el crupier supera los 21 puntos gana el jugador.
-Si ninguno supera los 21 puntos, gana quien tenga el puntaje más alto.
-Si ambos tienen el mismo puntaje se produce un empate.
-Al finalizar se puede comenzar una nueva partida.

Las cartas se seleccionan aleatoriamente de un mazo de 52 cartas. Cuando una carta es utilizada se elimina del mazo de esa partida para evitar que vuelva a aparecer. Para representar las cartas se utilizan imágenes de un mazo de dominio público.

-🎡Ruleta de Trivia-

La Ruleta de Trivia es un juego de preguntas de opción múltiple basado en una estética de casino. El jugador debe girar una ruleta que selecciona aleatoriamente una categoría y luego responder una pregunta obtenida mediante una API pública.

-Reglas del juego-
-El juego está compuesto por 10 rondas.
-Al comenzar cada ronda el jugador debe girar la ruleta.
-La ruleta selecciona aleatoriamente una categoría.
-La pregunta que aparece corresponde a la categoría seleccionada.
-Cada pregunta tiene cuatro respuestas posibles y solamente una es correcta.
-El jugador dispone de 15 segundos para responder.
-Cada respuesta correcta suma 100 puntos.
-Las respuestas incorrectas o las preguntas que se quedan sin tiempo no suman puntos.
-Después de responder se puede avanzar a la siguiente ronda y volver a girar la ruleta.
-Al finalizar las 10 rondas se muestra el puntaje final.
-El mejor puntaje obtenido queda guardado como récord mediante localStorage.
-El jugador puede comenzar una nueva partida reiniciando el puntaje y las rondas.

Las categorías utilizadas son General, Cine, Música, Videojuegos, Ciencia, Deportes, Geografía e Historia.

# API utilizada
Para el juego Ruleta de Trivia se utiliza la API pública Open Trivia Database (OpenTDB).
La API se utiliza para obtener las preguntas y las opciones de respuesta del juego. La consulta se realiza desde JavaScript utilizando fetch() y async/await.

Primero la ruleta selecciona una categoría. Cada categoría tiene asociado un identificador utilizado por Open Trivia Database. Luego se construye una consulta solicitando una pregunta de opción múltiple correspondiente a esa categoría.

La respuesta de la API llega en formato JSON. De los datos recibidos se utilizan principalmente:

-category: categoría de la pregunta.
-question: texto de la pregunta.
-correct_answer: respuesta correcta.
-incorrect_answers: array con las tres respuestas incorrectas.

JavaScript procesa estos datos, agrega la respuesta correcta al conjunto de respuestas incorrectas en una posición aleatoria y crea dinámicamente los cuatro botones que puede elegir el jugador.

Open Trivia Database es una API pública y para las consultas utilizadas en este proyecto no requiere una API key.

# Declaración de uso de IA
-Germán-
IA utilizada: ChatGPT versión estándar y luego CODEX
Se usó principalmente para elaborar el desarrollo del funcionamiento de los juegos. En cuanto al Dados Póker, se le explicó las reglas del juego y también incorporamos un link a la página para que tuviera más informaciónen, pero en muchas ocaciones mencionaba código no visto en clase, como .index0f, Object.keys, .dataset, .contains, .checked, etc. Recomendaba utilizar tablas en el HTML pero se decidió reemplazarlas por div y se les agregó el diseño en CSS. 
Para crear las imágenes de los dados también se usó IA, pero esta vez una herramienta especializada en la creación de imágenes (Sea.art) ya que se intentó con Grok y ChatGPT pero los resultados no fueron los esperados.
Se usó principalmente para elaborar el desarrollo del funcionamiento de los juegos. En cuanto al Dados Póker, se le explicó las reglas del juego y también incorporamos un link a la página para que tuviera más informaciónen, pero en muchas ocaciones mencionaba código no visto en clase, como .index0f, Object.keys, .dataset, .contains, .checked, etc. Recomendaba utilizar tablas en el HTML pero se decidió reemplazarlas por div y se les agregó el diseño en CSS. Este último tuvo una primera versión hecha con IA (la paleta de colores fue generada por ella) y luego se la fue modificando a mano, reemplazando los valores en px por rem y se la distribuyó en 3 columnas.
Luego de intentar optimizar el js (eliminando espacios innecesarios y mejores funciones) surgió el problema que al presionar para tirar los dados, la página se congelaba y no reaccionaba de ninguna manera, en la consola tampoco figuraba algún error. Después de un largo tiempo tratando de dar con la solución, se recurrió a ChatGPT CODEX adjuntándole los archivos necesarios (HTML y JS).
Para crear las imágenes de los dados también se usó IA, pero esta vez una herramienta especializada en la creación de imágenes (Sea.art) ya que se intentó con Grok y ChatGPT pero los resultados no fueron los esperados.
En algunos commits se usó la IA de GitHub (Copilot) para describirlos.

-Juan-
IA utilizada: ChatGPT plan básico

Se utilizó principalmente como asistencia para desarrollar los juegos de BlackJack y Ruleta de Trivia, adjunte las clases dadas para poder realizar consultas sobre los contenidos vistos durante la cursada y detectar errores en el código.
Para el BlackJack se utilizó IA para organizar la lógica del juego, y se le pidieron fuentes para el mazo de cartas. Se decidió utilizar un mazo de cartas de dominio público. También se realizaron modificaciones y correcciones al código propuesto después de probar el funcionamiento del juego.

Para el juego de preguntas se utilizó IA para trabajar con la API Open Trivia Database y entender cómo procesar la información recibida. La primera versión hecha obtenía preguntas aleatorias y posteriormente decidí modificar la mecánica para incorporar la ruleta de categorías y reforzar la estética de casino del sitio.

También se utilizó ChatGPT para encontrar errores de tipeo y explicar parte del funcionamiento del código.

Las propuestas fueron revisadas teniendo en cuenta los contenidos vistos en las clases.