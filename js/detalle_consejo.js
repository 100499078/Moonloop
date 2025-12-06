function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
  const id = getParam('id');
  const consejo = window.CONSEJOS.find(c => c.id === id);
  if (!consejo) return;

  document.getElementById('consejo-titulo').textContent = consejo.titulo;
  document.getElementById('consejo-subtitulo').textContent = consejo.subtitulo;
  document.getElementById('consejo-autor').textContent = `Por ${consejo.autor}`;
  document.getElementById('consejo-fecha').textContent = consejo.fecha_publicacion;

  document.getElementById('consejo-parrafo1').textContent = consejo.parrafo1;
  document.getElementById('consejo-parrafo2').textContent = consejo.parrafo2;
  document.getElementById('consejo-parrafo3').textContent = consejo.parrafo3;
});
