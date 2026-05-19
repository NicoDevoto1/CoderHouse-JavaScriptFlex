//Funciones de orden superiro
//Funciones que pueden retonar funciones o recibir funciones por parametros

// function mayorQue(numeroFijo){
//     return (numeroMovil) => numeroMovil > numeroFijo;

// };

// const mayorQue21 = mayorQue(21);

/*
function mayorQue21 (numeroMovil){
    return numeroMovil > 21;

}
*/

// Callbacks
// Un callback es una función que se pasa como argumento a otra función para ser llamada ("llamada de vuelta") en un momento determinado, permitiendo personalizar el comportamiento de la función receptora.
// Los callbacks son esenciales para manejar operaciones asíncronas, eventos y para construir funciones genéricas que delegan tareas específicas.

// Ejemplo de un call back en un array, forEach es un callback que se ejecuta para cada elemento del array
// const numeros = [1, 2, 3];
// numeros.forEach(numero => console.log(numero * 2));

//Ejemplo de calculadora

// let operacion = prompt("Ingrese si desea multiplicar o dividir")
// let numeroA = parseInt(prompt("Ingrese el primer numero"))
// let numeroB = parseInt(prompt("Ingrese el segundo numero"))

// function elegirOperacion(operacion){
//     if(operacion == "multiplicar"){
//         return(a, b) => a*b
//     }else if(operacion == "dividir"){
//         return(a,b) => a/b
//     }
// }

// let operacionElegida = elegirOperacion(operacion)
// console.log(operacionElegida(numeroA, numeroB))

//¿Cuál es la mejor forma de recorrer y transformar datos en un array en JavaScript? Los métodos forEach, map y filter son herramientas fundamentales que todo desarrollador debe dominar para escribir el código limpio, eficiente y funcional.

//1. forEach: Iteración simple
//El método forEach ejecuta una función proporcionada una vez por cada elemento del array. Es ideal para realizar acciones que no transforman el array, como imprimir valores o modificar variables externas.

// const numeros = [1, 2, 3];
// numeros.forEach(num => console.log(num));

//map: Crea un nuevo array con los resultados de aplicar una función a cada elemento del array original. Es perfecto para transformar datos sin modificar el array original.

// const numeros = [1, 2, 3];
// const cuadrados = numeros.map(num => num * num);
// console.log(cuadrados); // [1, 4, 9]

//Filter: filter crea un nuevo array con todos los elementos que cumplan una condición especificada en la función.

// const numeros = [1, 2, 3, 4];
// const pares = numeros.filter(num => num % 2 === 0);
// console.log(pares); // [2, 4]

//Aplicación del método map para aplicar descuentos en productos:

// const productos =[
//     {
//         id:1,
//         nombre: "televisor",
//         precio: 5000
//     },
//       {
//         id:2,
//         nombre: "microondas",
//         precio: 8000
//     },
//          {
//         id:3,
//         nombre: "pava electrica",
//         precio: 2000
//     },
//          {
//         id:4,
//         nombre: "plancha",
//         precio: 3000
//     },
//          {
//         id:5,
//         nombre: "heladera",
//         precio: 13000
//     },
    
// ]

// const descuentos = productos.map(productos =>{
//     //El map me realiza un nuevo map para el descuento del 20% de todos los productos de la web
//     let precioDescuento = productos.precio - (productos.precio*20/100)
//     return{
//         nombre: productos.nombre,
//         precio: precioDescuento
//     }
// })

// console.log(descuentos)

const nombreMayusculas = [
    {
        id:0,
        nombre: "Marisa",
        ventas: 5000,
    },
      {
        id:1,
        nombre: "German",
        ventas: 900,
    },
      {
        id:2,
        nombre: "ALEJANDRO",
        ventas: 1000,
    },
     {
        id:3,
        nombre: "Matias",
        ventas: 500,
    },
     {
        id:4,
        nombre: "MANUEL",
        ventas: 200,
    },
]
//Con map hago un array nuevo con trues y false para ver cuales son los que estan en mayusculas
const nombresMayusculas = nombreMayusculas.map(persona => persona.nombre === persona.nombre.toUpperCase());
const nombresMinusculas = nombreMayusculas.map(persona => persona.nombre !== persona.nombre.toUpperCase());
//Filter a
const nombresMayusculasFiltro = nombreMayusculas.filter(persona => persona.nombre === persona.nombre.toUpperCase());

console.log(nombresMayusculas);
console.log(nombresMayusculasFiltro);

//Método reduce en JavaScript
//El método reduce es una función de orden superior que acumula los valores de un array en un único resultado, aplicando una función acumuladora que procesa cada elemento.

const numeros = [1, 2, 3, 4];
const suma = numeros.reduce((acum, num) => acum + num, 0);
console.log(suma); // 10

const arr = [1, 2, 3];
const resultado = arr.reduce((acum, val) => {
  return [...acum, val * 2]; // crea nuevo array
}, []);
console.log(resultado); // [2, 4, 6]

//Suma total de todos los precios de los productos, creamos el contador que va a llevar el total y producto para que simbolice todos los productos del array, hago una funcion y le digo que el contador va a comenzar siempre en 0 y que va a sumar los precios de los productos
const total = productos.reduce((contador, producto) => contador + producto.precio, 0)
console.log(total)


