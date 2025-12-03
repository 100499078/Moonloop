document.addEventListener("DOMContentLoaded", () => {
    // Leer parámetro de la URL
    const params = new URLSearchParams(window.location.search);
    let companiaTipo = params.get("tipo");

    // Definir tipos de compañía
    const TIPOS_COMPANIA = {
        "solo": {
            nombre: "Viajar Solo",
            descripcion: "Aventuras diseñadas para viajeros independientes. Disfruta de la libertad de explorar a tu ritmo, conocer gente nueva y vivir experiencias de autodescubrimiento.",
            imagen: "../images/compania_solo.webp"
        },
        "pareja": {
            nombre: "Viajar en Pareja",
            descripcion: "Experiencias románticas y momentos inolvidables diseñados para dos. Desde escapadas íntimas hasta aventuras compartidas que fortalecerán vuestra conexión.",
            imagen: "../images/compania_pareja.jpg"
        },
        "grupo": {
            nombre: "Viajar en Grupo",
            descripcion: "Viajes perfectos para compartir con amigos o familia. Actividades grupales, descuentos especiales y momentos que crearán recuerdos para toda la vida.",
            imagen: "../images/compania_grupo.avif"
        }
    };

    // Validar parámetro
    if (!companiaTipo || !TIPOS_COMPANIA[companiaTipo]) {
        companiaTipo = "solo"; // Valor por defecto
    }

    const companiaData = TIPOS_COMPANIA[companiaTipo];

    // Cargar header
    const tituloEl = document.getElementById("compania-titulo");
    const descEl = document.getElementById("compania-descripcion");
    const imgEl = document.getElementById("compania-imagen");

    if (tituloEl) tituloEl.textContent = companiaData.nombre;
    if (descEl) descEl.textContent = companiaData.descripcion;
    if (imgEl) imgEl.src = companiaData.imagen;

    // Filtrar packs de este tipo
    const packsCompania = (typeof PACKS !== 'undefined') 
        ? PACKS.filter(pack => pack.compania === companiaTipo) 
        : [];

    // PACKS DESTACADOS
    const destacadosContainer = document.getElementById("destacados-list");
    if (destacadosContainer && packsCompania.length > 0) {
        const destacados = packsCompania.slice(0, 2);
        
        destacadosContainer.innerHTML = destacados.map((pack, index) => {
            return `
                <div class="destacado-row ${index % 2 === 1 ? "invertido" : ""}">
                    <img src="${pack.imagen}" alt="${pack.nombre}">
                    <div class="destacado-info">
                        <div class="region-badge">${pack.region}</div>
                        <h3>${pack.nombre}</h3>
                        <p>${pack.descripcion || "Descubre una experiencia inolvidable."}</p>
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

    // TODOS LOS PACKS
    const todosContainer = document.getElementById("todos-list");
    if (todosContainer) {
        todosContainer.innerHTML = packsCompania.map(pack => {
            return `
                <div class="experiencia">
                    <img src="${pack.imagen}" alt="${pack.nombre}">
                    <h3>${pack.nombre}</h3>
                    <p>${pack.region} • ${pack.compania}</p>
                    <p style="font-weight:bold; color:steelblue;">${pack.precio}€</p>
                    <div class="acciones">
                        <a href="pack.html?id=${pack.id}" class="ver">Ver</a>
                        <a class="like">♥</a>
                    </div>
                </div>
            `;
        }).join("");
    }

    // OTRAS COMPAÑÍAS
    const otrasContainer = document.getElementById("otras-companias-list");
    if (otrasContainer) {
        const otrosTipos = Object.keys(TIPOS_COMPANIA).filter(tipo => tipo !== companiaTipo);
        
        otrasContainer.innerHTML = otrosTipos.map(tipo => {
            const data = TIPOS_COMPANIA[tipo];
            const cantidadPacks = PACKS.filter(pack => pack.compania === tipo).length;
            
            return `
                <a href="tipo_compania.html?tipo=${tipo}" class="compania-item">
                    <img src="${data.imagen}" alt="${data.nombre}">
                    <div class="overlay"><span class="arrow">→</span></div>
                    <h3>${data.nombre}</h3>
                    <p class="contador-packs">${cantidadPacks} packs disponibles</p>
                </a>
            `;
        }).join("");
    }
});