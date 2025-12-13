// nuevo_consejo.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-nuevo-consejo');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre   = document.getElementById('cons-nombre').value.trim();
    const titulo   = document.getElementById('cons-titulo').value.trim();
    const resumen = document.getElementById('cons-resumen').value.trim();
    const texto    = document.getElementById('cons-texto').value.trim();

    if (!nombre || !titulo || !resumen || !texto) {
      alert('Rellena todos los campos de texto.');
      return;
    }

    const nuevoConsejo = {
      id: Date.now(),
      nombre,
      titulo,
      resumen,
      texto
    };

    const guardados = JSON.parse(localStorage.getItem('consejos_usuario') || '[]');
    guardados.push(nuevoConsejo);
    localStorage.setItem('consejos_usuario', JSON.stringify(guardados));

    alert('¡Gracias por compartir tu consejo!');
    window.location.href = 'comunidad.html#tab-foro';
  });
});
