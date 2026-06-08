// Crear una Promesa que simula una operación asincrónica
const promesaEjemplo = new Promise((resolve, reject) => {
  const exito = true; // Simula éxito o fallo
  setTimeout(() => {
    if (exito) {
      resolve('Operación exitosa');
    } else {
      reject('Ocurrió un error');
    }
  }, 1000);
});

// Consumir la Promesa
promesaEjemplo
  .then(resultado => console.log(resultado)) // Maneja éxito
  .catch(error => console.error(error)); // Maneja error
