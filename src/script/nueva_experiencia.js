document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-nueva-exp');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('exp-nombre').value.trim();
    const titulo = document.getElementById('exp-titulo').value.trim();
    const resumen = document.getElementById('exp-resumen').value.trim();
    const descripcion = document.getElementById('exp-descripcion').value.trim();
    
    if (!nombre || !titulo || !descripcion) {
      alert('Por favor, rellena todos los campos de texto.');
      return;
    }

    // De momento solo guardamos una “experiencia borrador” en localStorage
    const nuevaExp = {
      id: Date.now(),
      nombre,
      titulo,
      resumen,
      descripcion
    };

    const guardadas = JSON.parse(localStorage.getItem('experiencias_usuario') || '[]');
    guardadas.push(nuevaExp);
    localStorage.setItem('experiencias_usuario', JSON.stringify(guardadas));

    alert('¡Gracias por compartir tu experiencia!');
    window.location.href = 'comunidad.html#tab-experiencias';
  });
});
