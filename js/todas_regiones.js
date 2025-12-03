document.addEventListener("DOMContentLoaded", () => {

    const REGIONES = {
        "África": { imagen: "../images/africa.jpg" },
        "Asia": { imagen: "../images/ASIA.jpg" },
        "Europa": { imagen: "../images/europa.jpg" },
        "Latinoamérica": { imagen: "../images/latam.jpg" },
        "Norteamérica": { imagen: "../images/usa.jpg" },
        "Pacífico": { imagen: "../images/pacifico.jpg" }
    };

    const contenedor = document.getElementById("regiones-list");

    // Verificamos que existan PACKS y el contenedor
    if (!contenedor || typeof PACKS === "undefined") return;

    contenedor.innerHTML = Object.keys(REGIONES).map(regionNombre => {

        // Filtramos los packs de esta región
        const packsRegion = PACKS.filter(pack => pack.region === regionNombre);

        // Si no hay packs en esa región, no mostramos la sección vacía (Opcional)
        if (packsRegion.length === 0) return "";

        // Generamos las tarjetas (Con estructura mejorada para CSS)
        const packsHTML = packsRegion.map(pack => `
            <div class="pack-card">
                <img src="${pack.imagen}" alt="${pack.nombre}">
                
                <div class="card-content">
                    <h4>${pack.nombre}</h4>
                    
                    <div class="meta-info">
                        <p class="pais"> ${pack.pais}</p>
                        <p class="precio">${pack.precio} €</p>
                    </div>
                    
                    <a href="pack.html?id=${pack.id}" class="ver">Ver Pack</a>
                </div>
            </div>
        `).join("");

        // Retornamos la sección completa
        return `
            <section class="region-section">
                <div class="region-header">
                    <img src="${REGIONES[regionNombre].imagen}" alt="${regionNombre}">
                    <h2>${regionNombre}</h2>
                    <a href="region.html?region=${encodeURIComponent(regionNombre)}" class="ver-toda-region">
                        Ver todos los packs de ${regionNombre} →
                    </a>
                </div>
                <div class="packs-region">${packsHTML}</div>
            </section>
        `;
    }).join("");

      // --- NUEVO: Generar Breadcrumb desde JS ---
    const breadContainer = document.getElementById("breadcrumb-hero");
    if (breadContainer) {
        breadContainer.innerHTML = `
            <a href="destinos.html">Destinos</a> 
            <span class="separator">›</span> 
            <a href="todas_regiones.html">Regiones</a>
        `;
    }

});