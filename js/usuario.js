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

    if (!name || !surname || !email || !pass1 || !pass2) {
        alert("Por favor completa todos los campos.");
        return;
    }

    if (pass1 !== pass2) {
        alert("Las contraseñas no coinciden.");
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
    document.getElementById("profile-name").textContent = user.name;

    // Cargar favoritos y compras
    loadFavorites(user);
    loadPurchases(user);
}

// FAVORITOS
function addFavorite(productId) {
    const user = getCurrentUser();
    if (!user) return;

    if (!user.favorites.includes(productId)) {
        user.favorites.push(productId);
        updateUser(user);
    }
}

function removeFavorite(productId) {
    const user = getCurrentUser();
    if (!user) return;

    user.favorites = user.favorites.filter(id => id !== productId);
    updateUser(user);
}

function loadFavorites(user) {
    const container = document.getElementById("favorites-container");

    if (!user.favorites.length) {
        container.innerHTML = "<p>No tienes favoritos aún.</p>";
        return;
    }

    container.innerHTML = "";

    user.favorites.forEach(id => {
        container.innerHTML += `
            <div class="card">
                <h3>${id}</h3>
                <button onclick="removeFavorite('${id}')">Eliminar</button>
            </div>
        `;
    });
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

    if (!user.purchases.length) {
        container.innerHTML = "<p>No tienes compras realizadas.</p>";
        return;
    }

    container.innerHTML = "";

    user.purchases.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <h3>${p.id}</h3>
                <p>Fecha: ${p.date}</p>
                <p>Precio: ${p.price}€</p>
            </div>
        `;
    });
}

// LOGOUT

function logout() {
    document.getElementById("logout-modal").classList.remove("hidden");
}

// EVENTOS AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", () => {

    const path = window.location.pathname;

    // Página de registro
    if (path.includes("register_user.html")) {
        document.getElementById("register-btn").addEventListener("click", handleRegister);
    }

    // Página de login
    if (path.includes("acceso_user.html")) {
        document.getElementById("login-btn").addEventListener("click", handleLogin);
    }

    // Página de perfil
    if (path.includes("profile.html")) {
        loadUserProfile();
        document.getElementById("logout-btn").addEventListener("click", logout);
    }

    // Modal logout 
    const modal = document.getElementById("logout-modal");
    const confirmLogout = document.getElementById("confirm-logout");
    const cancelLogout = document.getElementById("cancel-logout");

    if (confirmLogout) {
        confirmLogout.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "acceso_user.html";
        });
    }

    if (cancelLogout) {
        cancelLogout.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }

    // ----- LÓGICA DEL MENÚ “Usuario” -----
    const navUser = document.getElementById("nav_user");
    if (navUser) {
        const isLogged = localStorage.getItem("currentUser") !== null;
        navUser.addEventListener("click", () => {
            window.location.href = isLogged ? "profile.html" : "acceso_user.html";
        });
    }
});



