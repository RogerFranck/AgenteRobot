const { MapaUno , MapaDos, MapaTres} = require("./mapas.js")

const mapa = MapaUno
//* 1 == Robot
//* 2 == Muro
//* 3 == Meta
//* 4 == Camino recorrido
//* 5 == Camino de no retorno

//* Funcion para encontrar un numero random - usado para elejir camino de forma aleatoria
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const robot = () => {
  //* Establecemos la memoria del robot
  let x = 0;
  let y = 0;
  let mapaMemoria = [
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];
  let z = false;
  let ProximoMovimiento = "Abajo";
  let NumIteraciones = 0

  //* Hasta que no encuentra la meta no deja de buscar
  while (z == false) {
    NumIteraciones++
    //* posicion actual del robot
    let posicion = [x, y];
    let robotX = posicion[0];
    let robotY = posicion[1];

    //* Vision del mapa real
    let VisionAbajo = robotY != 5 ? mapa[robotY + 1][robotX] : "OUT";
    let VisionArriba = robotY != 0 ? mapa[robotY - 1][robotX] : "OUT";
    let VisionIzquirda = robotX != 0 ? mapa[robotY][robotX - 1] : "OUT";
    let VisionDerecha = robotX != 5 ? mapa[robotY][robotX + 1] : "OUT";

    //* Vision del mapa en memoria (para ver caminos recorridos y caminos de no retorno)
    let VisionAbajoMemoria = robotY != 5 ? mapaMemoria[robotY + 1][robotX] : "OUT";
    let VisionArribaMemoria = robotY != 0 ? mapaMemoria[robotY - 1][robotX] : "OUT";
    let VisionIzquirdaMemoria = robotX != 0 ? mapaMemoria[robotY][robotX - 1] : "OUT";
    let VisionDerechaMemoria = robotX != 5 ? mapaMemoria[robotY][robotX + 1] : "OUT";

    //* Agrega muros y meta al mapa de memoria
    if (VisionDerecha == 2 || VisionDerecha == 3) {
      mapaMemoria[robotY][robotX + 1] = VisionDerecha;
    }
    if (VisionIzquirda == 2 || VisionIzquirda == 3) {
      mapaMemoria[robotY][robotX - 1] = VisionIzquirda;
    }
    if (VisionArriba == 2 || VisionArriba == 3) {
      mapaMemoria[robotY - 1][robotX] = VisionArriba;
    }
    if (VisionAbajo == 2 || VisionAbajo == 3) {
      mapaMemoria[robotY + 1][robotX] = VisionAbajo;
    }

    console.log(`-- Iteración: ${NumIteraciones} --`);
    console.log(mapaMemoria);
    console.log("-----------------------------");

    let caminos = [];
    //* Asigna los posibles caminos a seguir (en el  mapa real debe estar camino disponble y en el mapa real no debe haber bloqueo)
    if (VisionAbajo == 0 && VisionAbajoMemoria != 5) {
      caminos.push("Abajo");
    }
    if (VisionArriba == 0 && VisionArribaMemoria != 5) {
      caminos.push("Arriba");
    }
    if (VisionIzquirda == 0 && VisionIzquirdaMemoria != 5) {
      caminos.push("Izquieda");
    }
    if (VisionDerecha == 0 && VisionDerechaMemoria != 5) {
      caminos.push("Derecha");
    }
    //* Si encuentra la meta ve ahi y termina el juego
    if (VisionAbajo == 3) {
      console.log("Lo encontre")
      posicion = [x, (y = y + 1)];
      z = true
    }
    if (VisionArriba == 3) {
      console.log("Lo encontre")
      posicion = [x, (y = y - 1)];
      z = true
    }
    if (VisionIzquirda == 3) {
      console.log("Lo encontre")
      posicion = [(x = x - 1), y];
      z = true
    }
    if (VisionDerecha == 3) {
      console.log("Lo encontre")
      posicion = [(x = x + 1), y];
      z = true
    }

    //* si solo se puede avanzar a un lugar entonces bloquea el camino para no regresar
    let tipoCamino = caminos.length == 1 ? 5 : 4
    mapaMemoria[posicion[1]][posicion[0]] = tipoCamino;

    if (z == false) {
      //* de los caminos disponibles selecciona al azar uno
      let eleccion = caminos[getRandomInt(caminos.length)];
      //* sigue el camino hasta tocar con muro o bloqueo, de existir uno de estos, toma un camino al azar
      if (caminos.includes(ProximoMovimiento)) {
        eleccion = ProximoMovimiento
      }

      //* Decide el camino a seguir y pone la tendencia para las siguientes iteraciones
      if (eleccion == "Abajo") {
        posicion = [x, (y = y + 1)];
        ProximoMovimiento = 'Abajo'
      }
      if (eleccion == "Arriba") {
        posicion = [x, (y = y - 1)];
        ProximoMovimiento = 'Arriba'
      }
      if (eleccion == "Izquieda") {
        posicion = [(x = x - 1), y];
        ProximoMovimiento = 'Izquieda'
      }
      if (eleccion == "Derecha") {
        posicion = [(x = x + 1), y];
        ProximoMovimiento = 'Derecha'
      }

    }

    //* Marca la nueva posiciond el robot
    mapaMemoria[posicion[1]][posicion[0]] = 1;

    //* FIN DE LOOP
  }
};

robot();