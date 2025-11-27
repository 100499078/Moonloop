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