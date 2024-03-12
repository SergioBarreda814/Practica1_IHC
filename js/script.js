const object = document.getElementById('object');
const objectCell = document.getElementById('object-cell');
let objectPosition = { x: 0, y: 0 }; // Posición inicial del objeto en la cuadrícula 3x3

document.addEventListener('keydown', function(event) {
  const key = event.key;

  switch(key) {
    case 'ArrowUp':
      moveObject('arriba');
      break;
    case 'ArrowDown':
      moveObject('abajo');
      break;
    case 'ArrowLeft':
      moveObject('izquierda');
      break;
    case 'ArrowRight':
      moveObject('derecha');
      break;
  }
});

function moveObject(direction) {
  const gridSize = 3; // Tamaño de la cuadrícula
  const cellSize = 100; // Tamaño de cada celda

  switch(direction) {
    case 'arriba':
    //objectPosition.y <= 2 && objectPosition.y >= 1
      if (objectPosition.y==0 || objectPosition.y == 1) {
        objectPosition.y--;
      }
      break;
    case 'abajo':
      //objectPosition.y < gridSize - 1
      if (objectPosition.y==0 || objectPosition.y == -1) {
        objectPosition.y++;
      }
      break;
    case 'izquierda':
      //objectPosition.x > 0
      if (objectPosition.x == 0 || objectPosition.x == 1 ) {
        objectPosition.x--;
      }
      break;
    case 'derecha':
     //   objectPosition.x < gridSize - 1
      if (objectPosition.x == 0 || objectPosition.x == -1 ) {
        objectPosition.x++;
      }
      break;
      
  }

  object.style.top = objectPosition.y * cellSize + 'px';
  object.style.left = objectPosition.x * cellSize + 'px';
  console.log("Posicion actual");
  console.log("X: " + objectPosition.x);
  console.log("Y: " + objectPosition.y);
}


// Reconocimiento de voz

if ('webkitSpeechRecognition' in window) {
  var recognition = new webkitSpeechRecognition();
  
  // Configuración del reconocimiento de voz
  recognition.continuous = true;
  recognition.interimResults = false; // Cambiado a false para evitar resultados interinos
  recognition.lang = 'es-ES';
  
  // Evento que se dispara cuando se detecta voz
  recognition.onresult = function(event) {
    var lastResultIndex = event.results.length - 1;
    var transcript = event.results[lastResultIndex][0].transcript.trim().toLowerCase();
    console.log('Texto reconocido:', transcript);
    
    // Filtrar palabras específicas
    if (transcript === "arriba" || transcript === "abajo" || transcript === "izquierda" || transcript === "derecha") {
      moveObject(transcript);
    } else {
      console.log('Palabra no reconocida:', transcript);
    }
  };
  
  // Evento para manejar errores
  recognition.onerror = function(event) {
    console.error('Se produjo un error en el reconocimiento de voz:', event.error);
  };
  
  // Comenzar el reconocimiento de voz
  recognition.start();
} else {
  console.error('Tu navegador no soporta la API de reconocimiento de voz.');
}
