// DOM
// El DOM (Document Object Model) es una representación estructurada del documento HTML que carga el navegador. Se puede entender como un árbol donde cada parte del documento es un nodo. Este modelo permite que los lenguajes de programación, como JavaScript, lean y modifiquen el contenido, estructura y estilos de la página en tiempo real.

// Imagina que quieres cambiar el texto de un título, modificar el color de un botón o mostrar un mensaje solo cuando el usuario haga clic en un enlace. Para lograrlo, primero necesitas seleccionar esos elementos HTML en el documento. Pero, ¿cómo hacerlo de forma eficiente y clara?
// En esta unidad, descubrirás los métodos más usados para seleccionar elementos en el DOM, desde los clásicos getElementById y getElementsByClassName hasta los más modernos y flexibles querySelector y querySelectorAll.

// document.getElementById('id')
// Qué hace: Devuelve el elemento que tiene el atributo id igual a id.
// Retorna: Un único elemento o null si no existe.
// Ejemplo:

// const itulo = document.getElementById('main-tittle');
// titulo.textContent = 'Hola Mundo';

// El elemento id debe ser unico en el documento
// --------------------------------------------

// document.getElementsByClassName('className')
// Qué hace: Devuelve una colección(HTMLCollection) de todos los elementos que tienen la clase className.
// Retorna: Una colección "en vivo" que refleja cambios en el DOM.
// Ejemplo:

// const items = document.getElementsByClassName('item');
// for(const item of items) {
//   item.style.color = 'blue';
// }

// --------------------------------------------

// document.getElementsByTagName(tagName)
// Qué hace: Devuelve una colección de todos los elementos con la etiqueta tagName.
// Retorna: Una colección "en vivo".
// Ejemplo:

// const parrafos = document.getElementsByTagName('p');
// console.log(parrafos.length);

// --------------------------------------------

// document.querySelector(selector)
// Qué hace: Devuelve el primer elemento que coincide con el selector CSS.
// Retorna: Un único elemento o null.
// Ejemplo:

// const primerBoton = document.querySelector('button.primary');
// primerBoton.disabled = true;

// --------------------------------------------

// document.querySelectorAll(selector)
// Qué hace: Devuelve una lista de nodos(NodeList) de todos los elementos que coinciden con el selector CSS.
// Retorna: NodeList que puede ser iterado con forEach.
// Ejemplo: 

// const enlaces = document.querySelectorAll('nav a');
// enlaces.forEach(enlace => {
//   enlace.style.textDecoration = 'none';
// });

// --------------------------------------------

// const usuario = { nombre: 'Carlos', edad: 30 };
// const perfilHTML = `
//   <div class="perfil">
//     <h2>${usuario.nombre}</h2>
//     <p>Edad: ${usuario.edad}</p>
//   </div>
// `;

// ------------------------------------------------------------

// CLASE GRABADA

// DOM: Document Object Model. Es la manera que tenemos de acceder al HTML , a traves de un objeto DOCUMENT. Vamos a combinar JS con HTML.
// Acceder a un nodo
// getElementById: obtener un elemento por su id

// const titulo = document.getElementById("titulo");

// console.log(titulo);

// innerText: Nos permite cambiar el texto dentro de la etiqueta, lo edito desde javaScritp sin necesidad de tocar el html

// titulo.innerText = "este es mi nuevo titulo"

// className: nos permite modificar la class del nodo

// titulo.className = "titulo-rojo"

// getElementsByClassName: obtenemos una coleccion de elementos HTML

// console.log(document.getElementsByTagName("h2"));

//querySelector: otra sintaxis para obtener lo mismo que arriba. Podemos buscar por id (usando #id) o por className (usando .className). Devuelve la primera coincidencia del documento html.

// console.log(document.querySelector("#container"));

