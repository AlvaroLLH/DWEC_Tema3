    "use strict";
    // Álvaro Llamas Huerta

    /*
    Una aplicación práctica de los arrays es representar un tablero bidimensional. En este ejercicio vamos a implementar un tres en raya para dos jugadores. 

    - Dado que aún no hemos visto cómo interactuar con el usuario desde la página web o actualizar elementos del DOM, la entrada se hará usando la función prompt, y la salida mediante alert o console.log

    - Vamos a empezar con dos jugadores humanos en esta práctica. En el index.html puedes hacer un esquema del tablero con coordenadas (vale con 1, 2, 3 ... 9) para que los usuarios puedan saber cómo se llama cada casilla. Al empezar, el tablero está vacío. Cada usuario introduce en su turno la coordenada de la casilla donde colocan la ficha (X o O).

    - Hay que comprobar si la casilla está libre o no, si hay tres en raya, o si el tablero está lleno sin tres en raya (tablas)

    - Piensa en qué habrá que hacer distinto en caso de que queramos programar el segundo jugador, bonus points si tu código permite añadir este código sin grandes cambios ;-) (nota: no hace falta programar el segundo jugador, sólo pensar en cómo modificar nuestro código para que, por ejemplo, lo pueda implementar otra persona)
    */

    // Tablero inicial como array bidimensional
    let tablero = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    
    let jugadorActual = "X"; // Alternamos entre 'X' y 'O'
    
    // Función para imprimir el tablero actual en consola
    function imprimirTablero() {
        console.clear();
        tablero.forEach(fila => console.log(fila.join(" | ")));
        console.log("-----------");
    }
    
    // Función para convertir un número de 1 a 9 en coordenadas [fila, columna]
    function obtenerCoordenadas(pos) {
        const posiciones = {
        1: [0, 0], 2: [0, 1], 3: [0, 2],
        4: [1, 0], 5: [1, 1], 6: [1, 2],
        7: [2, 0], 8: [2, 1], 9: [2, 2]
        };
        return posiciones[pos] || null;
    }
    
    // Verificamos si hay un ganador
    function hayGanador() {

        // Creamos la matriz
        const lineas = [

        // Creamos las filas
        [tablero[0][0], tablero[0][1], tablero[0][2]],
        [tablero[1][0], tablero[1][1], tablero[1][2]],
        [tablero[2][0], tablero[2][1], tablero[2][2]],

        // Creamos las columnas
        [tablero[0][0], tablero[1][0], tablero[2][0]],
        [tablero[0][1], tablero[1][1], tablero[2][1]],
        [tablero[0][2], tablero[1][2], tablero[2][2]],

        // Creamos las diagonales
        [tablero[0][0], tablero[1][1], tablero[2][2]],
        [tablero[0][2], tablero[1][1], tablero[2][0]]

        ];
        
        return lineas.some(linea => linea.every(celda => celda === jugadorActual));
    }
    
    // Verificamos si el tablero está lleno
    function tableroLleno() {
        return tablero.every(fila => fila.every(celda => celda !== ""));
    }
    
    // Creamos la lógica principal del juego
    function jugar() {
        while (true) {
        imprimirTablero();
        
        const posicion = prompt(`Turno de ${jugadorActual}. Introduce una posición (1-9):`);
        const coordenadas = obtenerCoordenadas(parseInt(posicion, 10));
    
        if (!coordenadas) {
            alert("Posición no válida. Inténtalo de nuevo.");
            continue;
        }
    
        const [fila, col] = coordenadas;
        if (tablero[fila][col] !== "") {
            alert("Esa casilla ya está ocupada. Elige otra.");
            continue;
        }
    
        // Colocamos la ficha en el tablero
        tablero[fila][col] = jugadorActual;
    
        // Comprobamos si hay un ganador
        if (hayGanador()) {
            imprimirTablero();
            alert(`¡El jugador ${jugadorActual} ha ganado!`);
            break;
        }
    
        // Comprobamos si el tablero está lleno
        if (tableroLleno()) {
            imprimirTablero();
            alert("¡Es un empate!");
            break;
        }
    
        // Cambiamos de jugador
        jugadorActual = jugadorActual === "X" ? "O" : "X";
        }
    }
    
    // Iniciamos el juego
    jugar();  