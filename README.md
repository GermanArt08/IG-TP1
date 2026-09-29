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
-🎲 Dados Póker-
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

Cinco iguales:	Los cinco dados muestran el mismo valor.
Póker:	Cuatro dados muestran el mismo valor.
Full house:	Tres dados muestran un valor y los otros dos muestran otro valor.
Trío:	Tres dados muestran el mismo valor.
Dos pares:	Se obtienen dos pares de valores iguales.
Un par:	Se obtienen dos dados con el mismo valor.

El sistema detecta las combinaciones automáticamente después de cada tirada y las muestra como opciones disponibles para el jugador.

# API utilizada

# Declaración de uso de IA
-Germán-
IA utilizada: ChatGPT versión estándar
Se usó principalmente para elaborar el desarrollo del funcionamiento de los juegos. En cuanto al Dados Póker, se le explicó las reglas del juego y también incorporamos un link a la página para que tuviera más informaciónen, pero en muchas ocaciones mencionaba código no visto en clase, como .index0f, Object.keys, .dataset, .contains, .checked, etc. Recomendaba utilizar tablas en el HTML pero se decidió reemplazarlas por div y se les agregó el diseño en CSS. 
Para crear las imágenes de los dados también se usó IA, pero esta vez una herramienta especializada en la creación de imágenes (Sea.art) ya que se intentó con Grok y ChatGPT pero los resultados no fueron los esperados.