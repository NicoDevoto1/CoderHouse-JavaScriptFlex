//Primer condicional
// const llueve = confirm("Llueve?");

// if (llueve){
//     alert("No salgas, espera a que pare");
// }else{
//     alert("Andá a comprar");
// };

//Para evitar caseSensitive (comparación de mayúsculas y minúsculas) podemos utilizar 
//.toLowerCase() o .toUpperCase() (nos sirven para convertir todo a minúsculas
// o mayúsculas).

//Ejemplo de un usuario queriendo acceder a su cuenta

// const usuario = prompt("Ingrese su usuario").toLowerCase();
// const clave = prompt ("Ingrese su clave");

// if (usuario === "nicolas" && clave === "coder") {
//     alert("bienvenido");
// } else {
//     alert ("Credenciales inválidas. La policía está en camino a tu casa, sos un hacker");

// };

//Ejemplo donde se puede elegir un idioma mediante una constante

// const idioma = prompt("Ingrese el idioma en el que quiera ser saludado: \n\n1. Español\n2. Ingles\n3. Italiano\n4. Euskera");

// if(idioma === "1"){
//     alert("Hola");
// } else if (idioma === "2"){
//     alert("Hello");
// } else if(idioma === "3"){
//     alert("Ciao");
// }else if(idioma === "4"){
//     alert("Egun on");
// }else{
//     alert("Idioma no válido")
// };

//Primer ejemplo de utilización con Switch

// let entrada = prompt("Ingresar un nombre");

// switch(entrada){
//     case "ANA":
//         alert("HOLA ANA");
//         break; //El break es para que no siga recoriendo las lineas y corte
//     case "JUAN":
//         alert("HOLA JUAN");
//         break;
//     default:
//         alert("¿QUIÉN SOS?");
//         break;
// }

//Ciclos: nos permiten realizar tareas repetitivas sin tener que repetir varias veces lo mismo a nivel código. Tenemos ciclos por conteo y por condición.

//FOR: ciclos por conteo

/*
Sintaxis genérica

for(contador; condicion; incremento){
    Código que quiero repetir
}

contador: let i = 1;
condicion: i <= 10;
incremento: i= i + 1;

*/
//Repito el hola 10 veces

// for(let i = 1; i <= 10; i= i + 1){
//     alert("Hola");
// }