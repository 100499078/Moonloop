document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    function capitalizar(txt) {
    if (!txt) return "";
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
}


    if (!type || typeof PACKS === "undefined") return;

    const MAPS = {
        region: {
            "África": "../images/africa.jpg",
            "Asia": "../images/ASIA.jpg",
            "Europa": "../images/europa.jpg",
            "Latinoamérica": "../images/latam.jpg",
            "Norteamérica": "../images/usa.jpg",
            "Pacífico": "../images/pacifico.jpg"
        },
        compania: {
            "solo": "../images/solo.jpg",
            "pareja": "../images/couple.jpg",
            "grupo": "../images/group.jpg"
        },
        interes: {
            "Aventura": "../images/aventura.jpg",
            "Cosmopolita": "../images/cosmopolita.jpg",
            "Relax": "../images/relax.jpg"
        }
    };

    const NOMBRES = {
        region: "Regiones",
        compania: "Compañías",
        interes: "Intereses"
    };

    const dataset = MAPS[type];
    const seccionesContainer = document.getElementById("listado-secciones");

    // Título
    document.getElementById("listado-titulo").textContent =
        "Explora " + NOMBRES[type];

    // Breadcrumb
    document.getElementById("breadcrumb-hero").innerHTML = `
    <a href="destinos.html">Destinos</a>
    <span class="separator">›</span>
    <a href="listado.html?type=${type}">
        ${NOMBRES[type]}
    </a>
    <span class="separator">›</span>
    <span class="actual">Listado</span>
    `;


    // Secciones dinámicas
    Object.keys(dataset).forEach(nombre => {
        const imagen = dataset[nombre];

        let packsFiltrados = [];

        // --- REGION ---
        if (type === "region") {
            packsFiltrados = PACKS.filter(p => p.region === nombre);
        }

        // --- INTERÉS ---
        if (type === "interes") {
            packsFiltrados = PACKS.filter(p => p.interes === nombre);
        }

        // --- COMPAÑÍA (CORREGIDO) ---
        if (type === "compania") {
            const n = nombre.toLowerCase();
            packsFiltrados = PACKS.filter(p => {
                const c = p.compania?.toLowerCase() || "";
                return c === n;
            });
        }

        // Max 3 packs
        packsFiltrados = packsFiltrados.slice(0, 3);

        // Tarjetas estilo B
        const packsHTML = packsFiltrados.map(p => `
            <div class="experiencia">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>

                <p>${p.destinos || p.pais || p.region}</p>
                

                <p class="precio">${p.precio}€</p>

                <div class="acciones">
                    <a href="pack.html?id=${p.id}&from=${type}&value=${encodeURIComponent(nombre)}" class="ver">Ver</a>
                    <a class="like">♥</a>
                </div>
            </div>
        `).join("");

        seccionesContainer.innerHTML += `
            <section class="categoria-section">

                <div class="categoria-header">
                    <div class="icono">
                        <img src="${imagen}" alt="${nombre}">
                    </div>

                    <div class="texto">
                        <h2>${capitalizar(nombre)}</h2>

                    </div>

                    <a class="ver-todo-cat"
                       href="categoria.html?type=${type}&value=${encodeURIComponent(nombre)}">
                        Ver todos
                    </a>
                </div>

                <div class="packs-categoria">
                    ${packsHTML}
                </div>

            </section>
        `;
    });
});
