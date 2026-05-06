//arrays
// Ctrl + k + c = Comentar
// Ctrl + k + u = Descomentar

//const alumnoA = "Nicolás";
//const alumnoB = "Manuel";
//const alumnoC = "Santiago";

//Los arrays (o arreglos) son un tipo de dato que nos permite agrupar elementos en forma de listas

//const arrayMartes = ["Nicolas", "Manuel", "Santiago", "Mariano"];

// console.log(arrayMartes);
// console.log (arrayMartes[2]);

//METODOS DE LOS ARRAYS

//push: nos permite agregar un elemento AL FINAL del array
// arrayMartes.push("Ronald");

//pop: nos permite ELIMINAR el ultimo elemento del array
//const elementoEliminado = arrayMartes.pop();
// console.log(arrayMartes);
// console.log(elementoEliminado);

//unshift: nos permite agregar un elemento AL PRINCIPIO del array.
// arrayMartes.unshift("Lucas");

//unshift: nos permite eliminar el primer elemento del array.
// arrayMartes.shift("Lucas");

//join: nos permite "unir" todo nuestro array en un unico string. Si no paso nada a los parentesis, separa por comas. Puedo elegir el separador pasandole como parametro un string.

//console.log(arrayMartes.join());

//reverse: invierte el orden del array. Este es un método destructivo (altera al array original)

//console.log(arrayMartes);
//arrayMartes.reverse();
//console.log(arrayMartes);

//indexof: nos permite encontrar el índice (posición) en el que se encuentra un elemento en específico. SPOILER: es uno de los que  deberíamos utilizar si queremos eliminar un elemento específico (lo mejor es hacerlo como lo vamos a ver en la clase)

//console.log (arrayMartes.indexOf("Daniel"))  //4
//console.log (arrayMartes.indexOf("Manuel"))  //2
//console.log (arrayMartes.indexOf("Lucas"))  //-1 si no esta en el array

// includes: nos permite saber si un elemento esta o no incluido en mi array. Me va a devolver boolean (true si está, false si no está)

// console.log(arrayMartes.includes("Santiago"));
// console.log(arrayMartes.includes(""));

//Que es un objeto? Un objeto es una coleccion de pares clave-valor que permite almacenar y organizar datos relacionados bajo un mismo nombre: Ejemplo

// let persona = {
//     nonbre: 'Ana',
//     edad: 20
// }

// let producto = {
//     id: 101,
//     nombre: 'camisa',
//     precio: 29.99
// }

//Hay dos manera de acceder a los objetos, primero si sabemos su nombre específico y su identificador es valido.

// console.log(producto.nombre); // 'Camisa'

//Permite acceder a propiedades usando una cadena (string), útil para nombres dinámicos o que no son identificadores válidos.

// console.log(producto['precio']); // 29.99
// let prop = 'id';
// console.log(producto[prop]); // 101

//Podemos cambiar el valor de una propiedad o agregar una nueva asignando un valor:
// producto.precio = 24.99; // modifica
// producto.color = 'azul'; // agrega

//Si accedemos a una propiedad que no existe, el resultado es undefined:

// console.log(producto.talla); // undefined

const producto = {
    id: 1001,
    nombre: 'Remera',
    disponible: true,
    talles: ['S', 'M', 'L'],
    detalles: {
        color: 'Azul',
        material: 'Algodon',
    },
};

producto.stock = 10

console.log(producto);


