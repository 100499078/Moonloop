document.addEventListener("DOMContentLoaded", () => {

    const user = getCurrentUser();

    if (!user) {
        // Si no está logueado, enviarlo a login
        window.location.href = "acceso_user.html";
        return;
    }

    // Llamar a la función que ya tienes hecha en usuario.js
    loadFavorites(user);
});
