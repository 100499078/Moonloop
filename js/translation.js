const translations = {
    es: {
        // HEADER
        nav_home: "Inicio",
        nav_user: "Usuario",
        nav_destinations: "Destinos",
        nav_otherplaces: "Otros rincones",
        nav_community: "Comunidad",

        //BANNER
        banner_text: "TU AVENURA EMPIEZA AQUÍ",

        // PACKS
        packs_title: "Packs Destacados",
        see_destinations: "Ver destinos",

        pack_japan_title: "Aventura en Japón",
        pack_colombia_title: "Ruta Andina por Colombia",
        pack_southafrica_title: "Cataratas Victoria en Sudáfrica",

        // EXPERIENCIAS DESTACADAS
        exp_title: "Experiencias Destacadas",

        exp_colombia_title: "Experiencia Colombia",
        exp_colombia_desc: "Recorre paisajes tropicales, descubre la riqueza cultural y vive la alegría única del pueblo colombiano.",

        exp_vietnam_title: "Vietnam y sus sendas escondidas",
        exp_vietnam_desc: "Adéntrate en templos ancestrales, aldeas flotantes y caminos rodeados de naturaleza salvaje.",

        exp_panama_title: "La ruta de los manglares por Panamá",
        exp_panama_desc: "Navega entre manglares, descubre fauna exótica y conecta con uno de los ecosistemas más fascinantes del país.",

        exp_iceland_title: "Exploración de glaciares en Islandia",
        exp_iceland_desc: "Camina sobre antiguas masas de hielo y descubre cuevas de tonos azules imposibles.",

        exp_peru_title: "Ruta a la Montaña de 7 colores en Perú",
        exp_peru_desc: "Un trekking único entre paisajes surrealistas.",

        exp_turkey_title: "Cappadocia en globo en Turquía",
        exp_turkey_desc: "Un cielo lleno de globos sobre formaciones rocosas únicas.",

        exp_philippines_title: "Filipinas, cuevas y laguna de El Nido",
        exp_philippines_desc: "Kayak entre aguas turquesas y formaciones kársticas.",

        exp_kenya_title: "Un safari en Masai Mara, Kenia",
        exp_kenya_desc: "Los cinco grandes y puestas de sol épicas.",

        exp_shibuya_title: "Ver las luces de Shibuya de noche",
        exp_shibuya_desc: "El cruce más famoso del mundo.",

        // GIFT CARD
        gift_title: "¡Regala un viaje inolvidable!",
        gift_desc: "No hay mejor regalo que el de una experiencia.",
        gift_button: "Ver más",

        // COMUNIDAD
        community_title: "¿Pensando en recorrer el mundo?",
        community_subtitle: "¡Todo lo que necesitas saber en nuestra comunidad!",
        community_desc: "Únete a miles de viajeros que comparten consejos, rutas, dudas y experiencias reales para sacar el máximo partido a tus viajes.",
        community_button: "Saber más",

        // FOOTER
        footer_contact: "Contacto +34 666 722 227",
        footer_policies: "Políticas",
        footer_faqs: "FAQs",

        // NEWSLETTER
        newsletter_title: "¡No te pierdas nada con nuestra Newsletter!",
        newsletter_placeholder: "Introduce tu correo",
        newsletter_button: "Enviar"
    },

    en: {
        // HEADER
        nav_home: "Home",
        nav_user: "User",
        nav_destinations: "Destinations",
        nav_otherplaces: "Other Places",
        nav_community: "Community",

        //BANNER
        banner_text: "YOUR ADVENTURE STARTS HERE",

        // PACKS
        packs_title: "Featured Packs",
        see_destinations: "View Destinations",

        pack_japan_title: "Adventure in Japan",
        pack_colombia_title: "Andean Route through Colombia",
        pack_southafrica_title: "Victoria Falls in South Africa",
        // EXPERIENCIAS
        exp_title: "Featured Experiences",

        exp_colombia_title: "Experience Colombia",
        exp_colombia_desc: "Explore tropical landscapes, discover cultural richness and feel the unique joy of the Colombian people.",

        exp_vietnam_title: "Vietnam and its hidden paths",
        exp_vietnam_desc: "Immerse yourself in ancient temples, floating villages and paths surrounded by wild nature.",

        exp_panama_title: "Mangrove Route in Panama",
        exp_panama_desc: "Sail through mangroves, discover exotic wildlife and connect with one of the country's most fascinating ecosystems.",

        exp_iceland_title: "Glacier Exploration in Iceland",
        exp_iceland_desc: "Walk over ancient ice formations and discover caves with impossible blue tones.",

        exp_peru_title: "Rainbow Mountain Route in Peru",
        exp_peru_desc: "A unique trek through surreal landscapes.",

        exp_turkey_title: "Hot Air Balloons in Cappadocia",
        exp_turkey_desc: "A sky full of balloons over stunning rock formations.",

        exp_philippines_title: "El Nido Caves and Lagoon, Philippines",
        exp_philippines_desc: "Kayak through turquoise waters and dramatic karst formations.",

        exp_kenya_title: "Safari in Masai Mara, Kenya",
        exp_kenya_desc: "The Big Five and breathtaking sunsets.",

        exp_shibuya_title: "Shibuya Lights at Night",
        exp_shibuya_desc: "The world's most famous crossing.",

        // GIFT CARD
        gift_title: "Give an unforgettable trip!",
        gift_desc: "There is no better gift than an experience.",
        gift_button: "Learn more",

        // COMMUNITY
        community_title: "Thinking of exploring the world?",
        community_subtitle: "Everything you need in our community!",
        community_desc: "Join thousands of travelers who share tips, routes, questions and real experiences to help you make the most of your trips.",
        community_button: "Learn more",

        // FOOTER
        footer_contact: "Contact +34 666 722 227",
        footer_policies: "Policies",
        footer_faqs: "FAQs",

        // NEWSLETTER
        newsletter_title: "Don't miss anything with our Newsletter!",
        newsletter_placeholder: "Enter your email",
        newsletter_button: "Send"
    }
};

// Cambiar idioma
function updateLanguage(lang) {

    // Guardar idioma en localStorage
    localStorage.setItem("lang", lang);

    // Traducir textos normales
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Traducir placeholders (newsletter)
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

// Detectar cambio en el selector de idioma
const languageSelect = document.getElementById("language-select");
languageSelect.addEventListener("change", () => {
    updateLanguage(languageSelect.value);
});

// Cargar idioma guardado al entrar
const savedLang = localStorage.getItem("lang") || "es";
languageSelect.value = savedLang;
updateLanguage(savedLang);

