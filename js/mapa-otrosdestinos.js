let map;                    // mapa global
const cityMarkers = [];     // todos los marcadores

document.addEventListener('DOMContentLoaded', () => {

    const mapContainer = document.getElementById('world-map');
    if (!mapContainer) return;

    // Crear mapa
    map = L.map('world-map').setView([20, 0], 2);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 5,
        minZoom: 2,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Pintar todas las ciudades (DATA viene del .js de datos)
    pintarCiudadesEnMapa(DATA, map);

    // Botones de filtro
    document.querySelectorAll('#continent-filters button').forEach(btn => {
        btn.addEventListener('click', () => {

            // marcar activo visualmente
            document.querySelectorAll('#continent-filters button')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // aplicar filtro
            const continent = btn.dataset.continent;
            filtrarPorContinente(continent);
        });
    });
});

function crearPopupHTML(city, countryName) {
    return `
    <div class="popup-card">
        <img src="${city.image.url}" alt="${city.image.alt}" class="popup-img" />

        <div class="popup-content">
            <h3 class="popup-title">${city.name}</h3>
            <h4 class="popup-subtitle">${countryName}</h4>

            <p class="popup-description">${city.description}</p>
        </div>
    </div>`;
}

// Tarjetitas como chinchetas
function crearMarkerCard(city) {
    return L.divIcon({
        className: 'custom-marker-card',
        html: `
            <div class="marker-card">
                <img src="${city.image.url}" alt="${city.name}">
            </div>
        `,
        iconSize: [54, 54],
        iconAnchor: [27, 54],
        popupAnchor: [0, -50]
    });
}

// Pintar ciudades en el mapa
function pintarCiudadesEnMapa(data, map) {

    data.continents.forEach(cont => {
        cont.countries.forEach(country => {
            country.cities.forEach(city => {

                if (!city.coords) return;

                const popupHTML = crearPopupHTML(city, country.name);

                const marker = L.marker(city.coords, {
                    icon: crearMarkerCard(city)
                }).bindPopup(popupHTML);

                // guardar el continente al que pertenece
                marker.continent = cont.name === "América del Sur" || cont.name === "América del Norte"
                ? "América"
                : cont.name;

                // añadir al mapa y al array global
                marker.addTo(map);
                cityMarkers.push(marker);
            });
        });
    });
}

// Filtrado por continente usando cityMarkers
function filtrarPorContinente(continent) {

    cityMarkers.forEach(marker => {
        const shouldShow =
            continent === "all" || marker.continent === continent;

        if (shouldShow) {
            if (!map.hasLayer(marker)) {
                marker.addTo(map);
            }
        } else {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        }
    });
}
