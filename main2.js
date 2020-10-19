//Duración de tiempo de trabajo y descanso
var minutosDescansoSimple = 5;
var minutosDescansoLargo = 10;
var minutosTrabajo = 20;
var pomodorosParaDescansoLargo = 3;

//Varibles que guardan el tiempo
var segundosRestantes = 0;
var minutosRestantes = minutosTrabajo;
var pomodorosRestantes = pomodorosParaDescansoLargo;
var tiempoPermanenciaMensaje = 10000;

/**
 * Altera el factor de velocidad de ejecución del reloj
 * 1 = es la velocidad normal
 * 0.5 = es mas lento
 * 2 = es el doble de velocidad
 * 50 = es rapido como se venia trabajando para pruebas.
 */
var velocidad = 50;

//Guarda el estado del reloj
var estaCorriendo = false;
var estaTrabajando = true;
var primeraEjecucion = true;

//Variables que guardar el sonido
var sonidoClick = new Audio("./aud/click.mp3");
var sonidoCampana = new Audio("./aud/bell.mp3");
var sonidoSalida = new Audio("./aud/buzzer.mp3");

//Variable que usa setTimeout para identificar que proceso repetitivo
var setTimeoutVariable;

//Pinta el tiempo restante actual en la UI
function actualizarUI() {
  //Esta condicion corrige el problema de mostrar un solo dígito (ej: 09 por 9)
  if (segundosRestantes < 10) {
    document.getElementById("segundos").innerHTML = "0" + segundosRestantes;
  } else {
    document.getElementById("segundos").innerHTML = segundosRestantes;
  }

  if (minutosRestantes < 10) {
    document.getElementById("minutos").innerHTML = "0" + minutosRestantes;
  } else {
    document.getElementById("minutos").innerHTML = minutosRestantes;
  }
}

//Iniciar o pausar el reloj pomodoro
function accionarBoton() {
  //Se cambia el estado del botón
  actualizarBoton();
  //Suena el click
  sonidoClick.play();

  //Muestra el mensaje pertinente solo en la primera ejecución
  if (primeraEjecucion) {
    actualizarMensaje();
    primeraEjecucion = false;
  }

  //Continua o interrupe el reloj
  if (estaCorriendo) {
    //Detiene la ejecución repetitiva de decrementarTiempo()
    window.clearInterval(setTimeoutVariable);
    estaCorriendo = false;
  } else {
    /**
     * Ejecuta de manera repetitiva decrementarTiempo() según la velocidad del reloj
     * La velocidad es inversamente proporcional al tiempo de ejecución
     */
    setTimeoutVariable = window.setInterval(
      decrementarTiempo,
      1000 / velocidad
    );
    estaCorriendo = true;
  }
}

/**
 * Declaración de funciones auxiliares de accionarBoton()
 *  */

//Cambia el ícono del botón segun su estado cuando es presionado
function actualizarBoton() {
  if (!estaCorriendo) {
    document.getElementById("play-btn-icon").className = "fas fa-pause fa-2x";
    document.getElementById("play-btn-icon").style = "color: white;";
  } else {
    document.getElementById("play-btn-icon").className = "fas fa-play fa-2x";
    document.getElementById("play-btn-icon").style = null;
  }
}

/**
 * Para entender la función decrementarTiempo()se recomienda hacer una
 * prueba de escritorio llevando las variables de estado  y
 * los contadores de tiempo
 * * */

//Decrementa y restaura las unidades de tiempo y los contadores
function decrementarTiempo() {
  //Primero se verifican los segundos restantes
  if (segundosRestantes === 0) {
    //segundos ha llegado a cero entonces

    if (minutosRestantes === 0) {
      //segundos y minutos ha llegado a cero entonces

      //-------[Se modifican los contadores]-------
      //Se decrementan los pomodos restantes solo al final del descanso
      if (!estaTrabajando) {
        pomodorosRestantes -= 1;
      }
      //se reinicia el contador con los tiempos de descanso
      restablecerTiempo();
      //Se restablece el conteo de los pomodoros restantes
      if (pomodorosRestantes === 0 && !estaTrabajando) {
        pomodorosRestantes = pomodorosParaDescansoLargo;
      }

      //-------[Se actualizarn los estados]-------
      //se invierte el estado actual
      estaTrabajando = !estaTrabajando;

      //-------[Se accionan los eventos de la UI]-------
      //1. Suena el sonido pertinente
      reproducirSonido();
      //Se muestra el mensaje pertinente
      actualizarMensaje();
    } else {
      //se descuenta un minuto
      minutosRestantes -= 1;
      segundosRestantes = 59;
    }
  } else {
    //segundos NO ha llego a cero entonces
    segundosRestantes -= 1;
  }

  //Al finar es necesario reflejar los cambios de tiempo en la UI
  actualizarUI();
}

//Reproduce un sonido según el estado del reloj
function reproducirSonido() {
  if (estaTrabajando) {
    //Suena la campana como cuando salias al recreo en el colegio
    sonidoSalida.play();
  } else {
    sonidoCampana.play();
  }
}

//Reinicia el contador dependiendo del estado en que finalizó y los pomodoros restantes
function restablecerTiempo() {
  if (estaTrabajando) {
    if (pomodorosRestantes === 1) {
      //Se inicia el descanso largo
      minutosRestantes = minutosDescansoLargo;
    } else {
      //Se inicia el descanso normal
      minutosRestantes = minutosDescansoSimple;
    }
  } else {
    //Aquí restablece el tiempo de trabajo
    minutosRestantes = minutosTrabajo;
  }
}

//Muestra un mensaje al terminar un estado del reloj
function actualizarMensaje() {
  if (!estaTrabajando) {
    document.getElementById("done").innerHTML =
      "¡Tienes " + minutosRestantes + " minuto(s) para descansar! ";
    limpiarMensaje();
  } else {
    document.getElementById("done").innerHTML = "Ahora concentrate en trabajar";
    limpiarMensaje();
  }
}

//Limpia el mensaje instructivo de la UI
function limpiarMensaje() {
  window.setTimeout(function () {
    document.getElementById("done").innerHTML = "";
  }, tiempoPermanenciaMensaje);
}
