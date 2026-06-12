// =============================================================================
// KONDOR - Gestión de Interfaz y Cierre Comercial (carritoPage.js)
// =============================================================================

const ASSETS_CARRITO = '../assets/';

/**
 * Variable global simulada para mantener el descuento activo en la sesión.
 * @type {number}
 */
let porcentajeDescuento = 0;

/**
 * Base de datos simulada de cupones válidos.
 * @type {Array<Object>}
 */
const CUPONES_VALIDOS = [
  { codigo: 'KONDOR10', descuento: 0.10 },
  { codigo: 'PROMOJS', descuento: 0.20 }
];

/**
 * Renderiza de forma dinámica la lista de productos del carrito y los totales.
 */
const renderizarPaginaCarrito = () => {
  const carrito = obtenerCarrito();
  const lista = document.querySelector('.carrito-lista');
  const tituloCarrito = document.querySelector('#titulo-carrito');
  const spanSubtotal = document.querySelector('#subtotal');
  const spanTotal = document.querySelector('#total');

  if (!lista) return;

  const cantidad = cantidadTotalItems(carrito);
  if (tituloCarrito) tituloCarrito.textContent = `MI CARRITO (${cantidad})`;

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
    porcentajeDescuento = 0;
    return;
  }

  lista.innerHTML = carrito.map(({ id, nombre, precio, cantidad, imagen, categoria, genero }) => `
    <article class="carrito-item d-flex align-items-center gap-3" data-id="${id}">
      <div class="carrito-img">
        <img src="${ASSETS_CARRITO}${imagen}" alt="${nombre}">
      </div>
      <div class="carrito-info d-flex flex-column flex-md-row justify-content-between w-100 align-items-md-center gap-2">
        <div>
          <h3 class="m-0 fs-5 fw-bold">${nombre.toUpperCase()}</h3>
          <p class="text-muted small m-0">${categoria} · ${genero}</p>
        </div>
        <div class="cantidad-selector d-flex align-items-center border">
          <button class="btn btn-sm btn-restar" data-id="${id}">-</button>
          <input type="number" value="${cantidad}" readonly>
          <button class="btn btn-sm btn-sumar" data-id="${id}">+</button>
        </div>
        <p class="m-0 fw-bold">${formatearPrecio(precio * cantidad)}</p>
        <button class="btn-eliminar" data-id="${id}">&times;</button>
      </div>
    </article>
  `).join('');

  const subtotal = calcularTotal(carrito);
  const montoDescuento = subtotal * porcentajeDescuento;
  const totalFinal = subtotal - montoDescuento;

  if (spanSubtotal) spanSubtotal.textContent = formatearPrecio(subtotal);
  if (spanTotal) spanTotal.textContent = formatearPrecio(totalFinal);
};

/**
 * --- ACTUALIZADO: Configuración de notificación personalizada ---
 * Aplica confirmaciones mediante SweetAlert2 y notifica la eliminación
 * con un Toast en la parte superior derecha, fondo rojo y texto blanco.
 * @param {number} id - ID del producto.
 * @param {string} nombreProducto - Nombre del ítem.
 */
/**
 * Notificación tipo Pop-up arriba a la derecha.
 * Configurada con colores Kondor, barra de progreso y letras blancas.
 */
// =============================================================================
// KONDOR - Configuración del Mixin para Pop-ups Flotantes (Toasts)
// =============================================================================
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',         // Posiciona el pop-up arriba a la derecha de la pantalla
  showConfirmButton: false,    // Oculta el botón de "OK" para que actúe como notificación
  showCloseButton: true,       // ¡AÑADIDO! Muestra la cruz (X) para cierre anticipado manual
  timer: 3000,                 // Duración visible antes de auto-cerrarse (3 segundos)
  timerProgressBar: true,      // Muestra la barra de tiempo/progreso inferior completa
  didOpen: (toast) => {
    // Control de eventos: detiene el temporizador si el usuario pasa el mouse por encima
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
/**
 * Confirmación de eliminación con SweetAlert2 y Pop-up personalizado.
 */
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

    // AQUÍ ESTÁ EL POP-UP ROJO QUE APARECE ARRIBA A LA DERECHA
    Toast.fire({
      icon: 'success',
      title: `Eliminaste: ${nombreProducto}`,
      background: '#c0392b', // FONDO ROJO
      color: '#ffffff',      // LETRAS BLANCAS
      iconColor: '#ffffff'   // ICONO BLANCO
    });
  });
};

/**
 * Control lógico de delegación de eventos.
 */
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

/**
 * Inicialización del Circuito de Cupones.
 */
const inicializarSistemaCupones = () => {
  const btnAplicar = document.querySelector('#btn-aplicar-cupon');
  const inputCupon = document.querySelector('#input-cupon');
  
  if (!btnAplicar || !inputCupon) return;

  btnAplicar.addEventListener('click', () => {
    const codigoIngresado = inputCupon.value.trim().toUpperCase();
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      Swal.fire({ title: 'Operación Inválida', text: 'Agregá productos antes de aplicar un cupón.', icon: 'info', confirmButtonColor: '#111111' });
      return;
    }

    const cuponEncontrado = CUPONES_VALIDOS.find(c => c.codigo === codigoIngresado);

    if (cuponEncontrado) {
      porcentajeDescuento = cuponEncontrado.descuento;
      renderizarPaginaCarrito();
      
      Swal.fire({
        title: '¡Cupón Aplicado!',
        text: `Se aplicó un ${(porcentajeDescuento * 100)}% de descuento.`,
        icon: 'success',
        confirmButtonColor: '#111111'
      });
    } else {
      Swal.fire({
        title: 'Cupón Inválido',
        text: 'Código inexistente.',
        icon: 'error',
        confirmButtonColor: '#111111'
      });
    }
  });
};

/**
 * Finaliza la transacción simulada.
 */
const manejarFinalizarCompra = () => {
  const btnFinalizar = document.querySelector('#btn-finalizar');
  if (!btnFinalizar) return;

  btnFinalizar.addEventListener('click', () => {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      Toastify({
        text: 'Tu carrito está vacío',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: { background: '#c0392b', color: '#ffffff' },
      }).showToast();
      return;
    }

    const subtotal = calcularTotal(carrito);
    const totalConDescuento = subtotal - (subtotal * porcentajeDescuento);

    Swal.fire({
      title: '¿Confirmás tu compra?',
      html: `Monto Final: <strong>${formatearPrecio(totalConDescuento)}</strong>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Volver',
      confirmButtonColor: '#111111',
    }).then(resultado => {
      if (!resultado.isConfirmed) return;

      guardarCarrito([]);
      porcentajeDescuento = 0;
      actualizarContadorNavbar();
      renderizarPaginaCarrito();

      Swal.fire({
        title: '¡Compra realizada!',
        text: 'Pedido procesado con éxito.',
        icon: 'success',
        confirmButtonColor: '#111111',
      });
    });
  });
};

// Inicializaciones
actualizarContadorNavbar();
renderizarPaginaCarrito();
manejarEventosLista();
inicializarSistemaCupones();
manejarFinalizarCompra();