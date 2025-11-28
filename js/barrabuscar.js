document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. VARIABLES: Seleccionamos los elementos del HTML ---
    const trigger = document.getElementById('trigger-buscador'); // La barra falsa
    const closeBtn = document.getElementById('btn-cerrar');      // La X para cerrar
    const overlay = document.getElementById('search-overlay');   // El fondo blanco
    const inputSearch = document.getElementById('destination-search'); // Donde se escribe
    const budgetRange = document.getElementById('budget-range'); // El deslizador
    const budgetValue = document.getElementById('budget-value'); // El número del precio

    // --- 2. FUNCIONALIDAD: ABRIR EL BUSCADOR ---
    if (trigger) {
        trigger.addEventListener('click', function() {
            // Mostramos el overlay
            overlay.classList.add('active');
            
            // Ponemos el cursor para escribir automáticamente (con un pequeño retraso)
            setTimeout(() => {
                if(inputSearch) inputSearch.focus();
            }, 50);
        });
    }

    // --- 3. FUNCIONALIDAD: CERRAR EL BUSCADOR (Botón X) ---
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('active');
        });
    }

    // --- 4. FUNCIONALIDAD: CERRAR CON TECLA ESCAPE ---
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            overlay.classList.remove('active');
        }
    });

    // --- 5. FUNCIONALIDAD: SLIDER DE PRESUPUESTO ---
    if (budgetRange && budgetValue) {
        // Actualizar el número inicial al cargar
        budgetValue.textContent = budgetRange.value + '€';

        // Actualizar mientras se mueve
        budgetRange.addEventListener('input', function() {
            budgetValue.textContent = this.value + '€';
        });
    }
});