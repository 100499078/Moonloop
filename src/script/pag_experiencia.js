document.addEventListener("DOMContentLoaded", () => {

    // 1. Obtener ID de la URL
    const params = new URLSearchParams(window.location.search);
    const expId = params.get("id");

    if (!expId) {
        document.body.innerHTML = "<div style='text-align:center; margin-top:50px;'><h2>Error: No se ha especificado ninguna experiencia.</h2><a href='comunidad.html'>Volver</a></div>";
        return;
    }

    // 2. Buscar la experiencia en el archivo experiencias.js
    const exp = typeof EXPERIENCIAS !== 'undefined' ? EXPERIENCIAS.find(e => e.id === expId) : null;

    if (!exp) {
        document.body.innerHTML = "<div style='text-align:center; margin-top:50px;'><h2>Experiencia no encontrada.</h2><a href='comunidad.html'>Volver</a></div>";
        return;
    }

    // 3. Rellenar Contenido del Artículo
    document.getElementById("exp-titulo").textContent = exp.titulo;
    document.getElementById("exp-subtitulo").textContent = exp.subtitulo;
    document.getElementById("exp-autor").textContent = exp.autor;
    document.getElementById("exp-fecha").textContent = exp.fecha_publicacion;

    // Imágenes 
    const setImg = (id, src) => {
        const el = document.getElementById(id);
        if(el) {
            el.src = src;
            el.onerror = () => el.style.display = 'none'; // Si no hay foto, la oculta
        }
    };

    setImg("exp-img1", exp.imagen1);
    setImg("exp-img2", exp.imagen2);
    setImg("exp-img3", exp.imagen3);

    // Párrafos
    document.getElementById("exp-p1").textContent = exp.parrafo1;
    document.getElementById("exp-p2").textContent = exp.parrafo2;
    document.getElementById("exp-p3").textContent = exp.parrafo3;
    document.getElementById("exp-p4").textContent = exp.parrafo4;

    // 4. Cargar PACK ASOCIADO 
    if (exp.pack_asociado && typeof PACKS !== 'undefined') {
        const pack = PACKS.find(p => p.id === exp.pack_asociado);

        if (pack) {
            // Mostrar la sección (estaba oculta por defecto)
            const section = document.getElementById("related-pack-section");
            section.style.display = "block";

            // Rellenar tarjeta
            document.getElementById("rel-img").src = pack.imagen;
            document.getElementById("rel-nombre").textContent = pack.nombre;
            // Usamos la descripción corta o truncamos la larga
            const descCorta = pack.descripcion.length > 80 ? pack.descripcion.substring(0, 80) + "..." : pack.descripcion;
            document.getElementById("rel-desc").textContent = descCorta;
            
            document.getElementById("rel-precio").textContent = pack.precio + "€";
            document.getElementById("rel-link").href = `pack.html?id=${pack.id}&source=experiencia`;
        }
    }

});