// ─── 1. setTimeout ────────────────────────────────────────────────────────────
// Se ejecuta UNA sola vez después de 3 segundos

setTimeout(() => {
  console.log("¡Hola después de 3 segundos!");
}, 3000);


// ─── 2. setInterval ───────────────────────────────────────────────────────────
// Se ejecuta CADA 2 segundos e imprime la hora actual

const intervalo = setInterval(() => {
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString("es-AR"); // ej: 14:32:05
  console.log(`Hora actual: ${hora}`);
}, 2000);


// ─── 3. Cancelar el intervalo después de 10 segundos ─────────────────────────
// clearInterval detiene el setInterval usando el id que devolvió

setTimeout(() => {
  clearInterval(intervalo);
  console.log("Intervalo cancelado a los 10 segundos. ¡Chau!");
}, 10000);


// ─── ¿Qué va a pasar en consola? ─────────────────────────────────────────────
//
// 0s  → el script arranca (nada visible aún)
// 2s  → "Hora actual: HH:MM:SS"
// 3s  → "¡Hola después de 3 segundos!"
// 4s  → "Hora actual: HH:MM:SS"
// 6s  → "Hora actual: HH:MM:SS"
// 8s  → "Hora actual: HH:MM:SS"
// 10s → "Hora actual: HH:MM:SS"
//      → "Intervalo cancelado a los 10 segundos. ¡Chau!"
//
// En total el intervalo imprime la hora ~5 veces antes de cancelarse.