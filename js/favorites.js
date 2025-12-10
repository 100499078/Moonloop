// Contenido completo para favorites.js

// LÓGICA DE BOTONES (usando tus clases CSS .btn-fav, .favorite, .not-favorite)
function toggleFavorite(buttonElement, packId) {
    // Estas funciones necesitan getCurrentUser, addFavorite, removeFavorite (de usuario.js)
    const user = getCurrentUser();
    if (!user) { alert("Debes iniciar sesión para guardar packs como favoritos."); return; }
    const packIdStr = String(packId); 
    const isFavorite = user.favorites.includes(packIdStr);

    if (isFavorite) {
        removeFavorite(packIdStr); 
        buttonElement.innerHTML = '<span class="icon">♥</span> Añadir a favorito';
        buttonElement.classList.remove('favorite');
        buttonElement.classList.add('not-favorite');
    } else {
        addFavorite(packIdStr); 
        buttonElement.innerHTML = '<span class="icon">♥</span> Quitar favorito';
        buttonElement.classList.remove('not-favorite');
        buttonElement.classList.add('favorite');
    }
}

function updateFavoriteButtons() {
    const user = getCurrentUser();
    if (!user) { return; }
    const favoriteIds = user.favorites.map(String); 

    document.querySelectorAll('.btn-fav').forEach(button => {
        const packId = button.getAttribute('data-pack-id');

        if (favoriteIds.includes(packId)) {
            button.innerHTML = '<span class="icon">♥</span> Quitar favorito';
            button.classList.remove('not-favorite');
            button.classList.add('favorite');
        } else {
            button.innerHTML = '<span class="icon">♥</span> Añadir a favorito';
            button.classList.remove('favorite');
            button.classList.add('not-favorite');
        }
    });
}

// LÓGICA DE CARGA EN PÁGINA DE PERFIL (Mueve esta función de usuario.js aquí)
function loadFavorites(user) {
    const container = document.getElementById("favorites-container");
    if (!container) return;
    
    // !!! Aquí debes pegar el código completo de loadFavorites que estaba en usuario.js !!!
    if (!user.favorites.length) {
        container.innerHTML = "<p>No tienes favoritos aún.</p>";
        return;
    }

    container.innerHTML = "";

    user.favorites.forEach(id => {
        const pack = PACKS.find(p => p.id === id); // Asume que PACKS está disponible
        if (!pack) return;

        container.innerHTML += `
            <div class="card favorite-card">
                <img src="${pack.imagen}" alt="${pack.nombre}" class="fav-img">
                <div class="fav-actions">
                    <a href="pack.html?id=${pack.id}" class="btn-ver">Ver viaje</a>
                    <button class="btn-remove" onclick="removeFavorite('${pack.id}'); location.reload();">
                        Quitar
                    </button>
                </div>
            </div>
        `;
    });
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