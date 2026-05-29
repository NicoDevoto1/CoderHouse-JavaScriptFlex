// fetch: este metodo nos permite obtener informacion de una base de datos a traves de una API realizando una petición.

//Teoría: Ejecución Sincrónica vs Asincrónica
//Código Sincrónico (Bloqueante)
//El código sincrónico se ejecuta de manera secuencial: cada línea espera a que la anterior termine para comenzar. Esto puede causar que el navegador se "congele" si una operación tarda mucho, porque no puede hacer nada más hasta que termine.

//Código Asincrónico (No Bloqueante)
//El código asincrónico permite que ciertas operaciones se ejecuten en segundo plano, sin bloquear el flujo principal. JavaScript usa mecanismos como callbacks, promesas y temporizadores para manejar estas tareas.

//El Call Stack (Pila de llamadas)
// El Call Stack es una estructura de datos tipo LIFO (Last In, First Out) que el motor de JavaScript utiliza para registrar las funciones que se están ejecutando. Cada vez que se llama a una función, esta se apila en el Call Stack; cuando la función termina, se desapila. Esto permite que JavaScript sepa qué función está activa en cada momento y en qué orden deben completarse.
// Ejemplo: Si tienes una función A que llama a la función B, primero se apila A, luego B. Cuando B termina, se desapila y continúa la ejecución de A.

// La Callback Queue (Cola de callbacks)
// La Callback Queue es una cola donde se almacenan las funciones (callbacks) que están listas para ejecutarse, pero que deben esperar a que el Call Stack esté vacío. Es decir, cuando una tarea asincrónica (como un temporizador o un evento) finaliza, su callback se coloca en esta cola.

// Esta cola funciona con una estructura FIFO (First In, First Out), lo que significa que las funciones se ejecutan en el orden en que llegan.

//El Event Loop
// El Event Loop es el mecanismo que vigila constantemente el Call Stack y la Callback Queue. Su función principal es:
// Verificar si el Call Stack está vacío.
// Si está vacío, tomar la primera función de la Callback Queue y moverla al Call Stack para su ejecución.
// Este proceso permite que JavaScript maneje operaciones asincrónicas sin bloquear la ejecución del código principal.

//¿Alguna vez has querido que una acción en tu página web suceda después de un tiempo o se repita cada cierto intervalo? Por ejemplo, mostrar un mensaje después de unos segundos o actualizar un contador cada segundo. En esta unidad, descubrirás cómo JavaScript facilita estas tareas con las funciones setTimeout y setInterval. Además, repasaremos cómo el Event Loop influye en la ejecución de estas funciones, para que puedas entender por qué a veces los temporizadores no se ejecutan exactamente cuando esperas. Al finalizar, podrás explicar la sintaxis básica de estas APIs y decidir cuándo usar cada una según el comportamiento que necesites.

// ¿Qué es setTimeout?
// setTimeout es una función que permite ejecutar un callback (una función) una sola vez después de un retraso mínimo especificado en milisegundos.

setTimeout(() => {
  console.log('¡Han pasado 10 segundos!');
}, 10000);

//Este código mostrará el mensaje en consola después de al menos 2 segundos.

// ¿Qué es setInterval?
// setInterval permite ejecutar un callback repetidamente cada cierto intervalo de tiempo, hasta que se cancele.
// funciónCallback: función que se ejecutará periódicamente.
// intervaloEnMilisegundos: tiempo entre cada ejecución.

setInterval(() => {
  console.log('Este mensaje se repite cada segundo');
}, 1000);

// Cancelación de temporizadores en JavaScript
// Cuando creas un temporizador con setTimeout o setInterval, estas funciones devuelven un identificador único (un número) que representa ese temporizador. Para detener la ejecución programada, debes usar las funciones complementarias clearTimeout y clearInterval respectivamente, pasando ese identificador.

const dosSegundos = setTimeout(() => {
  console.log('Esto se ejecuta después de 2 segundos');
}, 2000);

// Para cancelar el temporizador antes de que se ejecute:
clearTimeout(dosSegundos);

//De forma similar para intervalos periodicos

const unSegundo = setInterval(() => {
  console.log('Esto se ejecuta cada segundo');
}, 1000);

// Para detener el intervalo:
clearInterval(unSegundo);

// Patrones para guardar identificadores de timers
// Es buena práctica almacenar los IDs de temporizadores en variables o propiedades accesibles para poder cancelarlos cuando sea necesario, especialmente en aplicaciones con ciclos de vida complejos (como componentes en frameworks).
// Evitar múltiples timers solapados
// Crear varios timers sin cancelar los anteriores puede generar ejecuciones simultáneas no deseadas. Siempre verifica si un timer está activo antes de crear uno nuevo, y cancela el anterior si es necesario.



