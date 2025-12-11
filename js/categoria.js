document.addEventListener("DOMContentLoaded", () => {

    // ======================================================
    // 1. LEER PARÁMETROS: type = region / compania / interes
    //                     value = nombre de la categoría
    // ======================================================
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");     // region, compania, interes
    const value = params.get("value");   // África, solo, Aventura…

    if (!type || !value) {
        console.error("Faltan parámetros en la URL");
        return;
    }

    // ======================================================
    // 2. DEFINICIÓN DE CATEGORÍAS (nombre, descripción, imagen)
    // ======================================================

    const REGIONES = {
        "África": {
            descripcion: "Explora la cuna de la humanidad: safaris, desiertos y culturas vibrantes.",
            imagen: "../images/africa.jpg"
        },
        "Asia": {
            descripcion: "Templos milenarios, megaciudades futuristas y paraísos tropicales.",
            imagen: "../images/ASIA.jpg"
        },
        "Europa": {
            descripcion: "Historia, arte y ciudades icónicas.",
            imagen: "../images/europa.jpg"
        },
        "Latinoamérica": {
            descripcion: "Selvas, montañas y culturas ancestrales.",
            imagen: "../images/latam.jpg"
        },
        "Norteamérica": {
            descripcion: "Rascacielos, rutas míticas y naturaleza salvaje.",
            imagen: "../images/usa.jpg"
        },
        "Pacífico": {
            descripcion: "Islas paradisíacas y culturas polinesias.",
            imagen: "../images/pacifico.jpg"
        }
    };

    const COMPANIAS = {
        "solo": {
            nombre: "Viajar Solo",
            descripcion: "Libertad total y experiencias para el autodescubrimiento.",
            imagen: "../images/compania_solo.webp"
        },
        "pareja": {
            nombre: "Viajar en Pareja",
            descripcion: "Escapadas románticas y momentos inolvidables.",
            imagen: "../images/compania_pareja.jpg"
        },
        "grupo": {
            nombre: "Viajar en Grupo",
            descripcion: "Diversión y experiencias compartidas.",
            imagen: "../images/compania_grupo.avif"
        }
    };

    const INTERESES = {
        "Aventura": {
            descripcion: "Naturaleza, adrenalina y experiencias intensas.",
            imagen: "../images/aventura.jpg"
        },
        "Cosmopolita": {
            descripcion: "Arte, cultura y ciudades vibrantes.",
            imagen: "../images/cosmopolita.jpg"
        },
        "Relax": {
            descripcion: "Descanso, bienestar y paraísos tranquilos.",
            imagen: "../images/relax.jpg"
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

    // ======================================================
    // 3. CARGAR EL HERO
    // ======================================================

    document.getElementById("cat-imagen").src = data.imagen;
    document.getElementById("cat-titulo").textContent =
        data.nombre || value;
    document.getElementById("cat-descripcion").textContent = data.descripcion;

    // ======================================================
    // 4. CREAR BREADCRUMB
    // ======================================================

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

    // ======================================================
    // 5. FILTRAR PACKS SEGÚN TIPO
    // ======================================================

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


    // ======================================================
    // 6. DESTACADOS (primeros 2)
    // ======================================================
    const destacadosContainer = document.getElementById("destacados-list");

    destacadosContainer.innerHTML = packsFiltrados.slice(0, 2).map((p, index) => `
        <div class="destacado-row ${index % 2 === 1 ? "invertido" : ""}">
            <img src="${p.imagen}">
            <div class="destacado-info">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion || "Descubre una experiencia inolvidable."}</p>
                <span class="destacado-precio">${p.precio}€</span>
                <div class="acciones">
                    <a class="ver" href="pack.html?id=${p.id}&from=${type}&value=${encodeURIComponent(value)}">Ver</a>
                    <a class="like">♥</a>
                </div>
            </div>
        </div>
    `).join("");

    // ======================================================
    // 7. GRID CON TODOS LOS PACKS
    // ======================================================

    const grid = document.getElementById("todos-list");

    grid.innerHTML = packsFiltrados.map(p => `
        <div class="experiencia">
            <img src="${p.imagen}">
            <h3>${p.nombre}</h3>
            <p>${type === "region" ? p.destinos : p.region || p.tipo}</p>
            <p><strong style="color:steelblue">${p.precio}€</strong></p>
            <div class="acciones">
                <a class="ver" href="pack.html?id=${p.id}&from=${type}">Ver</a>
                <a class="like">♥</a>
            </div>
        </div>
    `).join("");

    // ======================================================
    // 8. OTRAS OPCIONES (excluyendo la actual)
    // ======================================================

    const otros = Object.keys(dictionary).filter(k => k !== value);

    const otrosList = document.getElementById("otros-list");

    otrosList.innerHTML = otros.map(k => {
        const d = dictionary[k];
        return `
            <a class="otros-item" 
               href="categoria.html?type=${type}&value=${encodeURIComponent(k)}">
                <img src="${d.imagen}">
                <div class="overlay"><span class="arrow">→</span></div>
                <h3>${d.nombre || k}</h3>
            </a>
        `;
    }).join("");
});
