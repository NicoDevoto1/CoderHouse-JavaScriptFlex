// Objeto literal
//Hay dos formas para poder acceder a las propiedades de un objeto: la notacion de punto (dot notation) y la notacion de corchetes (bracket notation).

// const persona = {
//   nombre: 'Ana',
//   edad: 28,
//   esEstudiante: true
// };

//Dot Notation (Notación de Punto)
//Es la forma más común y sencilla para acceder a una propiedad cuando conocemos el nombre exacto y es un identificador válido.

// console.log(persona.nombre); // 'Ana'

//Bracket Notation (Notación de Corchetes)
//Se usa cuando el nombre de la propiedad es dinámico, contiene espacios, caracteres especiales o no es un identificador válido.

// Modificar
// persona.edad = 29;

// Agregar
// persona.pais = 'España';


//console.log(persona['edad']); // 28

// const propiedad = 'esEstudiante';
// console.log(persona[propiedad]); // true

//Metodos y this: `Un metodo es una funcion almacenada como porpiedad de un objeto. Permite que el objeto realice acciones o calculos relacionados con sus datos.

// const persona = {
//   nombre: 'Ana',
//   edad: 28,
//     esEstudiante: true,
//   saludar: function() {
//     console.log('Hola, soy ' + this.nombre);
//   }
// };

// persona.saludar(); // Hola, soy Ana


//En este caso saludar es un metodo, y la palabra THIS dentro del metodo se refiere al objeto persona pudiendo acceder a sus propiedades

// Elementos dentro de un array

// const frutas = ['manzana', 'kiwi', 'frutilla'];
// console.log(frutas);

// const persona = {
//    nombre: 'Pablo',
//    edad: 8,
// };

// console.log(persona.edad);
//Recordar que los arrays arrancan en 0 como primer numero

// const usuarios = [
//     {id: '0', nombre:'Luis', edad: '55'},
//     {id: '1', nombre:'Marta', edad: '67'},
//     {id: '2', nombre:'Pedro', edad: '23'},
// ];

// console.log(usuarios[0].nombre);

//Tambien se pueden modificar, agregar o eliminar propiedades usando la misma sintaxis

// const productos = [
//   { nombre: 'Camisa', precio: 30, stock: 100 },
//   { nombre: 'Pantalón', precio: 90, stock: 60 },
//   { nombre: 'Zapatos', precio: 120, stock: 30 },
//   { nombre: 'Tops', precio: 95, stock: 10 },
//   { nombre: 'Botas de cuero', precio: 220, stock: 40 },
// ];

// productos[1].stock = 50; // Modificar stock
// productos[0].color = 'azul'; // Agregar propiedad
// delete productos[2].stock; // Eliminar propiedad

// console.table(productos); //Console table es una manera de poder ver los datos de forma ordenada
//Con el find busco un elemento mediante alguna caracteristica en particular mientras le pase un parametro para que busque. En este caso creo el parametro price diciendole que me busque todos los objetos del array los cuales tengan un precio mayor a 50 pesos, en el caso de no encontrar dicho elemento que cumpla con lo que yo le pido, me devolvera undefined
// const productoMayor80 = productos.find((price) => price.precio > 50);
// console.log (productoMayor80);

//filter
//Filter lo que permite es crear un array de condiciones para que filtre por el parametro que nosotros le damos, en vez de darnos los elementos de manera individual nos devuelve un array con todos los elementos que cumplan dicha condicion

// const productosMayorA80 = productos.filter((producto) => producto.precio > 80 && producto.stock < 50);
// console.log (productosMayorA80);

//Ordenar objetos con SORT: Sort es un metodo que ordena los elementos de un array In situ (modificando el array original) y devuelve el array ordenado.

// const personas = [
//   { nombre: 'Ana', edad: 30 },
//   { nombre: 'Luis', edad: 25 },
//   { nombre: 'María', edad: 35 }
// ];
// personas.sort((a, b) => a.edad - b.edad);
// // Ordena de menor a mayor edad

// personas.sort((a, b) => {
//   if (a.nombre < b.nombre) return -1;
//   if (a.nombre > b.nombre) return 1;
//   return 0;
// });

// personas.sort((a, b) => a.nombre.localeCompare(b.nombre));

//Bunas practicas para el manejo de objetos:

//1.Inmutabilidad Superficial
//La inmutabilidad superficial consiste en no modificar un objeto original, sino crear una copia cuando necesites cambiar sus propiedades. Esto evita efectos secundarios inesperados y facilita el seguimiento de cambios.
//Ejemplo:

// const persona = { nombre: 'Ana', edad: 25 };
// En lugar de modificar directamente:
// persona.edad = 26; // mutable

// Mejor crear una copia con cambios:
// const personaActualizada = { ...persona, edad: 26 };

// Buenas practicas en el manejo de objetos

//1.Inmutabilidad Superficial
//La inmutabilidad superficial consiste en no modificar directamente un objeto original, sino crear una copia cuando necesites cambiar sus propiedades. Esto evita efectos secundarios inesperados y facilita el sewguimiento de cambios.

// const persona = { nombre: 'Ana', edad: 25 };
// // En lugar de modificar directamente:
// persona.edad = 26; // mutable

// // Mejor crear una copia con cambios:
// const personaActualizada = { ...persona, edad: 26 };

//2. Nombrado Claro y Consistente de Propiedades
//Usa nombres descriptivos y consistentes para las propiedades de tus objetos. Esto facilita la lectura y mantenimiento del código.

//3. Validación Mínima de Propiedades
//Antes de usar propiedades de un objeto, valida que existan para evitar errores en tiempo de ejecución.

//function mostrarPrecio(producto) {
//   if ('precio' in producto) {
//     console.log(`El precio es ${producto.precio}`);
//   } else {
//     console.log('Precio no disponible');
//   }
// }

const persona = {
  nombre: 'Luis',
  edad: 35,
  cumpleaños() {
    this.edad++;
  }
};
persona.cumpleaños();
console.log(persona.edad);
