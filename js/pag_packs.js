document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const packId = params.get("id");

    if (!packId) {
        document.body.innerHTML = "<h2>Error: pack no especificado.</h2>";
        return;
    }

    const pack = PACKS.find(p => p.id === packId);

    if (!pack) {
        document.body.innerHTML = "<h2>Pack no encontrado.</h2>";
        return;
    }


        // --- BREADCRUMB ---
    const breadcrumbEl = document.getElementById("breadcrumb");

    if (breadcrumbEl) {
        // Enlaces: Regiones > Región > País
        breadcrumbEl.innerHTML = `
            <a href="todas_regiones.html">Regiones</a>
            <span>></span>
            <a href="region.html?region=${encodeURIComponent(pack.region)}">${pack.region}</a>
            ${pack.pais ? `<span>></span><span>${pack.pais}</span>` : ""}
        `;
    }
    // Datos básicos
    document.getElementById("pack-nombre").textContent = pack.nombre;
    document.getElementById("pack-destinos").textContent = "Destinos: " + pack.destinos;
    document.getElementById("pack-pais").textContent = "País: " + pack.pais;
    document.getElementById("pack-duracion").textContent = "Duración: " + pack.duracion;
    document.getElementById("pack-precio").textContent = "Precio desde: " + pack.precio + " €";

    document.getElementById("pack-imagen").src = pack.imagen;
    document.getElementById("pack-imagen").alt = pack.nombre;

    document.getElementById("pack-descripcion").textContent = pack.descripcion;

    // Lista de lo que incluye
    const ulIncluye = document.getElementById("pack-incluye");
    ulIncluye.innerHTML = ""; // limpiar
    pack.incluye?.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ulIncluye.appendChild(li);
    });

    // Itinerario
    const itCont = document.getElementById("pack-itinerario");
    itCont.innerHTML = ""; // limpiar antes

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


});
