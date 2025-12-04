// pago.js

// --- Recuperar la info temporal de la compra ---
const compraTemporalRaw = localStorage.getItem("compraTemporal");
if (!compraTemporalRaw) {
    alert("No hay ninguna compra en curso.");
    window.location.href = "destinos.html";
}

const compraTemporal = JSON.parse(compraTemporalRaw);

// Buscar el pack
const packPago = PACKS.find(p => p.id === compraTemporal.idPack);
if (!packPago) {
    alert("El viaje seleccionado ya no está disponible.");
    window.location.href = "destinos.html";
}

// ------------------------
// RELLENAR RESUMEN DEL VIAJE
// ------------------------

const imgPackEl = document.getElementById("pago-pack-img");
const nombrePackEl = document.getElementById("pago-pack-nombre");
const destinosPackEl = document.getElementById("pago-pack-destinos");
const fechasEl = document.getElementById("pago-fechas");
const personasEl = document.getElementById("pago-personas");
const mascotasEl = document.getElementById("pago-mascotas");
const alergiasEl = document.getElementById("pago-alergias");

imgPackEl.src = packPago.imagen;
imgPackEl.alt = packPago.nombre;
nombrePackEl.textContent = packPago.nombre;
destinosPackEl.textContent = packPago.destinos || "";

const fechaIdaDate = new Date(compraTemporal.fechaIda);
const fechaVueltaDate = new Date(compraTemporal.fechaVuelta);

fechasEl.textContent = `Fechas: ${fechaIdaDate.toLocaleDateString()} - ${fechaVueltaDate.toLocaleDateString()}`;

const numAcompanantes = compraTemporal.acompanantes || 0;
const numPersonas = 1 + numAcompanantes;
personasEl.textContent = `Personas: ${numPersonas} (${numAcompanantes} acompañante(s))`;

if (compraTemporal.mascotas && compraTemporal.mascotas.tipo) {
    mascotasEl.textContent = `${compraTemporal.mascotas.tipo} (${compraTemporal.mascotas.tamano})`;
} else {
    mascotasEl.textContent = "No";
}

alergiasEl.textContent = compraTemporal.alergias && compraTemporal.alergias.trim()
    ? compraTemporal.alergias
    : "Ninguna";

// ------------------------
// DATOS VIAJERO: AUTOCOMPLETAR SI HAY USUARIO
// ------------------------

const inputNombre = document.getElementById("viajero-nombre");
const inputApellidos = document.getElementById("viajero-apellidos");
const inputEmail = document.getElementById("viajero-email");
const inputTelefono = document.getElementById("viajero-telefono");
const checkGuardarDatos = document.getElementById("guardar-datos");

const currentUser = getCurrentUser();
if (currentUser) {
    if (currentUser.name) inputNombre.value = currentUser.name;
    if (currentUser.surname) inputApellidos.value = currentUser.surname;
    if (currentUser.email) inputEmail.value = currentUser.email;
    if (currentUser.phone) inputTelefono.value = currentUser.phone; // opcional
    checkGuardarDatos.checked = true; // ya tiene cuenta
}

// ------------------------
// RESUMEN DE PRECIO
// ------------------------

const IVA_PORCENTAJE = 0.21;
let descuentoAplicado = 0;

const resumenNumPersonasEl = document.getElementById("resumen-num-personas");
const resumenSubtotalEl = document.getElementById("resumen-subtotal");
const resumenIvaEl = document.getElementById("resumen-iva");
const resumenDescuentoLineaEl = document.getElementById("resumen-descuento-linea");
const resumenDescuentoEl = document.getElementById("resumen-descuento");
const resumenTotalEl = document.getElementById("resumen-total");

function calcularYMostrarPrecio() {
    const precioBasePersona = packPago.precio;
    const subtotal = precioBasePersona * numPersonas; // acompañantes pagan igual
    const iva = subtotal * IVA_PORCENTAJE;
    let total = subtotal + iva - descuentoAplicado;

    if (total < 0) total = 0;

    resumenNumPersonasEl.textContent = numPersonas;
    resumenSubtotalEl.textContent = `${subtotal.toFixed(2)} €`;
    resumenIvaEl.textContent = `${iva.toFixed(2)} €`;

    if (descuentoAplicado > 0) {
        resumenDescuentoLineaEl.style.display = "flex";
        resumenDescuentoEl.textContent = `-${descuentoAplicado.toFixed(2)} €`;
    } else {
        resumenDescuentoLineaEl.style.display = "none";
    }

    resumenTotalEl.textContent = `${total.toFixed(2)} €`;

    return { subtotal, iva, total };
}

// Mostrar precio inicial
calcularYMostrarPrecio();

// ------------------------
// TARJETA REGALO (CÓDIGOS)
// ------------------------

const giftInput = document.getElementById("gift-code");
const giftBtn = document.getElementById("btn-aplicar-gift");
const giftMsg = document.getElementById("gift-msg");

// Ejemplos de códigos: MOON50 → 50€, MOON100 → 100€
const CODIGOS_REGALO = {
    "MOON50": 50,
    "MOON100": 100
};

giftBtn.addEventListener("click", () => {
    const code = giftInput.value.trim().toUpperCase();

    if (!code) {
        giftMsg.textContent = "Introduce un código válido.";
        giftMsg.style.color = "#c0392b";
        return;
    }

    if (!CODIGOS_REGALO[code]) {
        giftMsg.textContent = "Este código no es válido.";
        giftMsg.style.color = "#c0392b";
        descuentoAplicado = 0;
        calcularYMostrarPrecio();
        return;
    }

    descuentoAplicado = CODIGOS_REGALO[code];
    giftMsg.textContent = `Código aplicado: -${descuentoAplicado.toFixed(2)} €`;
    giftMsg.style.color = "green";
    calcularYMostrarPrecio();
});

// ------------------------
// CONFIRMAR PAGO
// ------------------------

const btnConfirmar = document.getElementById("btn-confirmar-pago");

btnConfirmar.addEventListener("click", () => {
    // Validar datos del viajero
    if (!inputNombre.value.trim() ||
        !inputApellidos.value.trim() ||
        !inputEmail.value.trim() ||
        !inputTelefono.value.trim()) {
        alert("Por favor, completa todos los datos del viajero.");
        return;
    }

    // Validar email sencilla
    if (!inputEmail.value.includes("@")) {
        alert("Introduce un email válido.");
        return;
    }

    // Validar tarjeta (simulado, solo que no estén vacíos)
    const cardNumber = document.getElementById("card-number").value.trim();
    const cardName = document.getElementById("card-name").value.trim();
    const cardExp = document.getElementById("card-exp").value.trim();
    const cardCvv = document.getElementById("card-cvv").value.trim();

    if (!cardNumber || !cardName || !cardExp || !cardCvv) {
        alert("Por favor, completa los datos de la tarjeta (simulados).");
        return;
    }

    const precios = calcularYMostrarPrecio();

    // Crear objeto de compra final
    const compraFinal = {
        id: packPago.id,
        packName: packPago.nombre,
        destinos: packPago.destinos,
        imagen: packPago.imagen,
        date: new Date().toISOString(),
        price: precios.total.toFixed(2),
        personas: numPersonas,
        fechaIda: compraTemporal.fechaIda,
        fechaVuelta: compraTemporal.fechaVuelta,
        acompanantes: numAcompanantes,
        mascotas: compraTemporal.mascotas,
        alergias: compraTemporal.alergias,
        viajero: {
            nombre: inputNombre.value.trim(),
            apellidos: inputApellidos.value.trim(),
            email: inputEmail.value.trim(),
            telefono: inputTelefono.value.trim()
        },
        descuento: descuentoAplicado
    };

    // ¿Guardamos datos / creamos cuenta?
    const quiereGuardar = checkGuardarDatos.checked;

    let user = getCurrentUser();

    if (!user && quiereGuardar) {
        // Mirar si ya existe usuario con ese email
        const users = getUsers();
        const existing = users.find(u => u.email === inputEmail.value.trim());

        if (existing) {
            // Vincular compra a ese usuario existente
            user = existing;
            setCurrentUser(existing.email);
        } else {
            // Crear usuario nuevo con contraseña generada
            const generatedPass = "AUTO" + Math.floor(Math.random() * 1000000);
            const newUser = {
                name: inputNombre.value.trim(),
                surname: inputApellidos.value.trim(),
                email: inputEmail.value.trim(),
                password: generatedPass,
                favorites: [],
                purchases: []
            };
            users.push(newUser);
            saveUsers(users);
            setCurrentUser(newUser.email);
            user = newUser;

            alert("Te hemos creado una cuenta con este email. Podrás iniciar sesión más tarde.");
        }
    }

    // Si hay usuario (ya existía o se acaba de crear), guardar compra en su perfil
    if (user) {
        // Añadir compra: llama a la función de usuario.js
        addPurchase(compraFinal);
    }

    // Limpiar la compra temporal
    localStorage.removeItem("compraTemporal");

    alert("¡Pago completado! Gracias por viajar con Moonloop 🌙");

    if (getCurrentUser()) {
        window.location.href = "profile.html";
    } else {
        window.location.href = "home.html";
    }
});
