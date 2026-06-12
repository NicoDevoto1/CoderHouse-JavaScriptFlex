// =============================================================================
// KONDOR - index.js | Lógica de la Página Principal
// =============================================================================
// Responsabilidades:
//   1. Cargar productos desde productos.json usando Fetch API.
//   2. Renderizar dinámicamente la grilla de productos en el DOM.
//   3. Manejar el evento "Agregar al carrito" con feedback visual y notificación.
//
// DEPENDENCIAS (deben estar cargadas en el HTML antes que este script):
//   - SweetAlert2 → https://cdn.jsdelivr.net/npm/sweetalert2@11
//   - carrito.js  → js/carrito.js
// =============================================================================


// ─── Configuración del Toast de SweetAlert2 ──────────────────────────────────
// Swal.mixin() crea una configuración reutilizable para todas las notificaciones.
// toast: true lo convierte en una notificación pequeña no bloqueante.
// timerProgressBar muestra una barra de progreso mientras se cierra solo.
// Los eventos mouseenter/mouseleave pausan y reanudan el timer si el usuario
// pasa el mouse por encima, mejorando la experiencia de usuario.

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 3000,
    timerProgressBar: true,

    // Clases CSS personalizadas → las estilizás desde tu SCSS
    customClass: {
        popup: 'kondor-toast',
    },

});


// ─── Constante de ruta de assets ─────────────────────────────────────────────
// Ruta relativa a index.html (en la raíz del proyecto).
// Centralizada para facilitar cambios futuros de estructura de carpetas.

const ASSETS_INDEX = 'assets/';


// ─── Creación de tarjetas de producto ────────────────────────────────────────
// Recibe un objeto producto del JSON y retorna un elemento <article> completo.
// Usa desestructuración de objetos para extraer solo las propiedades necesarias,
// haciendo el código más legible que acceder a producto.id, producto.nombre, etc.
// El atributo data-id en el botón permite recuperar el producto al hacer click,
// sin necesidad de variables adicionales ni closures por cada tarjeta.

const crearTarjetaProducto = (producto) => {
    const { id, nombre, precio, imagen, alt } = producto;

    const articulo = document.createElement('article');
    articulo.className = 'product-card';

    articulo.innerHTML = `
        <div class="img-container">
            <img src="${ASSETS_INDEX}${imagen}" alt="${alt}" loading="lazy">
        </div>
        <div class="product-info">
            <h4>${nombre}</h4>
            <p>${formatearPrecio(precio)}</p>
            <button class="btn-agregar-carrito" data-id="${id}">
                + AÑADIR
            </button>
        </div>
    `;

    return articulo;
};


// ─── Renderizado de la grilla ─────────────────────────────────────────────────
// Vacía el contenido estático del HTML con innerHTML = '' para evitar
// duplicados entre el HTML original y los elementos generados por JS.
// forEach recorre el array y agrega cada tarjeta al DOM con appendChild.

const renderizarGrilla = (productos) => {
    const grilla = document.querySelector('.productos-grid');
    if (!grilla) return;

    grilla.innerHTML = '';
    productos.forEach(producto => grilla.appendChild(crearTarjetaProducto(producto)));
};


// ─── Delegación de eventos en la grilla ──────────────────────────────────────
// Un único listener en el contenedor padre escucha los clicks de todos
// los botones hijos. e.target.closest() sube por el árbol del DOM buscando
// el botón aunque el click haya sido en un elemento hijo (como el símbolo +).
// Esto es más eficiente en memoria que agregar un listener por cada tarjeta.

const configurarEventosGrilla = (productos) => {
    const grilla = document.querySelector('.productos-grid');
    if (!grilla) return;

    grilla.addEventListener('click', (e) => {
        const boton = e.target.closest('.btn-agregar-carrito');
        if (!boton) return;

        // Recupera el id numérico del producto desde el atributo data-id del botón
        const id = Number(boton.dataset.id);
        const producto = productos.find(p => p.id === id);
        if (!producto) return;

        // Agrega el producto al carrito usando la función de carrito.js
        agregarAlCarrito(producto);

        // Feedback visual: cambia el botón a estado "en carrito" durante 1.5s.
        // Se guarda el contenido original para restaurarlo después con setTimeout.
        const contenidoOriginal = boton.innerHTML;
        boton.innerHTML = '✓ EN CARRITO';
        boton.disabled = true;
        boton.style.backgroundColor = '#10b981';
        boton.style.borderColor = '#10b981';

        setTimeout(() => {
            boton.innerHTML = contenidoOriginal;
            boton.disabled = false;
            boton.style.backgroundColor = '';
            boton.style.borderColor = '';
        }, 1500);

        // Notificación con el mixin de SweetAlert2 configurado arriba.
        // Reemplaza al alert() nativo: no bloquea la interfaz y es personalizable.
        Toast.fire({
            icon: 'success',
            title: `${producto.nombre.toUpperCase()} AÑADIDO`,
            background: '#15973c',
            color: '#ffffff',
            iconColor: '#ffffff'
        });
    });
};


// ─── Inicialización asíncrona ─────────────────────────────────────────────────
// async/await permite escribir código asíncrono de forma legible y secuencial.
// fetch() realiza una petición HTTP al archivo JSON local.
// respuesta.ok verifica que el servidor respondió con un código 200-299.
// Si falla (archivo no encontrado, CORS, etc.), el catch muestra un mensaje
// de error en la grilla en lugar de dejar la página vacía sin explicación.
// IMPORTANTE: este archivo requiere un servidor local (Live Server, npx serve)
// porque fetch() no funciona con el protocolo file:// por seguridad del navegador.

const inicializarIndex = async () => {
    try {
        const respuesta = await fetch('data/productos.json');
        if (!respuesta.ok) throw new Error('Respuesta del servidor no válida');

        const productos = await respuesta.json();

        renderizarGrilla(productos);
        configurarEventosGrilla(productos);
        actualizarContadorNavbar();

    } catch (error) {
        const grilla = document.querySelector('.productos-grid');
        if (grilla) {
            grilla.innerHTML = `
                <div class="text-center w-100 py-5">
                    <p class="text-danger fw-bold">
                        Error al cargar productos. Abrí el proyecto con Live Server.
                    </p>
                </div>
            `;
        }
    }
};

inicializarIndex();