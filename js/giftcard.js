document.addEventListener('DOMContentLoaded', function() {
    console.log('Giftcard page loaded');
    

    const form = document.querySelector('.contenedorInferiorGitfCard');
    const submitBtn = document.querySelector('.botonComprarGiftCard');
    
    // Campos a validar en tiempo real
    const camposValidar = [
        'amount', 'recipient-name', 'recipient-email',
        'sender-name', 'sender-email', 'card-number',
        'expiry-date', 'cvv'
    ];
    
    // Limpiar todos los errores previos
    function limpiarErrores() {
        document.querySelectorAll('.error-mensaje').forEach(error => error.remove());
        document.querySelectorAll('.input-error').forEach(input => {
            input.classList.remove('input-error');
        });
    }
    
    // Mostrar error en un campo específico
    function mostrarError(input, mensaje) {
        // Limpiar error previo para este campo
        const errorPrev = input.parentElement.querySelector('.error-mensaje');
        if (errorPrev) errorPrev.remove();
        
        // Quitar clase de error anterior
        input.classList.remove('input-error');
        
        // Añadir nuevo error si hay mensaje
        if (mensaje) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-mensaje';
            errorDiv.textContent = mensaje;
            input.parentElement.appendChild(errorDiv);
            input.classList.add('input-error');
        }
    }
    

    camposValidar.forEach(campoId => {
        const input = document.getElementById(campoId);
        if (input) {
            // Validar al perder el foco
            input.addEventListener('blur', function() {
                validarCampo(this);
            });
            
            // Validar al escribir (para algunos campos)
            if (campoId === 'card-number' || campoId === 'expiry-date' || campoId === 'cvv') {
                input.addEventListener('input', function() {
                    if (this.value.trim() !== '') {
                        validarCampo(this);
                    }
                });
            }
        }
    });
    
    // Función para validar un campo individual
    function validarCampo(input) {
        const valor = input.value.trim();
        const campoId = input.id;
        let mensajeError = '';
        
        // Validar campo vacío si es requerido
        if (input.hasAttribute('required') && !valor) {
            mensajeError = 'Este campo es obligatorio';
        } else if (valor) {
            // Validaciones específicas por campo
            switch (campoId) {
                case 'recipient-email':
                case 'sender-email':
                    if (!validarEmail(valor)) {
                        mensajeError = 'Introduce un email válido';
                    }
                    break;
                    
                case 'card-number':
                    if (!validarTarjeta(valor)) {
                        mensajeError = 'Número de tarjeta inválido';
                    }
                    break;
                    
                case 'cvv':
                    if (!validarCVV(valor)) {
                        mensajeError = 'CVV debe tener 3 o 4 dígitos';
                    }
                    break;
                    
                case 'expiry-date':
                    if (!validarFecha(valor)) {
                        mensajeError = 'Formato MM/AA (ej: 12/25)';
                    } else if (!validarFechaNoExpirada(valor)) {
                        mensajeError = 'La tarjeta ha expirado';
                    }
                    break;
                    
                case 'amount':
                    const importe = parseFloat(valor);
                    if (isNaN(importe) || importe <= 0) {
                        mensajeError = 'Introduce un importe válido';
                    }
                    break;
            }
        }
        
        mostrarError(input, mensajeError);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('Validando formulario...');
        
        let hayErrores = false;
        
        // Limpiar todos los errores previos
        limpiarErrores();
        
        // Validar cada campo
        camposValidar.forEach(campoId => {
            const input = document.getElementById(campoId);
            if (input) {
                validarCampo(input);
                
                // Verificar si este campo tiene error
                if (input.classList.contains('input-error')) {
                    hayErrores = true;
                }
            }
        });
        
        // Si hay errores, mostrar mensaje general
        if (hayErrores) {
            mostrarMensaje('Por favor, corrige los errores en el formulario', 'error');
            
            // Hacer scroll al primer error
            const primerError = document.querySelector('.input-error');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                primerError.focus();
            }
            
            return;
        }
        
        // Si todo está bien, mostrar éxito (tu función original)
        mostrarMensajeExito();
    });
    

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function validarTarjeta(numero) {
        const limpiado = numero.replace(/\s/g, '');
        return /^\d{13,19}$/.test(limpiado);
    }
    
    function validarCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }
    
    function validarFecha(fecha) {
        const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        return regex.test(fecha);
    }
    
    function validarFechaNoExpirada(fecha) {
        if (!validarFecha(fecha)) return false;
        
        const [mes, ano] = fecha.split('/');
        const ahora = new Date();
        const añoActual = ahora.getFullYear() % 100; // Últimos 2 dígitos
        const mesActual = ahora.getMonth() + 1; // Enero es 0
        
        const añoTarjeta = parseInt(ano);
        const mesTarjeta = parseInt(mes);
        
        // Verificar si la tarjeta no ha expirado
        if (añoTarjeta < añoActual) return false;
        if (añoTarjeta === añoActual && mesTarjeta < mesActual) return false;
        
        return true;
    }
    
    // Función para mostrar mensaje temporal
    function mostrarMensaje(texto, tipo) {
        // Remover mensaje anterior si existe
        const mensajeAnterior = document.querySelector('.mensaje-temporal');
        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }
        
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = 'mensaje-temporal';
        mensajeDiv.textContent = texto;
        mensajeDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${tipo === 'error' ? '#e74c3c' : '#27ae60'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-weight: 500;
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(mensajeDiv);
        
        // Auto-eliminar después de 3 segundos
        setTimeout(() => {
            if (mensajeDiv.parentElement) {
                mensajeDiv.remove();
            }
        }, 3000);
    }
    

    function mostrarMensajeExito() {
        // Tu función original se mantiene igual
        const importe = document.getElementById('amount').value;
        const destinatario = document.getElementById('recipient-name').value;
        const emailDestinatario = document.getElementById('recipient-email').value;
        
        const codigo = generarCodigo();
        
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = 'mensaje-exito';
        mensajeDiv.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 2rem; margin-bottom: 10px;">🎉</div>
                <h3 style="color: #000; margin-bottom: 15px;">¡Compra Exitosa!</h3>
                <p style="color: #555; margin-bottom: 10px;">
                    Has comprado una tarjeta regalo de <strong>${importe}€</strong> para <strong>${destinatario}</strong>.
                </p>
                <p style="color: #555; margin-bottom: 15px;">
                    Se ha enviado a: <strong>${emailDestinatario}</strong>
                </p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <p style="margin: 0; color: #333; font-weight: bold;">Tu código de tarjeta:</p>
                    <p style="margin: 10px 0 0 0; font-size: 1.5rem; letter-spacing: 2px; color: #000;">
                        ${codigo}
                    </p>
                </div>
                <button id="cerrar-mensaje" style="
                    background: #000;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    margin-top: 10px;
                ">Aceptar</button>
            </div>
        `;
        
        mensajeDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 15px;
            padding: 0;
            z-index: 1000;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: aparecer 0.3s ease;
        `;
        
        const fondo = document.createElement('div');
        fondo.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 999;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(fondo);
        document.body.appendChild(mensajeDiv);
        
        document.getElementById('cerrar-mensaje').addEventListener('click', function() {
            document.body.removeChild(fondo);
            document.body.removeChild(mensajeDiv);
        });
        
        fondo.addEventListener('click', function() {
            document.body.removeChild(fondo);
            document.body.removeChild(mensajeDiv);
        });
    }
    
    // ====================
    // 6. MANTENER FUNCIONES ADICIONALES
    // ====================
    function generarCodigo() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let codigo = 'MOON-';
        for (let i = 0; i < 8; i++) {
            if (i === 4) codigo += '-';
            codigo += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return codigo;
    }
    
    // Formatear número de tarjeta con espacios
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
            let formatted = '';
            
            for (let i = 0; i < valor.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += valor[i];
            }
            
            e.target.value = formatted.substring(0, 19);
        });
    }
    
    // Formatear fecha MM/AA
    const expiryInput = document.getElementById('expiry-date');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            
            if (valor.length >= 2) {
                valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
            }
            
            e.target.value = valor.substring(0, 5);
        });
    }
    
    // Limitar CVV a 4 dígitos
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }
    
    // ANIMACIONES CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes aparecer {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        .botonComprarGiftCard:hover {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
        }
        
        .botonComprarGiftCard:active {
            transform: translateY(0);
        }
        
        /* Transición suave para los bordes de error */
        .contenedorInferiorGitfCard input,
        .contenedorInferiorGitfCard select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('JavaScript de giftcard con validación en tiempo real listo');
});