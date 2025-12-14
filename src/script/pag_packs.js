document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const packId = params.get("id");

    if (!packId) {
        document.body.innerHTML = "<h2>Error: pack no especificado.</h2>";
        return;
    }

    if (typeof PACKS === "undefined") {
        console.error("PACKS no está definido");
        document.body.innerHTML = "<h2>Error: datos de packs no disponibles.</h2>";
        return;
    }

    const pack = PACKS.find(p => p.id === packId);

    if (!pack) {
        document.body.innerHTML = "<h2>Pack no encontrado.</h2>";
        return;
    }

    // BREADCRUMB SEGÚN DESDE DÓNDE VIENE
    const from  = params.get("from");   // region / compania / interes
    const value = params.get("value");  // África / grupo / Relax...

    const breadcrumbEl = document.getElementById("breadcrumb");
    if (breadcrumbEl) {

        let html = `
            <a href="destinos.html">Destinos</a>
            <span class="separator">›</span>
        `;

        const labels = {
            region:   "Regiones",
            compania: "Compañías",
            interes:  "Intereses"
        };

        // 1) Venimos de listado/categoría
        if (from && value && labels[from]) {

            html += `
                <a href="listado.html?type=${from}">${labels[from]}</a>
                <span class="separator">›</span>
                <a href="categoria.html?type=${from}&value=${encodeURIComponent(value)}">
                    ${value}
                </a>
                <span class="separator">›</span>
                <span class="actual">${pack.nombre}</span>
            `;

        // 2) Entramos sin from/value, pero el pack tiene región
        } else if (pack.region) {

            html += `
                <a href="listado.html?type=region">Regiones</a>
                <span class="separator">›</span>
                <a href="categoria.html?type=region&value=${encodeURIComponent(pack.region)}">
                    ${pack.region}
                </a>
                <span class="separator">›</span>
                <span class="actual">${pack.nombre}</span>
            `;

        // 3) Último recurso: solo Destinos › Nombre del pack
        } else {
            html += `
                <span class="actual">${pack.nombre}</span>
            `;
        }

        breadcrumbEl.innerHTML = html;
    }

    // DATOS BÁSICOS DEL PACK
    document.getElementById("pack-nombre").textContent   = pack.nombre;
    document.getElementById("pack-destinos").textContent = "Destinos: " + (pack.destinos || "");
    document.getElementById("pack-pais").textContent     = "País: " + (pack.pais || "");
    document.getElementById("pack-duracion").textContent = "Duración: " + (pack.duracion || "");
    document.getElementById("pack-precio").textContent   = "Precio desde: " + pack.precio + " €";

    const imgEl = document.getElementById("pack-imagen");
    imgEl.src = pack.imagen;
    imgEl.alt = pack.nombre;

    document.getElementById("pack-descripcion").textContent = pack.descripcion || "";

    // Botón comprar
    const btnComprar = document.getElementById("btn-comprar");
    if (btnComprar) {
        btnComprar.href = `compra.html?id=${pack.id}`;
    }

    // LISTA "INCLUYE"
    const ulIncluye = document.getElementById("pack-incluye");
    ulIncluye.innerHTML = "";

    if (Array.isArray(pack.incluye)) {
        pack.incluye.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ulIncluye.appendChild(li);
        });
    }

    // ITINERARIO
    const itCont = document.getElementById("pack-itinerario");
    itCont.innerHTML = "";

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

    //  EXPERIENCIAS RELACIONADAS (Pack → Experiencias)

    let relacionadas = [];

    if (typeof EXPERIENCIAS !== "undefined") {
        relacionadas = EXPERIENCIAS.filter(exp => exp.pack_asociado === pack.id);
    }

    const section = document.getElementById("exp-rel-section");
    const grid = document.getElementById("exp-rel-grid");
    const gallery = document.getElementById("exp-gallery");

    // Si hay experiencias → mostrar tarjetas y galería
    if (relacionadas.length > 0) {

        section.style.display = "block";

        grid.innerHTML = relacionadas.map(exp => `
            <div class="related-card">
                <img src="${exp.imagen1}" alt="${exp.titulo}">
                <div class="rel-info">
                    <h4>${exp.titulo}</h4>
                    <div class="meta">Por ${exp.autor} • ${exp.fecha_publicacion}</div>
                    <a href="experiencias.html?id=${exp.id}" class="btn-ver">Leer experiencia</a>
                </div>
            </div>
        `).join("");


        // GALERÍA — SÍ se muestra


        let fotos = relacionadas.flatMap(exp => [
            exp.imagen1,
            exp.imagen2,
            exp.imagen3
        ].filter(Boolean));

        let html = "";

        // FOTO GRANDE
        html += `<img class="big-photo" src="${fotos[0]}" alt="Foto experiencia">`;

        // FOTOS PEQUEÑAS
        if (fotos[1] || fotos[2]) {
            html += `
                <div class="small-row">
                    ${fotos[1] ? `<img class="small-photo" src="${fotos[1]}" alt="">` : ""}
                    ${fotos[2] ? `<img class="small-photo" src="${fotos[2]}" alt="">` : ""}
                </div>
            `;
        }

        // FOTOS EXTRA
        if (fotos.length > 3) {
            html += fotos.slice(3).map(f => `
                <img class="extra-photo" src="${f}" alt="">
            `).join("");
        }

        gallery.innerHTML = html;

    } else {

        // NO HAY EXPERIENCIAS - SOLO MOSTRAR UN MENSAJE

        section.style.display = "block"; // mostramos sección
        gallery.style.display = "none";  // ocultamos galería
        grid.innerHTML = `
            <p class="no-exp-msg">
                Aún no hay experiencias sobre este viaje.  
                <br>¡Sé el primero en compartir la tuya!
            </p>
        `;
    }




    // FAVORITOS

    const favBtn = document.getElementById("btn-fav");
    const user = getCurrentUser();

    if (favBtn) {
    favBtn.dataset.packId = pack.id;

    // Pintar estado correcto
    syncFavButton(favBtn, pack.id);

    // SI NO hay usuario 
    if (!user) {
        favBtn.classList.add("disabled");

        const text = favBtn.querySelector(".fav-text");
        if (text) {
        text.textContent = "Inicia sesión para guardar";
        }

        favBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Bloquea favorites.js

        const currentUrl =
            window.location.pathname + window.location.search;
        localStorage.setItem("redirectAfterLogin", currentUrl);

        window.location.href = "acceso_user.html";
        });
    }
    }

});

