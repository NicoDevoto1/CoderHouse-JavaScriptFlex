// ─── index.js — Página principal ─────────────────────────────────────────────
// Depende de: carrito.js (cargado antes en el HTML)
// Librerías: Toastify

const ASSETS_INDEX = 'assets/';

// ── Construcción de la tarjeta de producto ────────────────────────────────────

const crearTarjetaProducto = (producto) => {
  const articulo = document.createElement('article');
  articulo.className = 'product-card';

  articulo.innerHTML = `
    <div class="img-container">
      <img
        src="${ASSETS_INDEX}${producto.imagen}"
        alt="${producto.alt}"
        loading="lazy"
      >
    </div>
    <div class="product-info">
      <h4>${producto.nombre}</h4>
      <p>${formatearPrecio(producto.precio)}</p>
      <button class="btn-agregar-carrito" data-id="${producto.id}">
        Agregar al carrito
      </button>
    </div>
  `;

  return articulo;
};

// ── Renderizado de la grilla completa ─────────────────────────────────────────

const renderizarGrilla = (productos) => {
  const grilla = document.querySelector('.productos-grid');
  if (!grilla) return;

  grilla.innerHTML = '';
  productos.forEach(producto => grilla.appendChild(crearTarjetaProducto(producto)));

  // Delegación de eventos: un solo listener para toda la grilla
  grilla.addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-agregar-carrito');
    if (!boton) return;

    const id = Number(boton.dataset.id);
    const producto = productos.find(p => p.id === id);

    agregarAlCarrito(producto);

    Toastify({
      text: `✓ ${producto.nombre} agregado al carrito`,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      style: {
        background: '#111111',
        borderRadius: '0',
        fontFamily: 'inherit',
        fontSize: '14px',
        padding: '12px 20px',
      },
    }).showToast();
  });
};

// ── Inicialización ────────────────────────────────────────────────────────────

const inicializarIndex = async () => {
  try {
    const respuesta = await fetch('data/productos.json');
    const productos = await respuesta.json();
    renderizarGrilla(productos);
    actualizarContadorNavbar();
  } catch {
    // Fetch fallido: el contenido estático del HTML permanece visible
  }
};

inicializarIndex();