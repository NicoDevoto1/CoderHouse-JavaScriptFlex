// fetch: este metodo nos permite obtener informacion de una base de datos a traves de una API realizando una petición.

// Teoría: Ejecución Sincrónica vs Asincrónica
// Código Sincrónico (Bloqueante)
// El código sincrónico se ejecuta de manera secuencial: cada línea espera a que la anterior termine para comenzar. Esto puede causar que el navegador se "congele" si una operación tarda mucho, porque no puede hacer nada más hasta que termine.

// Código Asincrónico (No Bloqueante)
// El código asincrónico permite que ciertas operaciones se ejecuten en segundo plano, sin bloquear el flujo principal. JavaScript usa mecanismos como callbacks, promesas y temporizadores para manejar estas tareas.

// El Call Stack (Pila de llamadas)
// El Call Stack es una estructura de datos tipo LIFO (Last In, First Out) que el motor de JavaScript utiliza para registrar las funciones que se están ejecutando. Cada vez que se llama a una función, esta se apila en el Call Stack; cuando la función termina, se desapila. Esto permite que JavaScript sepa qué función está activa en cada momento y en qué orden deben completarse.
// Ejemplo: Si tienes una función A que llama a la función B, primero se apila A, luego B. Cuando B termina, se desapila y continúa la ejecución de A.

// La Callback Queue (Cola de callbacks)
// La Callback Queue es una cola donde se almacenan las funciones (callbacks) que están listas para ejecutarse, pero que deben esperar a que el Call Stack esté vacío. Es decir, cuando una tarea asincrónica (como un temporizador o un evento) finaliza, su callback se coloca en esta cola.

// Esta cola funciona con una estructura FIFO (First In, First Out), lo que significa que las funciones se ejecutan en el orden en que llegan.

// El Event Loop
// El Event Loop es el mecanismo que vigila constantemente el Call Stack y la Callback Queue. Su función principal es:
// Verificar si el Call Stack está vacío.
// Si está vacío, tomar la primera función de la Callback Queue y moverla al Call Stack para su ejecución.
// Este proceso permite que JavaScript maneje operaciones asincrónicas sin bloquear la ejecución del código principal.

// ¿Alguna vez has querido que una acción en tu página web suceda después de un tiempo o se repita cada cierto intervalo? Por ejemplo, mostrar un mensaje después de unos segundos o actualizar un contador cada segundo. En esta unidad, descubrirás cómo JavaScript facilita estas tareas con las funciones setTimeout y setInterval. Además, repasaremos cómo el Event Loop influye en la ejecución de estas funciones, para que puedas entender por qué a veces los temporizadores no se ejecutan exactamente cuando esperas. Al finalizar, podrás explicar la sintaxis básica de estas APIs y decidir cuándo usar cada una según el comportamiento que necesites.

// ¿Qué es setTimeout?
// setTimeout es una función que permite ejecutar un callback (una función) una sola vez después de un retraso mínimo especificado en milisegundos.

// setTimeout(() => {
//   console.log('¡Han pasado 10 segundos!');
// }, 10000);

// Este código mostrará el mensaje en consola después de al menos 2 segundos.

// ¿Qué es setInterval?
// setInterval permite ejecutar un callback repetidamente cada cierto intervalo de tiempo, hasta que se cancele.
// funciónCallback: función que se ejecutará periódicamente.
// intervaloEnMilisegundos: tiempo entre cada ejecución.

// setInterval(() => {
//   console.log('Este mensaje se repite cada segundo');
// }, 1000);

// Cancelación de temporizadores en JavaScript
// Cuando creas un temporizador con setTimeout o setInterval, estas funciones devuelven un identificador único (un número) que representa ese temporizador. Para detener la ejecución programada, debes usar las funciones complementarias clearTimeout y clearInterval respectivamente, pasando ese identificador.

// const dosSegundos = setTimeout(() => {
//   console.log('Esto se ejecuta después de 2 segundos');
// }, 2000);

// Para cancelar el temporizador antes de que se ejecute:
// clearTimeout(dosSegundos);

// De forma similar para intervalos periodicos

// const unSegundo = setInterval(() => {
//   console.log('Esto se ejecuta cada segundo');
// }, 1000);

// Para detener el intervalo:
// clearInterval(unSegundo);

// Patrones para guardar identificadores de timers
// Es buena práctica almacenar los IDs de temporizadores en variables o propiedades accesibles para poder cancelarlos cuando sea necesario, especialmente en aplicaciones con ciclos de vida complejos (como componentes en frameworks).
// Evitar múltiples timers solapados
// Crear varios timers sin cancelar los anteriores puede generar ejecuciones simultáneas no deseadas. Siempre verifica si un timer está activo antes de crear uno nuevo, y cancela el anterior si es necesario.

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
// process.stdin.setEncoding('utf-8');

// let input = '';
// process.stdin.on('data', chunk => {
//   input += chunk;
// });

// process.stdin.on('end', () => {
//   const lines = input.trim().split('\n');
//   const N = parseInt(lines[0]);
//   const commands = lines.slice(1, N + 1);

//   Tiempo acumulado en segundos
//   let tiempoActual = 0;

//   Guarda el ID del setTimeout activo, null si no hay ninguno
//   let timeoutId = null;

//   Funcion que programa un tick (avance de 1 segundo)
//   Se llama a si misma recursivamente mientras el temporizador este activo
//   function programarTick() {
//     timeoutId = setTimeout(() => {
//       tiempoActual++;
//       console.log(tiempoActual);
//       programarTick(); // programa el siguiente tick
//     }, 1000);
//   }

//   Funcion que cancela el tick activo si existe
//   function cancelarTick() {
//     if (timeoutId !== null) {
//       clearTimeout(timeoutId);
//       timeoutId = null;
//     }
//   }

//   Procesamos cada comando en orden
//   for (const comando of commands) {
//     const cmd = comando.trim();

//     if (cmd === 'start') {
//       Solo iniciamos si no hay un timeout activo ya
//       Evita crear timers solapados si llegan dos 'start' seguidos
//       if (timeoutId === null) {
//         programarTick();
//       }

//     } else if (cmd === 'pause') {
//       Cancelamos el timeout activo, el tiempo acumulado se conserva
//       cancelarTick();

//     } else if (cmd === 'reset') {
//       Cancelamos el timeout activo y volvemos el tiempo a cero
//       cancelarTick();
//       tiempoActual = 0;
//     }
//   }

// });

// ¿Alguna vez has tenido un error inesperado en tu código que detuvo toda la aplicación? En JavaScript, para evitar que estos errores causen problemas mayores, usamos la estructura try/catch/finally. En esta unidad, descubrirás cómo esta estructura te permite capturar errores y asegurar que ciertas acciones se ejecuten siempre, como limpiar recursos o detener temporizadores. Aprenderás la sintaxis básica y cuándo usar cada bloque para escribir código más seguro y confiable, especialmente en aplicaciones web donde el manejo de errores es crucial para una buena experiencia de usuario.

// Teoría
// Estructura try/catch/finally en JavaScript
// La estructura try/catch/finally es una herramienta fundamental para manejar errores en JavaScript. Permite ejecutar código que podría fallar y capturar esos errores para evitar que detengan la ejecución del programa.

// Bloques y su propósito
// try: Aquí colocamos el código que queremos ejecutar y que podría generar un error.
// catch: Se ejecuta solo si ocurre un error dentro del bloque try. Recibe el objeto error para manejarlo o mostrar mensajes.
// finally: Se ejecuta siempre, haya o no error, ideal para liberar recursos o ejecutar código de limpieza.

// try {
//   Código que puede fallar
//   let resultado = 10 / 0; // No lanza error, pero ejemplo
//   console.log('Resultado:', resultado);
// } catch (error) {
//   console.error('Ocurrió un error:', error.message);
// } finally {
//   console.log('Este bloque siempre se ejecuta');
// }

// Uso de finally para limpieza
// El bloque finally es perfecto para liberar recursos, como detener temporizadores o remover event listeners, asegurando que estas acciones ocurran sin importar si hubo error.

// const timerId = setTimeout(() => {
//   console.log('Temporizador ejecutado');
// }, 5000);

// try {
//   // Código que puede lanzar error
//   throw new Error('Error simulado');
// } catch (error) {
//   console.log('Capturado:', error.message);
// } finally {
//   clearTimeout(timerId); // Siempre limpiamos el temporizador
//   console.log('Temporizador limpiado');
// }

//En aplicaciones web, los errores inesperados pueden afectar la experiencia del usuario o incluso comprometer la seguridad. Por ejemplo, un temporizador que no se limpia puede seguir ejecutándose y consumir recursos innecesarios. Usar try/catch/finally permite manejar estos casos de forma controlada, capturando errores y asegurando que la aplicación libere recursos correctamente.

// Imagina que tienes una función que realiza una petición y establece un temporizador para un timeout. Si ocurre un error en la petición, quieres capturarlo para mostrar un mensaje, pero también asegurarte de que el temporizador se detenga para no ejecutar código obsoleto. Aquí es donde finally es clave.

// Este enfoque mejora la robustez y mantenibilidad del código, facilitando la detección y recuperación de errores, y evitando efectos secundarios no deseados. Además, prepara el terreno para manejar errores en código asincrónico, tema que abordaremos en el siguiente módulo.

//¿Alguna vez has querido que tu programa detecte situaciones inesperadas y te avise claramente qué salió mal? En JavaScript, la instrucción throw es la herramienta que permite generar errores de forma explícita, ayudándote a controlar el flujo de tu aplicación y a comunicar problemas de manera efectiva. En esta unidad, descubrirás cómo usar throw para lanzar errores con mensajes claros y cómo estos pueden ser capturados para evitar que tu aplicación falle inesperadamente. Este conocimiento es clave para escribir código más seguro y fácil de mantener, especialmente cuando trabajas con operaciones asincrónicas y temporizadores, temas que ya has empezado a explorar.

//Nota: Aunque puedes lanzar cualquier tipo de dato con throw (como números o cadenas), es recomendable usar objetos Error o sus subclases para mantener consistencia y aprovechar propiedades como name y stack.

// try {
//   throw new Error('Error controlado');
// } catch (error) {
//   console.log('Capturado:', error.message);
// }

//Este mecanismo es fundamental para manejar errores en código síncrono y asincrónico, mejorando la robustez y experiencia del usuario.
//Abre tu editor de código (VSCode o similar) y crea un nuevo archivo validacion.js.
// Define una función llamada validarEdad que reciba un parámetro edad.
// Dentro de la función, verifica si edad es un número mayor o igual a 18.
// Si no cumple la condición, lanza un error con throw usando un objeto Error y un mensaje claro, por ejemplo: "Edad inválida: debe ser mayor o igual a 18".
// Fuera de la función, usa un bloque try/catch para llamar a validarEdad con diferentes valores y capturar posibles errores.
// En el bloque catch, muestra el mensaje del error en la consola.

//1. Definicion de la funcion con validacion
function validarEdad(edad){
  //Verifico si es un numero y si es mayor a 18
  if (typeof edad !== 'number' || edad < 18){
    throw new Error(`Edad incorrecta, la edad permitida es un numero mayor o igual a 18. Recibi: ${edad}`);
  }
  //Si pasa la validacion, el flujo continua normalmente
  console.log(`Acceso otorgado. Edad verificada:${edad}`);
}

//2. Pruebas usando bloques try/catch
console.log("--- Iniciando pruebas de validación --- \n");

//Caso 1: Le pasamos una edad valida
try{
  validarEdad(25);
}catch(error){
  console.error("Error capturado", error.message);
}

// Caso 2: Una edad menor a 18 (Debería lanzar el error)
try {
  validarEdad(15);
} catch (error) {
  console.error("Error capturado:", error.message);
}

// Caso 3: Un tipo de dato incorrecto (Debería lanzar el error)
try {
  validarEdad("dieciocho");
} catch (error) {
  console.error("Error capturado:", error.message);
}

console.log("\n--- Pruebas finalizadas ---");

// ### 📄 Diferencias Clave: `console.error` vs `throw`

// | Característica | `console.error()` | `throw new Error()` |

// | Definición | Es una función que **imprime** un mensaje con formato de error en la consola. | Es una palabra clave que **interrumpe** el flujo del programa y lanza una excepción. 

// | Flujo del código | **No detiene** la ejecución. El código de abajo se sigue ejecutando normalmente. | **Detiene** la ejecución inmediatamente a menos que sea capturado por un `try/catch`.

// | Propósito | Informar al desarrollador o dejar un registro (log) de que algo falló, sin romper la app. | Asegurar que el programa no continúe operando con datos inválidos o en un estado corrupto.

// function probarConsole() {
//   console.error("Esto es solo un aviso de error");
//   console.log("¡Yo me sigo ejecutando igual!"); // Se ejecuta
// }

// function probarThrow() {
//   throw new Error("¡Freno de mano! Algo salió muy mal");
//   console.log("Este mensaje NUNCA se va a leer"); // Código inaccesible
// }

//1. Envolver lógica crítica en try/catch dentro de callbacks
// Cuando una función asincrónica ejecuta un callback, cualquier error que ocurra dentro de ese callback no será capturado por un try/catch externo. Por eso, es buena práctica envolver la lógica interna del callback en un bloque try/catch para capturar errores localmente.

// setTimeout(() => {
//   try {
//     // Lógica crítica que puede fallar
//     let result = doSomethingRisky();
//     console.log('Resultado:', result);
//   } catch (error) {
//     console.error('Error capturado en callback:', error);
//     // Aquí podemos realizar acciones de recuperación o logging
//   }
// }, 1000);

// 2. Propagar errores mediante callbacks con firma (err, result)
// Un patrón común en Node.js y JavaScript es usar callbacks que reciben un primer parámetro para el error y un segundo para el resultado. Esto permite que la función asincrónica informe errores al llamador, quien decide cómo manejarlos.

// function asyncOperation(callback) {
//   setTimeout(() => {
//     try {
//       let data = fetchData();
//       callback(null, data); // Sin error
//     } catch (err) {
//       callback(err); // Propagamos el error
//     }
//   }, 500);
// }

// asyncOperation((err, result) => {
//   if (err) {
//     console.error('Error recibido:', err);
//     // Manejo o recuperación
//   } else {
//     console.log('Resultado:', result);
//   }
// });

