/* CARGA DEL PACK EN compra.html*/

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    alert("No se ha indicado ningún pack.");
    window.location.href = "destinos.html";
}

const pack = PACKS.find(p => p.id === id);

if (!pack) {
    alert("El pack no existe.");
    window.location.href = "destinos.html";
}

// Rellenar datos del pack en la página
document.getElementById("pack-img").src = pack.imagen;
document.getElementById("pack-titulo").textContent = pack.nombre;
document.getElementById("pack-precio").textContent = pack.precio;



/*FORMULARIO (acompañantes, mascotas, etc)*/

// mostrar/ocultar campos de mascotas
const checkMascotas = document.getElementById("lleva-mascotas");
const mascotasInfo = document.getElementById("mascotas-info");

checkMascotas.addEventListener("change", () => {
    mascotasInfo.style.display = checkMascotas.checked ? "block" : "none";
});



/* CALENDARIO DE DOS MESES (ida y vuelta)*/

let fechaActual = new Date();
let fechaIda = null;
let fechaVuelta = null;

const thDias = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

const cal1 = document.getElementById("calendario1");
const cal2 = document.getElementById("calendario2");

const mes1Titulo = document.getElementById("mes1-titulo");
const mes2Titulo = document.getElementById("mes2-titulo");

const spanIda = document.getElementById("fecha-ida");
const spanVuelta = document.getElementById("fecha-vuelta");

document.getElementById("prev-mes").addEventListener("click", () => cambiarMes(-1));
document.getElementById("next-mes").addEventListener("click", () => cambiarMes(1));

function cambiarMes(offset) {
    fechaActual.setMonth(fechaActual.getMonth() + offset);
    renderCalendarios();
}

function renderCalendarios() {
    renderMes(cal1, mes1Titulo, fechaActual);
    
    let fechaMes2 = new Date(fechaActual);
    fechaMes2.setMonth(fechaActual.getMonth() + 1);

    renderMes(cal2, mes2Titulo, fechaMes2);
}

function renderMes(tabla, titulo, fechaBase) {
    tabla.innerHTML = "";

    const año = fechaBase.getFullYear();
    const mes = fechaBase.getMonth();

    // Título del mes
    titulo.textContent = fechaBase.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

    // Encabezado de días
    let thead = "<tr>";
    thDias.forEach(d => thead += `<th>${d}</th>`);
    thead += "</tr>";
    tabla.innerHTML += thead;

    const primerDiaMes = new Date(año, mes, 1);
    let start = primerDiaMes.getDay();
    if (start === 0) start = 7; // Domingo = 7

    const diasMes = new Date(año, mes + 1, 0).getDate();

    let fila = "<tr>";

    // Huecos previos
    for (let i = 1; i < start; i++) {
        fila += `<td class='cal-disabled'></td>`;
    }

    for (let dia = 1; dia <= diasMes; dia++) {

        if ((start + dia - 2) % 7 === 0 && dia !== 1) {
            fila += "</tr><tr>";
        }

        let fecha = new Date(año, mes, dia);
        let clase = "";

        if (fechaIda && mismaFecha(fecha, fechaIda)) clase = "fecha-ida";
        if (fechaVuelta && mismaFecha(fecha, fechaVuelta)) clase = "fecha-vuelta";

        if (fechaIda && fechaVuelta && fecha > fechaIda && fecha < fechaVuelta) {
            clase = "en-rango";
        }

        fila += `<td class="${clase}" onclick="seleccionarFecha(${año}, ${mes}, ${dia})">${dia}</td>`;
    }

    fila += "</tr>";
    tabla.innerHTML += fila;
}

function mismaFecha(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
}

// Selección de fechas
window.seleccionarFecha = function (año, mes, dia) {
    const fecha = new Date(año, mes, dia);

    if (!fechaIda || (fechaIda && fechaVuelta)) {
        fechaIda = fecha;
        fechaVuelta = null;
    } else if (fecha < fechaIda) {
        fechaVuelta = fechaIda;
        fechaIda = fecha;
    } else {
        fechaVuelta = fecha;
    }

    spanIda.textContent = fechaIda.toLocaleDateString();
    spanVuelta.textContent = fechaVuelta ? fechaVuelta.toLocaleDateString() : "—";

    renderCalendarios();
};

// iniciar el calendario
renderCalendarios();



/*GUARDAR LA COMPRA TEMPORAL Y PASAR A pago.html*/

const form = document.getElementById("form-compra");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!fechaIda || !fechaVuelta) {
        alert("Selecciona una fecha de ida y una de vuelta.");
        return;
    }

    const compraTemporal = {
        idPack: pack.id,
        nombre: pack.nombre,
        precio: pack.precio,
        fechaIda: fechaIda.toISOString(),
        fechaVuelta: fechaVuelta.toISOString(),
        acompanantes: parseInt(document.getElementById("acompanantes").value),
        mascotas: checkMascotas.checked ? {
            tipo: document.getElementById("mascota-tipo").value,
            tamano: document.getElementById("mascota-tamano").value
        } : null,
        alergias: document.getElementById("alergias").value
    };

    // Guardar temporalmente en localStorage
    localStorage.setItem("compraTemporal", JSON.stringify(compraTemporal));

    // Redirigir a la página de pago
    window.location.href = "pago.html";
});

