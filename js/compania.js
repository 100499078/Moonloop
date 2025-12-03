document.addEventListener("DOMContentLoaded", () => {
    // Definir los tipos de compañía
    const TIPOS_COMPANIA = {
        "solo": {
            nombre: "Viajar Solo",
            descripcion: "Aventuras diseñadas para viajeros independientes que buscan libertad y autodescubrimiento.",
            imagen: "../images/compania_solo.webp",
            icono: "../images/compania_solo.webp" // Imagen pequeña circular
        },
        "pareja": {
            nombre: "Viajar en Pareja",
            descripcion: "Experiencias románticas y momentos inolvidables diseñados para dos.",
            imagen: "../images/compania_pareja.jpg",
            icono: "../images/compania_pareja.jpg"
        },
        "grupo": {
            nombre: "Viajar en Grupo",
            descripcion: "Viajes para compartir con amigos o familia, con actividades grupales y descuentos especiales.",
            imagen: "../images/compania_grupo.avif",
            icono: "../images/compania_grupo.avif"
        }
    };

    const contenedor = document.getElementById("companias-list");

    if (!contenedor || typeof PACKS === "undefined") return;

    // Para cada tipo de compañía
    contenedor.innerHTML = Object.keys(TIPOS_COMPANIA).map(tipo => {
        const info = TIPOS_COMPANIA[tipo];
        
        // Filtrar packs de este tipo de compañía
        const packsCompania = PACKS.filter(pack => pack.compania === tipo);

        // Si no hay packs, no mostrar la sección
        if (packsCompania.length === 0) return "";

        // Generar tarjetas de packs
        const packsHTML = packsCompania.slice(0, 3).map(pack => `
            <div class="pack-card">
                <img src="${pack.imagen}" alt="${pack.nombre}">
                
                <div class="card-content">
                    <span class="compania-badge">${info.nombre.split(" ")[2] || info.nombre}</span>
                    <h4>${pack.nombre}</h4>
                    
                    <div class="meta-info">
                        <p class="pais">${pack.pais || pack.region}</p>
                        <p class="precio">${pack.precio} €</p>
                    </div>
                    
                    <a href="pack.html?id=${pack.id}" class="ver">Ver Pack</a>
                </div>
            </div>
        `).join("");

        return `
            <section class="compania-section">
                <div class="compania-header">
                    <div class="icono-compania">
                        <img src="${info.icono}" alt="${info.nombre}">
                    </div>
                    <div class="texto-compania">
                        <h2>${info.nombre}</h2>
                        <p>${info.descripcion}</p>
                    </div>
                    <a href="tipo_compania.html?tipo=${tipo}" class="ver-todo-compania">
                        Ver todos los packs ${info.nombre.toLowerCase()} →
                    </a>
                </div>
                <div class="packs-compania">${packsHTML}</div>
            </section>
        `;
    }).join("");
});