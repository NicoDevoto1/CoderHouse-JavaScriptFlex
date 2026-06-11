// =============================================================================
// carrito.js — Módulo compartido de gestión del carrito
// =============================================================================
// Este archivo se carga en TODAS las páginas del sitio antes del script
// específico de cada una. Expone funciones globales que los demás scripts
// consumen para leer, modificar y sincronizar el estado del carrito.
//
// Tecnología utilizada: localStorage del navegador, que permite persistir
// los datos del carrito entre páginas y sesiones sin necesidad de un servidor.
// =============================================================================


// ─── Constante de clave de almacenamiento ────────────────────────────────────
// Centralizar la clave evita errores de tipeo si se usa en varios archivos.

const STORAGE_KEY = 'kondor_carrito';


// ─── Lectura y escritura en localStorage ─────────────────────────────────────

// Devuelve el array de items del carrito guardado en localStorage.
// Si no existe aún (primera visita), retorna un array vacío como valor por defecto.
// JSON.parse convierte el string guardado de vuelta a un array de objetos JavaScript.
const obtenerCarrito = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Guarda el array del carrito en localStorage serializado como string JSON.
// Se llama después de cada operación que modifica el estado del carrito.
const guardarCarrito = (carrito) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));


// ─── Agregar producto al carrito ─────────────────────────────────────────────
// Recibe un objeto producto completo (id, nombre, precio, imagen, etc.).
// Primero busca si el producto ya existe en el carrito usando Array.find().
// Si existe: incrementa su cantidad en 1.
// Si es nuevo: lo agrega al array con cantidad inicial 1.
// El spread operator ({ ...producto }) copia las propiedades del objeto
// original sin mutarlo, y le suma la propiedad cantidad.

const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  const existente = carrito.find(item => item.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContadorNavbar();
};


// ─── Eliminar producto del carrito ───────────────────────────────────────────
// Array.filter crea un nuevo array excluyendo el item con el id recibido.
// No muta el array original sino que retorna uno nuevo → buena práctica
// de programación funcional. Luego guarda y sincroniza la navbar.

const eliminarDelCarrito = (id) => {
  const carrito = obtenerCarrito().filter(item => item.id !== id);
  guardarCarrito(carrito);
  actualizarContadorNavbar();
};


// ─── Actualizar cantidad de un item ──────────────────────────────────────────
// Busca el item por id. Si la nueva cantidad es 0 o menor, lo elimina
// completamente del carrito. De lo contrario, actualiza solo su cantidad.

const actualizarCantidad = (id, nuevaCantidad) => {
  const carrito = obtenerCarrito();
  const item = carrito.find(i => i.id === id);
  if (!item) return;

  if (nuevaCantidad <= 0) {
    eliminarDelCarrito(id);
    return;
  }

  item.cantidad = nuevaCantidad;
  guardarCarrito(carrito);
};


// ─── Utilidades de cálculo ───────────────────────────────────────────────────

// Array.reduce recorre el carrito acumulando el subtotal de cada item
// (precio unitario × cantidad), partiendo desde un acumulador inicial de 0.
const calcularTotal = (carrito) =>
  carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);

// Suma las cantidades individuales de todos los items para el contador de navbar.
const cantidadTotalItems = (carrito) =>
  carrito.reduce((acum, item) => acum + item.cantidad, 0);

// Formatea un número al estilo monetario argentino.
// toLocaleString('es-AR') convierte 42000 → "42.000" con punto como separador.
const formatearPrecio = (precio) =>
  `$${precio.toLocaleString('es-AR')}`;


// ─── Sincronización del contador en la navbar ─────────────────────────────────
// Actualiza el texto de todos los botones de carrito visibles en la página.
// querySelectorAll devuelve un NodeList con todos los elementos que coinciden
// con la clase (desktop y mobile), y forEach los actualiza a todos a la vez.
// Se llama automáticamente después de cada modificación del carrito.

const actualizarContadorNavbar = () => {
  const carrito = obtenerCarrito();
  const cantidad = cantidadTotalItems(carrito);
  document.querySelectorAll('.btn-carrito-limpio').forEach(btn => {
    btn.textContent = `CARRITO (${cantidad})`;
  });
};