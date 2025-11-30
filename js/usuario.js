// REGISTRO DE USUARIO 
const registerBtn = document.getElementById("register-btn");

if (registerBtn) {
    registerBtn.addEventListener("click", () => {

        const firstname = document.getElementById("register-name").value.trim();
        const lastname = document.getElementById("register-surname").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const pass1 = document.getElementById("register-password").value;
        const pass2 = document.getElementById("register-password2").value;

        if (!firstname || !lastname || !email || !pass1 || !pass2) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        if (pass1 !== pass2) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (localStorage.getItem("user_" + email)) {
            alert("Ya existe un usuario con ese correo.");
            return;
        }

        const user = {
            firstname,
            lastname,
            email,
            password: pass1,
            favorites: [],
            purchases: []
        };

        localStorage.setItem("user_" + email, JSON.stringify(user));

        alert("Registro completado correctamente");
        window.location.href = "acceso_user.html";
    });
}

// ACCESO DE USUARIO: usuario ya registrado entra a su perfil
const loginBtn = document.getElementById("login-btn");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const userData = localStorage.getItem("user_" + email);

        if (!userData) {
            alert("No existe ninguna cuenta con este correo.");
            return;
        }

        const user = JSON.parse(userData);

        if (user.password !== password) {
            alert("Contraseña incorrecta.");
            return;
        }

        // Guardar sesión
        localStorage.setItem("currentUser", email);

        alert("Inicio de sesión correcto");
        window.location.href = "profile.html";
    });
}

//Cargar datos de usuario en la página de perfil
function loadUserData() {
    const email = localStorage.getItem("currentUser");
    const user = JSON.parse(localStorage.getItem("user_" + email));

    document.getElementById("profile-name").textContent = user.firstname;

    return user;
}

let currentUserData = loadUserData();

// CARGAR FAVORITOS
function loadFavorites() {
    const container = document.getElementById("favorites-container");
    container.innerHTML = "";

    currentUserData.favorites.forEach(fav => {
        const card = document.createElement("div");
        card.classList.add("profile-card");

        card.innerHTML = `
            <img src="${fav.image}" alt="${fav.title}">
            <h3>${fav.title}</h3>

            <div class="card-buttons">
                <button class="btn-view">Ver</button>
                <button class="btn-remove" data-id="${fav.id}">Eliminar</button>
            </div>
        `;

        container.appendChild(card);
    });

    // Eliminar favoritos
    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            removeFavorite(btn.dataset.id);
        });
    });
}

loadFavorites();

// Eliminar favorito
function removeFavorite(id) {
    const email = localStorage.getItem("currentUser");
    const user = JSON.parse(localStorage.getItem("user_" + email));

    user.favorites = user.favorites.filter(f => f.id !== id);

    localStorage.setItem("user_" + email, JSON.stringify(user));
    currentUserData = user;
    loadFavorites();
}

// CARGAR COMPRAS

function loadPurchases() {
    const container = document.getElementById("purchases-container");
    container.innerHTML = "";

    currentUserData.purchases.forEach(buy => {
        const card = document.createElement("div");
        card.classList.add("profile-card");

        card.innerHTML = `
            <img src="${buy.image}" alt="${buy.title}">
            <h3>${buy.title}</h3>
            <p>Comprado el: ${buy.date}</p>
        `;

        container.appendChild(card);
    });
}

loadPurchases();

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "acceso_user.html";
    });
}

