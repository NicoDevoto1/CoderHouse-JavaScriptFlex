// =============================================================================
// KONDOR - Módulo compartido de gestión del carrito (carrito.js)
// =============================================================================

/**
 * Clave única para centralizar el almacenamiento en LocalStorage.
 * Evita errores de tipeo a lo largo del proyecto.
 * @type {string}
 */
const STORAGE_KEY = 'kondor_carrito';

/**
 * Obtiene de forma segura los productos almacenados en el LocalStorage.
 * Aplica programación defensiva mediante try/catch para prevenir fallos 
 * si el almacenamiento contiene datos corruptos o JSON inválidos.
 * @returns {Array<Object>} Lista de productos en el carrito o array vacío.
 */
const obtenerCarrito = () => {
  try {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    // Si existen datos, los parsea; de lo contrario, inicializa un array vacío.
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  } catch (error) {
    // Si el JSON está corrupto, limpia el registro erróneo y retorna un array seguro.
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

/**
 * Serializa y guarda el estado actual del carrito en LocalStorage.
 * @param {Array<Object>} carrito - El array de productos actualizado.
 */
const guardarCarrito = (carrito) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
};

/**
 * Agrega un producto al carrito aplicando el principio de inmutabilidad con ES6.
 * Si el producto existe, incrementa su cantidad. Si no, lo inicializa en 1.
 * @param {Object} producto - Objeto completo del producto a agregar.
 */
const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  // Uso de Array.find() para buscar referencias existentes por ID único.
  const existente = carrito.find(item => item.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    // Uso del operador Spread (...) para copiar propiedades y añadir "cantidad" de forma segura
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContadorNavbar();
};

/**
 * Remueve un producto completo del carrito utilizando filtrado funcional.
 * @param {number} id - ID único del producto a eliminar.
 */
const eliminarDelCarrito = (id) => {
  // Array.filter() genera un nuevo array excluyendo el ID seleccionado (no muta el original)
  const carrito = obtenerCarrito().filter(item => item.id !== id);
  guardarCarrito(carrito);
  actualizarContadorNavbar();
};

/**
 * Actualiza la cantidad específica de un ítem. Si la cantidad baja a 0, lo elimina.
 * @param {number} id - ID del producto.
 * @param {number} nuevaCantidad - Nueva cantidad asignada por el usuario.
 */
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
  actualizarContadorNavbar();
};

/**
 * Calcula el monto total acumulado utilizando programación funcional.
 * @param {Array<Object>} carrito - Estado actual del carrito.
 * @returns {number} Suma total en formato numérico.
 */
const calcularTotal = (carrito) =>
  // Recorre el array acumulando el precio multiplicado por la cantidad (acumulador inicial: 0)
  carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);

/**
 * Cuenta la cantidad total de unidades físicas en el carrito para la interfaz.
 * @param {Array<Object>} carrito - Estado actual del carrito.
 * @returns {number} Suma de todas las cantidades.
 */
const cantidadTotalItems = (carrito) =>
  carrito.reduce((acum, item) => acum + item.cantidad, 0);

/**
 * Utilidad internacional de formateo para la moneda local argentina (ARS).
 * @param {number} precio - Valor numérico bruto.
 * @returns {string} String formateado (ej: $42.000)
 */
const formatearPrecio = (precio) =>
  `$${precio.toLocaleString('es-AR')}`;

/**
 * Sincroniza en tiempo real todos los contadores de la Navbar (Desktop y Mobile).
 * Utiliza NodeList.forEach para asegurar consistencia en la UI.
 */
const actualizarContadorNavbar = () => {
  const carrito = obtenerCarrito();
  const cantidad = cantidadTotalItems(carrito);
  document.querySelectorAll('.btn-carrito-limpio').forEach(btn => {
    btn.textContent = `CARRITO (${cantidad})`;
  });
};