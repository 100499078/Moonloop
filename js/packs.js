const PACKS = [
    {
        id: "AFR001TZ",
        nombre: "Sabana de Lujo",
        destinos: "Arusha, Zanzíbar (Stone Town)",
        region: "África",
        pais: "Tanzania",
        duracion: "10 días",
        tipo: "Pareja",
        interes: "Relax",
        precio: 4500,
        imagen: "../images/pack-sabana.jpg",
        descripcion: "Experimenta la majestuosidad de la sabana africana con alojamiento en lodges de lujo y safaris exclusivos. Disfruta de Tanzania como no la has visto nunca antes, con la comodidad y el estilo que mereces.",
        incluye: [
            "Alojamiento en lodges de lujo",
            "Safaris privados con guías expertos",
            "Vuelos internos y traslados en vehículos 4x4",
            "Comidas gourmet y experiencias culturales",
            "Seguro de viaje completo"
        ],
        itinerario: [
            { dia: 1, titulo: "Arusha", detalle: "Llegada al aeropuerto del Kilimanjaro. Traslado a Arusha y cena de bienvenida en un lodge entre cafetales." },
            { dia: 2, titulo: "Tarangire", detalle: "Safari de día completo en el Parque Nacional de Tarangire, famoso por sus grandes manadas de elefantes y baobabs." },
            { dia: 3, titulo: "Lago Manyara", detalle: "Safari matutino en el Lago Manyara para ver flamencos y leones trepadores. Tarde de relax en el lodge." },
            { dia: 4, titulo: "Ngorongoro", detalle: "Descenso al cráter del Ngorongoro, un edén natural con la mayor densidad de depredadores de África." },
            { dia: 5, titulo: "Serengeti", detalle: "Vuelo en avioneta hacia el Serengeti. Safari al atardecer en busca de los 'Cinco Grandes'." },
            { dia: 6, titulo: "Serengeti - Zanzíbar", detalle: "Safari al amanecer. Vuelo directo a la isla de Zanzíbar. Traslado al hotel en Stone Town." },
            { dia: 7, titulo: "Stone Town", detalle: "Visita guiada por las laberínticas calles de la Ciudad de Piedra, Patrimonio de la Humanidad." },
            { dia: 8, titulo: "Playas de Zanzíbar", detalle: "Día libre en un resort de lujo en la costa norte (Nungwi o Kendwa). Sol, playa y cócteles." },
            { dia: 9, titulo: "Safari Azul", detalle: "Excursión en barco tradicional (Dhow) para hacer snorkel y barbacoa de marisco en un banco de arena." },
            { dia: 10, titulo: "Zanzíbar", detalle: "Últimas compras de especias y traslado al aeropuerto de Zanzíbar para el vuelo internacional." }
        ]
    },
    {
        id: "AFR002ZW",
        nombre: "Cataratas de Victoria",
        destinos: "Harare, Cataratas Victoria",
        region: "África",
        pais: "Zimbawe",
        duracion: "7 días",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 1080,
        imagen: "../images/pack-sudafrica.jpg",
        descripcion: "Descubre la majestuosidad de las Cataratas Victoria y la vida salvaje de Zimbawe en este emocionante paquete de 7 días. Desde increíbles safaris hasta vistas impresionantes, esta aventura africana te dejará sin aliento.",
        incluye: [
            "Alojamiento en hoteles seleccionados",
            "Excursión a las Cataratas Victoria",
            "Safaris en parques nacionales",
            "Traslados y transporte local",
            "Guía turístico especializado",
            "Seguro de viaje completo"
        ],
        itinerario: [
            { dia: 1, titulo: "Harare", detalle: "Llegada a la capital de Zimbawe. Visita a los Jardines Botánicos y mercado de artesanía Mbare." },
            { dia: 2, titulo: "Harare - Vic Falls", detalle: "Vuelo doméstico hacia las Cataratas Victoria. Check-in y crucero al atardecer por el río Zambeze." },
            { dia: 3, titulo: "Cataratas Victoria", detalle: "Visita guiada a pie por el lado de Zimbawe de las cataratas. El estruendo del 'Humo que Truena'." },
            { dia: 4, titulo: "Parque Chobe", detalle: "Excursión de día completo cruzando a Botswana para un safari en barco y 4x4 en el Parque Nacional Chobe." },
            { dia: 5, titulo: "Cataratas Victoria", detalle: "Día de adrenalina opcional: Rafting en el Zambeze, puenting o vuelo en helicóptero (El vuelo de los Ángeles)." },
            { dia: 6, titulo: "Cataratas Victoria", detalle: "Safari en el Parque Nacional Zambezi o visita a un santuario de rinocerontes." },
            { dia: 7, titulo: "Victoria Falls", detalle: "Mañana libre para compras de souvenirs y traslado al aeropuerto." }
        ]
    },
    {
        id: "AFR003MA",
        nombre: "Marrakech Express",
        destinos: "Marrakech, Ouarzazate",
        region: "África",
        pais: "Marruecos",
        duracion: "5 días",
        tipo: "Individual",
        interes: "Cosmopolita",
        precio: 950,
        imagen: "../images/pack-marrakech.jpg",
        descripcion: "Sumérgete en la vibrante cultura de Marrakech con nuestro paquete de 5 días. Explora los zocos, palacios y jardines de esta ciudad mágica, y descubre la rica historia y tradiciones de Marruecos.",
        incluye: [
            "Alojamiento en riads tradicionales",
            "Visitas guiadas por la ciudad",
            "Excursión a Ouarzazate y Ait Ben Haddou",
            "Excursion en quad por el desierto",
            "Traslados y transporte local",
            "Seguro de viaje completo"
        ],
        itinerario: [
            { dia: 1, titulo: "Marrakech", detalle: "Llegada y traslado al Riad. Primera toma de contacto con la plaza Jemaa el-Fna al anochecer." },
            { dia: 2, titulo: "Marrakech", detalle: "Visita guiada por la Medina: Palacio Bahía, Tumbas Saadíes y la Mezquita Koutoubia." },
            { dia: 3, titulo: "Ouarzazate", detalle: "Excursión cruzando el Alto Atlas hasta la Kasbah de Ait Ben Haddou (escenario de Juego de Tronos)." },
            { dia: 4, titulo: "Desierto Agafay", detalle: "Mañana en los Jardines Majorelle. Tarde de aventura en quad por el desierto de piedra y cena bereber." },
            { dia: 5, titulo: "Marrakech", detalle: "Tiempo libre para regatear en los zocos y compras de última hora. Traslado al aeropuerto." }
        ]
    },
    {
        id: "AFR004KE",
        nombre: "La Gran Migración",
        destinos: "Nairobi, Masai Mara",
        region: "África",
        pais: "Kenia",
        duracion: "9 días",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 2900,
        imagen: "../images/pack-migracion.jpg",
        descripcion: "Vive la experiencia única de la Gran Migración en Kenia con nuestro paquete de 9 días. Observa de cerca a millones de animales en su viaje anual a través de la sabana africana, acompañado por guías expertos y alojándote en campamentos en una ubicación increíble.",
        incluye: [
            "Alojamiento en campamentos de safari",
            "Safaris diarios en Masai Mara",
            "Visita al Orfanato de Elefantes David Sheldrick",
            "Traslados y transporte en vehículos 4x4",
            "Comidas incluidas durante el safari",
            "Seguro de viaje completo"
        ],
        itinerario: [
            { dia: 1, titulo: "Nairobi", detalle: "Llegada a Nairobi. Traslado al hotel y descanso del vuelo internacional." },
            { dia: 2, titulo: "Nairobi - Naivasha", detalle: "Visita al orfanato de elefantes y Giraffe Centre. Traslado al Lago Naivasha. Paseo en barca entre hipopótamos." },
            { dia: 3, titulo: "Lago Nakuru", detalle: "Safari en el Parque Nacional Lago Nakuru, santuario de rinocerontes blancos y negros." },
            { dia: 4, titulo: "Masai Mara", detalle: "Llegada a la legendaria reserva Masai Mara. Safari al atardecer para ver los primeros depredadores." },
            { dia: 5, titulo: "Masai Mara", detalle: "Día completo de safari buscando los 'Big Five' y las manadas de la migración cruzando el río Mara." },
            { dia: 6, titulo: "Masai Mara", detalle: "Segundo día completo en la reserva. Picnic en la sabana y visita opcional a una aldea Masai." },
            { dia: 7, titulo: "Masai Mara - Nairobi", detalle: "Safari al amanecer. Regreso por carretera a Nairobi atravesando el Gran Valle del Rift." },
            { dia: 8, titulo: "Nairobi", detalle: "Día libre o visita al museo de Karen Blixen. Cena de despedida en el restaurante Carnivore." },
            { dia: 9, titulo: "Nairobi", detalle: "Traslado al aeropuerto Jomo Kenyatta para el vuelo de regreso." }
        ]
    },
    {
        id: "AFR005EG",
        nombre: "Misterios del Nilo",
        destinos: "El Cairo, Giza",
        region: "África",
        pais: "Egipto",
        duracion: "6 días",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 480,
        imagen: "../images/pack-nilo.jpg",
        descripcion: "Explora los antiguos misterios de Egipto con nuestro paquete de 6 días. Desde las majestuosas pirámides de Giza hasta los tesoros del Museo Egipcio, este viaje te llevará a través de la rica historia y cultura del Nilo.",
        incluye: [
            "Alojamiento en hoteles de 4 estrellas",
            "Visitas guiadas a las Pirámides de Giza y el Museo Egipcio",
            "Paseo en feluca por el Nilo",
            "Traslados y transporte local",
            "Comidas incluidas según itinerario",
            "Seguro de viaje completo"
        ],
        itinerario: [
            { dia: 1, titulo: "El Cairo", detalle: "Llegada al aeropuerto internacional de El Cairo, asistencia y traslado al hotel." },
            { dia: 2, titulo: "Giza", detalle: "Visita a las Pirámides de Keops, Kefrén y Micerinos, la Esfinge y el Templo del Valle." },
            { dia: 3, titulo: "El Cairo", detalle: "Recorrido por el Museo Egipcio para ver el tesoro de Tutankamón. Visita a la Ciudadela de Saladino." },
            { dia: 4, titulo: "El Cairo Antiguo", detalle: "Barrio Copto (Iglesia Colgante) y paseo por el bazar de Khan el Khalili. Paseo en feluca por el Nilo al atardecer." },
            { dia: 5, titulo: "El Cairo - Aswan (Opcional)", detalle: "Día libre en El Cairo o excursión opcional de ida y vuelta en avión a Luxor/Aswan." },
            { dia: 6, titulo: "El Cairo", detalle: "Desayuno y traslado al aeropuerto para el vuelo de salida." }
        ]
    },
    

    {
        id: "ASIA001JP",
        nombre: "Aventura en Japón",
        destinos: "Tokyo, Kyoto y Osaka",
        region: "Asia",
        pais: "Japón",
        duracion: "10 días",
        tipo: "Grupo",
        interes: "Cosmopolita",
        precio: 1850,
        imagen: "../images/pack-japon.jpg",
        descripcion: "Descubre la fascinante mezcla de tradición y modernidad en Japón con nuestro paquete de 10 días. Sumérgete en un viaje de contrastes donde el neón de Tokyo se funde con la paz de los jardines Zen de Kyoto. Una experiencia sensorial única para los amantes de la cultura y la tecnología.",
        incluye: [
            "Alojamiento seleccionado en zonas céntricas (3-4 estrellas)",
            "JR Pass de 7 días para viajar en tren bala (Shinkansen)",
            "Experiencia gastronómica: Cena Izakaya en Tokyo",
            "Entradas a los templos dorados de Kyoto y Fushimi Inari",
            "Guía local de habla hispana en días clave",
            "Router Wi-Fi portátil ilimitado durante todo el viaje"
        ],
        itinerario: [
            { dia: 1, titulo: "Tokyo", detalle: "Recepción en el aeropuerto de Narita/Haneda y traslado al hotel en Shinjuku. Primera inmersión nocturna bajo las luces de neón." },
            { dia: 2, titulo: "Tokyo", detalle: "Visita al Templo Senso-ji en Asakusa por la mañana. Tarde en el cruce de Shibuya y el barrio de moda de Harajuku." },
            { dia: 3, titulo: "Nikko", detalle: "Excursión de día completo al santuario Toshogu en Nikko, rodeado de naturaleza y arquitectura sagrada." },
            { dia: 4, titulo: "Tokyo - Kyoto", detalle: "Experiencia en Shinkansen a 300km/h. Llegada a Kyoto y visita al barrio de las Geishas, Gion, al atardecer." },
            { dia: 5, titulo: "Kyoto", detalle: "Recorrido por el Pabellón Dorado (Kinkaku-ji) y el impresionante bosque de bambú de Arashiyama." },
            { dia: 6, titulo: "Kyoto", detalle: "Caminata por el santuario Fushimi Inari Taisha y sus miles de puertas rojas sagradas." },
            { dia: 7, titulo: "Nara - Osaka", detalle: "Visita a los ciervos sagrados de Nara. Tarde-noche gastronómica en Dotonbori, Osaka (takoyaki y okonomiyaki)." },
            { dia: 8, titulo: "Osaka - Tokyo", detalle: "Visita al imponente Castillo de Osaka por la mañana. Regreso en tren bala a Tokyo por la tarde." },
            { dia: 9, titulo: "Tokyo", detalle: "Día perfecto para compras en Ginza, visitar Akihabara o el museo teamLab Borderless." },
            { dia: 10, titulo: "Tokyo", detalle: "Tiempo libre hasta el traslado al aeropuerto para el vuelo de regreso." }
        ]
    },
    {
        id: "ASIA002KR",
        nombre: "Encantos de Corea",
        destinos: "Seúl, Seoraksan y Busan",
        region: "Asia",
        pais: "Corea del Sur",
        duracion: "8 días",
        tipo: "Pareja",
        interes: "Cosmopolita",
        precio: 1850,
        imagen: "../images/pack-seoul.jpg",
        descripcion: "Explora la vibrante cultura y tecnología de Corea del Sur. Desde los palacios reales de la bulliciosa Seúl hasta las hermosas playas de Busan, pasando por la naturaleza del monte Seorak. Un viaje lleno de K-Pop, historia y barbacoas coreanas.",
        incluye: [
            "Hoteles 4 estrellas céntricos",
            "Traslados en tren KTX de alta velocidad",
            "Entrada al Palacio Gyeongbokgung con Hanbok (traje tradicional)",
            "Excursión a la zona desmilitarizada (DMZ)",
            "Degustación de barbacoa coreana"
        ],
        itinerario: [
            { dia: 1, titulo: "Seúl", detalle: "Llegada al aeropuerto de Incheon y traslado. Paseo nocturno por el arroyo Cheonggyecheon." },
            { dia: 2, titulo: "Seúl", detalle: "Visita al Palacio Gyeongbokgung y la aldea tradicional Bukchon Hanok Village." },
            { dia: 3, titulo: "DMZ - Seúl", detalle: "Excursión histórica a la frontera con Corea del Norte. Tarde de compras en Myeongdong." },
            { dia: 4, titulo: "Seoraksan", detalle: "Traslado al Parque Nacional. Senderismo ligero y visita al templo Sinheungsa con el Gran Buda." },
            { dia: 5, titulo: "Seoraksan - Busan", detalle: "Viaje hacia la costa. Visita al mercado de pescado Jagalchi y las playas urbanas." },
            { dia: 6, titulo: "Busan", detalle: "Exploración de la colorida aldea cultural de Gamcheon y el templo Haedong Yonggungsa junto al mar." },
            { dia: 7, titulo: "Busan - Seúl", detalle: "Vuelta a la capital en tren bala. Visita al moderno distrito de Gangnam y la biblioteca Starfield." },
            { dia: 8, titulo: "Seúl", detalle: "Últimas compras de cosmética coreana y traslado al aeropuerto." }
        ]
    },
    {
        id: "ASIA003ID",
        nombre: "Bali Zen & Spa",
        destinos: "Ubud, Seminyak, Uluwatu",
        region: "Asia",
        pais: "Indonesia",
        duracion: "9 días",
        tipo: "Pareja",
        interes: "Relax",
        precio: 2400,
        imagen: "../images/pack-bali.jpg",
        descripcion: "Desconecta del mundo en la isla de los dioses. Un equilibrio perfecto entre la selva espiritual de Ubud y los atardeceres de lujo en la costa. Yoga, masajes balineses y templos sobre acantilados te esperan.",
        incluye: [
            "Villas privadas con piscina en Ubud",
            "Clases de Yoga matinales",
            "Masaje balinés de 60 minutos para dos",
            "Cena romántica en la playa de Jimbaran",
            "Traslados privados con chófer"
        ],
        itinerario: [
            { dia: 1, titulo: "Ubud", detalle: "Recepción con collares de flores y traslado a tu villa en la selva de Ubud." },
            { dia: 2, titulo: "Ubud", detalle: "Visita al Bosque de los Monos y al Palacio Real. Tarde de masajes y relajación." },
            { dia: 3, titulo: "Ubud - Batur", detalle: "Ruta por las terrazas de arroz de Tegalalang y vistas al volcán Batur." },
            { dia: 4, titulo: "Ubud", detalle: "Purificación espiritual en el templo Tirta Empul y visita a la cueva del elefante." },
            { dia: 5, titulo: "Ubud - Seminyak", detalle: "Traslado al sur. Tarde de cócteles en los famosos Beach Clubs de Seminyak." },
            { dia: 6, titulo: "Seminyak", detalle: "Día de playa en Padang Padang o Bingin. Surf opcional o relax bajo el sol." },
            { dia: 7, titulo: "Uluwatu", detalle: "Visita al templo de Uluwatu y espectáculo de danza Kecak al atardecer." },
            { dia: 8, titulo: "Nusa Penida", detalle: "Excursión de día en lancha rápida a la isla vecina para ver Kelingking Beach." },
            { dia: 9, titulo: "Seminyak", detalle: "Mañana libre para disfrutar de la piscina privada y traslado al aeropuerto." }
        ]
    },
    {
        id: "ASIA004NP",
        nombre: "Santuario del Himalaya",
        destinos: "Katmandú y Pokhara",
        region: "Asia",
        pais: "Nepal",
        duracion: "9 días",
        tipo: "Individual",
        interes: "Aventura",
        precio: 1450,
        imagen: "../images/pack-nepal.jpg",
        descripcion: "Toca el cielo en la cordillera más alta del mundo. Nepal ofrece una espiritualidad que se respira en cada rincón, desde el caos místico de Katmandú hasta la paz absoluta de los lagos de Pokhara a los pies del Annapurna.",
        incluye: [
            "Vuelos escénicos internos",
            "Permisos de senderismo y guía Sherpa",
            "Alojamiento en hoteles con encanto",
            "Visita a monasterios budistas",
            "Cena tradicional nepalí con danza"
        ],
        itinerario: [
            { dia: 1, titulo: "Katmandú", detalle: "Llegada a Katmandú. Paseo por el barrio de Thamel y sus tiendas de montaña." },
            { dia: 2, titulo: "Katmandú", detalle: "Visita a la estupa de Swayambhunath (Templo de los Monos) y la plaza Durbar de Patan." },
            { dia: 3, titulo: "Katmandú - Pokhara", detalle: "Vuelo corto hacia Pokhara con vistas a las montañas. Paseo en barca por el lago Phewa." },
            { dia: 4, titulo: "Pokhara", detalle: "Madrugón en Sarangkot para ver salir el sol iluminando los picos del Annapurna y el Machapuchare." },
            { dia: 5, titulo: "Pokhara", detalle: "Senderismo suave hasta la Pagoda de la Paz Mundial. Vistas panorámicas del valle." },
            { dia: 6, titulo: "Pokhara", detalle: "Visita a un asentamiento de refugiados tibetanos y cascada de Devi." },
            { dia: 7, titulo: "Pokhara - Katmandú", detalle: "Vuelta a Katmandú. Visita a la inmensa estupa de Boudhanath, centro del budismo tibetano." },
            { dia: 8, titulo: "Bhaktapur", detalle: "Excursión a la ciudad de los devotos, Bhaktapur, famosa por su alfarería y arquitectura." },
            { dia: 9, titulo: "Katmandú", detalle: "Traslado al aeropuerto internacional con un khata (bufanda) de la suerte." }
        ]
    },
    {
        id: "ASIA005TH",
        nombre: "Bangkok Express",
        destinos: "Bangkok y Ayutthaya",
        region: "Asia",
        pais: "Tailandia",
        duracion: "6 días",
        tipo: "Individual",
        interes: "Cosmopolita",
        precio: 550,
        imagen: "../images/pack-bangkok.jpg",
        descripcion: "Una inmersión rápida e intensa en el corazón del sudeste asiático. Descubre el caos organizado de Bangkok, sus templos dorados, sus mercados flotantes y las ruinas antiguas de la capital histórica de Siam.",
        incluye: [
            "Hoteles céntricos cerca del Skytrain",
            "Entradas al Gran Palacio y Wat Arun",
            "Excursión de día completo a Ayutthaya",
            "Tour de comida callejera (Street Food)",
            "Paseo en barco por el río Chao Phraya"
        ],
        itinerario: [
            { dia: 1, titulo: "Bangkok", detalle: "Aterrizaje en Bangkok. Check-in y primera cena en los puestos de Khao San Road." },
            { dia: 2, titulo: "Bangkok", detalle: "Visita al Gran Palacio Real y al Buda Esmeralda. Cruzar el río para ver el atardecer en Wat Arun." },
            { dia: 3, titulo: "Ayutthaya", detalle: "Tren local o minivan hacia la antigua capital. Recorrido en bicicleta por las ruinas históricas." },
            { dia: 4, titulo: "Bangkok", detalle: "Mañana en el mercado flotante o el mercado del tren. Tarde de compras en los centros comerciales de Siam." },
            { dia: 5, titulo: "Bangkok", detalle: "Exploración gastronómica por Chinatown (Yaowarat). Noche de despedida en un rascacielos con vistas." },
            { dia: 6, titulo: "Bangkok", detalle: "Último masaje tailandés y traslado al aeropuerto." }
        ]
    },
    {
        id: "ASIA006VN",
        nombre: "Sabores del Mekong",
        destinos: "Hanoi, Ha Long y Hoi An",
        region: "Asia",
        pais: "Vietnam",
        duracion: "8 días",
        tipo: "Grupo",
        interes: "Cosmopolita",
        precio: 1700,
        imagen: "../images/pack-vietnam.jpg",
        descripcion: "Vietnam es un estallido de sensaciones. Navega por las aguas esmeralda de Ha Long Bay, pasea bajo los farolillos de seda de Hoi An y sumérgete en el bullicio de las motos y el café de huevo en Hanoi.",
        incluye: [
            "Crucero nocturno en Ha Long Bay (Pensión completa)",
            "Vuelos internos Hanoi - Danang - Ho Chi Minh",
            "Tour gastronómico en Vespa",
            "Taller de farolillos en Hoi An",
            "Guías locales en español"
        ],
        itinerario: [
            { dia: 1, titulo: "Hanoi", detalle: "Llegada a la capital milenaria. Paseo en ciclo por el Barrio Antiguo y el lago Hoan Kiem." },
            { dia: 2, titulo: "Hanoi - Ha Long", detalle: "Traslado a la Bahía de Ha Long. Embarque en crucero de lujo, kayak y cena a bordo bajo las estrellas." },
            { dia: 3, titulo: "Ha Long - Hoi An", detalle: "Tai Chi en cubierta y visita a cuevas. Regreso a puerto y vuelo hacia el centro de Vietnam." },
            { dia: 4, titulo: "Hoi An", detalle: "Recorrido a pie por la ciudad de los sastres y los farolillos. Tiempo libre para playa o compras." },
            { dia: 5, titulo: "Ba Na Hills", detalle: "Visita al puente de las Manos Gigantes (Golden Bridge) en las colinas de Ba Na." },
            { dia: 6, titulo: "Hoi An - Ho Chi Minh", detalle: "Vuelo a Ho Chi Minh (Saigón). Visita al Museo de los Vestigios de la Guerra y la Catedral." },
            { dia: 7, titulo: "Delta del Mekong", detalle: "Excursión de día al delta del río Mekong. Paseo en barca de remos entre cocoteros." },
            { dia: 8, titulo: "Ho Chi Minh", detalle: "Tiempo para el último café vietnamita y traslado al aeropuerto." }
        ]
    },
    {
        id: "ASIA007PH",
        nombre: "Archipiélago Escondido",
        destinos: "El Nido, Coron y Manila",
        region: "Asia",
        pais: "Filipinas",
        duracion: "9 días",
        tipo: "Pareja",
        interes: "Relax",
        precio: 2500,
        imagen: "../images/pack-filipinas.jpg",
        descripcion: "El paraíso existe y está en Palawan. Olvídate del reloj saltando de isla en isla (Island Hopping), nadando en lagunas de color turquesa imposible y disfrutando de atardeceres que parecen pintados a mano.",
        incluye: [
            "Vuelos internos Manila - El Nido - Coron",
            "Tours privados de Island Hopping en barco tradicional",
            "Tasas ecológicas y equipo de snorkel",
            "Kayak en el Big Lagoon",
            "Alojamiento en primera línea de playa"
        ],
        itinerario: [
            { dia: 1, titulo: "Manila", detalle: "Llegada a Manila. Visita rápida a Intramuros, el barrio colonial español." },
            { dia: 2, titulo: "Manila - El Nido", detalle: "Vuelo directo a El Nido. Tarde libre en la playa de Las Cabañas para ver el atardecer." },
            { dia: 3, titulo: "El Nido", detalle: "Tour A: Big Lagoon, Secret Lagoon y playa de 7 Comandos. Kayak entre paredes de roca caliza." },
            { dia: 4, titulo: "El Nido", detalle: "Tour C: Hidden Beach y Helicopter Island. Snorkel en aguas cristalinas llenas de coral." },
            { dia: 5, titulo: "El Nido - Coron", detalle: "Travesía en barco rápido hacia la isla de Coron. Tarde de relax en las termas Maquinit." },
            { dia: 6, titulo: "Coron", detalle: "Super Ultimate Tour: Lago Kayangan (el más limpio de Asia) y Twin Lagoon." },
            { dia: 7, titulo: "Coron", detalle: "Excursión para ver barcos hundidos japoneses y el jardín de coral." },
            { dia: 8, titulo: "Coron - Manila", detalle: "Vuelo de vuelta a Manila. Tarde de compras en Mall of Asia o relax." },
            { dia: 9, titulo: "Manila", detalle: "Traslado al aeropuerto internacional." }
        ]
    },
    {
        id: "ASIA008IN",
        nombre: "Triángulo Dorado",
        destinos: "Delhi, Agra y Jaipur",
        region: "Asia",
        pais: "India",
        duracion: "7 días",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 450,
        imagen: "../images/pack-india.jpg",
        descripcion: "Un viaje intenso a la India más monumental. El caos hipnótico de Delhi, la belleza eterna del Taj Mahal al amanecer y el color rosa de los palacios de los Marajás en Jaipur.",
        incluye: [
            "Conductor privado y vehículo con A/C",
            "Guías locales en español en cada ciudad",
            "Paseo en Rickshaw por Old Delhi",
            "Entrada al Taj Mahal al amanecer",
            "Paseo en Jeep al Fuerte Amber"
        ],
        itinerario: [
            { dia: 1, titulo: "Delhi", detalle: "Bienvenida tradicional. Visita al Templo del Loto y la Puerta de la India." },
            { dia: 2, titulo: "Delhi", detalle: "Old Delhi: Mezquita Jama Masjid y paseo en rickshaw por Chandni Chowk. Tumba de Humayun." },
            { dia: 3, titulo: "Delhi - Agra", detalle: "Carretera hacia Agra. Visita al Fuerte Rojo de Agra y atardecer con vistas al Taj Mahal desde el río." },
            { dia: 4, titulo: "Agra - Jaipur", detalle: "Amanecer en el Taj Mahal (imprescindible). Traslado a Jaipur visitando la ciudad fantasma de Fatehpur Sikri." },
            { dia: 5, titulo: "Jaipur", detalle: "Jaipur: Subida al Fuerte Amber en Jeep. Parada fotográfica en el Palacio de los Vientos (Hawa Mahal)." },
            { dia: 6, titulo: "Jaipur", detalle: "Visita al Palacio de la Ciudad y el observatorio astronómico. Tiempo para compras de artesanía." },
            { dia: 7, titulo: "Jaipur - Delhi", detalle: "Carretera de vuelta a Delhi y traslado directo al aeropuerto para el vuelo de regreso." }
        ]
    },
    {
        id: "EUR001EU",
        nombre: "Eurotrip Clásico",
        destinos: "Berlín, Praga, Budapest",
        region: "Europa",
        pais: "Alemania, R. Checa y Hungría",
        duracion: "9 días",
        tipo: "Grupo",
        interes: "Cosmopolita",
        precio: 1500,
        imagen: "../images/pack-eurotrip.jpg",
        descripcion: "Sumérgete en la historia y la fiesta de Centroeuropa. Tres capitales imperiales unidas por tren: el vanguardismo de Berlín, la magia medieval de Praga y la elegancia nocturna de Budapest. El viaje definitivo para espíritus jóvenes.",
        incluye: [
            "Pase de tren Interrail (o billetes individuales)",
            "Alojamiento en hoteles/hostels modernos céntricos",
            "Tour de cerveza en Praga",
            "Entrada a los Baños Széchenyi en Budapest",
            "Tour del Muro de Berlín y Arte Urbano",
            "Seguro de viaje joven"
        ],
        itinerario: [
            { dia: 1, titulo: "Berlín", detalle: "Llegada a Berlín. Visita a la Puerta de Brandeburgo y el Monumento al Holocausto." },
            { dia: 2, titulo: "Berlín", detalle: "Recorrido por el Muro de Berlín (East Side Gallery) y el barrio alternativo de Kreuzberg." },
            { dia: 3, titulo: "Berlín - Praga", detalle: "Viaje en tren a través de Sajonia. Llegada a Praga y paseo nocturno por el Puente de Carlos." },
            { dia: 4, titulo: "Praga", detalle: "Exploración del Castillo de Praga y la Catedral de San Vito. Reloj Astronómico en la Plaza de la Ciudad Vieja." },
            { dia: 5, titulo: "Praga", detalle: "Día libre o excursión a Kutná Hora. Noche de cata de cervezas checas tradicionales." },
            { dia: 6, titulo: "Praga - Budapest", detalle: "Tren hacia Hungría. Llegada a Budapest y crucero nocturno por el Danubio viendo el Parlamento iluminado." },
            { dia: 7, titulo: "Budapest", detalle: "Visita al Bastión de los Pescadores y la Iglesia de Matías. Tarde de relax en el Balneario Széchenyi." },
            { dia: 8, titulo: "Budapest", detalle: "Exploración de los Ruin Bars (bares en edificios abandonados) en el barrio judío." },
            { dia: 9, titulo: "Budapest", detalle: "Traslado al aeropuerto para el vuelo de regreso." }
        ]
    },
    {
        id: "EUR002IS",
        nombre: "Islandia Indómita",
        destinos: "Reikiavik, Vík, Höfn",
        region: "Europa",
        pais: "Islandia",
        duracion: "6 días",
        tipo: "Individual",
        interes: "Aventura",
        precio: 2200,
        imagen: "../images/pack-islandia.jpg",
        descripcion: "Una expedición a la tierra de hielo y fuego. Conduce a través de campos de lava, camina detrás de cascadas rugientes y busca auroras boreales bailando sobre glaciares milenarios. Naturaleza en su estado más puro y salvaje.",
        incluye: [
            "Alquiler de coche 4x4 con seguro a todo riesgo",
            "Alojamiento en hoteles rurales y guesthouses",
            "Entrada al Blue Lagoon (Comfort)",
            "Excursión a cueva de hielo (en invierno)",
            "Mapa de ruta detallado y GPS"
        ],
        itinerario: [
            { dia: 1, titulo: "Reikiavik", detalle: "Llegada a Keflavik. Recogida del coche y baño relajante en el Blue Lagoon antes de ir a la capital." },
            { dia: 2, titulo: "Círculo Dorado", detalle: "Ruta clásica: Parque Nacional Thingvellir, Geysir (géiser activo) y la cascada dorada Gullfoss." },
            { dia: 3, titulo: "Costa Sur", detalle: "Cascadas Seljalandsfoss (puedes pasar detrás) y Skógafoss. Atardecer en la playa negra de Reynisfjara." },
            { dia: 4, titulo: "Vík - Jökulsárlón", detalle: "Conducción a través de campos de lava hasta la laguna glaciar de Jökulsárlón y la Playa de los Diamantes." },
            { dia: 5, titulo: "Skaftafell - Vík", detalle: "Caminata sobre glaciar o visita a cueva de hielo en Skaftafell. Regreso hacia el oeste durmiendo en zona rural (ideal auroras)." },
            { dia: 6, titulo: "Reikiavik", detalle: "Regreso a la capital. Visita a la iglesia Hallgrímskirkja y últimas compras antes del vuelo." }
        ]
    },
    {
        id: "EUR003AL",
        nombre: "Albania Salvaje",
        destinos: "Tirana, Riviera Albanesa",
        region: "Europa",
        pais: "Albania",
        duracion: "5 días",
        tipo: "Individual",
        interes: "Relax",
        precio: 400,
        imagen: "../images/pack-albania.jpg",
        descripcion: "Descubre la última frontera de Europa. Albania combina playas que rivalizan con las Maldivas, ruinas griegas sin multitudes y una hospitalidad que te hará sentir en casa. Un destino auténtico y económico que no permanecerá secreto mucho tiempo.",
        incluye: [
            "Hoteles boutique con desayuno",
            "Traslados privados o alquiler de coche",
            "Ferry a la isla de Corfú (opcional)",
            "Entrada a Bunk'Art en Tirana",
            "Seguro de viaje"
        ],
        itinerario: [
            { dia: 1, titulo: "Tirana", detalle: "Llegada a la colorida capital. Visita a la Plaza Skanderbeg y el museo Bunk'Art (antiguo búnker nuclear)." },
            { dia: 2, titulo: "Berat", detalle: "Excursión a la 'Ciudad de las mil ventanas', Patrimonio de la UNESCO. Subida al castillo al atardecer." },
            { dia: 3, titulo: "Riviera Albanesa", detalle: "Traslado hacia la costa sur. Tarde de relax en las aguas turquesas de Ksamil o Himare." },
            { dia: 4, titulo: "Gjirokastër - Blue Eye", detalle: "Visita al manantial 'Blue Eye' (Syri i Kaltër) y la ciudad de piedra de Gjirokastër." },
            { dia: 5, titulo: "Tirana", detalle: "Regreso al aeropuerto de Tirana para el vuelo de vuelta." }
        ]
    },
    {
        id: "LATAM001CO",
        nombre: "La Ruta del Café",
        destinos: "Armenia, Salento, Medellín",
        region: "Latinoamérica",
        pais: "Colombia",
        duracion: "9 días",
        tipo: "Grupo",
        interes: "Relax",
        precio: 1250,
        imagen: "../images/pack-cafe.jpg",
        descripcion: "Despierta tus sentidos con el aroma del mejor café del mundo. Recorre las verdes colinas del Eje Cafetero, descubre palmas de cera gigantes y vive la transformación urbana de Medellín. Un viaje de sabores, naturaleza y pura calidez humana.",
        incluye: [
            "Cata de café premium en hacienda tradicional",
            "Traslado en Jeep Willys por el Valle de Cocora",
            "Tour de grafitis en la Comuna 13 de Medellín",
            "Vuelos internos Bogotá - Armenia y Medellín - Bogotá",
            "Alojamiento en fincas cafeteras"
        ],
        itinerario: [
            { dia: 1, titulo: "Bogotá", detalle: "Llegada a Bogotá. Tiempo libre para explorar la Candelaria o subir al Cerro Monserrate." },
            { dia: 2, titulo: "Bogotá" , detalle: "Tour gastronómico por el mercado de Paloquemao y degustación de frutas exóticas." },
            { dia: 3, titulo: "Bogotá - Armenia", detalle: "Llegada al corazón del Eje Cafetero. Alojamiento en una hacienda tradicional." },
            { dia: 4, titulo: "Salento - Cocora", detalle: "Visita al Valle de Cocora para ver las palmas de cera más altas del mundo. Tarde en el colorido pueblo de Salento." },
            { dia: 5, titulo: "Eje Cafetero", detalle: "Experiencia inmersiva del café: desde la recolección hasta la taza. Tarde de relax en termales." },
            { dia: 6, titulo: "Medellín", detalle: "Vuelo o traslado a la ciudad de la eterna primavera. Paseo nocturno por el Parque Lleras." },
            { dia: 7, titulo: "Medellín", detalle: "Tour de transformación social: Comuna 13, escaleras eléctricas y arte urbano. Tarde en el Metrocable." },
            { dia: 8, titulo: "Guatapé", detalle: "Excursión a la Piedra del Peñol. Subida de 740 escalones para la mejor vista de Colombia y visita al pueblo de zócalos." },
            { dia: 9, titulo: "Medellín", detalle: "Visita al Museo de Antioquia y Plaza Botero. Tiempo libre para compras." },
            { dia: 10, titulo: "Medellín", detalle: "Traslado al aeropuerto José María Córdova para el regreso." }
        ]
    },
    {
        id: "LATAM002MX",
        nombre: "Ruta Maya Ancestral",
        destinos: "Palenque, Tikal, Tulum",
        region: "Latinoamérica",
        pais: "México y Guatemala",
        duracion: "10 días",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 2100,
        imagen: "../images/pack-maya.jpg",
        descripcion: "Sigue los pasos de una civilización perdida a través de dos países. Adéntrate en la selva para descubrir las pirámides de Tikal y Palenque, y termina relajándote en las aguas turquesas del Caribe mexicano. Arqueología y paraíso en un solo viaje.",
        incluye: [
            "Transporte privado con cruce de fronteras",
            "Guía arqueológico especializado en zona Maya",
            "Entradas a Chichén Itzá, Tikal, Palenque y Yaxchilán",
            "Nado en Cenotes y lancha por el río Usumacinta",
            "Tasas fronterizas incluidas"
        ],
        itinerario: [
            { dia: 1, titulo: "Palenque", detalle: "Llegada a Villahermosa y traslado a Palenque. Noche rodeados de los sonidos de la selva." },
            { dia: 2, titulo: "Palenque", detalle: "Exploración profunda de la zona arqueológica de Palenque y sus templos escondidos en la vegetación." },
            { dia: 3, titulo: "Yaxchilán - Frontera", detalle: "Aventura en lancha por el río Usumacinta visitando Yaxchilán. Cruce de frontera a Guatemala." },
            { dia: 4, titulo: "Tikal", detalle: "Amanecer en la selva de Petén. Visita a la majestuosa Tikal, el corazón del mundo Maya." },
            { dia: 5, titulo: "Flores - Belice", detalle: "Mañana en la isla de Flores. Traslado cruzando Belice (paso) hacia la frontera con México." },
            { dia: 6, titulo: "Bacalar", detalle: "Llegada a la Laguna de los 7 Colores en Bacalar. Tarde de relax en hamacas sobre el agua." },
            { dia: 7, titulo: "Tulum", detalle: "Visita a las ruinas de Tulum frente al mar Caribe. Tarde de playa." },
            { dia: 8, titulo: "Chichén Itzá", detalle: "Excursión a la Maravilla del Mundo. Nado en el cenote Ik Kil para refrescarse." },
            { dia: 9, titulo: "Riviera Maya", detalle: "Día libre de playa en Playa del Carmen o Akumal (nado con tortugas)." },
            { dia: 10, titulo: "Cancún", detalle: "Traslado al aeropuerto de Cancún para el vuelo de regreso." }
        ]
    },
    {
        id: "LATAM003BR",
        nombre: "Ritmos del Sur",
        destinos: "Río de Janeiro, Buenos Aires",
        region: "Latinoamérica",
        pais: "Brasil y Argentina",
        duracion: "9 días",
        tipo: "Grupo",
        interes: "Cosmopolita",
        precio: 1950,
        imagen: "../images/pack-rio.jpg",
        descripcion: "Siente el pulso de Sudamérica en sus dos ciudades más icónicas. De la samba y las playas de Río al tango y la elegancia europea de Buenos Aires. Un viaje de contrastes, pasión, fútbol y gastronomía de primer nivel.",
        incluye: [
            "Vuelo internacional Río - Buenos Aires",
            "Show de Tango con cena en San Telmo",
            "Entrada al Cristo Redentor y Pan de Azúcar",
            "Tour de favelas (respetuoso) o Maracaná",
            "Clase de samba y caipirinha"
        ],
        itinerario: [
            { dia: 1, titulo: "Río de Janeiro", detalle: "Bienvenida a la Cidade Maravilhosa. Caipirinha al atardecer en Copacabana." },
            { dia: 2, titulo: "Río de Janeiro", detalle: "Subida al Corcovado para ver al Cristo Redentor. Tarde en el barrio bohemio de Santa Teresa." },
            { dia: 3, titulo: "Río de Janeiro", detalle: "Teleférico del Pan de Azúcar. Tarde de playa en Ipanema." },
            { dia: 4, titulo: "Río de Janeiro", detalle: "Tour histórico por el centro o visita al estadio Maracaná. Noche de samba en Lapa." },
            { dia: 5, titulo: "Río - Buenos Aires", detalle: "Vuelo hacia Argentina. Llegada a Buenos Aires y primera cena de asado." },
            { dia: 6, titulo: "Buenos Aires", detalle: "City tour: Plaza de Mayo, Obelisco y el colorido Caminito en La Boca." },
            { dia: 7, titulo: "Buenos Aires", detalle: "Visita al cementerio de Recoleta y la librería Ateneo. Noche de show de Tango." },
            { dia: 8, titulo: "Buenos Aires", detalle: "Día libre o excursión al Delta del Tigre. Compras de cuero en calle Florida." },
            { dia: 9, titulo: "Buenos Aires", detalle: "Traslado al aeropuerto de Ezeiza para la despedida." }
        ]
    },
    {
        id: "LATAM004CR",
        nombre: "Pura Vida Costa Rica",
        destinos: "Tortuguero, Monteverde",
        region: "Latinoamérica",
        pais: "Costa Rica",
        duracion: "8 días",
        tipo: "Pareja",
        interes: "Relax",
        precio: 2300,
        imagen: "../images/pack-costarica.jpg",
        descripcion: "Desconecta del estrés y reconecta con la naturaleza más pura. Navega por los canales amazónicos de Tortuguero, camina entre las nubes en Monteverde y relájate bajo el volcán Arenal. El destino perfecto para parejas amantes de lo verde.",
        incluye: [
            "Alojamiento en Eco-Lodges sostenibles",
            "Tour de desove de tortugas (en temporada)",
            "Tirolina (Canopy) sobre el bosque nuboso",
            "Entrada a las Termas de Tabacón",
            "Traslados en bote y minibus"
        ],
        itinerario: [
            { dia: 1, titulo: "San José", detalle: "Llegada a la capital. Noche tranquila para descansar del viaje." },
            { dia: 2, titulo: "Tortuguero", detalle: "Salida temprano atravesando el parque Braulio Carrillo. Navegación en lancha hasta el lodge." },
            { dia: 3, titulo: "Tortuguero", detalle: "Safari en bote por los canales al amanecer. Tarde de caminata en el parque nacional." },
            { dia: 4, titulo: "Arenal", detalle: "Traslado hacia la zona del Volcán Arenal. Tarde relajante en aguas termales naturales." },
            { dia: 5, titulo: "Arenal", detalle: "Caminata por las coladas de lava de 1968 o visita a la catarata La Fortuna." },
            { dia: 6, titulo: "Monteverde", detalle: "Cruce del lago Arenal en bote y subida al bosque nuboso. Caminata nocturna para ver fauna." },
            { dia: 7, titulo: "Monteverde", detalle: "Paseo por los puentes colgantes entre las copas de los árboles. Café de despedida." },
            { dia: 8, titulo: "San José", detalle: "Traslado al aeropuerto Juan Santamaría para el vuelo internacional." }
        ]
    },
    {
        id: "LATAM005CL",
        nombre: "Patagonia Infinita",
        destinos: "Puerto Natales, San Pedro",
        region: "Latinoamérica",
        pais: "Chile",
        duracion: "9 días",
        tipo: "Pareja",
        interes: "Aventura",
        precio: 3400,
        imagen: "../images/pack-patagonia.jpg",
        descripcion: "Un viaje de extremos: del hielo del sur al fuego del norte. Enfréntate a los vientos de la Patagonia en Torres del Paine y contempla los cielos más limpios del planeta en el desierto de Atacama. Contrastes que te dejarán sin aliento.",
        incluye: [
            "Vuelos internos Santiago - Punta Arenas - Calama",
            "Navegación al Glaciar Grey",
            "Entrada al Parque Nacional Torres del Paine",
            "Tour astronómico nocturno en Atacama",
            "Excursión a los Géiseres del Tatio"
        ],
        itinerario: [
            { dia: 1, titulo: "Santiago", detalle: "Llegada a Chile. Paseo por el barrio Lastarria y vista desde el Cerro San Cristóbal." },
            { dia: 2, titulo: "Puerto Natales", detalle: "Vuelo a la Patagonia. Traslado a Puerto Natales, puerta de entrada a los fiordos." },
            { dia: 3, titulo: "Torres del Paine", detalle: "Excursión de día completo al Parque Nacional: Cuernos del Paine, Salto Grande y Lago Grey." },
            { dia: 4, titulo: "Glaciar Balmaceda", detalle: "Navegación por el fiordo de Última Esperanza para ver glaciares colgantes. Almuerzo patagónico." },
            { dia: 5, titulo: "Santiago", detalle: "Vuelo de regreso a la zona central. Noche de escala en Santiago." },
            { dia: 6, titulo: "San Pedro de Atacama", detalle: "Vuelo al norte (Calama). Atardecer en el Valle de la Luna, paisajes marcianos." },
            { dia: 7, titulo: "Atacama", detalle: "Visita a las Lagunas Altiplánicas y Salar de Atacama. Noche de observación de estrellas." },
            { dia: 8, titulo: "Géiseres del Tatio", detalle: "Amanecer entre fumarolas de vapor a 4000m de altura. Termas de Puritama por la tarde." },
            { dia: 9, titulo: "Calama", detalle: "Traslado al aeropuerto para conectar con el vuelo internacional en Santiago." }
        ]
    },
    {
        id: "LATAM006PE",
        nombre: "Imperio de los Incas",
        destinos: "Cuzco, Lima, Aguas Calientes",
        region: "Latinoamérica",
        pais: "Perú",
        duracion: "7 días",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 2150,
        imagen: "../images/pack-peru.jpg",
        descripcion: "Descubre el legado de una de las mayores civilizaciones de la historia. Desde la gastronomía de clase mundial en Lima hasta la magia de Machu Picchu perdida entre las nubes de los Andes. Historia viva en cada piedra.",
        incluye: [
            "Tren Vistadome (panorámico) a Machu Picchu",
            "Entrada y guía privado en la ciudadela Inca",
            "Tour gastronómico en Lima",
            "Visita al Valle Sagrado de los Incas",
            "Vuelos internos Lima - Cuzco"
        ],
        itinerario: [
            { dia: 1, titulo: "Lima", detalle: "Llegada a la capital gastronómica. Paseo por Miraflores y cena en un restaurante top." },
            { dia: 2, titulo: "Lima Colonial", detalle: "Visita al centro histórico y Museo Larco. Vuelo por la tarde a Cuzco para aclimatación." },
            { dia: 3, titulo: "Valle Sagrado", detalle: "Visita a Pisac y su mercado artesanal. Almuerzo en Urubamba y fortaleza de Ollantaytambo." },
            { dia: 4, titulo: "Aguas Calientes", detalle: "Viaje en tren escénico siguiendo el río Urubamba. Tarde libre en el pueblo a los pies de la montaña." },
            { dia: 5, titulo: "Machu Picchu", detalle: "El gran día. Amanecer en la ciudad perdida de los Incas. Visita guiada y tiempo para fotos." },
            { dia: 6, titulo: "Cuzco", detalle: "Regreso a la capital imperial. Visita a Sacsayhuamán y Qorikancha. Noche de Pisco Sour." },
            { dia: 7, titulo: "Cuzco - Lima", detalle: "Mañana libre en el barrio de San Blas. Vuelo de retorno a Lima y conexión internacional." }
        ]
    },
    {
        id: "NA001US",
        nombre: "Luces del Norte",
        destinos: "Nueva York, Chicago, Boston",
        region: "Norteamérica",
        pais: "Estados Unidos",
        duracion: "7 días",
        tipo: "Pareja",
        interes: "Cosmopolita",
        precio: 3200,
        imagen: "../images/pack-luces.jpg",
        descripcion: "Un viaje urbano por las metrópolis que definieron el siglo XX. Rascacielos infinitos en Manhattan, historia fundacional en Boston y arquitectura de vanguardia en la ventosa Chicago. Cultura, jazz y estilo en la Costa Este y Medio Oeste.",
        incluye: [
            "CityPASS (Entradas a Empire State, museos, etc.)",
            "Vuelos internos o tren Amtrak Acela",
            "Crucero de arquitectura por el río en Chicago",
            "Tour del Freedom Trail en Boston",
            "Cena en un Rooftop en NYC"
        ],
        itinerario: [
            { dia: 1, titulo: "Nueva York", detalle: "Llegada a la Gran Manzana. Paseo nocturno por Times Square." },
            { dia: 2, titulo: "Nueva York", detalle: "Estatua de la Libertad y Distrito Financiero. Atardecer desde el Empire State." },
            { dia: 3, titulo: "Nueva York - Boston", detalle: "Tren a Boston. Paseo por Beacon Hill y cena de langosta (Lobster Roll)." },
            { dia: 4, titulo: "Boston", detalle: "Recorrido histórico Freedom Trail y visita a la Universidad de Harvard." },
            { dia: 5, titulo: "Boston - Chicago", detalle: "Vuelo a la ciudad del viento. Subida a la Torre Willis (Skydeck)." },
            { dia: 6, titulo: "Chicago", detalle: "Crucero de arquitectura por el río. Paseo por Millennium Park y el 'Bean'." },
            { dia: 7, titulo: "Chicago", detalle: "Mañana de compras en la Magnificent Mile y traslado al aeropuerto O'Hare." }
        ]
    },
    {
        id: "NA002LV",
        nombre: "Ruta 66 Legendaria",
        destinos: "Chicago, Las Vegas, L.A.",
        region: "Norteamérica",
        pais: "Estados Unidos",
        duracion: "10 días",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 3500,
        imagen: "../images/pack-ruta66.jpg",
        descripcion: "Más que un viaje, un mito americano. Recorre los tramos más icónicos del oeste, desde los neones del desierto en Las Vegas hasta el muelle de Santa Mónica, pasando por la inmensidad del Gran Cañón. Roadtrip puro.",
        incluye: [
            "Alquiler de coche/minivan o autobús de lujo",
            "Entrada al Parque Nacional del Gran Cañón",
            "Noche en un hotel temático en Las Vegas",
            "Visita a Universal Studios Hollywood",
            "Parada en diners clásicos de carretera"
        ],
        itinerario: [
            { dia: 1, titulo: "Chicago", detalle: "Punto de partida histórico de la Ruta 66. Foto en la señal de inicio y Deep Dish Pizza." },
            { dia: 2, titulo: "Vuelo al Oeste", detalle: "Vuelo a Las Vegas para comenzar el tramo occidental (ahorrando las llanuras centrales)." },
            { dia: 3, titulo: "Las Vegas", detalle: "Noche de casinos, espectáculos del Cirque du Soleil y fuentes del Bellagio." },
            { dia: 4, titulo: "Gran Cañón", detalle: "Excursión al South Rim del Gran Cañón. Vistas que cambian la vida. Noche en Williams (Ruta 66)." },
            { dia: 5, titulo: "Seligman - Kingman", detalle: "Conducción por el tramo mejor conservado de la ruta. Paradas en moteles y gasolineras vintage." },
            { dia: 6, titulo: "Los Ángeles", detalle: "Llegada a California. Atardecer en el muelle de Santa Mónica, final oficial de la ruta." },
            { dia: 7, titulo: "Hollywood", detalle: "Paseo de la Fama, cartel de Hollywood y Beverly Hills." },
            { dia: 8, titulo: "Universal Studios", detalle: "Día de diversión en el parque temático del cine." },
            { dia: 9, titulo: "Venice Beach", detalle: "Mañana relajada en los canales de Venice y sus playas bohemias." },
            { dia: 10, titulo: "Los Ángeles", detalle: "Traslado al aeropuerto LAX para el vuelo de regreso." }
        ]
    },
    {
        id: "PAC001FJ",
        nombre: "Ecos del Océano",
        destinos: "Nadi, Islas Mamanuca",
        region: "Pacífico",
        pais: "Fiji",
        duracion: "8 días",
        tipo: "Individual",
        interes: "Relax",
        precio: 2900,
        imagen: "../images/pack-fiji.jpg",
        descripcion: "Entra en el 'Fiji Time', donde las prisas no existen. Un refugio tropical en el Pacífico Sur con aguas turquesas, ceremonias tradicionales de Kava y la hospitalidad más cálida del mundo. El lugar perfecto para desconectar de todo.",
        incluye: [
            "Traslados en catamarán a las islas",
            "Alojamiento en Bure (cabaña) tradicional frente al mar",
            "Equipo de snorkel ilimitado",
            "Ceremonia de bienvenida con Kava",
            "Pensión completa en las islas"
        ],
        itinerario: [
            { dia: 1, titulo: "Nadi", detalle: "Llegada al aeropuerto internacional de Nadi con bienvenida 'Bula'. Traslado al puerto." },
            { dia: 2, titulo: "Islas Mamanuca", detalle: "Traslado en barco a tu isla privada. Tarde de relax en hamaca bajo las palmeras." },
            { dia: 3, titulo: "Mamanuca", detalle: "Exploración submarina: Snorkel en arrecifes de coral llenos de peces tropicales." },
            { dia: 4, titulo: "Isla Monuriki", detalle: "Excursión a la isla donde se rodó la película 'Náufrago'. Picnic en la playa desierta." },
            { dia: 5, titulo: "Mamanuca", detalle: "Día libre para kayak, paddle surf o simplemente leer frente al océano." },
            { dia: 6, titulo: "Nadi", detalle: "Regreso a la isla principal. Visita al colorido templo hindú Sri Siva Subramaniya." },
            { dia: 7, titulo: "Jardín del Gigante", detalle: "Visita al Jardín del Gigante Durmiente, famoso por sus miles de orquídeas." },
            { dia: 8, titulo: "Nadi", detalle: "Últimas compras de artesanía local y traslado al aeropuerto." }
        ]
    },
    {
        id: "PAC002NZ",
        nombre: "La cultura Maorí",
        destinos: "Wellington, Rotorua, Hobbiton",
        region: "Pacífico",
        pais: "Nueva Zelanda",
        duracion: "10 días",
        tipo: "Grupo",
        interes: "Aventura",
        precio: 2900,
        imagen: "../images/pack-maori.jpg",
        descripcion: "Un viaje a la Tierra Media y al corazón de la cultura geotérmica. Camina por los escenarios de 'El Señor de los Anillos', maravíllate con géiseres activos y sumérgete en las tradiciones ancestrales del pueblo Maorí.",
        incluye: [
            "Entrada al set de rodaje de Hobbiton",
            "Cena Hangi tradicional y espectáculo Maorí",
            "Entrada al parque geotérmico Te Puia",
            "Visita a Weta Workshop en Wellington",
            "Transporte privado en minibus"
        ],
        itinerario: [
            { dia: 1, titulo: "Auckland", detalle: "Llegada a la 'Ciudad de las Velas'. Subida a la Sky Tower para vistas panorámicas." },
            { dia: 2, titulo: "Hobbiton", detalle: "Viaje a Matamata. Tour guiado por la Comarca y cerveza en la posada del Dragón Verde." },
            { dia: 3, titulo: "Rotorua", detalle: "Llegada a la zona geotérmica. Olor a azufre y vapor saliendo de la tierra." },
            { dia: 4, titulo: "Te Puia", detalle: "Visita al géiser Pohutu y al centro de artes Maorí. Cena Hangi cocinada bajo tierra." },
            { dia: 5, titulo: "Lago Taupo", detalle: "Parada en las impresionantes cascadas Huka y el lago más grande del país." },
            { dia: 6, titulo: "Wellington", detalle: "Llegada a la capital 'más cool' del mundo. Visita al museo nacional Te Papa." },
            { dia: 7, titulo: "Weta Workshop", detalle: "Tour exclusivo por los talleres donde se hicieron los efectos de El Señor de los Anillos." },
            { dia: 8, titulo: "Wellington", detalle: "Subida en el icónico teleférico rojo y paseo por el Jardín Botánico." },
            { dia: 9, titulo: "Cuba Street", detalle: "Día libre para disfrutar de los cafés, tiendas vintage y arte urbano de la calle Cuba." },
            { dia: 10, titulo: "Wellington", detalle: "Traslado al aeropuerto para el vuelo de regreso." }
        ]
    },
    {
        id: "PAC003AU",
        nombre: "Sídney Urbano",
        destinos: "Sídney, Gold Coast",
        region: "Pacífico",
        pais: "Australia",
        duracion: "7 días",
        tipo: "Pareja",
        interes: "Cosmopolita",
        precio: 3100,
        imagen: "../images/pack-sidney.jpg",
        descripcion: "El estilo de vida 'Aussie' en su máxima expresión. Combina la sofisticación icónica de la Ópera de Sídney con el ambiente surfero relajado de Bondi y la diversión sin fin de Gold Coast. Un viaje de contrastes costeros.",
        incluye: [
            "Visita guiada por dentro de la Ópera de Sídney",
            "Crucero por la bahía al atardecer",
            "Clase de iniciación al surf en Bondi Beach",
            "Vuelo interno Sídney - Gold Coast",
            "Entrada al santuario de koalas Currumbin"
        ],
        itinerario: [
            { dia: 1, titulo: "Sídney", detalle: "Llegada y paseo por Circular Quay para la primera vista de la Ópera y el Puente." },
            { dia: 2, titulo: "Sídney", detalle: "Tour por el interior de la Ópera House y paseo por el barrio histórico The Rocks." },
            { dia: 3, titulo: "Bondi Beach", detalle: "Día de playa en la famosa Bondi. Clase de surf y caminata costera hasta Coogee." },
            { dia: 4, titulo: "Blue Mountains", detalle: "Excursión de día para ver las formaciones rocosas de las Tres Hermanas y eucaliptos." },
            { dia: 5, titulo: "Gold Coast", detalle: "Vuelo a Queensland. Llegada al paraíso de los rascacielos frente al mar en Surfers Paradise." },
            { dia: 6, titulo: "Currumbin", detalle: "Visita al santuario de vida salvaje para ver koalas y canguros en entorno natural." },
            { dia: 7, titulo: "Gold Coast", detalle: "Mañana de playa o compras y traslado al aeropuerto de Brisbane o Gold Coast." }
        ]
    }
];
