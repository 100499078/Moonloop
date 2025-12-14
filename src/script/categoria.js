document.addEventListener("DOMContentLoaded", () => {


    // 1. LEER PARÁMETROS: type = region / compania / interes
    //                     value = nombre de la categoría
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");     // region, compania, interes
    const value = params.get("value");   // África, solo, Aventura…

    if (!type || !value) {
        console.error("Faltan parámetros en la URL");
        return;
    }

    // 2. DEFINICIÓN DE CATEGORÍAS (nombre, descripción, imagen)
    const REGIONES = {
        "África": {
            descripcion: "Explora la cuna de la humanidad: safaris, desiertos y culturas vibrantes.",
            imagen: "images/africa.jpg"
        },
        "Asia": {
            descripcion: "Templos milenarios, megaciudades futuristas y paraísos tropicales.",
            imagen: "images/ASIA.jpg"
        },
        "Europa": {
            descripcion: "Historia, arte y ciudades icónicas.",
            imagen: "images/europa.jpg"
        },
        "Latinoamérica": {
            descripcion: "Selvas, montañas y culturas ancestrales.",
            imagen: "images/latam.jpg"
        },
        "Norteamérica": {
            descripcion: "Rascacielos, rutas míticas y naturaleza salvaje.",
            imagen: "images/usa.jpg"
        },
        "Pacífico": {
            descripcion: "Islas paradisíacas y culturas polinesias.",
            imagen: "images/pacifico.jpg"
        }
    };

    const COMPANIAS = {
        "solo": {
            nombre: "Viajar Solo",
            descripcion: "Libertad total y experiencias para el autodescubrimiento.",
            imagen: "images/compania_solo.webp"
        },
        "pareja": {
            nombre: "Viajar en Pareja",
            descripcion: "Escapadas románticas y momentos inolvidables.",
            imagen: "images/compania_pareja.jpg"
        },
        "grupo": {
            nombre: "Viajar en Grupo",
            descripcion: "Diversión y experiencias compartidas.",
            imagen: "images/compania_grupo.avif"
        }
    };

    const INTERESES = {
        "Aventura": {
            descripcion: "Naturaleza, adrenalina y experiencias intensas.",
            imagen: "images/aventura.jpg"
        },
        "Cosmopolita": {
            descripcion: "Arte, cultura y ciudades vibrantes.",
            imagen: "images/cosmopolita.jpg"
        },
        "Relax": {
            descripcion: "Descanso, bienestar y paraísos tranquilos.",
            imagen: "images/relax.jpg"
        }
    };

    const DATASETS = {
        region: REGIONES,
        compania: COMPANIAS,
        interes: INTERESES
    };

    const dictionary = DATASETS[type];
    const data = dictionary[value];

    if (!data) {
        console.error("Categoría no encontrada:", type, value);
        return;
    }

    // 3. CARGAR EL HERO

    document.getElementById("cat-imagen").src = data.imagen;
    document.getElementById("cat-titulo").textContent =
        data.nombre || value;
    document.getElementById("cat-descripcion").textContent = data.descripcion;

    // 4. CREAR BREADCRUMB

    const bread = document.getElementById("breadcrumb-hero");
    bread.innerHTML = `
        <a href="destinos.html">Destinos</a>
        <span class="separator">›</span>
        <a href="listado.html?type=${type}">
            ${type === "region" ? "Regiones" : type === "compania" ? "Compañías" : "Intereses"}
        </a>
        <span class="separator">›</span>
        <span class="actual">${data.nombre || value}</span>
    `;

    // 5. FILTRAR PACKS SEGÚN TIPO
    let packsFiltrados = [];

    if (type === "region") {
        packsFiltrados = PACKS.filter(p => p.region === value);
    }

    if (type === "compania") {
        const n = value.toLowerCase();
        packsFiltrados = PACKS.filter(p => {
            const c = p.compania?.toLowerCase() || "";
            return c === n;
        });
    }

    if (type === "interes") {
        packsFiltrados = PACKS.filter(p => p.interes === value);
    }



    // 6. DESTACADOS 
    const destacadosContainer = document.getElementById("destacados-list");

    destacadosContainer.innerHTML = packsFiltrados.slice(0, 2).map((p, index) => `
        <div class="destacado-row ${index % 2 === 1 ? "invertido" : ""}">
            <img src="${p.imagen}"alt="Viaje a ${p.pais}">
            <div class="destacado-info">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion || "Descubre una experiencia inolvidable."}</p>
                <span class="destacado-precio">${p.precio}€</span>
                <div class="acciones">
                    <a class="ver" href="pack.html?id=${p.id}&from=${type}&value=${encodeURIComponent(value)}">Ver</a>
                    <button type="button" class="like btn-fav not-favorite" data-pack-id="${p.id}">
                        <span class="heart">♥</span>
                        <span class="fav-text">Añadir a favoritos</span>
                    </button>
                </div>
            </div>
        </div>
    `).join("");
    requestAnimationFrame(() => {
        document.querySelectorAll(".btn-fav").forEach(btn => {
            const packId = btn.dataset.packId;

            // Pintar estado correcto
            syncFavButton(btn, packId);

            // Interceptar SOLO si no hay usuario
            btn.addEventListener("click", (e) => {
            const user = getCurrentUser();
             // SI NO hay usuario → modo informativo
            if (!user) {
                btn.classList.add("disabled");
                const text = btn.querySelector(".fav-text");
                if (text) {
                text.textContent = "Inicia sesión para guardar";
                }

                btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Guardar a dónde volver
                const currentUrl = window.location.pathname + window.location.search;
                localStorage.setItem("redirectAfterLogin", currentUrl);

                // AHORA sí redirigimos (solo al hacer click)
                window.location.href = "acceso_user.html";
                });

                return;
            }
            
            });
        });
        });

    // 7. GRID CON TODOS LOS PACKS

    const grid = document.getElementById("todos-list");

    grid.innerHTML = packsFiltrados.map(p => `
        <div class="experiencia">
            <img src="${p.imagen}"alt="Viaje a ${p.pais}">
            <h3>${p.nombre}</h3>
            <p class=texto>${type === "region" ? p.destinos : p.region || p.tipo}</p>
            <p class= destacado-precio>${p.precio}€</p>
            <div class="acciones">
                <a class="ver" href="pack.html?id=${p.id}&from=${type}">Ver</a>
                <button type="button" class="like btn-fav not-favorite" data-pack-id="${p.id}">
                    <span class="heart">♥</span>
                    <span class="fav-text">Añadir a favoritos</span>
                </button>
            </div>
        </div>
    `
    )
    .join("");


    // 8. OTRAS OPCIONES (excluyendo la actual)

    const otros = Object.keys(dictionary).filter(k => k !== value);

    const otrosList = document.getElementById("otros-list");

    otrosList.innerHTML = otros.map(k => {
        const d = dictionary[k];
        return `
            <a class="otros-item" 
               href="categoria.html?type=${type}&value=${encodeURIComponent(k)}">
                <img src="${d.imagen}"alt="ViajeExplora a ${d.nombre}>
                <div class="overlay"><span class="arrow">→</span></div>
                <h3>${d.nombre || k}</h3>
            </a>
        `;
    }).join("");
});

