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
const todasCards = document.querySelectorAll('.exp-card');

if (buscador) {
  buscador.addEventListener('input', () => {
    const term = buscador.value.toLowerCase();

    todasCards.forEach(card => {
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

