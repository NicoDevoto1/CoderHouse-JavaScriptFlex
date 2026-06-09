// Crear una Promesa que simula una operación asincrónica
// const promesaEjemplo = new Promise((resolve, reject) => {
//   const exito = true; // Simula éxito o fallo
//   setTimeout(() => {
//     if (exito) {
//       resolve('Operación exitosa');
//     } else {
//       reject('Ocurrió un error');
//     }
//   }, 1000);
// });

// // Consumir la Promesa
// promesaEjemplo
//   .then(resultado => console.log(resultado)) // Maneja éxito
//   .catch(error => console.error(error)); // Maneja error

// ─── 1. Función que simula una operación asincrónica ─────────────────────────
// Se resuelve o rechaza aleatoriamente después de 2 segundos

// function operacionAsincronica(nombre) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const exito = Math.random() > 0.4; // 60% de chances de éxito

//       if (exito) {
//         resolve(`✅ "${nombre}" completada con éxito`);
//       } else {
//         reject(`❌ "${nombre}" falló inesperadamente`);
//       }
//     }, 2000);
//   });
// }


// // ─── 2. Uso básico: then / catch / finally ────────────────────────────────────

// console.log("── Iniciando operación simple ──");

// operacionAsincronica("Operación 1")
//   .then(mensaje => {
//     // Se ejecuta si la promesa se resolvió (éxito)
//     console.log("THEN →", mensaje);
//     return mensaje; // pasamos el resultado a la siguiente etapa
//   })
//   .catch(error => {
//     // Se ejecuta si la promesa fue rechazada (error)
//     console.log("CATCH →", error);
//   })
//   .finally(() => {
//     // Se ejecuta SIEMPRE, haya éxito o error
//     console.log("FINALLY → La operación terminó (éxito o error)");
//   });


// // ─── 3. Encadenamiento: segunda operación depende de la primera ───────────────
// // Esperamos 5 segundos para que no se mezcle con el log anterior

// setTimeout(() => {
//   console.log("\n── Iniciando operaciones encadenadas ──");

//   operacionAsincronica("Operación A")
//     .then(resultado => {
//       // Si A tuvo éxito, lanzamos la Operación B con ese resultado
//       console.log("THEN (A) →", resultado);
//       console.log("Iniciando Operación B...");
//       return operacionAsincronica("Operación B"); // retornamos la segunda promesa
//     })
//     .then(resultado => {
//       // Este then solo corre si AMBAS operaciones tuvieron éxito
//       console.log("THEN (B) →", resultado);
//     })
//     .catch(error => {
//       // Un solo catch atrapa el error de A o de B, el que falle primero
//       console.log("CATCH → Error en la cadena:", error);
//     })
//     .finally(() => {
//       console.log("FINALLY → Cadena de operaciones finalizada");
//     });

// }, 5000);  

Toastify({
  text: "Notificación de ejemplo",
  duration: 3000, // duración en milisegundos
  close: true, // muestra botón de cerrar
  gravity: "top", // posición vertical: top o bottom
  position: "right", // posición horizontal: left, center, right
  backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  onClick: function() { /* acción al hacer clic */ }
}).showToast();

async function dispararAlerta(){

  const {value:usuario} = await Swal.fire({
    text: "Como te llamas?",
    input: "Escribe aqui"
});

await Swal.fire(`Hola, ${usuario}, soy una alerta`);

}
