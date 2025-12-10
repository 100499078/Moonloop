// Obtener la lista de usuarios desde el almacenamiento local
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Guardar el usuario logueado en el almacenamiento local
function setCurrentUser(email) {
    localStorage.setItem("currentUser", email);
}

// Guardar la lista de usuarios en el almacenamiento local
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}


// Obtener usuario logueado
function getCurrentUser() {
    const email = localStorage.getItem("currentUser");
    if (!email) return null;
    const users = getUsers();
    return users.find(u => u.email === email);
}

// Guardar cambios en un usuario concreto: compras y favoritos
function updateUser(updatedUser) {
    let users = getUsers();
    users = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    saveUsers(users);
}

// REGISTRO DE USUARIO
function handleRegister() {
    const name = document.getElementById("register-name").value.trim();
    const surname = document.getElementById("register-surname").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const pass1 = document.getElementById("register-password").value;
    const pass2 = document.getElementById("register-password2").value;

    // Validar campos vacíos
    if (!name || !surname || !email || !pass1 || !pass2) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Validación: coincidencia
    if (pass1 !== pass2) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Validación: longitud mínima
    if (pass1.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres, contener al menos una mayúscula, una minúscula y un número.");
        return;
    }

    // Validación: al menos una mayúscula
    if (!/[A-Z]/.test(pass1)) {
        alert("La contraseña debe tener al menos 8 caracteres, contener al menos una mayúscula, una minúscula y un número.");
        return;
    }

    // Validación: al menos un número
    if (!/[0-9]/.test(pass1)) {
        alert("La contraseña debe tener al menos 8 caracteres, contener al menos una mayúscula, una minúscula y un número.");
        return;
    }

    const users = getUsers();
    if (users.some(u => u.email === email)) {
        alert("Este email ya está registrado.");
        return;
    }

    const newUser = {
        name,
        surname,
        email,
        password: pass1,
        favorites: [],
        purchases: []
    };

    users.push(newUser);
    saveUsers(users);

    alert("Registro completado. Ahora puedes iniciar sesión.");
    window.location.href = "acceso_user.html";
}

// INICIO DE SESIÓN
function handleLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    // Caso 1: No existe el correo
    if (!user) {
        alert("El correo introducido no está registrado.");
        return;
    }

    // Caso 2: Existe el correo pero la contraseña no coincide
    if (user.password !== password) {
        alert("La contraseña es incorrecta.");
        return;
    }

    setCurrentUser(email);
    window.location.href = "profile.html";
}

// Cargar el perfil del usuario logueado
function loadUserProfile() {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = "acceso_user.html";
        return;
    }

    // Nombre en el saludo
    const profileNameEl = document.getElementById("profile-name");
    if (profileNameEl) {
        profileNameEl.textContent = user.name;
    }

    if (document.getElementById("purchases-container")) {
        loadPurchases(user);
    }
}

// FAVORITOS 
function addFavorite(productId) {
    const user = getCurrentUser();
    if (!user) return;
    const productIdStr = String(productId); // Aseguramos string
    if (!user.favorites.includes(productIdStr)) {
        user.favorites.push(productIdStr);
        updateUser(user);
    }
}

function removeFavorite(productId) {
    const user = getCurrentUser();
    if (!user) return;
    const productIdStr = String(productId); // Aseguramos string
    user.favorites = user.favorites.filter(id => id !== productIdStr);
    updateUser(user);
}

// COMPRAS
function addPurchase(product) {
    const user = getCurrentUser();
    if (!user) return;

    user.purchases.push(product);
    updateUser(user);
}

function loadPurchases(user) {
    const container = document.getElementById("purchases-container");
    if (!container) return;

    if (!user.purchases || user.purchases.length === 0) {
        container.innerHTML = "<p>No tienes compras realizadas.</p>";
        return;
    }

    container.innerHTML = "";

    user.purchases.forEach(p => {
        const fechaIda = new Date(p.fechaIda).toLocaleDateString();
        const fechaVuelta = new Date(p.fechaVuelta).toLocaleDateString();

        const alergias = p.alergias && p.alergias.trim() !== ""
            ? p.alergias
            : "Ninguna";

        container.innerHTML += `
            <div class="purchase-card">
                <img class="purchase-img" src="${p.imagen || '../images/default.jpg'}" alt="${p.packName}">
                
                <div class="purchase-info">
                    <h3>${p.packName}</h3>

                    <p><strong>Destinos:</strong> ${p.destinos}</p>
                    <p><strong>Fechas:</strong> ${fechaIda} → ${fechaVuelta}</p>
                    <p><strong>Personas:</strong> ${p.personas}</p>

                    ${p.mascotas ? `<p><strong>Mascotas:</strong> ${p.mascotas.tipo} (${p.mascotas.tamano})</p>` : ""}

                    <p><strong>Alergias:</strong> ${alergias}</p>
                    <p><strong>Descuento aplicado:</strong> ${p.descuento || 0} €</p>
                    <p class="purchase-total"><strong>Total pagado:</strong> ${p.price} €</p>

                    <a class="purchase-link" href="pack.html?id=${p.id}">
                        Ver pack
                    </a>
                </div>
            </div>
        `;
    });
}



// LOGOUT

function logout() {
    document.getElementById("logout-modal").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    // Botón registro
    const registerBtn = document.getElementById("register-btn");
    if (registerBtn) {
        registerBtn.addEventListener("click", handleRegister);
    }

    // Botón login
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", handleLogin);
        
    }

    // Página de perfil (si existe el nombre, estamos en profile)
    const profileNameSpan = document.getElementById("profile-name");
    if (profileNameSpan) {
        loadUserProfile();
    }

    // Botón cerrar sesión (abre el modal)
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    // Modal logout
    const modal = document.getElementById("logout-modal");
    const confirmLogout = document.getElementById("confirm-logout");
    const cancelLogout = document.getElementById("cancel-logout");

    if (confirmLogout && modal) {
        confirmLogout.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "acceso_user.html";
        });
    }

    if (cancelLogout && modal) {
        cancelLogout.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }

    // Menú “Usuario”
    const navUser = document.getElementById("nav_user");
    if (navUser) {
        navUser.addEventListener("click", () => {
            const isLogged = localStorage.getItem("currentUser") !== null;
            window.location.href = isLogged ? "profile.html" : "acceso_user.html";
        });
    }
});



