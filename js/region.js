// Espera a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Leer parámetro de la URL ---
    const params = new URLSearchParams(window.location.search);
    let regionNombre = params.get("region");

    // --- 2. Definir descripciones e imágenes por región ---
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
            descripcion: "Historia, arte, ciudades icónicas y la mejor gastronomía del mundo.",
            imagen: "../images/europa.jpg"
        },
        "Latinoamérica": {
            descripcion: "Selvas, montañas, culturas ancestrales y ritmos que enamoran.",
            imagen: "../images/latam.jpg"
        },
        "Norteamérica": {
            descripcion: "Rascacielos, rutas míticas y paisajes naturales imponentes.",
            imagen: "../images/usa.jpg"
        },
        "Pacífico": {
            descripcion: "Islas paradisíacas, océano cristalino y culturas polinesias.",
            imagen: "../images/pacifico.jpg"
        }
    };

    // --- 3. Validar parámetro ---
    if (!regionNombre || !REGIONES[regionNombre]) {
        regionNombre = "Europa"; // región por defecto
        console.warn("Parámetro de región no encontrado, usando Europa por defecto.");
    }

    const regionData = REGIONES[regionNombre];

    // --- 4. Cargar header dinámicamente ---
    const tituloEl = document.getElementById("region-titulo");
    const descEl = document.getElementById("region-descripcion");
    const imgEl = document.getElementById("region-imagen");

    if(tituloEl) tituloEl.textContent = regionNombre;
    if(descEl) descEl.textContent = regionData.descripcion;
    if(imgEl) imgEl.src = regionData.imagen;

     // --- NUEVO: Generar Breadcrumb desde JS ---
    const breadContainer = document.getElementById("breadcrumb-hero");
    if (breadContainer) {
        breadContainer.innerHTML = `
            <a href="destinos.html">Destinos</a> 
            <span class="separator">›</span> 
            <a href="todas_regiones.html">Regiones</a>
            <span class="separator">›</span>
            <span class="actual">${regionNombre}</span>
        `;
    }

    // --- 5. Filtrar packs de esa región ---
    // Asegúrate de que la variable PACKS existe (viene de packs.js)
    const packsRegion = (typeof PACKS !== 'undefined') ? PACKS.filter(pack => pack.region === regionNombre) : [];


   // --- 6. Rellenar PACKS DESTACADOS (Solo 2, diseño Zig-Zag) ---
const destacadosContainer = document.getElementById("destacados-list");

if (destacadosContainer && packsRegion.length > 0) {
    const destacados = packsRegion.slice(0, 2);

    destacadosContainer.innerHTML = destacados.map((pack, index) => {
        return `
            <div class="destacado-row ${index % 2 === 1 ? "invertido" : ""}">
                <img src="${pack.imagen}" alt="${pack.nombre}">
                <div class="destacado-info">
                    <h3>${pack.nombre}</h3>
                    <p>${pack.descripcion || "Descubre una experiencia inolvidable con este pack exclusivo."}</p>
                    <span class="destacado-precio">${pack.precio}€</span>
                    <div class="acciones">
                        <a href="pack.html?id=${pack.id}" class="ver">Ver detalles</a>
                        <a class="like">♥</a>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}


 // --- 7. Rellenar TODOS LOS PACKS (Diseño Grid .experiencia) ---
const todosContainer = document.getElementById("todos-list");

if (todosContainer) {
    todosContainer.innerHTML = packsRegion.map(pack => {
        return `
            <div class="experiencia">
                <img src="${pack.imagen}" alt="${pack.nombre}">
                <h3>${pack.nombre}</h3>
                <p>${pack.destinos || "Varios destinos"}</p>
                <p style="font-weight:bold; color:steelblue;">${pack.precio}€</p>

                <div class="acciones">
                    <a href="pack.html?id=${pack.id}" class="ver">Ver</a>
                    <a class="like">♥</a>
                </div>
            </div>
        `;
    }).join("");
}


// --- 9. Rellenar OTRAS REGIONES (Excluyendo la actual) ---
    const otrasRegionesContainer = document.getElementById("otras-regiones-list");

    if (otrasRegionesContainer) {
        // Obtenemos los nombres de las regiones (keys del objeto REGIONES)
        const listaRegiones = Object.keys(REGIONES);

        // Filtramos para quitar la región actual
        const otrasRegiones = listaRegiones.filter(r => r !== regionNombre);

        // Generamos el HTML
        otrasRegionesContainer.innerHTML = otrasRegiones.map(nombre => {
            const data = REGIONES[nombre];
            // IMPORTANTE: El enlace recarga la página con el nuevo parámetro
            return `
                <a href="region.html?region=${nombre}" class="region-item">
                    <img src="${data.imagen}" alt="${nombre}">
                    <div class="overlay"><span class="arrow">→</span></div>
                    <h3>${nombre}</h3>
                </a>
            `;
        }).join("");
    }
    });