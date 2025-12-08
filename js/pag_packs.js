document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const packId = params.get("id");

    if (!packId) {
        document.body.innerHTML = "<h2>Error: pack no especificado.</h2>";
        return;
    }

    const pack = PACKS.find(p => p.id === packId);

    if (!pack) {
        document.body.innerHTML = "<h2>Pack no encontrado.</h2>";
        return;
    }

    // Conectar botón "Comprar ya" con compra.html
    const btnComprar = document.getElementById("btn-comprar");
    if (btnComprar) {
        btnComprar.href = `compra.html?id=${pack.id}`;
    }


        // --- BREADCRUMB ---
    const breadcrumbEl = document.getElementById("breadcrumb");

    if (breadcrumbEl) {
        // Enlaces: Regiones > Región > País
        breadcrumbEl.innerHTML = `
            <a href="destinos.html">Destinos</a>
            <span class="separator">›</span> 
            <a href="todas_regiones.html">Regiones</a>
            <span class="separator">›</span> 
            <a href="region.html?region=${encodeURIComponent(pack.region)}">${pack.region}</a>
            ${pack.pais ? `<span class="separator">›</span> <span class= "actual">${pack.pais}</span>` : ""}
        `;
    }
    // Datos básicos
    document.getElementById("pack-nombre").textContent = pack.nombre;
    document.getElementById("pack-destinos").textContent = "Destinos: " + pack.destinos;
    document.getElementById("pack-pais").textContent = "País: " + pack.pais;
    document.getElementById("pack-duracion").textContent = "Duración: " + pack.duracion;
    document.getElementById("pack-precio").textContent = "Precio desde: " + pack.precio + " €";

    document.getElementById("pack-imagen").src = pack.imagen;
    document.getElementById("pack-imagen").alt = pack.nombre;

    document.getElementById("pack-descripcion").textContent = pack.descripcion;

    // Lista de lo que incluye
    const ulIncluye = document.getElementById("pack-incluye");
    ulIncluye.innerHTML = ""; // limpiar
    pack.incluye?.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ulIncluye.appendChild(li);
    });

    // Itinerario
    const itCont = document.getElementById("pack-itinerario");
    itCont.innerHTML = ""; // limpiar antes

    if (Array.isArray(pack.itinerario)) {
        pack.itinerario.forEach(dia => {
            const div = document.createElement("div");
            div.classList.add("it-item");
            div.innerHTML = `
                <h4>Día ${dia.dia}: ${dia.titulo}</h4>
                <p>${dia.detalle}</p>
            `;
            itCont.appendChild(div);
        });
    }

    // --- FAVORITOS ---
    const favBtn = document.getElementById("btn-fav");
    if (!favBtn) return;

    const user = getCurrentUser();
    if (!user) {
        favBtn.textContent = "Inicia sesión para guardar favoritos";
        favBtn.classList.add("not-favorite");
        favBtn.disabled = true;
        return;
    }

    const isFav = user.favorites.includes(pack.id);
    updateFavButton(favBtn, isFav);

    favBtn.addEventListener("click", () => {
        const user = getCurrentUser();
        const isFav = user.favorites.includes(pack.id);

        if (isFav) {
            removeFavorite(pack.id);
            updateFavButton(favBtn, false);
        } else {
            addFavorite(pack.id);
            updateFavButton(favBtn, true);
        }
    });
});

function updateFavButton(button, isFav) {
    if (isFav) {
        button.classList.remove("not-favorite");
        button.classList.add("favorite");
        button.textContent = "Quitar de favoritos";
    } else {
        button.classList.remove("favorite");
        button.classList.add("not-favorite");
        button.textContent = "Agregar a favoritos";
    }
}