document.addEventListener("DOMContentLoaded", () => {
    // Definir los tipos de interés
    const TIPOS_INTERES = {
        "Relax": {
            nombre: "Relax",
            descripcion: "Escapadas para desconectar y recargar energías. Playas paradisíacas, spas y entornos naturales tranquilos.",
            imagen: "../images/interes_relax.webp",
            icono: "../images/interes_relax.webp"
        },
        "Aventura": {
            nombre: "Aventura", 
            descripcion: "Experiencias llenas de adrenalina y desafíos. Trekking, deportes extremos y exploración en la naturaleza.",
            imagen: "../images/interes_aventura.jpg",
            icono: "../images/interes_aventura.jpg"
        },
        "Cosmopolita": {
            nombre: "Cosmopolita",
            descripcion: "Vibrantes ciudades con cultura, gastronomía y vida nocturna. Arte, arquitectura y experiencias urbanas.",
            imagen: "../images/interes_cosmopolita.webp",
            icono: "../images/interes_cosmopolita.webp"
        }
    };

    const contenedor = document.getElementById("intereses-list");

    if (!contenedor || typeof PACKS === "undefined") return;

    // Para cada tipo de interés
    contenedor.innerHTML = Object.keys(TIPOS_INTERES).map(interesNombre => {
        const info = TIPOS_INTERES[interesNombre];
        
        // Filtrar packs de este interés (usando tu campo 'interes')
        const packsInteres = PACKS.filter(pack => pack.interes === interesNombre);

        // Si no hay packs, no mostrar la sección
        if (packsInteres.length === 0) return "";

        // Generar tarjetas de packs (mostrar máximo 3)
        const packsHTML = packsInteres.slice(0, 3).map(pack => `
            <div class="pack-card">
                <img src="${pack.imagen}" alt="${pack.nombre}">
                
                <div class="card-content">
                    <span class="interes-badge" data-interes="${pack.interes}">${pack.interes}</span>
                    <h4>${pack.nombre}</h4>
                    
                    <div class="meta-info">
                        <p class="pais">${pack.pais} • ${pack.tipo}</p>
                        <p class="precio">${pack.precio} €</p>
                    </div>
                    
                    <a href="pack.html?id=${pack.id}" class="ver">Ver Pack</a>
                </div>
            </div>
        `).join("");

        return `
            <section class="interes-section">
                <div class="interes-header">
                    <div class="icono-interes">
                        <img src="${info.icono}" alt="${info.nombre}">
                    </div>
                    <div class="texto-interes">
                        <h2>${info.nombre}</h2>
                        <p>${info.descripcion}</p>
                    </div>
                    <a href="tipo_interes.html?interes=${encodeURIComponent(interesNombre)}" class="ver-todo-interes">
                        Ver todos los packs ${info.nombre.toLowerCase()} →
                    </a>
                </div>
                <div class="packs-interes">${packsHTML}</div>
            </section>
        `;
    }).join("");
});