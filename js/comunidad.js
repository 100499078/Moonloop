// ----- Tabs Experiencias / Foro -----
const tabButtons = document.querySelectorAll('.tab-btn');
const tabExperiencias = document.getElementById('tab-experiencias');
const tabForo = document.getElementById('tab-foro');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tab = btn.dataset.tab;
    if (tab === 'experiencias') {
      tabExperiencias.classList.remove('hidden');
      tabForo.classList.add('hidden');
    } else {
      tabForo.classList.remove('hidden');
      tabExperiencias.classList.add('hidden');
    }
  });
});

// ----- Buscador por texto -----
const buscador = document.getElementById('buscador-comunidad');

if (buscador) {
  buscador.addEventListener('input', () => {
    const term = buscador.value.toLowerCase();
    document.querySelectorAll('.exp-card').forEach(card => {
      const texto = card.innerText.toLowerCase();
      card.style.display = texto.includes(term) ? '' : 'none';
    });
  });
}

// ----- Filtro por país -----
const filtroPais = document.getElementById('filtro-pais');

if (filtroPais) {
  filtroPais.addEventListener('change', () => {
    const valor = filtroPais.value;
    document.querySelectorAll('#tab-experiencias .exp-card').forEach(card => {
      const pais = card.dataset.pais;
      if (valor === 'todos' || pais === valor) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ----- Carga de experiencias -----
// EXPERIENCIAS viene de experiencias.js (incluido antes en el HTML)

const contenedor = document.getElementById('lista-experiencias');

function obtenerPais(exp) {
  // mapeo rápido por id o por pack_asociado
  if (exp.id === 'EXP001') return 'japon';
  if (exp.id === 'EXP002' || exp.id === 'EXP011') return 'kenia';
  if (exp.id === 'EXP003' || exp.id === 'EXP008') return 'peru';
  if (exp.id === 'EXP004') return 'colombia';
  if (exp.id === 'EXP005') return 'vietnam';
  if (exp.id === 'EXP006') return 'panama';
  if (exp.id === 'EXP007') return 'islandia';
  if (exp.id === 'EXP009') return 'turquia';
  if (exp.id === 'EXP010') return 'filipinas';
  if (exp.id === 'EXP012') return 'japon';
  return 'otros';
}

if (contenedor && window.EXPERIENCIAS) {
  const experienciasBase = [...window.EXPERIENCIAS]; // copia

  function pintarExperiencias(lista) {
    contenedor.innerHTML = '';
    lista.forEach(exp => {
      const link = document.createElement('a');
      link.href = `experiencias.html?id=${exp.id}`;
      link.classList.add('exp-card');

      link.dataset.pais = obtenerPais(exp);

      link.innerHTML = `
        <div class="exp-img">
          <img src="${exp.imagen1}" alt="${exp.titulo}">
        </div>
        <div class="exp-content">
          <h3>${exp.titulo}</h3>
          <p>${exp.subtitulo}</p>
          <div class="exp-meta">
            <span class="exp-pais">${exp.autor}</span>
            <button class="like-btn" data-id="${exp.id}">
              ♡ <span class="like-count">${exp.likes}</span>
            </button>
          </div>
        </div>
      `;
      contenedor.appendChild(link);
    });
  }

  // pinta inicialmente (más recientes = orden original)
  pintarExperiencias(experienciasBase);

  // ----- Ordenar por más recientes / más likes -----
  const radioRecientes = document.getElementById('orden-recientes');
  const radioLikes = document.getElementById('orden-likes');

  if (radioLikes) {
    radioLikes.addEventListener('change', () => {
      if (!radioLikes.checked) return;
      const ordenadas = [...experienciasBase].sort((a, b) => b.likes - a.likes);
      pintarExperiencias(ordenadas);
    });
  }

  if (radioRecientes) {
    radioRecientes.addEventListener('change', () => {
      if (!radioRecientes.checked) return;
      pintarExperiencias(experienciasBase);
    });
  }
}

// ----- Carga de consejos (Foro/Consejos) -----

const contenedorConsejos = document.getElementById('lista-consejos');

if (contenedorConsejos && window.CONSEJOS) {
  const consejosBase = [...window.CONSEJOS];

  function pintarConsejos(lista) {
    contenedorConsejos.innerHTML = '';
    lista.forEach(c => {
      const card = document.createElement('a');
      card.href = `consejo.html?id=${c.id}`;
      card.classList.add('exp-card');   // reutiliza estilos de tarjeta
      card.innerHTML = `
        <div class="exp-content">
          <h3>${c.titulo}</h3>
          <p>${c.subtitulo}</p>
          <div class="exp-meta">
            <span class="exp-pais">${c.autor}</span>
            <button class="like-btn" data-id="${c.id}" data-tipo="consejo">
              ♡ <span class="like-count">${c.likes}</span>
            </button>
          </div>
        </div>
      `;
      contenedorConsejos.appendChild(card);
    });
  }

  pintarConsejos(consejosBase);
}


// ----- Manejo de likes (solo en front, sin backend) -----
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.like-btn');
  if (!btn) return;

  e.preventDefault(); // que no navegue al hacer clic en el corazón
  const id = btn.dataset.id;
  const span = btn.querySelector('.like-count');
  let current = parseInt(span.textContent, 10) || 0;
  current += 1;
  span.textContent = current;
});




