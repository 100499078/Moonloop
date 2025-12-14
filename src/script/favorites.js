// LÓGICA DE BOTONES
function toggleFavorite(buttonElement, packId) {
    const packIdStr = String(packId);

    const email = localStorage.getItem("currentUser");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) return;

    const user = users[userIndex];
    const isFavorite = user.favorites.includes(packIdStr);

    if (isFavorite) {
        user.favorites = user.favorites.filter(id => id !== packIdStr);
    } else {
        user.favorites.push(packIdStr);
    }

    // GUARDAMOS
    localStorage.setItem("users", JSON.stringify(users));

    // ACTUALIZAMOS UI
    buttonElement.classList.toggle("favorite", !isFavorite);
    buttonElement.classList.toggle("not-favorite", isFavorite);

    const textEl = buttonElement.querySelector(".fav-text");
    if (textEl) {
        textEl.textContent = isFavorite
            ? "Añadir a favoritos"
            : "Quitar de favoritos";
    }
}


function updateFavoriteButtons() {
    const user = getCurrentUser();
    if (!user) { return; }
    const favoriteIds = user.favorites.map(String); 

    document.querySelectorAll('.btn-fav').forEach(button => {
        const packId = button.getAttribute('data-pack-id');

        if (favoriteIds.includes(packId)) {
        button.classList.add("favorite");
        button.classList.remove("not-favorite");
        button.querySelector(".fav-text").textContent = "Quitar de favoritos";
        } else {
        button.classList.add("not-favorite");
        button.classList.remove("favorite");
        button.querySelector(".fav-text").textContent = "Añadir a favoritos";
        }
    });
}

// LÓGICA DE CARGA EN PÁGINA DE PERFIL 
function loadFavorites(user) {
    const container = document.getElementById("favorites-container");
    if (!container) return;
    
    if (!user.favorites.length) {
        container.innerHTML = "<p>No tienes favoritos aún.</p>";
        return;
    }

    container.innerHTML = "";

    user.favorites.forEach(id => {
        const pack = PACKS.find(p => p.id === id); 
        if (!pack) return;

        container.innerHTML += `
            <div class="favorite-card">
                <img src="${pack.imagen}" alt="${pack.nombre}" class="favorite-img">

                <div class="favorite-info">
                <h3 class="favorite-title">${pack.nombre}</h3>
                <p class="favorite-meta">
                    ${pack.pais} · ${pack.duracion}
                </p>
                </div>

                <div class="favorite-actions">
                <a href="pack.html?id=${pack.id}" class="btn-primary">
                    Ver viaje
                </a>
                <button
                    class="btn-secondary btn-remove"
                    onclick="removeFavorite('${pack.id}'); location.reload();">
                    Quitar
                </button>
                </div>
            </div>
            `;
    });
}

// Función para sincronizar el estado del botón de favorito
function syncFavButton(btn, packId) {
  const user = getCurrentUser();
  const packIdStr = String(packId);

  const isFav = !!(user && Array.isArray(user.favorites) && user.favorites.map(String).includes(packIdStr));

  btn.classList.toggle("favorite", isFav);
  btn.classList.toggle("not-favorite", !isFav);

  const textEl = btn.querySelector(".fav-text");
  if (textEl) textEl.textContent = isFav ? "Quitar de favoritos" : "Añadir a favoritos";
}

// CÓDIGO DE INICIO (DOMContentLoaded)
document.addEventListener("DOMContentLoaded", () => {
    // Si estamos en la página de Perfil Y los contenedores existen:
    if (document.getElementById("favorites-container") && typeof getCurrentUser === 'function') {
        const user = getCurrentUser();
        // Nota: Solo redireccionar si realmente lo necesitas
        /*
        if (!user) { window.location.href = "acceso_user.html"; return; }
        */
        if (user) loadFavorites(user);
    }
    
    // La función updateFavoriteButtons() se llama al final de tipo_compania.js
    // para asegurar que se ejecuta después de que el HTML de los packs se ha creado.
});
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-fav");
    if (!btn) return;
    e.preventDefault();

    const packId = btn.dataset.packId;
    toggleFavorite(btn, packId);
});