document.addEventListener("DOMContentLoaded", () => {
    // Leer parámetro de la URL
    const params = new URLSearchParams(window.location.search);
    let interesNombre = params.get("interes");

    // Definir información de cada interés
    const TIPOS_INTERES = {
        "Relax": {
            nombre: "Relax",
            descripcion: "Escapadas diseñadas para desconectar y recargar energías. Disfruta de playas paradisíacas, spas de lujo, retiros de bienestar y entornos naturales que te ayudarán a encontrar la paz interior.",
            imagen: "../images/interes_relax.webp"
        },
        "Aventura": {
            nombre: "Aventura",
            descripcion: "Experiencias llenas de adrenalina y desafíos. Desde trekking por montañas imponentes hasta deportes extremos en la naturaleza, para aquellos que buscan emociones fuertes y superación personal.",
            imagen: "../images/interes_aventura.jpg"
        },
        "Cosmopolita": {
            nombre: "Cosmopolita",
            descripcion: "Vibrantes ciudades que nunca duermen. Sumérgete en la cultura, gastronomía y vida nocturna de las metrópolis más fascinantes del mundo. Arte, arquitectura y experiencias urbanas únicas.",
            imagen: "../images/interes_cosmopolita.webp"
        }
    };

    // Validar parámetro
    if (!interesNombre || !TIPOS_INTERES[interesNombre]) {
        interesNombre = "Aventura"; // Valor por defecto
    }

    const interesData = TIPOS_INTERES[interesNombre];

    // Cargar header
    const tituloEl = document.getElementById("interes-titulo");
    const descEl = document.getElementById("interes-descripcion");
    const imgEl = document.getElementById("interes-imagen");

    if (tituloEl) tituloEl.textContent = interesData.nombre;
    if (descEl) descEl.textContent = interesData.descripcion;
    if (imgEl) imgEl.src = interesData.imagen;

    // Filtrar packs de este interés
    const packsInteres = (typeof PACKS !== 'undefined') 
        ? PACKS.filter(pack => pack.interes === interesNombre) 
        : [];

    // PACKS DESTACADOS
    const destacadosContainer = document.getElementById("destacados-list");
    if (destacadosContainer && packsInteres.length > 0) {
        const destacados = packsInteres.slice(0, 2);
        
        destacadosContainer.innerHTML = destacados.map((pack, index) => {
            return `
                <div class="destacado-row ${index % 2 === 1 ? "invertido" : ""}">
                    <img src="${pack.imagen}" alt="${pack.nombre}">
                    <div class="destacado-info">
                        <div class="region-badge">${pack.region}</div>
                        <span class="interes-badge" data-interes="${pack.interes}">${pack.interes}</span>
                        <h3>${pack.nombre}</h3>
                        <p>${pack.descripcion || "Descubre una experiencia inolvidable."}</p>
                        <span class="destacado-precio">${pack.precio}€ • ${pack.duracion} • ${pack.tipo}</span>
                        <div class="acciones">
                            <a href="pack.html?id=${pack.id}" class="ver">Ver detalles</a>
                            <a class="like">♥</a>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    // TODOS LOS PACKS
    const todosContainer = document.getElementById("todos-list");
    if (todosContainer) {
        todosContainer.innerHTML = packsInteres.map(pack => {
            return `
                <div class="experiencia">
                    <img src="${pack.imagen}" alt="${pack.nombre}">
                    <h3>${pack.nombre}</h3>
                    <div class="badge-container">
                        <span class="badge" style="background-color: #e8f4ff; color: #2c3e50;">${pack.region}</span>
                        <span class="badge" style="background-color: #e8f5e9; color: #2e7d32;">${pack.interes}</span>
                    </div>
                    <p>${pack.duracion} • ${pack.tipo}</p>
                    <p style="font-weight:bold; color:steelblue;">${pack.precio}€</p>
                    <div class="acciones">
                        <a href="pack.html?id=${pack.id}" class="ver">Ver</a>
                        <a class="like">♥</a>
                    </div>
                </div>
            `;
        }).join("");
    }

    // OTROS INTERESES
    const otrosContainer = document.getElementById("otros-intereses-list");
    if (otrosContainer) {
        const otrosIntereses = Object.keys(TIPOS_INTERES).filter(int => int !== interesNombre);
        
        otrosContainer.innerHTML = otrosIntereses.map(int => {
            const data = TIPOS_INTERES[int];
            const cantidadPacks = PACKS.filter(pack => pack.interes === int).length;
            
            return `
                <a href="tipo_interes.html?interes=${encodeURIComponent(int)}" class="interes-item">
                    <img src="${data.imagen}" alt="${data.nombre}">
                    <div class="overlay"><span class="arrow">→</span></div>
                    <h3>${data.nombre}</h3>
                    <p class="contador-packs">${cantidadPacks} packs disponibles</p>
                </a>
            `;
        }).join("");
    }
});