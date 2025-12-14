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

// ----- Carga de experiencias y consejos -----

const contenedor          = document.getElementById('lista-experiencias');
const contenedorConsejos  = document.getElementById('lista-consejos');

const radioRecientes = document.getElementById('orden-recientes');
const radioLikes     = document.getElementById('orden-likes');

let experienciasBase = [];
let consejosBase     = [];

// ---- EXPERIENCIAS ----
function obtenerPais(exp) {
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

function pintarExperiencias(lista) {
  if (!contenedor) return;
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

if (contenedor && window.EXPERIENCIAS) {
  const base = [...window.EXPERIENCIAS];

  // cargar las experiencias creadas por usuarios
  const userExtra = JSON.parse(localStorage.getItem('experienciasUsuario') || '[]');

  // opcional: asignarles un id único si no lo traen
  userExtra.forEach((exp, index) => {
    if (!exp.id) {
      exp.id = `USER_EXP_${index}_${Date.now()}`;
    }
  });

  experienciasBase = [...userExtra, ...base]; // primero las nuevas, luego las antiguas
  pintarExperiencias(experienciasBase);
}


// ---- CONSEJOS ----
function pintarConsejos(lista) {
  if (!contenedorConsejos) return;
  contenedorConsejos.innerHTML = '';
  lista.forEach(c => {
    const card = document.createElement('a');
    card.href = `consejo.html?id=${c.id}`;
    card.classList.add('exp-card', 'cons-card');
    card.dataset.likes = c.likes;
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

if (contenedorConsejos && window.CONSEJOS) {
  const baseCons = [...window.CONSEJOS];

  // consejos creados por usuarios
  const userCons = JSON.parse(localStorage.getItem('consejosUsuario') || '[]');

  // por si alguno viene sin id
  userCons.forEach((c, index) => {
    if (!c.id) {
      c.id = `USER_CON_${index}_${Date.now()}`;
    }
  });

  // primero los del usuario, luego los base
  consejosBase = [...userCons, ...baseCons];
  pintarConsejos(consejosBase);
}


// ----- Ordenar por más recientes / más likes -----

if (radioLikes) {
  radioLikes.addEventListener('change', () => {
    if (!radioLikes.checked) return;

    if (experienciasBase.length) {
      const ordenadasExp = [...experienciasBase].sort((a, b) => b.likes - a.likes);
      pintarExperiencias(ordenadasExp);
    }
    if (consejosBase.length) {
      const ordenadasCons = [...consejosBase].sort((a, b) => b.likes - a.likes);
      pintarConsejos(ordenadasCons);
    }
  });
}

if (radioRecientes) {
  radioRecientes.addEventListener('change', () => {
    if (!radioRecientes.checked) return;

    if (experienciasBase.length) pintarExperiencias(experienciasBase);
    if (consejosBase.length)     pintarConsejos(consejosBase);
  });
}


// ----- Likes por usuario (toggle) -----
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.like-btn');
  if (!btn) return;
  e.preventDefault();

  // comprobar login
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    localStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
    window.location.href = 'acceso_user.html';
    return;
  }

  const id = btn.dataset.id; // mismo id para experiencia o consejo
  const span = btn.querySelector('.like-count');
  let count = parseInt(span.textContent, 10) || 0;

  // cargar likes del usuario
  const allLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
  const userLikes = allLikes[currentUser] || [];

  const index = userLikes.indexOf(id);
  if (index === -1) {
    userLikes.push(id);
    count += 1;
    btn.classList.add('liked');
  } else {
    userLikes.splice(index, 1);
    count = Math.max(0, count - 1);
    btn.classList.remove('liked');
  }

  allLikes[currentUser] = userLikes;
  localStorage.setItem('userLikes', JSON.stringify(allLikes));
  span.textContent = count;
});



function getUserLikes() {
  const current = localStorage.getItem('currentUser');
  if (!current) return null; // no logueado
  const all = JSON.parse(localStorage.getItem('userLikes') || '{}');
  return { current, all, list: all[current] || [] };
}

function saveUserLikes(current, all, list) {
  all[current] = list;
  localStorage.setItem('userLikes', JSON.stringify(all));
}




// referencias a los botones de la sidebar
const btnAddExp = document.getElementById('sidebar-add-exp');
const btnAddCons = document.getElementById('sidebar-add-cons');
const sidebarExpText = document.getElementById('sidebar-exp-text');
const sidebarConsText = document.getElementById('sidebar-cons-text');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tab = btn.dataset.tab;

    if (tab === 'experiencias') {
  tabExperiencias.classList.remove('hidden');
  tabForo.classList.add('hidden');
  if (sidebarExpText) sidebarExpText.classList.remove('hidden');
  if (sidebarConsText) sidebarConsText.classList.add('hidden');

  // mostrar SOLO añadir experiencia
  if (btnAddExp) btnAddExp.classList.remove('hidden');
  if (btnAddCons) btnAddCons.classList.add('hidden');

  // NUEVO: modo foro desactivado
  document.body.classList.remove('modo-foro');
} else if (tab === 'foro') { // tu pestaña de consejos/foro
  tabForo.classList.remove('hidden');
  tabExperiencias.classList.add('hidden');

  // mostrar SOLO añadir consejo
  if (btnAddExp) btnAddExp.classList.add('hidden');
  if (btnAddCons) btnAddCons.classList.remove('hidden');

  if (sidebarExpText) sidebarExpText.classList.add('hidden');
  if (sidebarConsText) sidebarConsText.classList.remove('hidden');
  // NUEVO: modo foro activado
  document.body.classList.add('modo-foro');
}

  });
});


// ----- Proteger botones "Añadir experiencia / consejo" -----
document.addEventListener('DOMContentLoaded', () => {
  const btnAddExp  = document.getElementById('sidebar-add-exp');
  const btnAddCons = document.getElementById('sidebar-add-cons');

  function userIsLogged() {
    // en usuario.js guardas "currentUser" al hacer login
    return localStorage.getItem('currentUser') !== null;
  }

  function protegerBotonAdd(boton, destinoPrivado) {
    if (!boton) return;
    boton.addEventListener('click', (e) => {
      if (!userIsLogged()) {
        e.preventDefault();
        localStorage.setItem('redirectAfterLogin', destinoPrivado);
        window.location.href = 'acceso_user.html';
      } else {
        // opcional: forzar el destino correcto
        e.preventDefault();
        window.location.href = destinoPrivado;
      }
    });
  }

  protegerBotonAdd(btnAddExp,  'nueva_experiencia.html');
  protegerBotonAdd(btnAddCons, 'nuevo_consejo.html');
});
