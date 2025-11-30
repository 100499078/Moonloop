const PACKS = [
    {
        id:"AFR001TZ",
        nombre: "Sabana de Lujo",
        destinos: "Arusha, Zanzíbar (Stone Town)",
        region: "África",
        pais: "Tanzania",
        duracion: "10 días",
        tipo: "Pareja",
        interes: "Relax",
        precio: 4500,
        imagen: "../images/pack-sabana.jpg",
        descripcion:"Experimenta la majestuosidad de la sabana africana con alojamiento en lodges de lujo y safaris exclusivos. Disfruta de Tanzania como no la has visto nunca antes, con la comodidad y el estilo que mereces.",
        incluye: [
            "Alojamiento en lodges de lujo",
            "Safaris privados con guías expertos",
            "Vuelos internos y traslados en vehículos 4x4",
            "Comidas gourmet y experiencias culturales"]
    },

     {
        nombre: "Cataratas de Victoria",
        destinos: "Zimbawe: Harare, Cataratas Victoria",
        region: "África",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 1080,
        imagen: "../images/pack-sudafrica.jpg"
    },
    {
        nombre: "Marrakech Express",
        destinos: "Marrakech, Ouarzazate",
        region: "África",
        tipo: "Individual",
        interes: "Cosmopolita",
        precio: 950,
        imagen: "../images/pack-marrakech.jpg"
    },
    {
        nombre: "La Gran Migración",
        destinos: "Kenia: Nairobi, Masai Mara",
        region: "África",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 2900,
        imagen: "../images/pack-migracion.jpg"
    },
    {
        nombre: "Misterios del Nilo",
        destinos: "Egipto: El Cairo, Giza",
        region: "África",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 480,
        imagen: "../images/pack-nilo.jpg"
    },

   
    

    {
        nombre: "Aventura en Japón",
        destinos: "Tokyo, Kyoto y Osaka",
        region: "Asia",
        tipo: "Grupo",
        interes: "Cosmopolita",
        precio: 1000,
        imagen: "../images/pack-japon.jpg"
    },
    {
        nombre: "Encantos de Corea",
        destinos: "Seúl, Busan",
        region: "Asia",
        tipo: "Pareja",
        interes: "Cosmopolita",
        precio: 1850,
        imagen: "../images/pack-seoul.jpg"
    },
    {
        nombre: "Bali Zen & Spa",
        destinos: "Ubud, Seminyak, Uluwatu",
        region: "Asia",
        tipo: "Pareja",
        interes: "Relax",
        precio: 2400,
        imagen: "../images/pack-bali.jpg"
    },
    {
        nombre: "Santuario del Himalaya",
        destinos: "Nepal: Katmandú, Pokhara",
        region: "Asia",
        tipo: "Individual",
        interes: "Aventura",
        precio: 1450,
        imagen: "../images/pack-nepal.jpg"
    },
    {
        nombre: "Bangkok Express",
        destinos: "Bangkok, Ayutthaya",
        region: "Asia",
        tipo: "Individual",
        interes: "Cosmopolita",
        precio: 550,
        imagen: "../images/pack-bangkok.jpg"
    },
    {
        nombre: "Sabores del Mekong",
        destinos: "Vietnam: Hanoi, Ho Chi Minh, Hoi An",
        region: "Asia",
        tipo: "Grupo",
        interes: "Cosmopolita",
        precio: 1700,
        imagen: "../images/pack-vietnam.jpg"
    },
    {
        nombre: "Archipiélago Escondido",
        destinos: "Filipinas: El Nido, Coron, Manila",
        region: "Asia",
        tipo: "Pareja",
        interes: "Relax",
        precio: 2500,
        imagen: "../images/pack-filipinas.jpg"
    },
    {
        nombre: "Triángulo Dorado",
        destinos: "India: Delhi, Agra (Taj Mahal)",
        region: "Asia",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 450,
        imagen: "../images/pack-india.jpg"
    },
    {
        nombre: "Eurotrip Clásico",
        destinos: "Berlín, Praga, Budapest",
        region: "Europa",
        tipo: "Grupo",
        interes: "Cosmopolita",
        precio: 1500,
        imagen: "../images/pack-eurotrip.jpg"
    },
    {
        nombre: "Islandia Indómita",
        destinos: "Reikiavik, Vík, Höfn",
        region: "Europa",
        tipo: "Individual",
        interes: "Aventura",
        precio: 2200,
        imagen: "../images/pack-islandia.jpg"
    },
    {
        nombre: "Albania Salvaje",
        destinos: "Tirana, Riviera Albanesa",
        region: "Europa",
        tipo: "Individual",
        interes: "Relax",
        precio: 400,
        imagen: "../images/pack-albania.jpg"
    },
    {
        nombre: "La Ruta del Café",
        destinos: "Armenia, Salento, Medellín",
        region: "Latinoamérica",
        tipo: "Grupo",
        interes: "Relax",
        precio: 1250,
        imagen: "../images/pack-cafe.jpg"
    },
    {
        nombre: "Ruta Maya Ancestral",
        destinos: "Palenque, Tikal, Tulum",
        region: "Latinoamérica",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 2100,
        imagen: "../images/pack-maya.jpg"
    },
    {
        nombre: "Ritmos del Sur",
        destinos: "Río de Janeiro, Buenos Aires",
        region: "Latinoamérica",
        tipo: "Grupo",
        interes: "Cosmopolita",
        precio: 1950,
        imagen: "../images/pack-rio.jpg"
    },
    {
        nombre: "Pura Vida Costa Rica",
        destinos: "Costa Rica: Tortuguero, Monteverde",
        region: "Latinoamérica",
        tipo: "Pareja",
        interes: "Relax",
        precio: 2300,
        imagen: "../images/pack-costarica.jpg"
    },
    {
        nombre: "Patagonia Infinita",
        destinos: "Chile: Puerto Natales, San Pedro",
        region: "Latinoamérica",
        tipo: "Pareja",
        interes: "Aventura",
        precio: 3400,
        imagen: "../images/pack-patagonia.jpg"
    },
    {
        nombre: "Imperio de los Incas",
        destinos: "Perú: Cuzco, Lima, Aguas Calientes",
        region: "Latinoamérica",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 2150,
        imagen: "../images/pack-peru.jpg"
    },
    {
        nombre: "Luces del Norte",
        destinos: "Nueva York, Chicago, Boston",
        region: "Norteamérica",
        tipo: "Pareja",
        interes: "Cosmopolita",
        precio: 3200,
        imagen: "../images/pack-luces.jpg"
    },
    {
        nombre: "Ruta 66 Legendaria",
        destinos: "Chicago, Las Vegas, L.A.",
        region: "Norteamérica",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 3500,
        imagen: "../images/pack-ruta66.jpg"
    },
    {
        nombre: "Ecos del Océano",
        destinos: "Fiji: Nadi, Islas Mamanuca",
        region: "Pacífico",
        tipo: "Individual",
        interes: "Relax",
        precio: 2900,
        imagen: "../images/pack-fiji.jpg"
    },

    {
        nombre: "La cultura Maorí",
        destinos: "Nueva Zelanda: Wellington, Rotorua",
        region: "Pacífico",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 2900,
        imagen: "../images/pack-maori.jpg"
    },
    {
        nombre: "Sídney Urbano",
        destinos: "Sídney, Gold Coast",
        region: "Pacífico",
        tipo: "Pareja",
        interes: "Cosmopolita",
        precio: 3100,
        imagen: "../images/pack-sidney.jpg"
    }
];
