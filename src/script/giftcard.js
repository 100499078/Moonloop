document.addEventListener('DOMContentLoaded', function() {
    console.log('Giftcard page loaded');
    
    const form = document.getElementById('giftcard-form');
    const selectMetodoPago = document.getElementById('metodo-pago');
    const camposTarjetaContainer = document.getElementById('campos-tarjeta');
    const camposTarjeta = [
        document.getElementById('card-number'),
        document.getElementById('card-holder'),
        document.getElementById('cvv'),
        document.getElementById('expiry-date')
    ];
    
    // 1. Inicializar: ocultar campos de tarjeta al cargar
    camposTarjetaContainer.style.display = 'none';
    
    // 2. Mostrar/ocultar campos según método de pago
    selectMetodoPago.addEventListener('change', function() {
        const metodo = this.value;
        
        if (metodo === 'applepay' || metodo === 'paypal') {
            // Ocultar campos de tarjeta para Apple Pay y PayPal
            camposTarjetaContainer.style.display = 'none';
            
            // Deshabilitar validación de estos campos
            camposTarjeta.forEach(campo => {
                campo.required = false;
                campo.disabled = true;
            });
        } else if (metodo === 'tarjeta' || metodo === 'amex' || metodo === 'visa') {
            // Mostrar campos de tarjeta para métodos de tarjeta
            camposTarjetaContainer.style.display = 'block';
            
            // Habilitar validación
            camposTarjeta.forEach(campo => {
                campo.required = true;
                campo.disabled = false;
            });
        }
    });
    
    // 3. Formatear campos automáticamente
    function configurarAutoFormato() {
        // Formatear número de tarjeta: xxxx xxxx xxxx xxxx
        const cardNumberInput = document.getElementById('card-number');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function(e) {
                let valor = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                let formatted = '';
                
                for (let i = 0; i < valor.length && i < 16; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formatted += ' ';
                    }
                    formatted += valor[i];
                }
                
                e.target.value = formatted;
            });
        }
        
        // Formatear fecha: xx/xx/xxxx
        const expiryInput = document.getElementById('expiry-date');
        if (expiryInput) {
            expiryInput.addEventListener('input', function(e) {
                let valor = e.target.value.replace(/\D/g, '');
                
                if (valor.length >= 2) {
                    valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
                    if (valor.length >= 5) {
                        valor = valor.substring(0, 5) + '/' + valor.substring(5, 9);
                    }
                }
                
                e.target.value = valor.substring(0, 10); // MM/AA/AAAA
            });
        }
        
        // Limitar CVV a 4 dígitos
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
            });
        }
    }
    
    // 4. Validación de campos vacíos
    function validarCamposVacios() {
        const camposRequeridos = [
            document.getElementById('amount'),
            document.getElementById('recipient-name'),
            document.getElementById('recipient-email'),
            document.getElementById('comprador-name'),
            document.getElementById('comprador-surname'),
            document.getElementById('email-comprador'),
            selectMetodoPago
        ];
        
        for (let campo of camposRequeridos) {
            if (!campo || !campo.value.trim()) {
                return false; // Hay campos vacíos
            }
        }
        return true; // Todos llenos
    }
    
    // 5. Validación de emails
    function validarEmails() {
        const emailDestinatario = document.getElementById('recipient-email').value;
        const emailComprador = document.getElementById('email-comprador').value;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return regexEmail.test(emailDestinatario) && regexEmail.test(emailComprador);
    }
    
    // 6. Validación específica de tarjeta de crédito
    function validarTarjetaCredito() {
        const metodo = selectMetodoPago.value;
        
        // Solo validar tarjeta si el método la requiere
        if (metodo === 'tarjeta' || metodo === 'amex' || metodo === 'visa') {
            const numeroTarjeta = document.getElementById('card-number').value;
            const cvv = document.getElementById('cvv').value;
            const fecha = document.getElementById('expiry-date').value;
            
            // Validar que los campos no estén vacíos
            if (!numeroTarjeta.trim() || !cvv.trim() || !fecha.trim()) {
                alert("Rellena todos los campos de la tarjeta");
                return false;
            }
            
            // Validar formato de número de tarjeta: xxxx xxxx xxxx xxxx (16 dígitos con espacios)
            const regexTarjeta = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
            if (!regexTarjeta.test(numeroTarjeta)) {
                alert("Formato de tarjeta incorrecto. Debe ser: XXXX XXXX XXXX XXXX");
                return false;
            }
            
            // Validar CVV: 3 o 4 dígitos
            const regexCVV = /^\d{3,4}$/;
            if (!regexCVV.test(cvv)) {
                alert("CVV incorrecto. Debe tener 3 o 4 dígitos");
                return false;
            }
            
            // Validar fecha: xx/xx/xxxx (mes/día/año)
            const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!regexFecha.test(fecha)) {
                alert("Formato de fecha incorrecto. Debe ser: MM/DD/AAAA (ej: 12/25/2025)");
                return false;
            }
            
            // Validar que la fecha no esté expirada
            if (!validarFechaNoExpirada(fecha)) {
                alert("La tarjeta está expirada");
                return false;
            }
        }
        
        return true;
    }
    
    // 7. Validar que la fecha no esté expirada
    function validarFechaNoExpirada(fechaStr) {
        const [mes, dia, año] = fechaStr.split('/').map(Number);
        const ahora = new Date();
        const añoActual = ahora.getFullYear();
        const mesActual = ahora.getMonth() + 1;
        const diaActual = ahora.getDate();
        
        if (año < añoActual) return false;
        if (año === añoActual && mes < mesActual) return false;
        if (año === añoActual && mes === mesActual && dia < diaActual) return false;
        
        return true;
    }
    
    // 8. Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos vacíos
        if (!validarCamposVacios()) {
            alert("Rellena todos los campos");
            return;
        }
        
        // Validar emails
        if (!validarEmails()) {
            alert("Rellena bien los datos (emails inválidos)");
            return;
        }
        
        // Validar tarjeta si es necesario
        if (!validarTarjetaCredito()) {
            return;
        }
        
        // Si es Apple Pay, manejar de forma especial
        const metodoSeleccionado = selectMetodoPago.value;
        if (metodoSeleccionado === "applepay") {
            manejarApplePay();
        } else {
            // Para otros métodos, mostrar éxito
            mostrarCompraExitosa();
        }
    });
    
    // 9. Manejar Apple Pay
    function manejarApplePay() {
        // Simular proceso de Apple Pay
        alert("Iniciando Apple Pay...");
        
        // Simular verificación de Apple Pay (2 segundos)
        setTimeout(() => {
            mostrarCompraExitosa();
        }, 2000);
    }
    
    // 10. Mostrar compra exitosa
    function mostrarCompraExitosa() {
        alert("Compra realizada con éxito, recibirás un correo con los datos correctos");
        
        // Obtener datos para mostrar en modal
        const importe = document.getElementById('amount').value;
        const destinatario = document.getElementById('recipient-name').value;
        const emailDestinatario = document.getElementById('recipient-email').value;
        
        // Generar código de tarjeta
        const codigo = generarCodigo();
        
        // Crear modal con detalles
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%;">
                <h2 style="color: #000; margin-bottom: 20px; text-align: center;">🎉 ¡Compra Exitosa!</h2>
                <div style="margin-bottom: 20px;">
                    <p><strong>Tarjeta regalo de:</strong> ${importe}€</p>
                    <p><strong>Para:</strong> ${destinatario}</p>
                    <p><strong>Email destinatario:</strong> ${emailDestinatario}</p>
                </div>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
                    <p style="margin: 0; font-weight: bold; color: #333;">Código de la tarjeta:</p>
                    <p style="margin: 10px 0 0 0; font-size: 1.5rem; letter-spacing: 2px; color: #000; font-family: monospace;">
                        ${codigo}
                    </p>
                </div>
                <p style="color: #666; font-size: 0.9rem; text-align: center; margin-bottom: 20px;">
                    Se ha enviado un email con los detalles al destinatario.
                </p>
                <button id="cerrar-modal" style="
                    background: #000;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                    font-size: 1rem;
                    font-weight: 600;
                ">Aceptar</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Cerrar modal
        document.getElementById('cerrar-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
            form.reset();
            camposTarjetaContainer.style.display = 'none';
        });
        
        // Cerrar al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                form.reset();
                camposTarjetaContainer.style.display = 'none';
            }
        });
        
        // Guardar en historial
        guardarEnHistorial(importe, destinatario, emailDestinatario, codigo);
    }
    
    // 11. Generar código de tarjeta
    function generarCodigo() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let codigo = 'MOON-';
        for (let i = 0; i < 8; i++) {
            if (i === 4) codigo += '-';
            codigo += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return codigo;
    }
    
    // 12. Guardar en historial
    function guardarEnHistorial(importe, destinatario, email, codigo) {
        try {
            const compras = JSON.parse(localStorage.getItem('giftcardCompras') || '[]');
            compras.push({
                fecha: new Date().toISOString(),
                importe: importe,
                destinatario: destinatario,
                email: email,
                codigo: codigo,
                estado: 'activa'
            });
            localStorage.setItem('giftcardCompras', JSON.stringify(compras));
            console.log('Compra guardada en historial');
        } catch (e) {
            console.log('Error guardando en historial:', e);
        }
    }
    
    // 13. Inicializar
    configurarAutoFormato();
    console.log('Giftcard JavaScript inicializado');
});