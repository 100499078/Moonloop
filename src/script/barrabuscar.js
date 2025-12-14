/**
 * LÓGICA DEL BUSCADOR PRINCIPAL (POP-UP)
 * --------------------------------------
 * Este script maneja:
 * 1. Abrir y cerrar la ventana emergente (Overlay).
 * 2. Cargar sugerencias dinámicas ("Destacados") desde packs.js.
 * 3. Filtrar viajes en tiempo real por precio y texto (ignorando tildes).
 * 4. Mostrar los resultados sin recargar la página.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. SELECCIÓN DE ELEMENTOS DEL DOM (HTML)

    const trigger = document.getElementById('trigger-buscador'); // La barra falsa del menú
    const closeBtn = document.getElementById('btn-cerrar');      // Botón X para cerrar
    const overlay = document.getElementById('search-overlay');   // El fondo blanco completo
    
    // Inputs del usuario
    const inputSearch = document.getElementById('destination-search'); // Donde escribe texto
    const budgetRange = document.getElementById('budget-range');       // La bolita del precio
    const budgetValue = document.getElementById('budget-value');       // El número del precio (ej: 2500€)
    const btnBuscar = document.querySelector(".search-btn-action");    // El botón negro "Buscar"
    
    // Contenedores donde pintaremos cosas
    const containerResultados = document.getElementById("resultados-busqueda"); // Columna derecha (resultados)
    const containerSugerencias = document.querySelector(".mas-buscados");       // Columna derecha (sugerencias iniciales)

    
  
    // 2. FUNCIÓN PARA CARGAR DESTACADOS DINÁMICOS
    
    // Esto busca 3 packs específicos en tu base de datos y los pone como sugerencia inicial
    // al abrir el buscador. Si cambias los precios en packs.js, se actualizan aquí solos.
    function cargarDestacados() {
        const gridSugerencias = document.querySelector(".grid-suggestions-vertical");
        
        // Seguridad: Si no existe el contenedor o no se ha cargado packs.js, no hacemos nada
        if (!gridSugerencias || typeof PACKS === 'undefined') return;

        // CONFIGURACIÓN: Aquí eliges qué packs quieres que salgan sugeridos (pon sus IDs)
        const idsSugeridos = ["ASIA003ID", "ASIA001JP", "LATAM004CR"];
        
        // Buscamos esos packs en la lista completa
        let packsDestacados = PACKS.filter(p => idsSugeridos.includes(p.id));
        
        // Fallback: Si no encuentra esos IDs (por error), coge los 3 primeros de la lista
        if (packsDestacados.length === 0) {
            packsDestacados = PACKS.slice(0, 3);
        }

        // Generamos el HTML. 
        gridSugerencias.innerHTML = packsDestacados.map(pack => `
            <a href="pack.html?id=${pack.id}" class="suggestion-card-side" style="text-decoration: none; color: inherit;">
                <img src="${pack.imagen}" alt="${pack.nombre}">
                <div class="sug-info">
                    <p>${pack.nombre}</p>
                    <span>${pack.precio}€</span>
                </div>
            </a>
        `).join("");
    }

    // Ejecutamos esta carga nada más abrir la web
    cargarDestacados();



    // 3. LÓGICA DE APERTURA Y CIERRE

    
    // Abrir al hacer clic en la lupa
    if (trigger) {
        trigger.addEventListener('click', function() {
            overlay.classList.add('active'); // Añade la clase CSS que lo hace visible
            // Ponemos el cursor en el input automáticamente para escribir rápido
            setTimeout(() => {
                if(inputSearch) inputSearch.focus();
            }, 50);
        });
    }

    // Función centralizada para cerrar
    function cerrarBuscador() {
        overlay.classList.remove('active');
        
        if (inputSearch) inputSearch.value = "";
        if (containerResultados) containerResultados.innerHTML = "";
        if (containerSugerencias) containerSugerencias.style.display = "block"; // Volver a mostrar sugerencias
    }

    // Cerrar con el botón X
    if (closeBtn) closeBtn.addEventListener('click', cerrarBuscador);

    // Cerrar con la tecla ESCAPE (Mejora de accesibilidad)
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") cerrarBuscador();
    });


    
    // 4. SLIDER DE PRESUPUESTO (REACTIVO)
    
    if (budgetRange && budgetValue) {
        // Poner el valor inicial
        budgetValue.textContent = budgetRange.value + '€';
        
        // Escuchamos el evento 'input': se dispara continuamente mientras arrastras
        budgetRange.addEventListener('input', function() {
            // 1. Actualizamos el número visual
            budgetValue.textContent = this.value + '€';
            // 2. Ejecutamos la búsqueda en vivo para filtrar por el nuevo precio
            ejecutarBusqueda(); 
        });
    }


    
    // 5. HELPER: NORMALIZAR TEXTO (QUITAR TILDES)
  
    // Convierte "Japón" -> "japon", "África" -> "africa" para que la búsqueda sea flexible.
    function normalizar(texto) {
        if (!texto) return "";
        return texto
            .normalize("NFD") // Descompone letras con tilde (ej: á -> a + ´)
            .replace(/[\u0300-\u036f]/g, "") // Borra los símbolos de tilde
            .toLowerCase()    // Todo a minúsculas
            .trim();          // Quita espacios al principio y final
    }



    // 6. FUNCIÓN PRINCIPAL DE BÚSQUEDA
  
    function ejecutarBusqueda() {
        // Seguridad: Si PACKS no existe, salimos para no dar error
        if (typeof PACKS === 'undefined') return;

        // Obtenemos los valores limpios
        const textoBuscado = normalizar(inputSearch.value);
        const precioMax = Number(budgetRange.value);

        // CASO 1: Si no ha escrito nada y el precio está al tope (estado inicial)
        // Mostramos las sugerencias y borramos resultados.
        if (!textoBuscado && precioMax === 5000) { 
            if(containerSugerencias) containerSugerencias.style.display = "block";
            if(containerResultados) containerResultados.innerHTML = "";
            return;
        }

        // CASO 2: El usuario está buscando algo
        // Ocultamos las sugerencias para dejar sitio a los resultados
        if(containerSugerencias) containerSugerencias.style.display = "none";

        // FILTRADO DEL ARRAY
        const resultados = PACKS.filter(pack => {
            // Normalizamos los datos del pack para comparar
            const nombrePack = normalizar(pack.nombre);
            const destinosPack = normalizar(pack.destinos);
            const paisPack = normalizar(pack.pais);
            const regionPack = normalizar(pack.region);

            // ¿El texto escrito está en alguno de estos campos?
            const coincideTexto = 
                nombrePack.includes(textoBuscado) ||
                destinosPack.includes(textoBuscado) ||
                paisPack.includes(textoBuscado) ||
                regionPack.includes(textoBuscado);
            
            // ¿El precio está dentro del límite?
            const coincidePrecio = pack.precio <= precioMax;

            // El pack pasa el filtro si cumple AMBAS condiciones
            return coincideTexto && coincidePrecio;
        });

        // Pintamos lo que hemos encontrado
        pintarResultados(resultados);
    }



    // 7. EVENTOS DE BÚSQUEDA (ACTIVADORES)

    
    // Clic en el botón negro "Buscar"
    if (btnBuscar) btnBuscar.addEventListener("click", ejecutarBusqueda);
    
    // Escribir en la barra (Evento 'input' para búsqueda en tiempo real)
    if (inputSearch) inputSearch.addEventListener("input", ejecutarBusqueda);



    // 8. RENDERIZADO (PINTAR EN HTML)

    function pintarResultados(lista) {
        if (!containerResultados) return;

        containerResultados.innerHTML = ""; // Limpiamos resultados anteriores

        // Si no hay resultados, mostramos mensaje de error amigable
        if (lista.length === 0) {
            containerResultados.innerHTML = `
                <div class="mensaje-vacio">
                    <p>😔 No hay viajes por menos de <strong>${budgetRange.value}€</strong> con ese nombre.</p>
                </div>`;
            return;
        }

        // Si hay resultados, generamos las tarjetas
        containerResultados.innerHTML = lista.map(pack => `
            <a href="pack.html?id=${pack.id}" class="resultado-pack">
                <img src="${pack.imagen}" alt="${pack.nombre}">
                <div class="info-resultado">
                    <h4>${pack.nombre}</h4>
                    <p class="meta-resultado">${pack.pais} | ${pack.duracion || 'Varios días'}</p>
                    <span class="precio-resultado">${pack.precio}€</span>
                </div>
                <span class="flecha-resultado">➜</span>
            </a>
        `).join("");
    }

});