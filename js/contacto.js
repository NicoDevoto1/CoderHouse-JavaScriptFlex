// ─── contacto.js — Página de contacto ────────────────────────────────────────
// Depende de: carrito.js (cargado antes en el HTML)
// Librerías: Toastify

const TOAST_BASE = {
  duration: 3000,
  gravity: 'bottom',
  position: 'right',
};

const mostrarToast = (texto, exito = true) => {
  Toastify({
    ...TOAST_BASE,
    text: texto,
    style: {
      background: exito ? '#111111' : '#c0392b',
      borderRadius: '0',
      fontFamily: 'inherit',
      fontSize: '14px',
    },
  }).showToast();
};

// ── Validación del formulario ─────────────────────────────────────────────────

const validarEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const inicializarFormulario = () => {
  const formulario = document.querySelector('#form-contacto');
  if (!formulario) return;

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = formulario.querySelector('[name="nombre"]').value.trim();
    const email = formulario.querySelector('[name="email"]').value.trim();
    const mensaje = formulario.querySelector('[name="mensaje"]').value.trim();

    if (!nombre || !email || !mensaje) {
      mostrarToast('Por favor completá todos los campos', false);
      return;
    }

    if (!validarEmail(email)) {
      mostrarToast('Ingresá un email válido', false);
      return;
    }

    mostrarToast(`¡Mensaje enviado, ${nombre}! Nos pondremos en contacto pronto.`);
    formulario.reset();
  });
};

// ── Inicialización ────────────────────────────────────────────────────────────

actualizarContadorNavbar();
inicializarFormulario();