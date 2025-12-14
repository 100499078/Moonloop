// Variables globales para el calendario
let fechaActual = new Date();
let fechaIda = null;
let fechaVuelta = null;
const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

// DOM Elements
const modalCalendario = document.getElementById('modal-calendario');
const btnAbrirCalendario = document.getElementById('abrir-calendario');
const btnCerrarModal = document.getElementById('cerrar-modal');
const btnCancelarFechas = document.getElementById('cancelar-fechas');
const btnAplicarFechas = document.getElementById('aplicar-fechas');
const inputFechas = document.getElementById('fechas');
const continenteOpciones = document.getElementById('continente-opciones');
const toggleContinente = document.getElementById('toggle-continente');
const bocadilloTexto = document.getElementById('bocadillo-texto');
const inputContinentes = document.getElementById('continentes-seleccionados');
const modalExito = document.getElementById('modal-exito');
const btnCerrarExito = document.getElementById('cerrar-exito');

// 1. BOCADILLO DE CONTINENTES
toggleContinente.addEventListener('click', () => {
    continenteOpciones.classList.toggle('mostrar');
    toggleContinente.classList.toggle('abierto');
    
    // Cerrar al hacer clic fuera
    if (continenteOpciones.classList.contains('mostrar')) {
        document.addEventListener('click', cerrarBocadilloAlClicarFuera);
    } else {
        document.removeEventListener('click', cerrarBocadilloAlClicarFuera);
    }
});

function cerrarBocadilloAlClicarFuera(e) {
    if (!toggleContinente.contains(e.target) && !continenteOpciones.contains(e.target)) {
        continenteOpciones.classList.remove('mostrar');
        toggleContinente.classList.remove('abierto');
        document.removeEventListener('click', cerrarBocadilloAlClicarFuera);
    }
}

// Actualizar texto del bocadillo cuando se seleccionen continentes
const checkboxesContinentes = document.querySelectorAll('.opcion-continente input[type="checkbox"]');
checkboxesContinentes.forEach(checkbox => {
    checkbox.addEventListener('change', actualizarContinentesSeleccionados);
});

function actualizarContinentesSeleccionados() {
    const seleccionados = Array.from(checkboxesContinentes)
        .filter(cb => cb.checked)
        .map(cb => {
            const label = document.querySelector(`label[for="${cb.id}"]`);
            return label.textContent;
        });
    
    if (seleccionados.length === 0) {
        bocadilloTexto.textContent = 'Selecciona continente(s)';
        bocadilloTexto.classList.remove('seleccionado');
    } else {
        bocadilloTexto.textContent = seleccionados.join(', ');
        bocadilloTexto.classList.add('seleccionado');
    }
    
    // Guardar valores en el input hidden
    const valores = Array.from(checkboxesContinentes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    inputContinentes.value = valores.join(',');
}

// 2. CALENDARIO (Inspirado en compra.js)
btnAbrirCalendario.addEventListener('click', () => {
    abrirModalCalendario();
});

btnCerrarModal.addEventListener('click', cerrarModalCalendario);
btnCancelarFechas.addEventListener('click', cerrarModalCalendario);

btnAplicarFechas.addEventListener('click', () => {
    if (fechaIda && fechaVuelta) {
        const fechaIdaFormatted = fechaIda.toLocaleDateString('es-ES');
        const fechaVueltaFormatted = fechaVuelta.toLocaleDateString('es-ES');
        inputFechas.value = `${fechaIdaFormatted} - ${fechaVueltaFormatted}`;
        cerrarModalCalendario();
    } else {
        alert('Por favor, selecciona fecha de ida y vuelta');
    }
});

function abrirModalCalendario() {
    modalCalendario.classList.add('mostrar');
    renderCalendarios();
}

function cerrarModalCalendario() {
    modalCalendario.classList.remove('mostrar');
}

// Funciones del calendario
function cambiarMes(offset) {
    fechaActual.setMonth(fechaActual.getMonth() + offset);
    renderCalendarios();
}

function renderCalendarios() {
    renderMes('calendario1', 'mes1-titulo', fechaActual);
    
    let fechaMes2 = new Date(fechaActual);
    fechaMes2.setMonth(fechaActual.getMonth() + 1);
    renderMes('calendario2', 'mes2-titulo', fechaMes2);
    
    // Actualizar texto del rango de meses
    const mesActual = fechaActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    const mesSiguiente = fechaMes2.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    document.getElementById('calendario-rango-meses').textContent = `${mesActual} - ${mesSiguiente}`;
}

function renderMes(idCalendario, idTitulo, fechaBase) {
    const tabla = document.getElementById(idCalendario);
    const titulo = document.getElementById(idTitulo);
    
    tabla.innerHTML = '';
    
    const año = fechaBase.getFullYear();
    const mes = fechaBase.getMonth();
    
    // Título del mes
    titulo.textContent = fechaBase.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    
    // Encabezado de días
    let thead = document.createElement('tr');
    diasSemana.forEach(d => {
        let th = document.createElement('th');
        th.textContent = d;
        thead.appendChild(th);
    });
    tabla.appendChild(thead);
    
    const primerDiaMes = new Date(año, mes, 1);
    let start = primerDiaMes.getDay();
    if (start === 0) start = 7; // Domingo = 7
    
    const diasMes = new Date(año, mes + 1, 0).getDate();
    
    let fila = document.createElement('tr');
    
    // Huecos previos
    for (let i = 1; i < start; i++) {
        let td = document.createElement('td');
        td.className = 'cal-disabled';
        fila.appendChild(td);
    }
    
    for (let dia = 1; dia <= diasMes; dia++) {
        if ((start + dia - 2) % 7 === 0 && dia !== 1) {
            tabla.appendChild(fila);
            fila = document.createElement('tr');
        }
        
        let fecha = new Date(año, mes, dia);
        let td = document.createElement('td');
        
        // Aplicar clases según selección
        if (fechaIda && mismaFecha(fecha, fechaIda)) td.classList.add('fecha-ida');
        if (fechaVuelta && mismaFecha(fecha, fechaVuelta)) td.classList.add('fecha-vuelta');
        if (fechaIda && fechaVuelta && fecha > fechaIda && fecha < fechaVuelta) {
            td.classList.add('en-rango');
        }
        
        td.textContent = dia;
        td.addEventListener('click', () => seleccionarFecha(año, mes, dia));
        fila.appendChild(td);
    }
    
    tabla.appendChild(fila);
}

function mismaFecha(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
}

function seleccionarFecha(año, mes, dia) {
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
    
    // Actualizar display
    document.getElementById('fecha-ida').textContent = fechaIda.toLocaleDateString();
    document.getElementById('fecha-vuelta').textContent = fechaVuelta ? fechaVuelta.toLocaleDateString() : '—';
    
    renderCalendarios();
}

// Event listeners para navegación del calendario
document.getElementById('prev-mes').addEventListener('click', () => cambiarMes(-1));
document.getElementById('next-mes').addEventListener('click', () => cambiarMes(1));

// 3. SLIDER DE PRESUPUESTO
const presupuestoSlider = document.getElementById('presupuesto-slider');
const budgetValueSpan = document.getElementById('budget-value');

// Función para actualizar el valor del presupuesto
function actualizarPresupuesto() {
    const valor = parseInt(presupuestoSlider.value);
    budgetValueSpan.textContent = valor + '€';
}

// Inicializar y conectar evento
actualizarPresupuesto(); // Para que muestre el valor inicial
presupuestoSlider.addEventListener('input', actualizarPresupuesto);

// 4. ENVÍO DEL FORMULARIO (modifica esta parte también)
document.getElementById('form-contacto-ruta').addEventListener('submit', function(e) {
    e.preventDefault();

    const presupuestoMaximo = parseInt(presupuestoSlider.value);
    
    console.log('Datos del viaje:', {

        presupuestoMaximo: presupuestoMaximo,
    });
    
});

// 4. ENVÍO DEL FORMULARIO
document.getElementById('form-contacto-ruta').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validaciones básicas
    const ideaViaje = document.getElementById('idea-viaje').value.trim();
    const continentes = inputContinentes.value;
    const compania = document.querySelector('input[name="compania"]:checked');
    const fechas = inputFechas.value;
    const nombre = document.getElementById('nombre-contacto').value.trim();
    const email = document.getElementById('email-contacto').value.trim();
    const telefono = document.getElementById('telefono-contacto').value.trim();
    const privacidad = document.getElementById('privacidad').checked;
    // Inicializar posición del presupuesto
    actualizarPresupuesto();
    
    if (!ideaViaje) {
        alert('Por favor, describe tu idea de viaje');
        return;
    }
    
    if (!continentes) {
        alert('Por favor, selecciona al menos un continente');
        return;
    }
    
    if (!compania) {
        alert('Por favor, selecciona cómo viajas');
        return;
    }
    
    if (!fechas) {
        alert('Por favor, selecciona las fechas de viaje');
        return;
    }
    
    if (!nombre || !email || !telefono) {
        alert('Por favor, completa todos los campos obligatorios de contacto');
        return;
    }
    
    if (!privacidad) {
        alert('Debes aceptar la política de privacidad');
        return;
    }
    
    console.log('Datos del viaje:', {
        ideaViaje,
        continentes,
        compania: compania.value,
        fechas,
        presupuesto: {
            min: presupuestoMin.value,
            max: presupuestoMax.value
        },
        contacto: {
            nombre,
            email,
            telefono,
            personas: document.getElementById('personas-contacto').value,
            observaciones: document.getElementById('observaciones-contacto').value
        }
    });
    
    // Mostrar modal de éxito
    modalExito.classList.add('mostrar');
    
});

btnCerrarExito.addEventListener('click', () => {
    modalExito.classList.remove('mostrar');
});

// 5. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar calendario
    renderCalendarios();
    
    // Configurar navegación del calendario modal
    const prevMesBtn = document.getElementById('prev-mes');
    const nextMesBtn = document.getElementById('next-mes');
    
    if (prevMesBtn && nextMesBtn) {
        prevMesBtn.addEventListener('click', () => cambiarMes(-1));
        nextMesBtn.addEventListener('click', () => cambiarMes(1));
    }
    
    // Cerrar modal al hacer clic fuera
    modalCalendario.addEventListener('click', (e) => {
        if (e.target === modalCalendario) {
            cerrarModalCalendario();
        }
    });
    
    modalExito.addEventListener('click', (e) => {
        if (e.target === modalExito) {
            modalExito.classList.remove('mostrar');
        }
    });
});

// 6. FECHAS FLEXIBLES
document.getElementById('fechas-flex').addEventListener('change', function() {
    if (this.checked) {
        inputFechas.placeholder = 'Fechas flexibles - indicanos tu preferencia';
    } else {
        inputFechas.placeholder = 'Selecciona fechas';
    }
});