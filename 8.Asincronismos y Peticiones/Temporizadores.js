// ─── 1. setTimeout ────────────────────────────────────────────────────────────
// Se ejecuta UNA sola vez después de 3 segundos

// setTimeout(() => {
//   console.log("¡Hola después de 3 segundos!");
// }, 3000);


// ─── 2. setInterval ───────────────────────────────────────────────────────────
// Se ejecuta CADA 2 segundos e imprime la hora actual

// const intervalo = setInterval(() => {
//   const ahora = new Date();
//   const hora = ahora.toLocaleTimeString("es-AR"); // ej: 14:32:05
//   console.log(`Hora actual: ${hora}`);
// }, 2000);


// ─── 3. Cancelar el intervalo después de 10 segundos ─────────────────────────
// clearInterval detiene el setInterval usando el id que devolvió

// setTimeout(() => {
//   clearInterval(intervalo);
//   console.log("Intervalo cancelado a los 10 segundos. ¡Chau!");
// }, 10000);


// ─── ¿Qué va a pasar en consola? ─────────────────────────────────────────────

// 0s  → el script arranca (nada visible aún)
// 2s  → "Hora actual: HH:MM:SS"
// 3s  → "¡Hola después de 3 segundos!"
// 4s  → "Hora actual: HH:MM:SS"
// 6s  → "Hora actual: HH:MM:SS"
// 8s  → "Hora actual: HH:MM:SS"
// 10s → "Hora actual: HH:MM:SS"
//      → "Intervalo cancelado a los 10 segundos. ¡Chau!"

// En total el intervalo imprime la hora ~5 veces antes de cancelarse.

// ============================================
// PARTE 1: setTimeout + clearTimeout
// ============================================

// ============================================
// PARTE 1: setTimeout + clearTimeout
// ============================================

// console.log("Creando temporizador...");

// const timeoutId = setTimeout(() => {
//   console.log("Este mensaje NO deberia aparecer");
// }, 3000);

// console.log("Temporizador creado con ID: " + timeoutId);

// clearTimeout(timeoutId);
// console.log("Temporizador " + timeoutId + " cancelado antes de ejecutarse");


// ============================================
// PARTE 2: setInterval + clearInterval
// ============================================

// console.log("\nCreando intervalo (cada 1 segundo)...");

// Variable para contar cuantas veces se ejecuto el intervalo
// let contadorTicks = 0;

// Guardamos el momento exacto en que arranca el intervalo (en milisegundos)
// Date.now() devuelve los ms transcurridos desde el 1 de enero de 1970 (epoch)
// const tiempoInicio = Date.now();

// setInterval funciona igual que setTimeout pero en lugar de ejecutarse una vez,
// repite el callback cada X milisegundos indefinidamente hasta que lo canceles
// Guardamos su ID en 'intervalId' para poder cancelarlo despues
// const intervalId = setInterval(() => {

//   Sumamos 1 al contador en cada tick
//   contadorTicks++;

//   Calculamos cuantos segundos pasaron desde que arranco el intervalo
//   Date.now() - tiempoInicio da la diferencia en ms, dividimos por 1000 para convertir a segundos
//   toFixed(1) redondea a 1 decimal para que se vea limpio (ej: 1.0, 2.0)
//   const segundosTranscurridos = ((Date.now() - tiempoInicio) / 1000).toFixed(1);

//   console.log("Tick #" + contadorTicks + " — " + segundosTranscurridos + "s transcurridos");
// }, 1000);

// console.log("Intervalo creado con ID: " + intervalId);

// Usamos un setTimeout para cancelar el intervalo despues de 5 segundos
// Sin esto, el intervalo correria para siempre
// Guardamos su ID en 'timeoutCancelacion' por buena practica,
// aunque en este caso no lo necesitemos cancelar manualmente
// const timeoutCancelacion = setTimeout(() => {

//   clearInterval detiene el intervalo usando su ID
//   clearInterval(intervalId);
//   console.log("Intervalo " + intervalId + " cancelado despues de " + contadorTicks + " ticks");
// }, 5000);


// ============================================
// PARTE 3: AbortController + fetch con timeout
// ============================================

// console.log("\nIniciando fetch con AbortController...");

// AbortController es un objeto nativo del navegador (y Node 18+)
// que permite cancelar operaciones asincronas como fetch
// const controlador = new AbortController();

// signal es el objeto que conecta el controlador con el fetch
// cuando llamemos a controlador.abort(), la signal avisa al fetch que se cancele
// const { signal } = controlador;

// Si el fetch no responde en 4 segundos, ejecutamos controlador.abort()
// que cancela la peticion a nivel de red (el navegador deja de esperar la respuesta)
// const timeoutFetch = setTimeout(() => {
//   controlador.abort();
//   console.log("Fetch cancelado por timeout");
// }, 4000);

// Lanzo el fetch pasandole la signal como opcion
// Esto vincula la peticion al AbortController
// jsonplaceholder es una API publica gratuita para hacer pruebas
// fetch("https://jsonplaceholder.typicode.com/posts/1", { signal })
//   .then(res => res.json()) // convertimos la respuesta a JSON
//   .then(data => {
//     Si el fetch termino bien antes de los 4 segundos,
//     cancelamos el timeout para que no intente abortar algo que ya termino
//     clearTimeout(timeoutFetch);
//     console.log("Datos recibidos:", data);
//   })
//   .catch(error => {
//     Tambien limpiamos el timeout en caso de error
//     clearTimeout(timeoutFetch);

//     AbortError es el tipo de error especifico que lanza fetch cuando es cancelado
//     Lo diferenciamos de un error de red comun para dar un mensaje apropiado
//     if (error.name === "AbortError") {
//       console.log("La peticion fue abortada");
//     } else {
//       console.log("Error de red:", error.message);
//     }
//   });


//----------------------------------------------------------------------------------------------
//Ejercicio realizado para la pagina de CoderHouse
process.stdin.setEncoding('utf-8');

let input = '';
process.stdin.on('data', chunk => {
  input += chunk;
});

process.stdin.on('end', () => {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const commands = lines.slice(1, N + 1);

  //Tiempo acumulado en segundos
  let tiempoActual = 0;

  // Guarda el ID del setTimeout activo, null si no hay ninguno
  let timeoutId = null;

  // Funcion que programa un tick (avance de 1 segundo)
  // Se llama a si misma recursivamente mientras el temporizador este activo
  function programarTick() {
    timeoutId = setTimeout(() => {
      tiempoActual++;
      console.log(tiempoActual);
      programarTick(); // programa el siguiente tick
    }, 1000);
  }

  // Funcion que cancela el tick activo si existe
  function cancelarTick() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  // Procesamos cada comando en orden
  for (const comando of commands) {
    const cmd = comando.trim();

    if (cmd === 'start') {
      // Solo iniciamos si no hay un timeout activo ya
      // Evita crear timers solapados si llegan dos 'start' seguidos
      if (timeoutId === null) {
        programarTick();
      }

    } else if (cmd === 'pause') {
      // Cancelamos el timeout activo, el tiempo acumulado se conserva
      cancelarTick();

    } else if (cmd === 'reset') {
      // Cancelamos el timeout activo y volvemos el tiempo a cero
      cancelarTick();
      tiempoActual = 0;
    }
  }

});
