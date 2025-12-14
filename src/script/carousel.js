//CARROUSEL MAIN (main.html)
const carousel = document.querySelector(".carousel");
let autoScroll;

function startCarousel() {
    autoScroll = setInterval(() => {
        carousel.scrollBy({
            left: 320,     // avanza una tarjeta (ajusta según tu tamaño)
            behavior: "smooth"
        });

        // Si llega al final, vuelve al inicio
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 5) {
            setTimeout(() => {
                carousel.scrollTo({ left: 0, behavior: "smooth" });
            }, 500);
        }

    }, 2000); // 2 segundos
}

startCarousel();

// PACKS CAROUSEL
const packSlides = document.querySelectorAll(".pack");
let currentPack = 0;

function showNextPack() {
    packSlides[currentPack].classList.remove("active");
    currentPack = (currentPack + 1) % packSlides.length;
    packSlides[currentPack].classList.add("active");
}

setInterval(showNextPack, 2000);


// CARROUSEL DESTINOS (destinos.html)
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. CONFIGURACIÓN: Aquí definimos los 5 packs exactos para el carrusel
    const idsDestacados = [
        "AFR004KE",  // 1. KENIA
        "LATAM004CR",   // 2. CR
        "NA001US",    // 3. NY
        "ASIA003ID",   // 4. BALI
        "ASIA004NP"  // 5. NEPAL 
    ];

    // 2. Obtener los objetos completos desde PACKS
    // (Si alguno no existe o PACKS no cargó, filtramos para que no rompa)
    const slides = typeof PACKS !== 'undefined' 
        ? PACKS.filter(p => idsDestacados.includes(p.id)) 
        : [];

    if (slides.length === 0) return; 

    // 3. Referencias al DOM
    const imgEl = document.getElementById("car-img");
    const tituloEl = document.getElementById("car-titulo");
    const descEl = document.getElementById("car-desc");
    const precioEl = document.getElementById("car-precio");
    const linkEl = document.getElementById("car-link");
    const dotsContainer = document.getElementById("carousel-dots"); // Contenedor de puntos
    
    let indiceActual = 0;
    let intervaloAuto;

    // --- GENERAR PUNTOS (DOTS) ---
    // Creamos un punto por cada slide para que el usuario vea que son 5
    if (dotsContainer) {
        dotsContainer.innerHTML = slides.map((_, i) => 
            `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
        ).join("");

        // Añadir evento click a los puntos
        document.querySelectorAll(".dot").forEach(dot => {
            dot.addEventListener("click", (e) => {
                const index = parseInt(e.target.dataset.index);
                mostrarSlide(index);
                reiniciarTimer();
            });
        });
    }

    // 4. Función para pintar el slide actual
    function mostrarSlide(index) {
        // Corrección de índice cíclico
        if (index >= slides.length) indiceActual = 0;
        else if (index < 0) indiceActual = slides.length - 1;
        else indiceActual = index;

        const pack = slides[indiceActual];

        // Efecto visual: Ocultar
        imgEl.style.opacity = 0; 
        
        setTimeout(() => {
            // Actualizar datos
            imgEl.src = pack.imagen;
            tituloEl.textContent = pack.nombre;
            descEl.textContent = pack.descripcion.substring(0, 100) + "..."; 
            precioEl.textContent = pack.precio + "€";
            linkEl.href = `pack.html?id=${pack.id}`;
            
            // Actualizar puntos visualmente
            document.querySelectorAll(".dot").forEach((dot, i) => {
                dot.classList.toggle("active", i === indiceActual);
            });
            
            // Efecto visual: Mostrar
            imgEl.style.opacity = 1;
        }, 200); 
    }

    // 5. Controles
    function siguiente() { mostrarSlide(indiceActual + 1); }
    function anterior() { mostrarSlide(indiceActual - 1); }

    // Event Listeners Flechas
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");

    if(btnNext) btnNext.addEventListener("click", () => { siguiente(); reiniciarTimer(); });
    if(btnPrev) btnPrev.addEventListener("click", () => { anterior(); reiniciarTimer(); });

    // 6. Auto-play
    function iniciarTimer() {
        intervaloAuto = setInterval(siguiente, 5000); 
    }

    function reiniciarTimer() {
        clearInterval(intervaloAuto);
        iniciarTimer();
    }

    // Iniciar
    mostrarSlide(0);
    iniciarTimer();
});