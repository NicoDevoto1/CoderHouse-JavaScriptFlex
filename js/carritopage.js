// ─── carritoPage.js — Página del carrito ─────────────────────────────────────
// Depende de: carrito.js (cargado antes en el HTML)
// Librerías: Toastify, SweetAlert2

const ASSETS_CARRITO = '../assets/';

// ── Renderizado completo de la página ─────────────────────────────────────────

const renderizarPaginaCarrito = () => {
  const carrito = obtenerCarrito();
  const lista = document.querySelector('.carrito-lista');
  const tituloCarrito = document.querySelector('#titulo-carrito');
  const spanSubtotal = document.querySelector('#subtotal');
  const spanTotal = document.querySelector('#total');

  if (!lista) return;

  const cantidad = cantidadTotalItems(carrito);
  if (tituloCarrito) tituloCarrito.textContent = `MI CARRITO (${cantidad})`;

  // Estado vacío
  if (carrito.length === 0) {
    lista.innerHTML = `
      <div class="text-center py-5">
        <p class="text-muted mb-4">Tu carrito está vacío.</p>
        <a href="../index.html" class="btn btn-dark rounded-0 px-4 py-2 fw-bold">
          Seguir comprando
        </a>
      </div>
    `;
    if (spanSubtotal) spanSubtotal.textContent = '$0';
    if (spanTotal) spanTotal.textContent = '$0';
    return;
  }

  // Renderiza cada item del carrito
  lista.innerHTML = carrito.map(item => `
    <article class="carrito-item d-flex align-items-center gap-3" data-id="${item.id}">
      <div class="carrito-img">
        <img src="${ASSETS_CARRITO}${item.imagen}" alt="${item.nombre}">
      </div>
      <div class="carrito-info d-flex flex-column flex-md-row justify-content-between w-100 align-items-md-center gap-2">
        <div>
          <h3 class="m-0 fs-5 fw-bold">${item.nombre.toUpperCase()}</h3>
          <p class="text-muted small m-0">${item.categoria} · ${item.genero}</p>
        </div>
        <div class="cantidad-selector d-flex align-items-center border">
          <button class="btn btn-sm btn-restar" data-id="${item.id}">-</button>
          <input type="number" value="${item.cantidad}" readonly>
          <button class="btn btn-sm btn-sumar" data-id="${item.id}">+</button>
        </div>
        <p class="m-0 fw-bold">${formatearPrecio(item.precio * item.cantidad)}</p>
        <button class="btn-eliminar" data-id="${item.id}">&times;</button>
      </div>
    </article>
  `).join('');

  // Actualiza totales
  const total = calcularTotal(carrito);
  if (spanSubtotal) spanSubtotal.textContent = formatearPrecio(total);
  if (spanTotal) spanTotal.textContent = formatearPrecio(total);
};

// ── Confirmación de eliminación con SweetAlert2 ───────────────────────────────

const confirmarEliminar = (id, nombreProducto) => {
  Swal.fire({
    title: '¿Eliminás este producto?',
    text: nombreProducto,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#c0392b',
    cancelButtonColor: '#111111',
  }).then(resultado => {
    if (!resultado.isConfirmed) return;

    eliminarDelCarrito(id);
    renderizarPaginaCarrito();

    Toastify({
      text: 'Producto eliminado del carrito',
      duration: 2500,
      gravity: 'bottom',
      position: 'right',
      style: {
        background: '#c0392b',
        borderRadius: '0',
        fontFamily: 'inherit',
        fontSize: '14px',
      },
    }).showToast();
  });
};

// ── Eventos de la lista (delegación) ─────────────────────────────────────────

const manejarEventosLista = () => {
  const lista = document.querySelector('.carrito-lista');
  if (!lista) return;

  lista.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === id);
    if (!item) return;

    if (e.target.matches('.btn-restar')) {
      if (item.cantidad > 1) {
        actualizarCantidad(id, item.cantidad - 1);
        renderizarPaginaCarrito();
      } else {
        confirmarEliminar(id, item.nombre);
      }
    }

    if (e.target.matches('.btn-sumar')) {
      actualizarCantidad(id, item.cantidad + 1);
      renderizarPaginaCarrito();
    }

    if (e.target.matches('.btn-eliminar')) {
      confirmarEliminar(id, item.nombre);
    }
  });
};

// ── Finalizar compra con SweetAlert2 ─────────────────────────────────────────

const manejarFinalizarCompra = () => {
  const btnFinalizar = document.querySelector('#btn-finalizar');
  if (!btnFinalizar) return;

  btnFinalizar.addEventListener('click', () => {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      Toastify({
        text: 'Tu carrito está vacío',
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: { background: '#c0392b', borderRadius: '0', fontFamily: 'inherit' },
      }).showToast();
      return;
    }

    Swal.fire({
      title: '¿Confirmás tu compra?',
      html: `Total: <strong>${formatearPrecio(calcularTotal(carrito))}</strong>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Volver',
      confirmButtonColor: '#111111',
    }).then(resultado => {
      if (!resultado.isConfirmed) return;

      guardarCarrito([]);
      actualizarContadorNavbar();
      renderizarPaginaCarrito();

      Swal.fire({
        title: '¡Compra realizada!',
        text: 'Gracias por tu compra. Pronto recibirás un email de confirmación.',
        icon: 'success',
        confirmButtonColor: '#111111',
      });
    });
  });
};

// ── Inicialización ────────────────────────────────────────────────────────────

actualizarContadorNavbar();
renderizarPaginaCarrito();
manejarEventosLista();
manejarFinalizarCompra();