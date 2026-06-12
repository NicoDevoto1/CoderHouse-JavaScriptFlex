// =============================================================================
// KONDOR - Lógica y Validación de Contacto (contacto.js)
// =============================================================================

/**
 * Configuración por defecto reutilizable para las alertas flotantes de Toastify.
 * @type {Object}
 */
const TOAST_BASE = {
  duration: 3000,
  gravity: 'bottom',
  position: 'right',
};

/**
 * Helper unificado para mostrar alertas estilizadas de feedback.
 * @param {string} texto - Mensaje a mostrar.
 * @param {boolean} exito - Define si es una alerta satisfactoria o de error.
 */
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

/**
 * Valida un formato de correo electrónico utilizando una Expresión Regular estricta.
 * @param {string} email - Cadena de texto a comprobar.
 * @returns {boolean} True si cumple el patrón de correo estándar.
 */
const validarEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Inicializa el formulario, captura el evento submit e implementa validaciones no bloqueantes.
 */
const inicializarFormulario = () => {
  const formulario = document.querySelector('#form-contacto');
  if (!formulario) return;

  formulario.addEventListener('submit', (e) => {
    // Previene la recarga nativa de la página para gestionar el proceso con JS
    e.preventDefault();

    // Captura limpia y remoción de espacios innecesarios (trim)
    const nombre = formulario.querySelector('[name="nombre"]').value.trim();
    const email = formulario.querySelector('[name="email"]').value.trim();
    const mensaje = formulario.querySelector('[name="mensaje"]').value.trim();

    // Verificación defensiva de campos requeridos
    if (!nombre || !email || !mensaje) {
      mostrarToast('Por favor, completá todos los campos obligatorios.', false);
      return;
    }

    // Validación de formato lógico
    if (!validarEmail(email)) {
      mostrarToast('Ingresá una dirección de email válida.', false);
      return;
    }

    // Flujo exitoso: informa al usuario y limpia el DOM del formulario
    mostrarToast(`¡Mensaje enviado, ${nombre}! Nos pondremos en contacto pronto.`);
    formulario.reset();
  });
};

// Ejecución inicial del módulo
actualizarContadorNavbar();
inicializarFormulario();